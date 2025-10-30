import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Admin from './pages/Admin';
import ProtectedRoute from './components/ProtectedRoute';
import Apply from './pages/Apply';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/apply" element={<Apply />} />
            <Route 
                path="/admin" 
                element={
                    <ProtectedRoute>
                        <Admin />
                    </ProtectedRoute>
                } 
            />
        </Routes>
    );
};

export default App;