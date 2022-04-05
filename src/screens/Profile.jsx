import { CommonActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { StyleSheet, Text, View, Image, ScrollView, SafeAreaView, RefreshControl, Alert, Pressable, Animated } from 'react-native';
import { container } from '../shared/Styles';
import { Icon } from 'react-native-elements';
import {BasicButtonGradient} from '../shared/Inputs'
import { usePosts, useUsers } from '../hooks/firestoreHooks';
import FollowCountText from '../comps/FollowCountText';
import Hr from '../comps/Hr'
import {defText} from '../shared/Styles'
import { Loading } from '../comps/Loading';
import Post from '../comps/Post';

const Profile = ({navigation,route}) => {
    const { currentUser, currentUserInfo, updateCurrentUserInfo } = useAuth();
    const { getUserPosts, toggleLikeOnPost } = usePosts();
    const { getUserByUsername } = useUsers();
    const [postsLoading, setPostsLoading] = useState(true);
    const [userPosts, setUserPosts] = useState([]);
    const [forceRefresh, setForceRefresh] = useState(false);

    if(!currentUser){
        navigation.navigate('Registration');
    }

    setTimeout(() => {
        updateCurrentUserInfo();
    }, 30000);
    
    useEffect(() => {
        const getPosts = async() => {
            if(postsLoading){
                let psts = await getUserPosts(currentUserInfo.username, currentUserInfo.username);
                setUserPosts(psts);
                setPostsLoading(false);
            }
        }
        getPosts();
    }, [userPosts]);

    const onSettingsPress = () => {
        navigation.navigate('EditProfile');
    };

    const onLikePress = async(post) => {
        post.likes = !post.likes;
        toggleLikeOnPost(currentUserInfo.username, post.path);
        setForceRefresh(!forceRefresh);
    };

    const onImageDoubleTap = async(post) => {
        if(post.likes){
            return;
        }
        post.likes = true;
        toggleLikeOnPost(currentUserInfo.username, post.path);
        setForceRefresh(!forceRefresh);
    };

    return (
        <SafeAreaView style={container}>
            <ScrollView style={userInfoStyles.main} showsVerticalScrollIndicator={false}>
                <View style={userInfoStyles.top}>
                    <View style={userInfoStyles.topMiddle}>
                        <Pressable onPress={onSettingsPress}><Icon name="settings"/></Pressable>
                        <Text style={userInfoStyles.topMiddleUsernameText} adjustsFontSizeToFit={true}>{currentUserInfo.username}</Text>
                        {currentUserInfo.isVerified && <Image style={userInfoStyles.verifiedIcon} source={require('../assets/verify.png')}/>}
                    </View>
                </View>
                <View style={userInfoStyles.middle}>
                    <View style={userInfoStyles.middleLeft}>
                        <Text style={userInfoStyles.text}>Followers</Text>
                        <FollowCountText count={currentUserInfo.followersCount} style={userInfoStyles.text}/>
                    </View>
                    <View style={userInfoStyles.middleMiddle}>
                        {currentUserInfo.avatar && <Image style={userInfoStyles.middleMiddleImage} source={{uri: currentUserInfo.avatar}}/>}
                    </View>
                    <View style={userInfoStyles.middleRight}>
                        <Text style={userInfoStyles.text}>Following</Text>
                        <FollowCountText count={currentUserInfo.followingCount} style={userInfoStyles.text}/>
                    </View>
                </View>
                <View style={userInfoStyles.preBottom}>
                    <View style={userInfoStyles.preBottomLeft}>
                        <Icon name="account-circle"/>
                    </View>
                    <View style={userInfoStyles.preBottomMiddle}>
                        <View style={userInfoStyles.preBottomMiddleWrapper}>
                            <Text style={userInfoStyles.displayName}>{currentUserInfo.displayName}</Text>
                        </View>
                    </View>
                    <View style={userInfoStyles.preBottomRight}>
                        <Icon name="music-note"/>
                    </View>
                </View>
                <View style={userInfoStyles.bottom}>
                </View>
                <Hr />
                <View style={{ width: '100%', flexBasis: 1 }}>
                    {postsLoading ? <Loading /> : (
                        <>
                        <Text style={[defText, postsAdditionalStyles.postsText]}>Posts</Text>
                        <View style={postsAdditionalStyles.postsWrapper}>
                            {userPosts.map((pst) => {
                                return(
                                    <Post pst={pst} key={pst.id} onLikePress={onLikePress} onImageDoubleTap={onImageDoubleTap} navigation={navigation} previousScreenName={route.name}/>
                            )})}    
                        </View>
                        </>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const userInfoStyles = StyleSheet.create({
    text:{
        textAlign: 'center',
        fontFamily: 'Rubik'
    },
    displayName:{
        fontSize: 15,
        fontFamily: 'Rubik',
        textAlign: 'center',
    },
    main: {
        flex: 4,
    },
    top:{
        display: 'flex',
        marginTop: 10,
    },
    topMiddle:{
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'center'
    },
    verifiedIcon: {
        width: 30,
        height: 30,
    },
    topMiddleUsernameText:{
        fontSize: 20,
        marginHorizontal: 10,
        fontFamily: 'Rubik',
        
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
        textAlign: 'center',
    },
    middleMiddleImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderRadius: 20,
        overlayColor: '#FFFFFF'
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

const postsAdditionalStyles = StyleSheet.create({
    postsText: {
        alignSelf: 'center'
    },
    postsWrapper:{
        marginBottom: 30,
        marginTop: 10,
        flexDirection: 'column',
        alignItems: 'center',
    },
});

export default Profile