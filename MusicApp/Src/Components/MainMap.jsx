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
import { SocketContext } from '../Functions/socket';

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
    const [songId, setSongId] = React.useState("not listening");
    const [newLongitude, setNewLongitude] = React.useState([]);
    const [newLatitude, setNewLatitude] = React.useState([]);
    const [associatedId, setAssociatedId] = React.useState([]);

    const socket = React.useContext(SocketContext);

    const getUser = async (id) => {
      await axios.post("http://localhost:3001/api/v1/login", {"id": `${id}`})
          .then ( res => {
              return res
          })
          .catch(function (err) {
              console.log(err)
          }) 
      };

    React.useEffect(() => {
      socket.on("newJoin", (data) => {
        console.log("There is a new join: " + data)
        const newUser = getUser(data);
      });
      socket.on("welcome", (data) => {
        socket.emit("joinID", global.id)
      })
    }, []);

    const getUsername = async (token) => {
      await axios.get("https://api.spotify.com/v1/me", {headers: {'Authorization': `Bearer ${token}`}})
          .then ( res => {
              //console.log(res.data.images[0].url)
              //console.log(res)
              global.spotifyUsername = res.data.display_name
              //setProfile(res.data.images[2].url)
          })
          .catch(function (err) {
              console.log("Old Token Probably ", err)
          }) 
      };

    const getCurrPlaying = async (token) => {
      await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {headers: {'Authorization': `Bearer ${token}`}})
          .then ( res => {
            setProfile(res.data.item.album.images[0].url)
            setPlay((res.data.item.name).substring(0, 15))
            setSongId(res.data.item.id)
          })
          .catch(function (err) {
            console.log(err)
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
                    //error here
                    await axios.post("http://192.168.2.82:3001/api/v1/insertPerson", {'id': `${global.id}`, 'username': `${global.spotifyUsername}`, 'song_id': `${songId}`})
                    .then ( res => {
                        console.log("SENT")
                    })
                    .catch(function (err) {
                      console.log("ERROR")
                    }) 
                } catch (e) {
                  console.log(e)
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
                <Logout />
                <Logout />
            </MapView>
            <AuthLogin />
        </>
    )
};

export default MainMap;