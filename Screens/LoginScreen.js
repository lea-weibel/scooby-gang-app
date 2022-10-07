import { useNavigation } from "@react-navigation/native";
import { useContext, useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, StyleSheet, View } from "react-native";
import axios from "axios";
import { UseAppContext } from "../contexts/UsersContext";

export default function LoginScreen() {
    const [user, setUser] = useState({ email: '', password: '' })
    const navigation = useNavigation();
    //const { loggedUser, setLoggedUser } = useContext(UserContext)
    const { loggedUser, setLoggedUser } = UseAppContext();

    const checkUser = async () => {
        console.log('user', user);
        try {
            await axios
                .get(`http://192.168.0.26:80/users/${user.email}`, { ...user })
                .then((result) => {
                    if (result.status === 200) {
                        const user = result.data.data[0];
                        setLoggedUser({ firstname: user.firstname, lastname: user.lastname, email: user.email, avatar: user.avatar });
                        navigation.navigate('DashboardConnect');
                    }
                })
                // .post(`http://192.168.0.26:80/login`, { ...user })
                // .then((result) => {
                //     if (result.status === 200) {
                //         const user = result.data.data[0];
                //         setLoggedUser({ firstname: user.firstname, lastname: user.lastname, email: user.email, avatar: user.avatar });
                //         navigation.navigate('DashboardConnect');
                //     }
                // })
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log('logged user login', loggedUser);
    }, [loggedUser])

    return (
        <View style={styles.container}>
            <Text>Login</Text>
            <TextInput
                style={styles.input}
                onChangeText={(e) => setUser({ ...user, email: e })}
                autoCapitalize={false}
                placeholder="Email"
                keyboardType="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={(e) => setUser({ ...user, password: e })}
                autoCapitalize={false}
                placeholder="Password"
                secureTextEntry={true}
            />
            <TouchableOpacity style={styles.button} onPress={() => checkUser()}>
                <Text>
                    Login
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text>Not part of the gang yet ?    Sign up !</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: '10%'
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
})