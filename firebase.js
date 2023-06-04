// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC2S3wMqEmNyRMxpwxb_5STyek4atBnpFk",
  authDomain: "cooker-c43ed.firebaseapp.com",
  projectId: "cooker-c43ed",
  storageBucket: "cooker-c43ed.appspot.com",
  messagingSenderId: "875657080499",
  appId: "1:875657080499:web:352f15102da829361e8ac6",
  measurementId: "G-XSBH128BYG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

// Get a list of cities from your database
export async function getChat(database) {
  console.log(database)
  const citiesCol = collection(database, 'chat');
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map(doc => doc.data());
  return cityList;
}

export default app;

