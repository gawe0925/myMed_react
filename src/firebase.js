// firebase.js
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCroDbwmsN1DcI6lBoNT7kJsMnAJoIo-VA",
  authDomain: "meds-acd33.firebaseapp.com",
  projectId: "meds-acd33",
  storageBucket: "meds-acd33.firebasestorage.app",
  messagingSenderId: "140840374580",
  appId: "1:140840374580:web:5535d8460a684c398a9561",
  measurementId: "G-RWDMX11PBT"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)