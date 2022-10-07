import { useCallback, useEffect, useState } from "react";
import { Text, FlatList, StyleSheet, View, Dimensions } from "react-native";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";
import { UseAppContext } from "../contexts/UsersContext";

export default function AllTasksScreen() {
    const [allTasks, setAllTasks] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const { loggedUser, setLoggedUser } = UseAppContext();

    useFocusEffect(useCallback(() => {
        getAllUserTasks();
        getAllUserProjects();
    }, []))

    useEffect(() => {
        console.log('all tasks', allTasks);
        console.log('all projects', allProjects);
    }, [allTasks, allProjects])

    const getAllUserTasks = async () => {
        try {
            await axios
                .get(`http://192.168.0.26:80/tasks/${loggedUser.email}`)
                .then((result) => setAllTasks(result.data.data))
        } catch (error) {
            console.error(error);
        }
    }

    const getAllUserProjects = async () => {
        try {
            await axios
                .get(`http://192.168.0.26:80/projects/${loggedUser.email}`)
                .then((result) => setAllProjects(result.data.data))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ width: '90%' }}>
                <FlatList
                    data={allProjects}
                    keyExtractor={project => project._id}
                    renderItem={({ item }) => {
                        return (
                            <View style={styles.project}>
                                <Text style={styles.title}>{item.name}</Text>
                                <FlatList
                                    data={allTasks.filter((task) => task.projectId === item._id)}
                                    keyExtractor={task => task._id}
                                    renderItem={({ item }) => {
                                        return (
                                            <Text style={styles.task}>{item.title}</Text>
                                        );
                                    }}
                                />
                            </View>
                        );
                    }}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    project: {
        borderWidth: 2,
        borderColor: 'black',
        marginTop: 16,
        paddingHorizontal: 16
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        paddingVertical: 8,
    },
    task: {
        paddingBottom: 8,
    }
})