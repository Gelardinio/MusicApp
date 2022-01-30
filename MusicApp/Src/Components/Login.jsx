import { Text, Pressable, View, StyleSheet, TextInput } from 'react-native';
import React from "react";
import Button from './Button';
import axios from 'axios';
import InputField from './InputField';
import * as SecureStore from 'expo-secure-store';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
});


const Login = (props) => {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");

    async function saveJWT(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const handleLogin = async (username, password) => {
        const response = await axios.post("http://localhost:3001/api/v1/login", {"username": `${username}`,"password": `${password}`})
        saveJWT("bearer", response.data.data);
    };

    return (
        <>
            <Text style={styles.titleText}>Connecitfy</Text>
            <InputField
                placeholder="Username"
                value={username}
                onChangeText={username => onChangeUsername(username)}
                />
            <InputField 
                placeholder="Password"
                value={password}
                onChangeText={password => onChangePassword(password)}
                secureTextEntry={true}/>
            <Button text="Log In" pressFunc={() => handleLogin(username, password)}></Button>
            <Button text="Sign Up"></Button>
        </>
    )  
};

export default Login;