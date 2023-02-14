import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDTQGTzfzAy8yOLwsF-qSf5uMSQY4qLCDE",
  authDomain: "notekeeper-53820.firebaseapp.com",
  projectId: "notekeeper-53820",
  storageBucket: "notekeeper-53820.appspot.com",
  messagingSenderId: "849702261683",
  appId: "1:849702261683:web:9cac344fd382a258c1b1c6",
  databaseURL:
    "https://notekeeper-53820-default-rtdb.asia-southeast1.firebasedatabase.app",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
