import firebase from 'firebase/app'
import 'firebase/auth';
import 'firebase/database'


const firebaseConfig = {
    apiKey: "AIzaSyDnEnJUsyUfkRNdkjBEEP3TKoAIW6tTGX4",
    authDomain: "letmeask-1ee68.firebaseapp.com",
    databaseURL: "https://letmeask-1ee68-default-rtdb.firebaseio.com",
    projectId: "letmeask-1ee68",
    storageBucket: "letmeask-1ee68.appspot.com",
    messagingSenderId: "343940786635",
    appId: "1:343940786635:web:ea1588c395e6a3b3c06e4e"
  };

  firebase.initializeApp(firebaseConfig)


  export const auth = firebase.auth()

  export const database = firebase.database()