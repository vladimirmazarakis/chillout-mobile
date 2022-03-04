import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Register from './screens/Register';
import Login from './screens/Login';
import AuthProvider from './contexts/AuthContext';
import * as WebBrowser from 'expo-web-browser';
import Profile from './screens/Profile';
import { useFonts } from 'expo-font';
import ProfileVisit from './screens/ProfileVisit'
import { LogBox } from 'react-native';

export default function App() {
  WebBrowser.maybeCompleteAuthSession();
  const [loaded] = useFonts({
    'Rubik': require('./assets/fonts/Rubik.ttf'),
  })

  LogBox.ignoreLogs(['Setting a timer']);

  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Registration" component={Register}/>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Profile" component={Profile}/>
          <Stack.Screen name="ProfileVisit" component={ProfileVisit}/>
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}