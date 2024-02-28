import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyBpLcuXBLg9Qn66YxhyBSKikZB8iBwwy2A",
  authDomain: "blog-website-683e3.firebaseapp.com",
  projectId: "blog-website-683e3",
  storageBucket: "blog-website-683e3.appspot.com",
  messagingSenderId: "162268482008",
  appId: "1:162268482008:web:50f332782ef491d379caad"
};

const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider()

const auth = getAuth()

export const authWithGoogle = async () => {
    let user = null

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err);
    })

    return user
}