import { useState } from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

export default function CreateProjectScreen() {

    const [newProject, setNewProject] = useState({ name: '', owner: 'Velma Dinkley', members: [], creationDate: new Date().toLocaleDateString(), dueDate: '', lastUpdate: Date.now(), status: 'todo', description: ''})
    const [newMember, setNewMember] = useState('')
    const navigation = useNavigation();

    const createProject = async () => {
        console.log(newProject);
        try {
            await axios
                .post('http://192.168.0.26:80/projects', { ...newProject })
                .then((result) => (result.status === 201) && navigation.navigate('AllProjects'))
        } catch (error) {
            console.error(error);
        }
    }

    const addMember = () => {
        setNewProject({ ...newProject, members: [...newProject.members, newMember] });
        setNewMember('')
    }

    const deleteMember = (index) => {
        newProject.members.splice(index, 1);
        setNewProject({ ...newProject })
    }

    return (
        <View>
            <Text>Create New Project</Text>
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setNewProject({ ...newProject, name: e })}
                    // value={number}
                    autoCapitalize={true}
                    placeholder="Project name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setNewProject({ ...newProject, description: e })}
                    // value={number}
                    autoCapitalize={true}
                    placeholder="Description"
                    multiline={true}
                    numberOfLines={5}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={(e) => setNewProject({ ...newProject, dueDate: e })}
                    // value={number}
                    keyboardType="numbers-and-punctuation"
                    placeholder="Due date"
                />
                <View style={styles.memberInputContainer}>
                    <TextInput
                        style={styles.input}
                        onChangeText={(e) => setNewMember(e)}
                        value={newMember}
                        keyboardType="email-address"
                        placeholder="Project members"
                    />
                    <TouchableOpacity style={styles.addBtn} onPress={() => addMember()}>
                        <Ionicons name="person-add" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                {(newProject.members.length >= 1) &&
                    <View style={styles.memberContainer}>
                        {newProject.members.map((member, index) =>
                            <View key={index} style={styles.newMember}>
                                <TouchableOpacity onPress={() => deleteMember(index)}>
                                    <Ionicons name="close-circle" size={24} color="black" />
                                </TouchableOpacity>
                                <Text style={{ marginLeft: 8 }}>{member}</Text>
                            </View>
                        )}
                    </View>
                }
                <TouchableOpacity style={styles.button} onPress={() => createProject()}>
                    <Text>
                        Create project
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 16
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 2,
        width: '90%',
        padding: 12,
        marginVertical: 8
    },
    button: {
        backgroundColor: '#7F81BE',
        width: '90%',
        padding: 12,
        borderWidth: 2,
        borderColor: '#D6E04C',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
    },
    memberInputContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    addBtn: {
        marginLeft: -40,
        width: 40
    },
    newMember: {
        display: 'flex',
        flexDirection: 'row',
        width: '90%',
        alignItems: 'center',
        backgroundColor: '#d3d3d3',
        borderRadius: 50,
        paddingHorizontal: 6,
        paddingVertical: 3,
        marginBottom: 4
    },
    memberContainer: {
        width: '90%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: 16
    }
})