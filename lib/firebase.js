import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd1wNjcsiAn61fl1fth58s65BvLGbW_Mc",
  authDomain: "voctus-7a7d6.firebaseapp.com",
  projectId: "voctus-7a7d6",
  storageBucket: "voctus-7a7d6.appspot.com",
  messagingSenderId: "795213579543",
  appId: "1:795213579543:web:42e396d36daaade664a352"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

// Auth
export const auth = getAuth(firebase)
export const googleProvider = new GoogleAuthProvider()

// firestore
export const firestore = getFirestore(firebase);