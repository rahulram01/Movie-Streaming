import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

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

const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();

export { auth, db };
