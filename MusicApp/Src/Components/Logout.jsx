import { StyleSheet } from 'react-native';
import React from "react";
import Button from './Button';
import * as SecureStore from 'expo-secure-store';
import { useNavigate } from "react-router-native";

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
});


const Logout = (props) => {

    const navigate = useNavigate();

    const handleLogout = async () => {
        const res = await SecureStore.deleteItemAsync("bearer")
        navigate('/');
    };

    return (
        <>
            <Button text="Logout" pressFunc={() => handleLogout()}></Button>
        </>
    )  

};

export default Logout;