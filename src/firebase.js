import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAASiUhv59_0ftV8ogpKmJz6uSKIsbc_co",
  authDomain: "maternity-app-2ddc2.firebaseapp.com",
  projectId: "maternity-app-2ddc2",
  storageBucket: "maternity-app-2ddc2.appspot.com",
  messagingSenderId: "898910550009",
  appId: "1:898910550009:web:xxxxxxxxxx",
  measurementId: "G-85E7BYSM2K",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
