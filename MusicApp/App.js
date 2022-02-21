import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Src/Components/Main';
import { NativeRouter, Switch, Route, Routes} from 'react-router-native';
import { io } from "socket.io-client";

export default function App() {

  const socket = io.connect("http://localhost:3001");

  socket.on("newJoin", (data) => {
    console.log(data.id)
  })

  socket.on("welcome", (data) => {
    console.log(data);
  })

  //socket.on("newJoin")

  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
