import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Constants from "expo-constants";


const firebaseConfig = {
    apiKey: "AIzaSyCwkUdre5KXWrtrjUcY41T4sjwaZYHBwH4",
    authDomain: "chatapp-69eea.firebaseapp.com",
    projectId: "chatapp-69eea",
    storageBucket: "chatapp-69eea.appspot.com",
    messagingSenderId: "774024278623",
    appId: "1:774024278623:web:5a9e20cb49f1173a93a1ea",
    measurementId: "G-W66KP11WQ8"
};

const app = initializeApp(firebaseConfig);
export const database = initializeFirestore(app, {experimentalAutoDetectLongPolling: true});
export const auth = getAuth(app);
