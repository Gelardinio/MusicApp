import { Text, StyleSheet, TextInput } from 'react-native';

const styles = StyleSheet.create({
    inputStyle: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 6, 
        height: 50,
        width: 300,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        margin: 5,
    },
});

const InputField = (props) => {
    return (
        <TextInput 
            {...props}
            style={styles.inputStyle} 
            placeholder={props.placeholder} 
        />
    )
};

export default InputField