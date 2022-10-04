import { Text, View, TouchableOpacity, StyleSheet, FlatList, Dimensions } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import ProjectCard from "../components/ProjectCard";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function AllProjectsScreen() {
    const [allProjects, setAllProjects] = useState([]);
    const [managedByMeFilter, setManagedByMeFilter] = useState(false);
    const [hideDoneFilter, setHideDoneFilter] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(allProjects)
    const navigation = useNavigation();

    useEffect(() => {
        getAllProjects()
    }, [])

    useEffect(() => {
        setFilteredProjects(allProjects)
    }, [allProjects])

    useEffect(() => {
        if (managedByMeFilter && hideDoneFilter) setFilteredProjects(allProjects.filter((project) => project.owner === 'Velma Dinkley' && project.status !== 'Done'));
        else if (managedByMeFilter) setFilteredProjects(allProjects.filter((project) => project.owner === 'Velma Dinkley'));
        else if (hideDoneFilter) setFilteredProjects(allProjects.filter((project) => project.status !== 'Done'));
        else setFilteredProjects(allProjects);
    }, [managedByMeFilter, hideDoneFilter])

    const getAllProjects = async () => {
        try {
            await axios
                .get('http://192.168.0.26:80/projects')
                .then((result) => setAllProjects(result.data.data))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.page}>
            <View style={styles.headerContainer}>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterText}>Managed by me</Text>
                    <TouchableOpacity onPress={() => setManagedByMeFilter(!managedByMeFilter)}>
                        {managedByMeFilter ? <Ionicons name="ios-checkmark-circle" size={24} color="green" /> : <MaterialCommunityIcons name="circle-outline" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>
                <View style={styles.filterContainer}>
                    <Text style={styles.filterText}>Hide done</Text>
                    <TouchableOpacity onPress={() => setHideDoneFilter(!hideDoneFilter)}>
                        {hideDoneFilter ? <Ionicons name="ios-checkmark-circle" size={24} color="green" /> : <MaterialCommunityIcons name="circle-outline" size={24} color="gray" />}
                    </TouchableOpacity>
                </View>
            </View>
            {filteredProjects.length >= 1 ?
                <FlatList
                    data={filteredProjects}
                    keyExtractor={project => project._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.centering}>
                                <ProjectCard {...item} />
                            </View>
                        );
                    }}
                /> : <Text>No projects yet...</Text>
            }

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CreateProject')}>
                <Text style={{ fontWeight: '500' }}>
                    {/* <Ionicons name="add-circle" size={28} color="black" /> */}
                    Create new project
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    page: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    },
    headerContainer: {
        paddingVertical: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68,
        width: '80%',
    },
    filterContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    centering: {
        display: 'flex',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
    },
    button: {
        backgroundColor: '#7F81BE',
        width: '90%',
        padding: 12,
        borderWidth: 2,
        borderColor: '#000',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        marginBottom: 32
    },
    filterText: {
        marginRight: 8,
        fontSize: 16
    }
})