import { Dimensions, ScrollView, StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from 'axios';
import { useEffect, useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { statusChecker } from "./StatusChecker";

export default function TasksSlider({ projectId }) {
    const [projectTasks, setProjectTasks] = useState([]);
    const [displayDescription, setDisplayDescription] = useState([]);
    const sections = ['todo', 'inProgress', 'done'];
    const [activeSection, setActiveSection] = useState('todo')


    useEffect(() => {
        getProjectTasks();
    }, [])

    useEffect(() => {
        getProjectTasks();
    }, [projectTasks])

    const getProjectTasks = async () => {
        try {
            await axios
                .get(`http://192.168.0.26:80/tasks/project/${projectId}`)
                .then((result) => setProjectTasks(result.data.data))
        } catch (error) {
            console.error(error);
        }
    }

    const getActiveSection = (offset) => {
        switch (offset) {
            case 0:
                setActiveSection('todo')
                break;
            case 390:
                setActiveSection('inProgress')
                break;
            case 780:
                setActiveSection('done')
                break;
            default:
                break;
        }
    }

    const showDescription = (taskId) => {
        const openDescriptions = [...displayDescription];
        if (displayDescription.includes(taskId)) setDisplayDescription(openDescriptions.filter((id) => id !== taskId))
        else setDisplayDescription([...openDescriptions, taskId])
    }

    return (
        <>
            <ScrollView horizontal pagingEnabled centerContent onScroll={(e) => getActiveSection(e.nativeEvent.contentOffset.x)} scrollEventThrottle contentContainerStyle={styles.taskContainer}>
                {sections.map((section) =>
                    <View style={styles.taskSection} key={section}>
                        <View style={styles.taskColumn}>
                            <Text style={styles.columnTitle}>{(section === 'todo' ? 'TO DO' : (section === 'inProgress') ? 'IN PROGRESS' : 'DONE')}</Text>
                            <FlatList
                                data={projectTasks.filter((task) => task.status === section)}
                                keyExtractor={task => task._id}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={styles.singleTask}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
                                                <Text style={styles.taskTitle}>{item.title}</Text>
                                                {(item.assignedTo.includes('velma.dinkley@scooby-gang.com')) && <Ionicons style={{marginTop: -4, marginRight: -12}} name="person-circle" size={22} color="black" />}
                                            </View>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                    <TouchableOpacity activeOpacity={1} style={styles.descriptionBtn} onPress={() => showDescription(item._id)}>
                                                        <Text style={{ marginRight: 8 }}>Description</Text>
                                                        {displayDescription.includes(item._id) ? <MaterialCommunityIcons name="chevron-up" size={24} color="black" /> : <MaterialCommunityIcons name="chevron-down" size={24} color="black" />}
                                                    </TouchableOpacity>
                                                    {statusChecker(item.status)}
                                                </View>
                                                {displayDescription.includes(item._id) && <Text>{item.description}</Text>}
                                            </View>
                                        </View>
                                    );
                                }}
                            />
                        </View>
                    </View>

                )}
            </ScrollView>
            <View style={styles.indicators}>
                {(activeSection === 'todo') ? <MaterialCommunityIcons name="circle" size={16} color="green" /> : <MaterialCommunityIcons name="circle-outline" size={16} color="gray" />}
                {(activeSection === 'inProgress') ? <MaterialCommunityIcons name="circle" size={16} color="green" /> : <MaterialCommunityIcons name="circle-outline" size={16} color="gray" />}
                {(activeSection === 'done') ? <MaterialCommunityIcons name="circle" size={16} color="green" /> : <MaterialCommunityIcons name="circle-outline" size={16} color="gray" />}
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskContainer: {
        height: Dimensions.get('window').height - 470,
    },
    taskSection: {
        height: 60,
        width: Dimensions.get('window').width,
        display: 'flex',
        alignItems: 'center',
    },
    taskColumn: {
        width: '90%',
        borderColor: 'black',
        borderWidth: 2,
        borderRadius: 4,
        height: Dimensions.get('window').height / 2.4,
        alignItems: 'center',
    },
    singleTask: {
        backgroundColor: 'white',
        width: Dimensions.get('screen').width - 50,
        marginBottom: 8,
        paddingVertical: 8,
        paddingHorizontal: 16,
    },
    columnTitle: {
        fontWeight: '800',
        fontSize: 18,
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    taskTitle: {
        fontWeight: '700',
        fontSize: 16,
        marginBottom: 4
    },
    descriptionBtn: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    indicators: {
        flexDirection: 'row',
        marginTop: -16,
        marginBottom: 24,
        width: 80,
        alignItems: 'center',
        justifyContent: 'space-between'
    }
})