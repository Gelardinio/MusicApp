import { Text, Pressable, View, StyleSheet } from 'react-native';
import Button from './Button';
import axios from 'axios';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
        fontSize: 50,
        marginBottom: 18,
    },
});

const handleLogin = async () => {
    
};

const Login = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Connecitfy</Text>
            <Button text="Log In" pressFunc={handleLogin}></Button>
            <Button text="Sign Up"></Button>
        </View>
    )  
};

export default Login;