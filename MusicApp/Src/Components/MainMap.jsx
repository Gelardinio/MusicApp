import React from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Logout from './Logout';
import * as Location from 'expo-location';
import MapMarker from "./MapMarker";
import global from '../../global'
import AuthLogin from "./AuthLogin";
import { makeRedirectUri } from 'expo-auth-session';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';


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
    const [profile, setProfile] = React.useState("//");
    const [play, setPlay] = React.useState("");

    const getUsername = async (token) => {
      await axios.get("https://api.spotify.com/v1/me", {headers: {'Authorization': `Bearer ${token}`}})
          .then ( res => {
              console.log(res.data.images[0].url)
              setProfile(res.data.images[2].url)
              global.spotifyUsername = res.data.display_name
          })
          .catch(function (err) {
              console.log("ERROR" + err)
          }) 
      };

    const getCurrPlaying = async (token) => {
      await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {headers: {'Authorization': `Bearer ${token}`}})
          .then ( res => {
            //console.log("bruh")
            setProfile(res.data.item.album.images[0].url)
            setPlay((res.data.item.name).substring(0, 15))
          })
          .catch(function (err) {

          }) 
      };

      React.useEffect(() => {
        (async () => {
          const res = await SecureStore.getItemAsync("token")
          if (res) {
              try {
                  await getUsername(res)
              } catch (e) {
                  console.log(e)
              }
          }
        })();
      }, []);

     React.useEffect(() => {
        setInterval(() => {
          (async () => {
            const res = await SecureStore.getItemAsync("token")
            if (res) {
                try {
                    await getCurrPlaying(res)
                } catch (e) {

                }
            }
          })();
        }, 1000);
      }, []);

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
                <MapMarker longitude={longitude} latitude={latitude} username={global.username} imPath={{uri: profile}} playing={play}></MapMarker>
            </MapView>
            <AuthLogin />
            <Logout />
            
        </>
    )
};

export default MainMap;