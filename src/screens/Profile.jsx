import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, RefreshControl, Alert } from 'react-native';
import { container } from '../shared/Styles';
import { Icon } from 'react-native-elements';
import {BasicButtonGradient} from '../shared/Inputs'
import { useUsers } from '../hooks/firestoreHooks';

const Profile = ({route}) => {
    const { currentUser, currentUserInfo, updateCurrentUserInfo } = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const {getUserByUsername} = useUsers();

    if(!currentUser){
        navigation.navigate('Registration');
    }

    const onRefresh = () => {
        setRefreshing(true);
        updateCurrentUserInfo();
        setRefreshing(false);
    };

    const onFollowPress = () => {

    };

    const navigateToOtherProfile = () => {
        navigation.navigate('ProfileVisit', {username: 'Test'});
    }

    return (
        <SafeAreaView style={container}>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={userInfo.main}>
                <View style={userInfo.top}>
                    <View style={userInfo.topMiddle}>
                        <Icon name="settings"/>
                        <Text style={userInfo.topMiddleUsernameText} adjustsFontSizeToFit={true}>{currentUserInfo.username}</Text>
                        <Icon name="keyboard-arrow-down"/>
                    </View>
                    <View style={userInfo.topRight}>
                        <Icon name="notifications"/>
                    </View>
                </View>
                <View style={userInfo.middle}>
                    <View style={userInfo.middleLeft}>
                        <Text style={userInfo.text}>Followers{"\n"}{currentUserInfo.followersCount}</Text>
                    </View>
                    <View style={userInfo.middleMiddle}>
                        {currentUserInfo.avatar && <Image style={userInfo.middleMiddleImage} source={{uri: currentUserInfo.avatar}}/>}
                    </View>
                    <View style={userInfo.middleRight}>
                        <Text style={userInfo.text}>Following{"\n"}{currentUserInfo.followingCount}</Text>
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
                    <View style={userInfo.middle}>
                        <BasicButtonGradient width={200} title="Follow" onPress={onFollowPress}/>
                    </View>
                </View>
                {/* <View style={{ width: '100%',backgroundColor: "red" }}>
                    <Text>Test</Text>
                </View> */}
                <BasicButtonGradient width={200} title="Navigate" onPress={navigateToOtherProfile}/>
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
    topMiddleUsernameText:{
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: 'Rubik'
    },
    topRight:{
        position: 'absolute',
        right: 0
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