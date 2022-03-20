import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import React from 'react'
import { storage } from '../firebase/config'
import { useUsers } from './firestoreHooks'
const useAvatars = () => {
    const {updateUserAvatar} = useUsers();
  const uploadAvatar = async(username,fileUri) => {
    let uniqueHash = uid();
    let storageRef = ref(storage, 'avatars/' + uniqueHash);
    let img = await fetch(fileUri);
    let imgblob = await img.blob();
    await uploadBytes(storageRef, imgblob);
    let downloadUrl = await getDownloadURL(storageRef);
    await updateUserAvatar(username, downloadUrl);
  }

  const uid = () => {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
         + Math.random().toString(16).slice(2)
         + Date.now().toString(16).slice(4);
  };

  return {uploadAvatar}
}

export {useAvatars}