import {Text, View, StyleSheet} from "react-native";

export default function ProjectCard({name, owner, dueDate, status}) {
    return (
        <View style={styles.container}>
            <Text>{name || 'Project Name'}</Text>
            <Text>{owner || 'Project Owner'}</Text>
            <Text>{dueDate || 'Project Due Date'}</Text>
            <Text>{status || 'Project Status'}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      width: '90%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 16
    },
  });