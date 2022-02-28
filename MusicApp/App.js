import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Src/Components/Main';
import { NativeRouter, Switch, Route, Routes} from 'react-router-native';
import { io } from "socket.io-client";
import {SocketContext, socket} from './Src/Functions/socket'

export default function App() {

  //const socket = io.connect("http://localhost:3001");

  //socket.on("newJoin")

  return (
    <SocketContext.Provider value={socket}>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </SocketContext.Provider>
  );
}
