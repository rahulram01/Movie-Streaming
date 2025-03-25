// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeFIOL89CU-qo_YSuHpfHynYQvAD95Nx8",
  authDomain: "nova-f5dc2.firebaseapp.com",
  projectId: "nova-f5dc2",
  storageBucket: "nova-f5dc2.appspot.com",
  messagingSenderId: "918095165409",
  appId: "1:918095165409:web:6a347812a7ccfa7d13c4a0",
  measurementId: "G-5VXXDBKJE7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Pass app to getAuth
const provider = new GoogleAuthProvider();

export { app, auth, provider };
