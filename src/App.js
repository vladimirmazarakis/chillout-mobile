import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Register from './screens/Register';
import Login from './screens/Login';
import { useFonts } from 'expo-font';
import AuthProvider from './contexts/AuthContext';

export default function App() {
  const [loaded] = useFonts({
    Rubik: require('./assets/fonts/Rubik.ttf'),
  })

  const Stack = createNativeStackNavigator();
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Registration" component={Register}/>
          <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}