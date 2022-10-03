import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';
import ProjectCard from "../components/ProjectCard";

export default function AllProjectsScreen() {
    const [allProjects, setAllProjects] = useState([]);
    const [managedByMeFilter, setManagedByMeFilter] = useState(false);
    const [hideDoneFilter, setHideDoneFilter] = useState(false);
    const [filteredProjects, setFilteredProjects] = useState(allProjects)
    const navigation = useNavigation();

    useEffect(() => {
        getAllProjects()
        console.log('allprojects', allProjects);
    }, [])

    useEffect(() => {
        if (managedByMeFilter && hideDoneFilter) setFilteredProjects(allProjects.filter((project) => project.owner === 'Velma Dinkley' && project.status === 'Done')); 
        else if (managedByMeFilter) setFilteredProjects(allProjects.filter((project) => project.owner === 'Velma Dinkley'));
        else if (hideDoneFilter) setFilteredProjects(allProjects.filter((project) => project.status === 'Done'));
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
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.filterContainer}>
                    <Text>Managed by me</Text>
                    <View style={(!managedByMeFilter) && styles.checkbox}>
                        <Checkbox color="red"
                            status={managedByMeFilter ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setManagedByMeFilter(!managedByMeFilter);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.filterContainer}>
                    <Text>Hide done</Text>
                    <View style={(!hideDoneFilter) && styles.checkbox}>
                        <Checkbox color="red"
                            status={hideDoneFilter ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setHideDoneFilter(!hideDoneFilter);
                            }}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateProject')}>
                <View>
                    <Ionicons name="add-circle" size={28} color="black" />
                </View>
            </TouchableOpacity>
            {filteredProjects.length >= 1 ?
                <FlatList
                    data={filteredProjects}
                    keyExtractor={project => project._id}
                    renderItem={({ item }) => {
                        return (
                            <ProjectCard name={item.name} owner={item.owner} dueDate={item.dueDate} status={item.status} />
                        );
                    }}
                /> : <Text>No projects yet...</Text>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    headerContainer: {
        paddingHorizontal: 32,
        paddingVertical: 16,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 68
    },
    iconsContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filterContainer: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        backgroundColor: 'lightgray',
        width: 24,
        height: 24,
        borderRadius: 50,
        marginLeft: 8
    }
})