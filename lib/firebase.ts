
import { initializeApp } from "https://esm.sh/firebase@10.12.2/app";
import { getAuth } from "https://esm.sh/firebase@10.12.2/auth";

// IMPORTANT: Replace the following with your app's Firebase project configuration.
// See the instructions provided on how to obtain this from the Firebase console.
const firebaseConfig = {
  apiKey: "AIzaSyCCykfIGom6dd80T4JgDynZaXbsO2iYzCw",
  authDomain: "hanuz-marriage.firebaseapp.com",
  projectId: "hanuz-marriage",
  storageBucket: "hanuz-marriage.firebasestorage.app",
  messagingSenderId: "226067109424",
  appId: "1:226067109424:web:cb0cebef4a17a22b27bff5",
  measurementId: "G-KT40XFN51H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);