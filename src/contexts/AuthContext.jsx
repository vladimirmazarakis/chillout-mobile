import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, createUserWithEmailAndPassword, signInWithEmailAndPassword, AuthCredential, getAdditionalUserInfo } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import * as Google from 'expo-auth-session/providers/google';
import { Alert } from 'react-native';
import { useUsers } from '../hooks/firestoreHooks';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('');
    const [currentUserInfo, setCurrentUserInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const { addUser, getUserByEmail } = useUsers();

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: '640438306486-9ok645jo2egatt78r3j471hl5j8g4ptv.apps.googleusercontent.com'
    });

    const signInUserWithCredential = async() =>{
        await promptAsync();
    };

    useEffect(() => {
        const handler = async() => {
            if(response?.type === 'success'){
                const { id_token } = response.params;
                const cred = GoogleAuthProvider.credential(id_token);
                const userCred = await signInWithCredential(auth, cred);
                const additionalUserInfo = getAdditionalUserInfo(userCred);
                if(additionalUserInfo.isNewUser){
                    await addUser(userCred.user.email, userCred.user.email);
                }
            }
        }
        handler();
    }, [response]);


    const signUpUserWithEmailAndPassword = async(email, password) => {
        await createUserWithEmailAndPassword(auth, email, password);
        const doc = await addUser(username, email);
    }

    const signInUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            getUserInfo(user);
            setLoading(false);
        });
        const getUserInfo = async(user) => {
            const userInfo = await getUserByEmail(user.email);
            setCurrentUserInfo(userInfo);
        };
        return unsub;
    }, []);  
    
    const updateCurrentUserInfo = async() => {
        const userInfo = await getUserByEmail(currentUserInfo.email);
        setCurrentUserInfo(userInfo);
    };

    const value = {
        currentUser,
        currentUserInfo,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword,
        signInUserWithCredential,
        updateCurrentUserInfo
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider