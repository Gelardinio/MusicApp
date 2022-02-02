import { Text, StyleSheet, View } from 'react-native';
import Login from './Login';
import SignUp from './Signup';
import { NativeRouter, Switch, Route, Routes } from 'react-router-native';

import MainPage from './MainPage';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const Main = () => {

    return (
        <View style={styles.container}>
            <Routes>
                <Route path="/" element={<Login/>} exact />
                <Route path="/mainPage" element={<MainPage />} exact />
                <Route path="/signUp" element={<SignUp />} exact />
            </Routes>
        </View>
    )
};

export default Main;