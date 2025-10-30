import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Admin: React.FC = () => {
    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800">관리자 페이지</h1>
                    <button
                        onClick={handleSignOut}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </header>
            <main className="flex-grow container mx-auto px-6 py-8">
                <div className="bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-semibold text-slate-700">환영합니다!</h2>
                    <p className="text-slate-600 mt-2">이곳에서 사이트 콘텐츠를 관리할 수 있습니다.</p>
                </div>
            </main>
        </div>
    );
};

export default Admin;
