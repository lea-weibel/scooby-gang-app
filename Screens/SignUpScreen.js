import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";
import { Text, TextInput, StyleSheet, TouchableOpacity, View, Image, Dimensions } from "react-native";

export default function SignUpScreen() {
    const [newUser, setNewUser] = useState({ firstname: '', lastname: '', email: '', password: '', avatar: '' })
    const navigation = useNavigation();

    const confirmPassword = (string) => {
        if (string === newUser.password) console.log('password okay');
        else console.log('Both passwords must be identical');
    }

    const createUser = async () => {
        console.log('user', newUser);
        try {
            await axios
                .post('http://192.168.0.26:80/users', { ...newUser })
                .then((result) => (result.status === 201) && navigation.navigate('Login'))
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Join the Gang !</Text>
            <Image
                style={styles.image}
                source={require('../assets/signup.png')}
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setNewUser({ ...newUser, firstname: e })}
                autoCapitalize={true}
                placeholder="Firstname"
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setNewUser({ ...newUser, lastname: e })}
                autoCapitalize={true}
                placeholder="Lastname"
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setNewUser({ ...newUser, email: e })}
                autoCapitalize={false}
                placeholder="Email"
                keyboardType="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setNewUser({ ...newUser, password: e })}
                autoCapitalize={false}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => confirmPassword(e)}
                autoCapitalize={false}
                placeholder="Confirm Password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setNewUser({ ...newUser, avatar: e })}
                autoCapitalize={false}
                placeholder="Avatar"
            />
            <TouchableOpacity style={styles.button} onPress={() => createUser()}>
                <Text>
                    Create account
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: '10%'
    },
    title: {
        fontSize: 20,
        fontWeight: '800',
        marginBottom: 16
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
        borderColor: '#000',
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        marginTop: 32
    },
    image: {
        width: Dimensions.get('window').width - 50,
        height: 160,
        resizeMode: 'contain',
        borderBottomColor: 'black',
        borderBottomWidth: 2,
        marginBottom: 32
    }
})