/* eslint-disable */
// Firebase
import Firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyDHRi9CfrPeGOUOleV787rUbI-lYI5qOb0",
    authDomain: "vuesualize-5ec29.firebaseapp.com",
    databaseURL: "https://vuesualize-5ec29.firebaseio.com",
    projectId: "vuesualize-5ec29",
    storageBucket: "vuesualize-5ec29.appspot.com",
    messagingSenderId: "716786171870"
};

const firebaseApp = Firebase.initializeApp(firebaseConfig);

export const db = firebaseApp.database();

export const auth = firebaseApp.auth();
export const storageRef = firebaseApp.storage().ref();
export const imagesRef = storageRef.child('images');
