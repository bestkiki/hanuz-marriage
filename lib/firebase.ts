import { initializeApp } from 'https://esm.sh/firebase@10.12.2/app';
import { getAuth } from 'https://esm.sh/firebase@10.12.2/auth';
import { getFirestore } from 'https://esm.sh/firebase@10.12.2/firestore';

// =================================================================================
// TODO: 아래 내용을 본인 프로젝트의 Firebase 설정으로 교체해주세요.
// Firebase 콘솔(https://console.firebase.google.com/)의 프로젝트 설정에서
// '웹 앱'의 firebaseConfig 객체를 복사하여 붙여넣으면 됩니다.
// =================================================================================
const firebaseConfig = {
  apiKey: "AIzaSyCCykfIGom6dd80T4JgDynZaXbsO2iYzCw",
  authDomain: "hanuz-marriage.firebaseapp.com",
  projectId: "hanuz-marriage",
  storageBucket: "hanuz-marriage.firebasestorage.app",
  messagingSenderId: "226067109424",
  appId: "1:226067109424:web:cb0cebef4a17a22b27bff5",
  measurementId: "G-KT40XFN51H"
};


// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 서비스 초기화
export const auth = getAuth(app);
export const db = getFirestore(app);
