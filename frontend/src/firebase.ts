import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyABt2ciPTX-Y5g17YjncNGplm0HyrP79zk",
  authDomain: "dreamscribe-f956b.firebaseapp.com",
  projectId: "dreamscribe-f956b",
  storageBucket: "dreamscribe-f956b.firebasestorage.app",
  messagingSenderId: "352512026954",
  appId: "1:352512026954:web:03dfc08712b5ccc33a79b3",
  measurementId: "G-XWYND0L1XV"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();