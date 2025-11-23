// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBc2INCI-l7hhoJC9qX9ImUrns5JjopzjM",
    authDomain: "chatapp-ea5bd.firebaseapp.com",
    projectId: "chatapp-ea5bd",
    storageBucket: "chatapp-ea5bd.firebasestorage.app",
    messagingSenderId: "787377370254",
    appId: "1:787377370254:web:374fe8405eba89a85c85df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);