import { Text, Pressable, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        borderRadius: 8,
        padding: 6, 
        height: 50,
        width: 100,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        margin: 5,
    },  
    buttonText: {
        color: 'white',
        fontSize: 16,
    }
});

const Button = (props) => {
    return (
        <Pressable 
        style={({pressed}) => [
            {
                backgroundColor: pressed ? 'black' : 'orange',
            },
            styles.button,
        ]}
        onPress={props.pressFunc}
        >
        <Text style={styles.buttonText}>{props.text}</Text>
        </Pressable>       
    )
};

export default Button;