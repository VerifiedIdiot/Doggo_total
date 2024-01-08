import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCR--TeYaJOmtaEniFlUD-ZjtpSrO3mPjs",
  authDomain: "dogcat-42fca.firebaseapp.com",
  projectId: "dogcat-42fca",
  storageBucket: "dogcat-42fca.appspot.com",
  messagingSenderId: "1067430149053",
  appId: "1:1067430149053:web:e0d5ddb8365236133db0d4",
  measurementId: "G-G3WWZEVXSK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
