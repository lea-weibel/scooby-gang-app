import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, TouchableOpacity, View } from "react-native";
import { statusChecker } from "./StatusChecker";

export default function ProjectCard({ ...props }) {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('ProjectDetails', props)}>
            <Text style={styles.name}>{props.name || 'Project Name'}</Text>
            <Text style={{ paddingVertical: 2 }}>Owner: {props.owner || 'Project Owner'}</Text>
            <Text style={{ paddingVertical: 2 }}>Due date: {props.dueDate || 'Project Due Date'}</Text>
            <View style={styles.status}>{statusChecker(props.status)}</View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        backgroundColor: '#fff',
        marginBottom: 16,
        padding: 16
    },
    name: {
        fontWeight: '700',
        marginBottom: 8,
        fontSize: 20
    },
    status: {
        alignItems: 'flex-end',
        marginTop: 2
    }
});