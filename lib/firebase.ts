import { initializeApp, getApp, getApps } from 'https://esm.sh/firebase@10.12.2/app';
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword,
  type User
} from 'https://esm.sh/firebase@10.12.2/auth';
import { 
  getFirestore, 
  doc, 
  getDoc 
} from 'https://esm.sh/firebase@10.12.2/firestore';

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

// 초기화된 앱에서 각 서비스를 가져옴
const auth = getAuth(app);
const db = getFirestore(app);

// 다른 파일들이 Firebase 기능을 사용할 수 있도록 모든 것을 re-export
export { 
  auth, 
  db, 
  onAuthStateChanged, 
  signOut, 
  signInWithEmailAndPassword,
  doc,
  getDoc,
  type User
};