import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { Checkbox } from 'react-native-paper';
import { useState } from "react";
import CreateProjectScreen from "./CreateProject";
import { useNavigation } from "@react-navigation/native";

export default function AllProjectsScreen() {
    const [managedByMeFilter, setManagedByMeFilter] = useState(false);
    const [hideDoneFilter, setHideDoneFilter] = useState(false);
    const navigation = useNavigation();

    return (
        <View>
            <View style={styles.headerContainer}>
                <View style={styles.filterContainer}>
                    <Text>Managed by me</Text>
                    <View style={(!managedByMeFilter) && styles.checkbox}>
                        <Checkbox color="red"
                            status={managedByMeFilter ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setManagedByMeFilter(!managedByMeFilter);
                            }}
                        />
                    </View>
                </View>
                <View style={styles.filterContainer}>
                    <Text>Hide done</Text>
                    <View style={(!hideDoneFilter) && styles.checkbox}>
                        <Checkbox color="red"
                            status={hideDoneFilter ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setHideDoneFilter(!hideDoneFilter);
                            }}
                        />
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={() => navigation.navigate('CreateProject')}>
                <View>
                    <Ionicons name="add-circle" size={28} color="black" />
                </View>
            </TouchableOpacity>
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
        justifyContent: 'space-between',
        height: 68
    },
    iconsContainer: {
        width: '30%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    filterContainer: {
        width: '40%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        backgroundColor: 'lightgray',
        width: 24,
        height: 24,
        borderRadius: 50,
        marginLeft: 8
    }
})