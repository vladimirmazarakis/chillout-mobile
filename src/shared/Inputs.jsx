import React from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BasicTextInput = ({plHolder, setState, valueState, isPassword, ...rest}) => {
    const basicTextInput = {
        color: 'black',
        backgroundColor: '#F2F2E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        width: 250,
        marginVertical: 3
    }
    return(
        <TextInput placeholder={plHolder} onChangeText={(text) => setState(text)} value={valueState} style={basicTextInput} placeholderTextColor='#DDDDD5' secureTextEntry={isPassword} rest/>
    )
};

BasicTextInput.defaultProps = {
    isPassword: false
}

const BasicButtonGradient = ({title,width,onPress,...rest}) => {
    const basicButtonText = {
        color: 'black',
        textAlign: 'center',
    };
    const basicButtonGradient = {
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
        alignItems: 'center',
        borderRadius: 30,
        width: width,
        cursor: 'pointer',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    };
    return(
        <TouchableOpacity onPress={onPress}>
            <LinearGradient style={basicButtonGradient} colors={['#CFFFD3', '#FEFFC3']}>
            <Text style={basicButtonText} rest>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const BasicButton = ({title, bgColor,width, onPress, ...rest}) => {
    const basicButtonText = {
        textAlign: 'center',
    }
    const basicButtonView = {
        marginVertical: 5,
        paddingHorizontal: 5,
        paddingVertical: 5,
        alignItems: 'center',
        justiftContent: 'center',
        borderRadius: 30,
        width: width,
        backgroundColor: bgColor,
        cursor: 'pointer',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
    }
    return(
        <TouchableOpacity onPress={onPress}>
            <View style={basicButtonView}>
                <Text style={basicButtonText} rest>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export {BasicTextInput, BasicButtonGradient, BasicButton}