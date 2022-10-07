import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, Modal, FlatList } from "react-native";
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-paper";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import TasksSlider from "../components/TasksSlider";
import { statusChecker } from "../components/StatusChecker";

export default function ProjectDetailsScreen({ route }) {
    const project = route.params;
    const [modalVisible, setModalVisible] = useState(false);
    const [displayMembers, setDisplayMembers] = useState(false);
    const [displayMembersInfo, setDisplayMembersInfo] = useState(false);
    const [newTask, setNewTask] = useState({ title: '', description: '', projectId: project._id, status: 'todo', creationDate: new Date().toLocaleDateString(), assignedTo: [] })
    const [assignedMembers, setAssignedMembers] = useState([]);
    const navigation = useNavigation();
    const [displayDescription, setDisplayDescription] = useState(false);


    const assignMembers = (member) => {
        if (assignedMembers.includes(member)) setAssignedMembers(assignedMembers.filter((item) => item !== member))
        else setAssignedMembers([...assignedMembers, member])
    }

    const saveTask = async () => {
        const task = { ...newTask, assignedTo: [...assignedMembers] };
        console.log('task', task);
        try {
            await axios
                .post('http://192.168.0.26:80/tasks', { ...task })
                .then((result) => {
                    (result.status === 201);
                    setDisplayMembers(false);
                    setModalVisible(false);
                })
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.projectDetails}>

            {/***  PROJECT INFOS  ***/}
            <View style={styles.infos}>
                <View style={[styles.infoPair, { marginBottom: 14 }]}>
                    <Text style={styles.projectName}>{project.name}</Text>
                    <TouchableOpacity><Ionicons name="create-outline" size={24} color="black" /></TouchableOpacity>
                </View>

                <View style={styles.infoPair}>
                    <Text style={styles.data1}>Owner: {project.owner}</Text>
                    <Text style={styles.data2}>Due: {project.dueDate}</Text>
                </View>

                <View style={styles.infoPair}>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setDisplayMembersInfo(!displayMembersInfo)}>
                        <Text style={{ marginRight: 8 }}>Members</Text>
                        {displayMembersInfo ? <MaterialCommunityIcons name="chevron-up" size={24} color="black" /> :
                            <MaterialCommunityIcons name="chevron-down" size={24} color="black" />}
                    </TouchableOpacity>
                    <Text style={styles.data2}>Created: {project.creationDate}</Text>
                </View>

                {displayMembersInfo && <FlatList
                    data={project.members}
                    keyExtractor={member => member}
                    renderItem={({ item }) => {
                        return (
                            <Text>{item}</Text>
                        );
                    }}
                />}

                <View style={styles.infoPair}>
                    <TouchableOpacity style={styles.dropdown} onPress={() => setDisplayDescription(!displayDescription)}>
                        <Text style={{ marginRight: 8 }}>Description</Text>
                        {displayDescription ? <MaterialCommunityIcons name="chevron-up" size={24} color="black" /> :
                            <MaterialCommunityIcons name="chevron-down" size={24} color="black" />}
                    </TouchableOpacity>
                    <Text style={styles.data2}>{statusChecker(project.status)}</Text>
                </View>

                {displayDescription && <Text>{project.description}</Text>}

            </View>

            {/***  MODAL FOR TASK CREATION  ***/}
            <View style={styles.infoPair}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}>
                    <View style={styles.modalView}>
                        <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
                            <Ionicons name="close-circle" size={24} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.modalText}>Task Creation</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setNewTask({ ...newTask, title: e })}
                            autoCapitalize={true}
                            placeholder="Project name"
                        />
                        <TextInput
                            style={styles.input}
                            onChangeText={(e) => setNewTask({ ...newTask, description: e })}
                            autoCapitalize={true}
                            placeholder="Description"
                            multiline={true}
                            numberOfLines={5}
                        />
                        <TouchableOpacity style={styles.assignedTo} onPress={() => setDisplayMembers(!displayMembers)}>
                            <Text>Assign to</Text>
                            {displayMembers ? <Ionicons name="chevron-up-circle-outline" size={24} color="black" /> : <Ionicons name="chevron-down-circle-outline" size={24} color="black" />}
                        </TouchableOpacity>
                        {displayMembers && project.members.length >= 1 &&
                            <FlatList
                                data={project.members}
                                keyExtractor={member => member}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableOpacity style={styles.member} onPress={() => assignMembers(item)}>
                                            <Text>{item}</Text>
                                            {assignedMembers.includes(item) ? <Ionicons name="ios-checkmark-circle" size={24} color="green" /> : <Ionicons name="ios-checkmark-circle-outline" size={24} color="black" />}
                                        </TouchableOpacity>
                                    );
                                }}
                            />}
                        <TouchableOpacity onPress={() => saveTask()}><Text>Create task</Text></TouchableOpacity>
                    </View>
                </Modal>
            </View>

            {/***  TASKS SLIDER  ***/}
            <TasksSlider projectId={project._id} />

            {/***  ADD NEW TASK BUTTON  ***/}
            <TouchableOpacity style={styles.button} onPress={() => setModalVisible(!modalVisible)}>
                <Text style={{ color: '#000' }}>
                    Create new task
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    projectDetails: {
        display: 'flex',
        alignItems: 'center'
    },
    infos: {
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 4,
        marginVertical: 16,
        padding: 12,
        lineHeight: 2
    },
    infoPair: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 4
    },
    dropdown: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        width: '60%'
    },
    data1: {
        width: '60%'
    },
    data2: {
        width: '40%'
    },
    modalView: {
        marginTop: 288,
        height: Dimensions.get('window').height - 288,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
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
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    input: {
        backgroundColor: 'white',
        height: 32,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 2,
        width: '90%',
        // padding: 12,
        marginVertical: 8
    },
    assignedTo: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
    },
    member: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
    },
    projectName: {
        fontWeight: '700',
        fontSize: 20
    }
});