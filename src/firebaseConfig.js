import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC9ZF9VeIWZniRkI4AWMA1-FAw7dyw8lis",
  authDomain: "desenvolvimento-web-41c98.firebaseapp.com",
  projectId: "desenvolvimento-web-41c98",
  storageBucket: "desenvolvimento-web-41c98.appspot.com",
  messagingSenderId: "872908849640",
  appId: "1:872908849640:web:470a72f6d3a8b935a5e45d",
  measurementId: "G-0C23D75DME"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
