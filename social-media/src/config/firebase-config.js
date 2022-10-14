// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,

} from "firebase/auth";

import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAsI5j2r2BveVvRujQGD1ie9YGKnXLoGL8",
//   authDomain: "techx-a7238.firebaseapp.com",
//   projectId: "techx-a7238",
//   storageBucket: "techx-a7238.appspot.com",
//   messagingSenderId: "561410825063",
//   appId: "1:561410825063:web:c3ee1d01a3c8dfd37c2dc2",
//   measurementId: "G-V4ZXXR5H36"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app)
// export const auth= getAuth(app)
// // export const storage= app.storage()
// console.log(db)

const firebaseConfig = {
  apiKey: "AIzaSyAnYha1sCm0LSUtUtN4jK_VpwZ1MdFrhEg",
  authDomain: "techx-e7500.firebaseapp.com",
  projectId: "techx-e7500",
  storageBucket: "techx-e7500.appspot.com",
  messagingSenderId: "480045903025",
  appId: "1:480045903025:web:0627b98b5fbabc31f88690",
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
export const messaging = getMessaging(app);

// console.log("messaging", messaging)



// export const auth1 = getAuth();
// export const logout =()=>{
// app.auth().signOut()
// alert('log out')
// }



