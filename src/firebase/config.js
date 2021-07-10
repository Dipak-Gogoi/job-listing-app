import app from 'firebase/app';
import 'firebase/firestore';


// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyBriT3noZfvkbpLgfY3IV5agf4I_hTN-sE",
    authDomain: "jod-listing-app.firebaseapp.com",
    projectId: "jod-listing-app",
    storageBucket: "jod-listing-app.appspot.com",
    messagingSenderId: "48575751278",
    appId: "1:48575751278:web:8594e1ac0270dd651ff27f"
};
// Initialize Firebase
const firebase = app.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

export {firebase, firestore, app};
