import React from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Image } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 15,
      margin:15,
    },
    image: {
        width:100,
        height: 100,
    }
});

const MapMarker = (props) => {

    return (
        <>
            <Marker
                coordinate={{latitude: props.latitude,
                longitude: props.longitude}}
            > 
                <Callout>
                    <View style={styles.container}>
                        <Text>Username: {props.username}</Text>
                        <Image
                            style={styles.image}
                            source={props.imPath}
                        />
                    </View>
                </Callout>
            </Marker>
        </>
    )

}

export default MapMarker;