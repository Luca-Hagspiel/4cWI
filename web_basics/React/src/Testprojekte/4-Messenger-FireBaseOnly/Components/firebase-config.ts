import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfigMessenger = {
    apiKey: "AIzaSyAeXva-bA0Pczl9-ksgoUhGM1WS9DSRXUM",
    authDomain: "messengerfirebaseonly.firebaseapp.com",
    projectId: "messengerfirebaseonly",
    storageBucket: "messengerfirebaseonly.firebasestorage.app",
    messagingSenderId: "1085390641976",
    appId: "1:1085390641976:web:2f49b47d4d2aab0781ffcd"
};

const appMessenger =
    getApps().some(a => a.name === "messenger")
        ? getApp("messenger")
        : initializeApp(firebaseConfigMessenger, "messenger");

export const authMessenger = getAuth(appMessenger);
export const googleProviderMessenger = new GoogleAuthProvider();
export const db = getFirestore(appMessenger);
