// Firebase
import Firebase from 'firebase';

const firebaseApp = Firebase.initializeApp({
    apiKey: "AIzaSyDHRi9CfrPeGOUOleV787rUbI-lYI5qOb0",
    authDomain: "vuesualize-5ec29.firebaseapp.com",
    databaseURL: "https://vuesualize-5ec29.firebaseio.com",
    projectId: "vuesualize-5ec29",
    storageBucket: "vuesualize-5ec29.appspot.com",
    messagingSenderId: "716786171870"
});

export const db = firebaseApp.database();
export const storageRef = firebaseApp.storage().ref();
export const imagesRef = storageRef.child('images');