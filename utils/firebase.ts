// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
// import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC2S3wMqEmNyRMxpwxb_5STyek4atBnpFk",
    authDomain: "cooker-c43ed.firebaseapp.com",
    projectId: "cooker-c43ed",
    storageBucket: "cooker-c43ed.appspot.com",
    messagingSenderId: "875657080499",
    appId: "1:875657080499:web:352f15102da829361e8ac6",
    measurementId: "G-XSBH128BYG",
};

// let firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);