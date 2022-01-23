import { Text, Pressable, View, StyleSheet } from 'react-native';
import Button from './Button';
import axios from 'axios';
import InputField from './InputField';

const styles = StyleSheet.create({
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
});

const handleLogin = async () => {
    const response = await axios.get("http://localhost:3001/")
    console.log(response.data.data);
};

const Login = (props) => {
    return (
        <>
            <Text style={styles.titleText}>Connecitfy</Text>
            <InputField placeholder="Username"/>
            <InputField placeholder="Password"/>
            <Button text="Log In" pressFunc={handleLogin}></Button>
            <Button text="Sign Up"></Button>
        </>
    )  
};

export default Login;