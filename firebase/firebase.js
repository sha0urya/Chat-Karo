import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArAJDhHeB_Fwg-p6SMIl8zA7Mn3D1BNN0",
  authDomain: "chat-karo-5a521.firebaseapp.com",
  projectId: "chat-karo-5a521",
  storageBucket: "chat-karo-5a521.appspot.com",
  messagingSenderId: "795312260629",
  appId: "1:795312260629:web:cff737cc9e5b305a61b01c"
};

const app = initializeApp(firebaseConfig); 
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
