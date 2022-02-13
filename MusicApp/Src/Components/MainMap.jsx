import React from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Logout from './Logout';
import * as Location from 'expo-location';
import MapMarker from "./MapMarker";
import global from '../../global'

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

const MainMap = () => {
    const [location, setLocation] = React.useState(null);
    const [errorMsg, setErrorMsg] = React.useState(null);
    const [longitude, setLongitude] = React.useState(0);
    const [latitude, setLatitude] = React.useState(0);

    React.useEffect(() => {
      (async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permission to access location was denied');
          return;
        }
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
        if (location) {
          setLatitude(location.coords.latitude)
          setLongitude(location.coords.longitude)
        }
      })();
    }, []);

    return (
        <>
            <MapView style={styles.map}>
                <MapMarker longitude={longitude} latitude={latitude} username={global.username} imPath={require('../../assets/icon.png')}></MapMarker>
                
            </MapView>
            <Logout />
        </>
    )
};

export default MainMap;