import { createNativeStackNavigator, createBottomTabNavigator } from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react'
import { useAuth } from '../contexts/AuthContext'
import EditProfile from '../screens/EditProfile';
import ProfileVisit from '../screens/ProfileVisit'
import Profile from '../screens/Profile';
import Register from '../screens/Register';
import Login from '../screens/Login';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { Icon } from 'react-native-elements';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Home from '../screens/Home';


const StackScreens = ({stack, tab}) => {
    const {currentUser} = useAuth();
    const ICON_SIZE = 30;
    const TAB_NAV_SCREEN_OPTIONS = {
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: '#F580F8',
        tabBarInactiveTintColor: '#000000',
        tabBarHideOnKeyboard: true
    };
    return (
        <>
            {currentUser ? (
            <>
            <tab.Navigator tabBarOptions={{ showLabel: false }} screenOptions={TAB_NAV_SCREEN_OPTIONS}>
                <tab.Screen name="Home" component={Home} options={{tabBarIcon: ({color}) => (<Icon name="home" color={color} size={ICON_SIZE} />)}} />
                <tab.Screen name="Search" component={EditProfile} options={{tabBarIcon: ({color}) => (<Icon name="search" color={color} size={ICON_SIZE} />)}} />
                <tab.Screen name="Upload" component={Profile} options={{tabBarIcon: ({color}) => (<AntDesign name="plus" color={color} size={ICON_SIZE} />)}} />
                <tab.Screen name="Direct" component={Profile} options={{tabBarIcon: ({color}) => (<Icon name="send" color={color} size={ICON_SIZE} />)}} />
                <tab.Screen name="Profile" component={Profile} options={{tabBarIcon: ({color}) => (<AntDesign name="user" color={color} size={ICON_SIZE} />)}}/>
                <tab.Screen name="EditProfile" component={EditProfile} options={{tabBarButton: () => null}}/>
            </tab.Navigator>
            </>
            )
             : (
             <stack.Navigator screenOptions={{headerShown: false}}>
                <stack.Screen name="Registration" component={Register}/>
                <stack.Screen name="Login" component={Login} />
             </stack.Navigator>
             )}
        </>
    )
}

const styles = StyleSheet.create({
    tabBarStyle: {
        borderRadius: 20,
        width: '90%',
        alignSelf: 'center',
        position: 'absolute',
        left:'5%',
        bottom: 2,
        backgroundColor: '#E5E5E5',
        shadowColor: "#000000",
        shadowOffset: {
        width: 0,
        height: 0,
        },
        shadowOpacity:  0,
        shadowRadius: 0,
        elevation: 0,
        }
});

export default StackScreens