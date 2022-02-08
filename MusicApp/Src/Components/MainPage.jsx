import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Logout from './Logout';

const onSubmit = (values) => {
    console.log(values);
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
});

const MainPage = () => {
    return (
        <>
            <MapView style={styles.map} />
            <Logout />
        </>
    )
};

export default MainPage;