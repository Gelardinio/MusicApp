import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Src/Components/Main';
import { NativeRouter, Switch, Route, Routes} from 'react-router-native';
import io from "socket.io-client";

export default function App() {

  /*io.on('connection', function(socket){
    socket.emit("con", "bruh");
  })*/

  const socket = io();
  
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
