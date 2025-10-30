import { initializeApp, getApp, getApps } from 'https://esm.sh/firebase@10.12.2/app';
import { getAuth } from 'https://esm.sh/firebase@10.12.2/auth';
import { getFirestore } from 'https://esm.sh/firebase@10.12.2/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCykfIGom6dd80T4JgDynZaXbsO2iYzCw",
  authDomain: "hanuz-marriage.firebaseapp.com",
  projectId: "hanuz-marriage",
  storageBucket: "hanuz-marriage.firebasestorage.app",
  messagingSenderId: "226067109424",
  appId: "1:226067109424:web:cb0cebef4a17a22b27bff5",
  measurementId: "G-KT40XFN51H"
};

// 어떤 상황에서도 Firebase 앱이 단 한 번만 초기화되도록 보장하는 코드
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);
