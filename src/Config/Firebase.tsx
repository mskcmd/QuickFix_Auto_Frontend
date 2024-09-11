import { initializeApp } from "firebase/app";
import {  getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAmvmrVuGvJE82bihgrU0Ry74zogXw9gb0",
  authDomain: "quickfix-827ce.firebaseapp.com",
  projectId: "quickfix-827ce",
  storageBucket: "quickfix-827ce.appspot.com",
  messagingSenderId: "942700097936",
  appId: "1:942700097936:web:83fcb8c7ff58289e30c315",
  measurementId: "G-QRR92WPW89"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth,provider}