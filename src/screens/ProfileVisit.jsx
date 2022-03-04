import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, RefreshControl, Alert, ActivityIndicator } from 'react-native';
import { container } from '../shared/Styles';
import { Icon } from 'react-native-elements';
import {BasicButtonGradient} from '../shared/Inputs'
import { useUsers } from '../hooks/firestoreHooks';
import FollowCountText from '../comps/FollowCountText';

const ProfileVisit = ({route}) => {
    // imports
    const {currentUser, currentUserInfo} = useAuth();
    const [refreshing, setRefreshing] = useState(false);
    const navigation = useNavigation();
    const {getUserByUsername, getUserByEmail, followUser, unfollowUser, isFollowingUser} = useUsers();
    // custom states
    const [user, setUser] = useState(null);
    const [following, setFollowing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [followLoading, setFollowLoading] = useState(true);
    const [followButtonText, setFollowButtonText] = useState('Follow');

    if(!currentUser){
        navigation.navigate('Registration');
    }

    const onRefresh = () => {
        setRefreshing(true);
        getUser();
        setRefreshing(false);
    };

    const getUser = () => {
        getUserByUsername(route.params.username).then((doc) => {
            setUser(doc);
        });
    }

    const onFollowPress = async() => {
        setFollowLoading(true);
        setFollowButtonText('Unfollow');
        setFollowing(true);
        await followUser(currentUserInfo.username, user.username);
    };

    const onUnfollowPress = async() => {
        setFollowLoading(true);
        setFollowButtonText('Follow');
        setFollowing(false);
        await unfollowUser(currentUserInfo.username, user.username);
    };

    useEffect(() => {
        const check = async() => {
            let tmp = await isFollowingUser(currentUserInfo.username, user.username);
            if(following === tmp){
                setFollowLoading(false);
            }
        };
        check();
    }, [following]);

    useEffect(() => {
        const setFollowingHandler = async() => {
            const result = await isFollowingUser(currentUserInfo.username, user.username);
            setFollowing(result);
            setFollowLoading(false);
            setFollowButtonText(result ? 'Unfollow' : 'Follow');
        };
        if(user && loading){
            setLoading(false);
            setFollowingHandler();
        }
    }, [user]);

    if(!route.params?.username){
        navigation.navigate('Profile');
        return (
            <Text>Loading...</Text>
        )
    }
    else{
        getUser();
        if(loading){
            return <></>
        }
        else{
            return (
                <SafeAreaView style={container}>
                    <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />} style={userInfo.main}>
                        <View style={userInfo.top}>
                            <View style={userInfo.topMiddle}>
                                <Text style={userInfo.topMiddleUsernameText} adjustsFontSizeToFit={true}>{user.username}</Text>
                            </View>
                            <View style={userInfo.topRight}>

                            </View>
                        </View>
                        <View style={userInfo.middle}>
                            <View style={userInfo.middleLeft}>
                                <Text style={userInfo.text}>Followers{"\n"}</Text>
                                <FollowCountText count={user.followersCount} style={userInfo.text}/>
                            </View>
                            <View style={userInfo.middleMiddle}>
                                {user.avatar && <Image style={userInfo.middleMiddleImage} source={{uri: user.avatar}}/>}
                            </View>
                            <View style={userInfo.middleRight}>
                                <Text style={userInfo.text}>Following{"\n"}</Text>
                                <FollowCountText count={user.followingCount} style={userInfo.text}/>
                            </View>
                        </View>
                        <View style={userInfo.preBottom}>
                            <View style={userInfo.preBottomLeft}>
                                <Icon name="account-circle"/>
                            </View>
                            <View style={userInfo.preBottomMiddle}>
                                <View style={userInfo.preBottomMiddleWrapper}>
                                    <Text style={userInfo.displayName}>{user.displayName}</Text>
                                </View>
                            </View>
                            <View style={userInfo.preBottomRight}>
                                <Icon name="music-note"/>
                            </View>
                        </View>
                        <View style={userInfo.bottom}>
                            <View style={userInfo.middle}>
                                <BasicButtonGradient disabled={followLoading} width={100} title={followButtonText} onPress={following ? onUnfollowPress : onFollowPress}/>
                            </View>
                        </View>
                        {/* <View style={{ width: '100%',backgroundColor: "red" }}>
                            <Text>Test</Text>
                        </View> */}
                    </ScrollView>
                </SafeAreaView>
            )
        }
    }
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

export default ProfileVisit