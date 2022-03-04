import { Link, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {Text, View, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import {BasicButtonGradient, BasicTextInput, BasicButton} from '../shared/Inputs';
import { authContainer } from '../shared/Styles';
import { useAuth } from '../contexts/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {currentUser, signInUserWithEmailAndPassword} = useAuth();
  const navigation = useNavigation();

  useEffect(() => {
    if(currentUser){
      navigation.navigate('Profile');
    }
  }, [currentUser]);

  const handleSignIn = () => {
    try{
      setLoading(true);
      signInUserWithEmailAndPassword(email, pass);
      setEmail('');
      setPass('');
    }catch(err){
      Alert.alert("Error", `Could not log in you. ${err}`, [{text: "OK"}]);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <View style={authContainer}>
    <Image source={require('../assets/ChillOut_Logo.png')} style={{width: 200, height:75, resizeMode:'cover'}}/>
    <BasicTextInput plHolder='Email' setState={setEmail} value={email} autoComplete="email" multiline={false}/>
    <BasicTextInput plHolder='Password' isPassword={true} setState={setPass} value={pass} autoComplete="password" type="password" multiline={false}/>
    <ActivityIndicator animating={true} size="large" style={{display: loading ? 'flex' : 'none'}} color="#CFFFD3" />
    <BasicButtonGradient width={250} onPress={handleSignIn}  title="Sign In"/>
    <BasicButton width={250} bgColor={'white'} title="Sign In With Google"/>
    <Text>Need an account? </Text><Link to={{screen: 'Registration'}} style={{color: '#8AB4F8'}}>Sign Up</Link>
    </View>
  )
} 
export default Login