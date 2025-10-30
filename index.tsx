import React from 'https://esm.sh/react@18.2.0';
import ReactDOM from 'https://esm.sh/react-dom@18.2.0/client';

// This side-effect import helps ensure Firebase components are registered.
import 'https://esm.sh/firebase@10.12.2/auth'; 
import 'https://esm.sh/firebase@10.12.2/firestore';

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
