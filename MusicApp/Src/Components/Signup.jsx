import { Text, Pressable, View, StyleSheet, TextInput, ActionSheetIOS } from 'react-native';
import React from "react";
import Button from './Button';
import axios from 'axios';
import InputField from './InputField';
import * as SecureStore from 'expo-secure-store';
import { useNavigate } from "react-router-native";
import DateTimePicker from '@react-native-community/datetimepicker';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
    signUp: {
        width: 300,
    }
});

const SignUp = (props) => {
    const [firstName, onChangeFName] = React.useState("");
    const [lastName, onChangeLName] = React.useState("");
    const [username, onChangeUsername] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    const [cPassword, onCChangePassword] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [gender, onChangeGender] = React.useState("Gender");
    const [dateOfBirth, onChangeDate] = React.useState(new Date('December 20, 1995'));
    const [country, onChangeCountry] = React.useState("Canada");

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        onChangeDate(currentDate);
    };
    

    const onPress = () =>
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ["Cancel", "Male", "Female"],
                cancelButtonIndex: 0,
                userInterfaceStyle: 'dark'
            },
            buttonIndex => {
                if (buttonIndex === 0) {
                onChangeGender("Gender");
                } else if (buttonIndex === 1) {
                onChangeGender("Male");
                } else if (buttonIndex === 2) {
                onChangeGender("Female");
                }
            }
        );

    const handleSignUp = async (username, password, firstName, lastName, email, gender, dateOfBirth, country) => {
        const payLoad = {
            "username": `${username}`,
            "password": `${password}`,
            "firstName": `${firstName}`,
            "lastName": `${lastName}`,
            "email": `${email}`,
            "gender": `${gender}`,
            "dateOfBirth": `${dateOfBirth}`,
            "country": `${country}`
        }
        await axios.post("http://localhost:3001/api/v1/signup", payLoad)
            .then ( res => {
                console.log(res.data)
                navigate('/');
            })
            .catch( (err) => {
                console.log(err)
            }) 
    };

    const validateSignUp = (username, password, cPassword, firstName, lastName, email, gender, country) => {
        let isValid = true;
        isValid &= username.length > 5;
        isValid &= password.length > 5;
        isValid &= cPassword == password;
        isValid &= firstName.length > 5;
        isValid &= lastName.length > 5;
        isValid &= email.length > 5;
        isValid &= gender != "";
        isValid &= country != "";
        return isValid;
    }

    const isValid = validateSignUp(username, password, cPassword, firstName, lastName, email, gender, country);

    return (
        <>
            <Text style={styles.titleText}>Sign Up</Text>
            <InputField placeholder="First Name" value={firstName} onChangeText={firstName => onChangeFName(firstName)} />
            <InputField placeholder="Last Name" value={lastName} onChangeText={lastName => onChangeLName(lastName)} />
            <InputField placeholder="Username" value={username} onChangeText={username => onChangeUsername(username)} />
            <InputField placeholder="Password" value={password} onChangeText={password => onChangePassword(password)} secureTextEntry={true}/>
            <InputField placeholder="Confirm Password" value={cPassword} onChangeText={cPassword => onCChangePassword(cPassword)} secureTextEntry={true}/>
            <InputField placeholder="Email" value={email} onChangeText={email => onChangeEmail(email)} />
            <Button text={gender} pressFunc={onPress} extraStyles={{width: 300}}></Button>
            <DateTimePicker testID="dateTimePicker" value={dateOfBirth} mode={'date'} display="default" style={{width:100}} onChange={onChange}/>
            {isValid && (
                <Button text="Sign Up" pressFunc={() => handleSignUp(username, password, firstName, lastName, email, gender, dateOfBirth, country)}></Button>
            )}
        </>
    ) 

}

export default SignUp