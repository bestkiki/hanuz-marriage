// 1. 필요한 기능(auth, firestore) 모듈을 가장 먼저 import하여
//    초기화 시점에 해당 기능들이 반드시 준비되도록 합니다.
import 'https://esm.sh/firebase@10.12.2/auth';
import 'https://esm.sh/firebase@10.12.2/firestore';

// 2. 그 다음, 초기화에 필요한 함수들을 import 합니다.
import { initializeApp } from 'https://esm.sh/firebase@10.12.2/app';
import { getAuth } from 'https://esm.sh/firebase@10.12.2/auth';
import { getFirestore } from 'https://esm.sh/firebase@10.12.2/firestore';

// =================================================================================
// 본인 프로젝트의 Firebase 설정이 여기에 있는지 다시 한번 확인해주세요.
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

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// 초기화된 앱에서 각 서비스를 내보냅니다.
export const auth = getAuth(app);
export const db = getFirestore(app);