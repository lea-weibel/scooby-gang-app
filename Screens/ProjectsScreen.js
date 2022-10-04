import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateProjectScreen from './CreateProject';
import AllProjectsScreen from "./AllProjectsScreen";
import ProjectDetailsScreen from './ProjectDetailsScreen';

const Stack = createNativeStackNavigator();

export default function ProjectsScreen() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="AllProjects" options={{ headerTitle: 'All My Projects' }} component={AllProjectsScreen} />
            <Stack.Screen name="CreateProject" options={{ headerTitle: 'Project Creation' }} component={CreateProjectScreen} />
            <Stack.Screen name="ProjectDetails" options={{ headerTitle: 'Project Details' }} component={ProjectDetailsScreen} />
        </Stack.Navigator>
    )
}