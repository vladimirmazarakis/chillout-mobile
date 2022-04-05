import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'
import { Icon } from 'react-native-elements';
import { Loading } from '../comps/Loading';
import { defText } from '../shared/Styles';

const PostDiscussion = ({postPath, navigation}) => {
    const [loading, setLoading] = useState(false);

    const goBack = () => {
        navigation.navigate('Profile');
    };

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.headerCloseButton}>
                    <Pressable onPress={goBack}>
                        <Icon size={40} name="close" type="evilicon"/>
                    </Pressable>
                </View>
                <View style={styles.headerDiscussion}>
                    <Text style={[styles.headerDiscussionText, defText]}>Discussion</Text>
                </View>
            </View>
            {loading ? <Loading /> : (
                <View>
                    <Text>Show posts here.</Text>
                </View>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        paddingVertical: 20,
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    header:{
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerCloseButton:{
        zIndex: 20
    },
    headerDiscussion:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        alignItems: 'center',
        justifyContent: 'center'
    },
    headerDiscussionText:{
        textAlign: 'center',
        fontSize: 20
    }
});

export default PostDiscussion