import { collection, query, onSnapshot, addDoc, where, getDocs, getDoc, setDoc, doc, FieldValue, updateDoc, increment, Timestamp, serverTimestamp, deleteDoc } from "firebase/firestore"
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
        const docRef = await addDoc(collectionRef, { username: username, email: email, followersCount: 0, followingCount: 0, avatar: 'https://d1nhio0ox7pgb.cloudfront.net/_img/o_collection_png/green_dark_grey/512x512/plain/user.png' });
        return docRef;
    };
    const userExists = async(username) => {
        const q = query(collection(firestore, 'users'), where("username", "==", username));
        const doc = await getDocs(q);
        return !doc.empty;
    };   
    const getUserByUsername = async(username) => {
        const q = query(collection(firestore, 'users'), where("username", "==", username));
        const doc = await getDocs(q);
        if(doc.empty){
            return;
        }
        return doc.docs[0].data();
    }
    const getUserByEmail = async(email) => {
        const q = query(collection(firestore, 'users'), where("email", "==", email));
        const doc = await getDocs(q);
        if(doc.empty){
            return;
        }
        return doc.docs[0].data();
    };
    const emailTaken = async(email) => {
        const q = query(collection(firestore, 'users'), where("email", "==", email));
        const doc = await getDocs(q);
        return !doc.empty;
    };
    /**
     * Follows a user.
     * @param {*} followerUsername 
     * @param {*} userUsername 
     * @returns Error or Ok.
     */
    const followUser = async(followerUsername, userUsername) => {
        const followerQuery = query(collection(firestore, 'users'), where("username", "==", followerUsername));
        const userQuery = query(collection(firestore, 'users'), where("username", "==", userUsername));
        const followerDocs = await getDocs(followerQuery);
        const userDocs = await getDocs(userQuery);
        if(followerDocs.empty || userDocs.empty){
            return 'Error : One of the users was not found.';
        }
        const fDocSnap = followerDocs.docs[0];
        const uDocSnap = userDocs.docs[0];
        const fDocRef = doc(firestore, `users/${fDocSnap.id}/following`, uDocSnap.id);
        const uDocRef = doc(firestore, `users/${uDocSnap.id}/followers`, fDocSnap.id);
        try{
            setDoc(fDocRef, { followTime: serverTimestamp() });
            setDoc(uDocRef, { followTime: serverTimestamp() });
            updateDoc(fDocSnap.ref,
            {
                followingCount: increment(1)
            });
            updateDoc(uDocSnap.ref, 
            {
                followersCount: increment(1)
            });
        }catch(error){
            return `Error : ${error}`
        }
        return 'Ok';
    }
    /**
     * Unfollows a user from another.
     * @param {*} followerUsername 
     * @param {*} userUsername 
     * @returns Error or Ok.
     */
    const unfollowUser = async(followerUsername, userUsername) => {
        const followerQuery = query(collection(firestore, 'users'), where("username", "==", followerUsername));
        const userQuery = query(collection(firestore, 'users'), where("username", "==", userUsername));
        const followerDocs = await getDocs(followerQuery);
        const userDocs = await getDocs(userQuery);
        if(followerDocs.empty || userDocs.empty){
            return 'Error : One of the users was not found.';
        }
        const fDocSnap = followerDocs.docs[0];
        const uDocSnap = userDocs.docs[0];
        const fDocRef = doc(firestore, `users/${fDocSnap.id}/following/${uDocSnap.id}`);
        const uDocRef = doc(firestore, `users/${uDocSnap.id}/followers/${fDocSnap.id}`);
        try {
            deleteDoc(fDocRef);
            deleteDoc(uDocRef);
            updateDoc(fDocSnap.ref, 
            {
                followingCount: increment(-1)
            });
            updateDoc(uDocSnap.ref, 
            {
                followersCount: increment(-1)
            });
        } catch (error) { 
            return `Error : ${error}`;
        }
        return 'Ok';
    }
    /**
     * 
     * @param {*} following 
     * @param {*} user 
     * @returns Returns true if the following (string: username) follows the user (string: username)
     */
    const isFollowingUser = async(following, user) => {
        const userQuery = query(collection(firestore, 'users'), where("username", "==", user));
        const followingQuery = query(collection(firestore, 'users'), where("username", "==", following));
        const userDocSnap = (await getDocs(userQuery)).docs[0];
        const followingDocSnap = (await getDocs(followingQuery)).docs[0];
        const followDocRef = doc(firestore, `users/${userDocSnap.id}/followers/${followingDocSnap.id}`);
        const document = await getDoc(followDocRef);
        return document.exists();
    }
    
    /**
     * Updates user's avatar.
     * @param {*} User to change avatar. 
     * @param {*} Avatar Url.
     */
    const updateUserAvatar = async(user, avatarURL) => {
        const userQuery = query(collection(firestore, 'users'), where("username", "==", user));
        const userDocSnap = (await getDocs(userQuery)).docs[0];
        await updateDoc(userDocSnap.ref, {
            avatar: avatarURL
        });
    };

    const updateUserUsername = async(currentUsername, newUsername) => {
        // check if username already taken.
        let exists = await userExists(newUsername);
        if(exists){
            return "Username already taken!";
        }
        const userQuery = query(collection(firestore, 'users'), where("username", '==', currentUsername));
        const userDocSnap = (await getDocs(userQuery)).docs[0];
        await updateDoc(userDocSnap.ref, {
            username: newUsername
        });
        return 'Ok';
    };

    const updateUserDisplayName = async(username, newDisplayName) => {
        const userQuery = query(collection(firestore, 'users'), where("username", '==', username));
        const userDocSnap = (await getDocs(userQuery)).docs[0];
        await updateDoc(userDocSnap.ref, {
            displayName: newDisplayName
        });
    };

    return { getUsers, addUser, userExists, getUserByEmail, getUserByUsername, followUser, unfollowUser, isFollowingUser, updateUserAvatar, updateUserUsername, updateUserDisplayName }
}
export { useUsers }