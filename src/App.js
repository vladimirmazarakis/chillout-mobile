import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import AuthProvider from './contexts/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';
import StackScreens from './comps/StackScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function App() {
  WebBrowser.maybeCompleteAuthSession();
  const [loaded] = useFonts({
    'Rubik': require('./assets/fonts/Rubik.ttf'),
  })

  LogBox.ignoreLogs(['Setting a timer']);
  LogBox.ignoreLogs(['Async storage']);

  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
          <StackScreens stack={Stack} tab={Tab}/>
      </NavigationContainer>
    </AuthProvider>
  );
}