import React from "react";
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Logout from './Logout';
import * as Location from 'expo-location';

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
                <MapView.Marker
                    coordinate={{latitude: latitude,
                    longitude: longitude}}
                    title={"title"}
                    description={"description"}
                />
            </MapView>
            <Logout />
        </>
    )
};

export default MainPage;