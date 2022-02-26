import { Link, useNavigation } from '@react-navigation/native';
import React, { useRef, useState } from 'react';
import {Text, View, StyleSheet, Image, Alert, ActivityIndicator} from 'react-native';
import {BasicButtonGradient, BasicTextInput, BasicButton} from '../shared/Inputs';
import { container } from '../shared/Styles';
import {validateEmail, validatePass} from '../shared/Validations';
import { useAuth } from '../contexts/AuthContext';
import { useUsers } from '../hooks/firestoreHooks';

const Register = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [loading, setLoading] = useState(false);
  const {currentUser, signUpUserWithEmailAndPassword} = useAuth();
  const { userExists, addUser } = useUsers();

  const handleSignUp = async () => {
    if(pass != confPass){
      Alert.alert("Error", "Passwords do not match!", [{text: "OK"}]);
      return;
    }
    if(!validateEmail(email)){
      Alert.alert("Error", "Email is not valid.", [{text: "OK"}]);
      return;
    }
    if(!validatePass(pass)){
      Alert.alert("Error", "Password should contain at least one of these:\n1. Uppercase letter\n2. Lowercase letter\n3. Number\n4. Special Character", [{text: "OK"}]);
      return;
    }
    
    try{
      if(await userExists(username)){
        Alert.alert("Error", `Username already taken.`, [{text: "OK"}]);
        return;
      }
      setLoading(true);
      await signUpUserWithEmailAndPassword(email, pass);
      const doc = await addUser(username, email);
      setEmail('');
      setPass('');
      setConfPass('');
      setUsername('');
    }catch(err){
      Alert.alert("Error", `Could not register your account. Email/Username already taken or try again later. ${err}`, [{text: "OK"}]);
    }finally{
      setLoading(false);
    }
    
  };

  return (
    <View style={container}>
    <Image source={require('../assets/ChillOut_Logo.png')} style={{width: 200, height:75, resizeMode:'cover'}}/>
    <BasicTextInput plHolder='Username' setState={setUsername} value={username} multiline={false}/>
    <BasicTextInput plHolder='Email' setState={setEmail} value={email} autoComplete="email" multiline={false}/>
    <BasicTextInput plHolder='Password' isPassword={true} setState={setPass} value={pass} autoComplete="password" type="password" multiline={false}/>
    <BasicTextInput plHolder='Confirm Password' isPassword={true} setState={setConfPass} value={confPass} autoComplete="password" type="password" multiline={false}/>
    <ActivityIndicator animating={true} size="large" style={{display: loading ? 'flex' : 'none'}} color="#CFFFD3" />
    <BasicButtonGradient width={250} onPress={handleSignUp}  title="Sign Up"/>
    <BasicButton width={250} bgColor={'white'} title="Sign Up With Google"/>
    <Text>Already have an account? </Text><Link to={{screen: 'Login'}} style={{color: '#8AB4F8'}}>Sign In</Link>
    </View>
  )
} 
export default Register