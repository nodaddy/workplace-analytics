import { initializeApp } from "firebase/app";
import { getAuth, sendSignInLinkToEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from ".";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const actionCodeSettings = {
    // URL you want to redirect back to. The domain (www.example.com) for this
    // URL must be in the authorized domains list in the Firebase Console.
    url: 'https://localhost:3000/finishSignIn',
    // This must be true.
    handleCodeInApp: true
  };

const app = initializeApp(firebaseConfig)
const auth = getAuth(app);

export const sendSignInEmail = (email) => {
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
        // The link was successfully sent. Inform the user.
        // Save the email locally so you don't need to ask the user for it again
        // if they open the link on the same device.
        window.localStorage.setItem('emailForSignIn', email);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ...
    });
}

export const EmailPasswordSignUp = (email, password, callback) => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        callback(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}

export const EmailPasswordSignIn = (email, password, callback) => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        callback(user);
        // ...
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
    });
}