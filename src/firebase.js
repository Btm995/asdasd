// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAXGqcta7kvPCGu6flB_1Fk5At4geYKs8",
  authDomain: "project-a99db.firebaseapp.com",
  projectId: "project-a99db",
  storageBucket: "project-a99db.appspot.com",
  messagingSenderId: "223070287652",
  appId: "1:223070287652:web:5dd917bd62e6036afa65b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore()