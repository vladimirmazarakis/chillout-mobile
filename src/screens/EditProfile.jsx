import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, View, ActivityIndicator, Pressable, Text } from 'react-native'
import { useAuth } from '../contexts/AuthContext'
import { container } from '../shared/Styles'
import * as ImagePicker from 'expo-image-picker';
import {useAvatars} from '../hooks/storageHooks';
import { Icon } from 'react-native-elements';
import { BlurView } from 'expo-blur';
import Hr from '../comps/Hr';
import { BasicButtonGradient, BasicTextInput } from '../shared/Inputs';
import { useUsers } from '../hooks/firestoreHooks';
import useValidations from '../shared/Validations'
import { Loading } from '../comps/Loading';

const EditProfile = ({navigation}) => {
  const {currentUserInfo, currentUser, updateCurrentUserInfo} = useAuth();
  const [loading, setLoading] = useState(true);
  const {uploadAvatar} = useAvatars();
  const {updateUserUsername, updateUserDisplayName} = useUsers();
  const [username, setUsername] = useState(currentUserInfo.username);
  const [displayName, setDisplayName] = useState(currentUserInfo.displayName);
  const [error, setError] = useState('');
  const {validateUsername} = useValidations();

  useEffect(() => {
    if(currentUserInfo){
      setLoading(false);
    }
  }, [currentUserInfo]);

  const handleImageUpload = async() => {
    setLoading(true);
    let options = {
      mediaType: 'photo',
      selectionLimit: 1
    };
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1,1],
      quality: 1
    });
    console.log(result);
    if(!result.cancelled){
      await uploadAvatar(currentUserInfo.username,result.uri);
      updateCurrentUserInfo();
      setLoading(false);
    }
    setLoading(false);
  };

  const handleProfileInfoSave = async() => {
    setLoading(true);
    if(!username && !displayName){
      setLoading(false);
      return;
    } 
    if(username === currentUserInfo.username && displayName === currentUserInfo.displayName){
      setLoading(false);
      return;
    }
    if(username && displayName){
      if(username !== currentUserInfo.username){
        var usernameCorrect = await validateUsername(username);
        if(usernameCorrect){
          let res = await updateUserUsername(currentUserInfo.username, username);
        } 
        else{
          setError('Username not valid.');
          setLoading(false);
          return; 
        }
      }
      if(displayName !== currentUserInfo.displayName){
        await updateUserDisplayName(currentUserInfo.username, displayName);
      }
    }
    setLoading(false);
    updateCurrentUserInfo();
    navigation.navigate('Profile');
  };

  return (
    <>
      {loading ? 
      <Loading /> :
      (
      <SafeAreaView style={container}>
        <ScrollView>
          <View style={styles.profileAvatarView}>
            <View style={styles.profileAvatarImageView}>
              <Image style={styles.profileAvatarImage} source={{uri: currentUserInfo.avatar}}/>
              <Pressable style={styles.profileAvatarEditImage} onPress={handleImageUpload}>
                <BlurView tint="light" intensity={5} style={{width: 100, height: 100, position: 'absolute', borderRadius: 20}}/>
                <Icon style={styles.profileAvatarEditImageText} color="white" name="edit"/>
              </Pressable>
            </View>
            <View style={styles.profileInfoView}>
              <BasicTextInput plHolder="Username" setState={setUsername} valueState={username} autoCorrect={false} />
                <View style={{textAlign: 'left', width: '75%'}}>
                </View>
              <BasicTextInput plHolder="Display Name" setState={setDisplayName} valueState={displayName} autoCorrect={false} />
              <BasicButtonGradient title="Save" width={100} onPress={handleProfileInfoSave}/>
            </View>
            <Hr />
          </View>
        </ScrollView>
      </SafeAreaView>
    )}
    </>
    
    
  )
}

const styles = StyleSheet.create({
  profileAvatarView:{
    width: '100%',
    marginTop: 40,
    position: 'relative',
  },
  profileAvatarImageView:{
    alignSelf: 'center',
    backgroundColor: 'black',
    borderRadius: 20,
  },  
  profileAvatarImage:{
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 20,
    overlayColor: '#FFFFFF',
    zIndex: 0
  },
  profileAvatarEditImage:{
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 100,
    height: 100,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileInfoView:{
    flexDirection: 'column',
    alignItems: 'center'
  }
});

export default EditProfile