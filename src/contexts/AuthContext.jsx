import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

const AuthContext = React.createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState('');
    const [loading, setLoading] = useState(true);

    const signUpUserWithEmailAndPassword = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUserWithEmailAndPassword = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsub;
    }, []);  
    
    const value = {
        currentUser,
        signUpUserWithEmailAndPassword,
        signInUserWithEmailAndPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

export default AuthProvider