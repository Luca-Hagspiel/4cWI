import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfigOld = {
    apiKey: "AIzaSyBc2INCI-l7hhoJC9qX9ImUrns5JjopzjM",
    authDomain: "chatapp-ea5bd.firebaseapp.com",
    projectId: "chatapp-ea5bd",
    storageBucket: "chatapp-ea5bd.firebasestorage.app",
    messagingSenderId: "787377370254",
    appId: "1:787377370254:web:374fe8405eba89a85c85df"
};

const appOld =
    getApps().length > 0
        ? getApp()
        : initializeApp(firebaseConfigOld);

export const auth = getAuth(appOld);
export const db = getFirestore(appOld);
