import { View, Text, StyleSheet, Image } from "react-native";
import { UseAppContext } from "../contexts/UsersContext";

export default function AccountScreen() {
    const { loggedUser, setLoggedUser } = UseAppContext();

    return (
        <View style={styles.container}>
            <Image
                style={styles.avatar}
                source={{uri: loggedUser.avatar}}
            />
            <Text style={{marginBottom: 16}}>{loggedUser.firstname} {loggedUser.lastname}</Text>
            <Text>{loggedUser.email}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        marginTop: '20%'
    },
    avatar: {
        width: 200,
        height: 200,
        borderRadius: 200,
        marginBottom: '10%'
    }
})