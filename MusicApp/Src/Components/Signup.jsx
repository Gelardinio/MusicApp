import { Text, Pressable, View, StyleSheet, TextInput, Picker } from 'react-native';
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

const SignUp = (props) => {
    const [firstName, onChangeFName] = React.useState("");
    const [lastName, onChangeLName] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [cPassword, onCChangePassword] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [selectedValue, setSelectedValue] = React.useState("");

    return (
        <>
            <Text style={styles.titleText}>Sign Up</Text>
            <InputField placeholder="First Name" value={firstName} onChangeText={firstName => onChangeFName(firstName)} />
            <InputField placeholder="Last Name" value={lastName} onChangeText={lastName => onChangeLName(lastName)} />
            <InputField placeholder="Username" value={username} onChangeText={username => onChangeUsername(username)} />
            <InputField placeholder="Password" value={password} onChangeText={password => onChangePassword(password)} secureTextEntry={true}/>
            <InputField placeholder="Confirm Password" value={cPassword} onChangeText={cPassword => onCChangePassword(cPassword)} secureTextEntry={true}/>
            <InputField placeholder="Email" value={email} onChangeText={email => onChangeEmail(email)} />
            <Picker selectedValue={selectedValue} style={{ height: 50, width: 150 }} onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}>
                <Picker.Item label="" value="" />
                <Picker.Item label="" value="" />
            </Picker>
        </>
    ) 

}

export default SignUp