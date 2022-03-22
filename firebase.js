import { initializeApp } from "firebase/app"; //old setup by kazi

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  collectionGroup,
  onSnapshot,
  query,
  doc,
  setDoc,
  where,
  limit,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA4pWSMivTyQOaZ2qTJwAvqo3dJx36LkiQ",
  authDomain: "instagram-clone-kazi-2-new.firebaseapp.com",
  projectId: "instagram-clone-kazi-2-new",
  storageBucket: "instagram-clone-kazi-2-new.appspot.com",
  messagingSenderId: "450697403070",
  appId: "1:450697403070:web:9784f6f6a63ac1e4259cef",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); //by firebase documents

// !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app(); //by kazi

const auth = getAuth(app);
const db = getFirestore(app);

export {
  auth,
  db,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  collection,
  addDoc,
  onAuthStateChanged,
  signOut,
  collectionGroup,
  onSnapshot,
  query,
  doc,
  setDoc,
  where,
  limit,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  arrayRemove,
  orderBy,
};
