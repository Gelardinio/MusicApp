import { Text, Pressable, View, StyleSheet, TextInput } from 'react-native';
import React from "react";
import Button from './Button';
import axios from 'axios';
import InputField from './InputField';
import * as SecureStore from 'expo-secure-store';
import { useNavigate } from "react-router-native";


const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
});


const Login = (props) => {
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const navigate = useNavigate();

    const determinePage = async () => {
        const navigate = useNavigate();
        const res = await SecureStore.getItemAsync("bearer")
        if (res) {
            navigate('/mainPage');
        }
    }

    determinePage();

    async function saveJWT(key, value) {
        await SecureStore.setItemAsync(key, value);
    }

    const handleLogin = async (username, password) => {
        await axios.post("http://localhost:3001/api/v1/login", {"username": `${username}`,"password": `${password}`})
            .then ( res => {
                saveJWT("bearer", res.data)
                    .catch(function (err) {
                        console.log(err)
                    })
                navigate('/mainPage');
            })
            .catch(function (err) {
                console.log(err)
            }) 
    };

    const redirSign = () => {
        navigate('/signUp');
    }

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
            <Button text="Sign Up" pressFunc={() => redirSign()}></Button>
        </>
    )  
};

export default Login;