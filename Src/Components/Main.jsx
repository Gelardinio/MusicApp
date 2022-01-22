import { Text, StyleSheet, View } from 'react-native';
import Login from './Login';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});

const Main = () => {
    return (
        <View style={styles.container}>
            <Login />
        </View>
    )
};

export default Main;