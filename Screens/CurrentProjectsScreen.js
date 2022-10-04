import { Text, View, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import ProjectCard from "../components/ProjectCard";
import axios from 'axios';
import { useEffect, useState } from "react";


export default function CurrentProjectsScreen() {
    const [currentProjects, setCurrentProjects] = useState([]);

    const navigation = useNavigation();

    useEffect(() => {
        getCurrentProjects()
    }, [])

    const getCurrentProjects = async () => {
        try {
            await axios
                .get('http://192.168.0.26:80/projects')
                .then((result) => {
                    const projects = result.data.data;
                    const getLastUpdate = projects.map((project) => project.lastUpdate).sort((a, b) => b - a);
                    const sortedProjects = getLastUpdate.map((date) => projects.find((project) => project.lastUpdate === date));
                    (sortedProjects.length > 3) ? setCurrentProjects(sortedProjects.slice(0, 3)) : setCurrentProjects(sortedProjects);
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View>
            <View style={styles.headerContainer}>
                <Text>CURRENT PROJECTS</Text>
                <View style={styles.iconsContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Projects')}>
                        <View>
                            <Ionicons name="file-tray-stacked" size={24} color="black" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('Projects', { screen: 'CreateProject' })}>
                        <View>
                            <Ionicons name="add-circle" size={28} color="black" />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {currentProjects.length >= 1 ?
                <FlatList
                    data={currentProjects}
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
        justifyContent: 'space-between'
    },
    iconsContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    centering: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
    }
})