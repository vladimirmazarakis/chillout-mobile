import { collection, query, onSnapshot, addDoc, where, getDocs, getDoc, setDoc, doc } from "firebase/firestore"
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { firestore } from "../firebase/config"

const useUsers = () => {
    const getUsers = async(qry) => {
        const q = query(collection(firestore, 'users'), qry);
        const users = await getDocs(q).data();
        return users;
    };

    const addUser = async(username, email) => {
        const collectionRef = collection(firestore, 'users');
        const docRef = await addDoc(collectionRef, { username: username, email: email });
        return docRef;
    };

    const userExists = async(username) => {
        const q = query(collection(firestore, 'users'), where("username", "==", username));
        const doc = await getDocs(q);
        return !doc.empty;
    };   

    const emailTaken = async(email) => {
        const q = query(collection(firestore, 'users'), where("email", "==", email));
        const doc = await getDocs(q);
        return !doc.empty;
    };

    return { getUsers, addUser, userExists }
}

export { useUsers }