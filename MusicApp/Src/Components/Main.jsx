import { Text, StyleSheet, View } from 'react-native';
import Login from './Login';
import { NativeRouter, Switch, Route, Routes } from 'react-router-native';
import * as SecureStore from 'expo-secure-store';
import { useNavigate } from "react-router-native";

import MainPage from './MainPage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const determinePage = async () => {
    const navigate = useNavigate();
    const res = await SecureStore.getItemAsync("bearer")
    //const del = await SecureStore.deleteItemAsync("bearer")
    if (!res) {
        navigate('/login');
    }
}

const Main = () => {

    determinePage();

    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/login" element={<Login/>} exact />
                <Route path="/" element={<MainPage />} exact />
            </Routes>
        </View>
    )
};

export default Main;