// 1. Firebase 모듈을 가장 먼저 import하여 확실하게 초기화합니다.
// 이 코드는 Firebase 기능들이 다른 코드보다 먼저 준비되도록 보장합니다.
import 'https://esm.sh/firebase@10.12.2/app';
import 'https://esm.sh/firebase@10.12.2/auth';
import 'https://esm.sh/firebase@10.12.2/firestore';

// 2. React 라이브러리를 import 합니다.
import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

// 3. 메인 App 컴포넌트를 import 합니다.
import App from './App.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);