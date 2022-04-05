import React, { useRef } from 'react'
import { Animated } from 'react-native'
import { View, Image, Text, Pressable, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'
import { defText } from '../shared/Styles'
import DoubleClick from 'react-native-double-tap'

const Post = ({pst, onLikePress, onImageDoubleTap, navigation, previousScreenName}) => {
    const animatedIconScale = useRef(new Animated.Value(1)).current;
    const animatedHeartScale = useRef(new Animated.Value(0)).current;

    const onPressIn = () => {
        Animated.spring(animatedIconScale, {
            toValue: 1.5,
            delay: 0,
            useNativeDriver: true
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(animatedIconScale, {
            toValue: 1,
            useNativeDriver: true
        }).start();
    };

    const onImageDoubleTapAnimation = () => {
        Animated.spring(animatedHeartScale, {
            toValue: 1,
            useNativeDriver: true
        }).start();
        setTimeout(() => {
            Animated.spring(animatedHeartScale, {
                toValue: 0,
                useNativeDriver: true
            }).start();
        }, 300);
    };

    const onCommentPress = () => {
        navigation.navigate('PostDiscussion', { postPath: pst.path, previousScreenName: previousScreenName });
    };

    const styles = StyleSheet.create({
        animatedScaleStyle: {
            transform: [{scale: animatedIconScale}]
        },
        imageHeartStyle: {
            position: 'absolute',
            zIndex: 10,
            top: 0,
            left: 0, 
            right: 0, 
            bottom: 0, 
            justifyContent: 'center', 
            alignItems: 'center',
            transform: [{scale: animatedHeartScale}]
        }
    });

    return (
        <View style={posts.post}>
            <View style={posts.postMain}>
                <DoubleClick doubleTap={() => 
                    {   
                        onImageDoubleTapAnimation()
                        onImageDoubleTap(pst)
                    }}>
                    <Animated.View style={styles.imageHeartStyle}>
                        <Icon style={{userSelect: 'none'}} size={120} name="heart" color="#F580F8" type="antdesign"/>
                    </Animated.View>
                    <Image style={posts.postMainImage} source={{uri: pst.imageUrl}}/>
                </DoubleClick>
            </View>
            <View style={posts.postMenu}>
                <View style={posts.postMenuLeft}>
                        <Pressable onPress={() => onLikePress(pst)} onPressIn={onPressIn} onPressOut={onPressOut}>
                            <Animated.View style={styles.animatedScaleStyle}>
                                <Icon style={[{userSelect: 'none'}, posts.postMenuItem]} name={pst.likes ? "heart" : "hearto"} color={pst.likes ? "#F580F8" : "#000"} type="antdesign"/>
                            </Animated.View>
                        </Pressable>
                        <Pressable onPress={onCommentPress}>
                            <Icon style={[{userSelect: 'none'},posts.postMenuItem]} name="comment-processing-outline" type="material-community"/>
                        </Pressable>
                </View>
                <View style={posts.postMenuMiddle}>
                    <Text style={[posts.postMenuMiddleDesc, defText]}>{pst.description}</Text>
                </View>
                <View style={posts.postMenuRight}>
                    <Text>Archive</Text>
                </View>
            </View>
        </View>
    )
}

const posts = StyleSheet.create({
    postText:{
        fontSize: 15,
        alignSelf: 'center'
    },
    post:{
        width: 320,
        marginTop: 10
    },
    postMain:{
        backgroundColor: '#C8C8C8',
        width: '100%',
        height: 290,
        position: 'relative',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    postMainImage:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },  
    postMenu:{
        width: '100%',
        minHeight: 50,
        backgroundColor: '#B4B4B4',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    postMenuLeft: {
        marginHorizontal: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    postMenuMiddle:{
        marginHorizontal: 10,
        flex: 2
    },
    postMenuMiddleDesc:{
        textAlign: 'center'
    },
    postMenuRight:{
        marginHorizontal: 10,
        flex: 1
    },
    postMenuItem:{
        marginHorizontal: 5,
    }
});

export default Post