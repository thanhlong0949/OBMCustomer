// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getStorage} from "firebase/storage";
import {getAuth} from "@firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDuy-Rh6czNs1Jm4LGfFUAdHvB-AIncyng",
  authDomain: "storage-4255a.firebaseapp.com",
  projectId: "storage-4255a",
  storageBucket: "storage-4255a.appspot.com",
  messagingSenderId: "76967828674",
  appId: "1:76967828674:web:8949168713af2353262f5b",
  measurementId: "G-C4CVCPRJQ8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);
const authFirebase = getAuth();

export {authFirebase};
