import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import ProjectCard from "../components/ProjectCard";

export default function CurrentProjectsScreen() {

    const navigation = useNavigation();

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
            <View style={styles.projectCardsContainer}>
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </View>
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
    projectCardsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }
})