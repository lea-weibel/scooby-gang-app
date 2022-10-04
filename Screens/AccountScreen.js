import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; 


export default function AccountScreen() {
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.tinyLogo}
                source={{uri: require('@expo/snack-static/react-native-logo.png')}}
            /> */}
            <Ionicons name="person-circle" size={240} color="gray" />
            <Text>Velma Dinkley</Text>
            <Text>velma.dinkley@scooby-gang.com</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex', 
        alignItems: 'center', 
    }
})