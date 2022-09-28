import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from './Screens/DashboardScreen';
import ProjectsScreen from './Screens/ProjectsScreen';
import AllTasksScreen from './Screens/AllTasksScreen';
import AccountScreen from './Screens/AccountScreen';
import Ionicons from '@expo/vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName;
            if (route.name === 'Dashboard') iconName = focused ? 'home' : 'home-outline';
            else if (route.name === 'Projects') iconName = focused ? 'folder' : 'folder-outline';
            else if (route.name === 'Tasks') iconName = focused ? 'list-outline' : 'list-outline';
            else if (route.name === 'Account') iconName = focused ? 'person-circle' : 'person-circle-outline';
            return <Ionicons name={iconName} size={(iconName === 'list-outline' || iconName === 'person-circle' || iconName === 'person-circle-outline') ? 28 : 24} color={color} />
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'gray'
        })}>
        <Tab.Screen name='Dashboard' component={DashboardScreen} />
        <Tab.Screen name='Projects' options={{ headerTitle: 'All My Projects' }} component={ProjectsScreen} />
        <Tab.Screen name='Tasks' options={{ headerTitle: 'All My Tasks' }} component={AllTasksScreen} />
        <Tab.Screen name='Account' options={{ headerTitle: 'My Account' }} component={AccountScreen} />
        {/* <StatusBar style="auto" /> */}
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
