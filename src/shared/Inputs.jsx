import React from 'react'
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const BasicTextInput = ({plHolder, setState, valueState, isPassword, selectionColor, ...rest}) => {
    const basicTextInput = {
        color: 'black',
        backgroundColor: '#F2F2E9',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        width: 250,
        marginVertical: 3,
        fontFamily: 'Rubik'
    }
    return(
        <TextInput placeholder={plHolder} onChangeText={(text) => setState(text)} selectionColor={selectionColor} value={valueState} style={basicTextInput} placeholderTextColor='#DDDDD5' secureTextEntry={isPassword} {...rest}/>
    )
};

BasicTextInput.defaultProps = {
    isPassword: false,
    selectionColor: '#F580F8'
}

const BasicButtonGradient = ({title,width,onPress,disabled,...rest}) => {
    const textStyle = {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Rubik'
    };
    const buttonStyle = {
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
    const disabledButtonStyle = {
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
        <TouchableOpacity disabled={disabled} onPress={onPress}>
            <LinearGradient style={disabled ? disabledButtonStyle : buttonStyle} colors={disabled ? ['#d3d3d3', '#d3d3d3'] : ['#F580F8', '#F580F8']}>
            <Text style={textStyle} {...rest}>{title}</Text>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const BasicButton = ({title, bgColor,width, onPress, ...rest}) => {
    const basicButtonText = {
        textAlign: 'center',
        fontFamily: 'Rubik'
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
                <Text style={basicButtonText} {...rest}>{title}</Text>
            </View>
        </TouchableOpacity>
    )
}

export {BasicTextInput, BasicButtonGradient, BasicButton}