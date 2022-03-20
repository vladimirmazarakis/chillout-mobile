import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, RefreshControl, Alert, Pressable } from 'react-native';
import { container } from '../shared/Styles';
import { Icon } from 'react-native-elements';
import {BasicButtonGradient} from '../shared/Inputs'
import { useUsers } from '../hooks/firestoreHooks';
import FollowCountText from '../comps/FollowCountText';

const Profile = ({navigation,route}) => {
    const { currentUser, currentUserInfo, updateCurrentUserInfo } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const {getUserByUsername} = useUsers();
    if(!currentUser){
        navigation.navigate('Registration');
    }

    const onSettingsPress = () => {
        navigation.navigate('EditProfile');
    };

    const navigateToOtherProfile = () => {
        navigation.navigate('ProfileVisit', {username: 'Test'});
    }

    return (
        <SafeAreaView style={container}>
            <ScrollView style={userInfo.main}>
                <View style={userInfo.top}>
                    <View style={userInfo.topMiddle}>
                        <Pressable onPress={onSettingsPress}><Icon name="settings"/></Pressable>
                        <Text style={userInfo.topMiddleUsernameText} adjustsFontSizeToFit={true}>{currentUserInfo.username}</Text>
                        {currentUserInfo.isVerified && <Icon style={userInfo.verifiedIcon} name="verified" color="#F580F8"/>}
                    </View>
                </View>
                <View style={userInfo.middle}>
                    <View style={userInfo.middleLeft}>
                        <Text style={userInfo.text}>Followers</Text>
                        <FollowCountText count={currentUserInfo.followersCount} style={userInfo.text}/>
                    </View>
                    <View style={userInfo.middleMiddle}>
                        {currentUserInfo.avatar && <Image style={userInfo.middleMiddleImage} source={{uri: currentUserInfo.avatar}}/>}
                    </View>
                    <View style={userInfo.middleRight}>
                        <Text style={userInfo.text}>Following</Text>
                        <FollowCountText count={currentUserInfo.followingCount} style={userInfo.text}/>
                    </View>
                </View>
                <View style={userInfo.preBottom}>
                    <View style={userInfo.preBottomLeft}>
                        <Icon name="account-circle"/>
                    </View>
                    <View style={userInfo.preBottomMiddle}>
                        <View style={userInfo.preBottomMiddleWrapper}>
                            <Text style={userInfo.displayName}>{currentUserInfo.displayName}</Text>
                        </View>
                    </View>
                    <View style={userInfo.preBottomRight}>
                        <Icon name="music-note"/>
                    </View>
                </View>
                <View style={userInfo.bottom}>
                </View>
                {/* <View style={{ width: '100%',backgroundColor: "red" }}>
                    <Text>Test</Text>
                </View> */}
            </ScrollView>
        </SafeAreaView>
    )
}

const userInfo = StyleSheet.create({
    text:{
        textAlign: 'center',
        fontFamily: 'Rubik'
    },
    displayName:{
        fontSize: 15,
        fontFamily: 'Rubik',
        textAlign: 'center'
    },
    main: {
        flex: 4,
    },
    top:{
        display: 'flex',
        marginTop: 30,
    },
    topMiddle:{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    verifiedIcon: {
        shadowColor: "#F580F8",
        shadowOffset: {
        width: 0,
        height: 18,
        },
        shadowOpacity:  0.25,
        shadowRadius: 20.00,
        elevation: 24
    },
    topMiddleUsernameText:{
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: 'Rubik'
    },
    middle:{
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    middleLeft:{
        marginHorizontal: 20
    },
    middleMiddle:{
        backgroundColor: 'black',
        width: 100,
        height: 100,
        marginHorizontal: 20,
        borderRadius: 20,
        textAlign: 'center'
    },
    middleMiddleImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
    },
    middleRight:{
        marginHorizontal: 20,
        textAlign: 'center'
    },
    preBottom:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    preBottomLeft:{
        alignSelf: 'center'
    },
    preBottomMiddle:{
        marginHorizontal: 10
    },
    preBottomMiddleWrapper:{
        width: 200,
    },
    preBottomRight:{
        alignSelf: 'center'
    },
    bottom:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    bottomMiddle:{

    }   
});

export default Profile