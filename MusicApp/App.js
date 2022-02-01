import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Main from './Src/Components/Main';
import { NativeRouter, Switch, Route, Routes} from 'react-router-native';

export default function App() {
  return (
    <NativeRouter>
      <Main />
    </NativeRouter>
  );
}
