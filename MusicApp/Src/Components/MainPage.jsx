import React from "react";
import MapView, { Marker, Callout } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import Logout from './Logout';
import * as Location from 'expo-location';
import MainMap from "./MainMap";


const MainPage = () => {

    return (
        <>
          <MainMap />
        </>
    )
};

export default MainPage;