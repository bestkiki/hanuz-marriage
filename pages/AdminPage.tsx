import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/config';

const AdminPage: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out: ', error);
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold text-slate-800">관리자 대시보드</h1>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 font-semibold text-white bg-rose-500 rounded-md hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
                    >
                        로그아웃
                    </button>
                </div>
            </header>
            <main className="container mx-auto px-6 py-8">
                <div className="bg-white p-8 rounded-lg shadow">
                    <h2 className="text-2xl font-bold text-slate-700">관리자님, 환영합니다!</h2>
                    <p className="mt-4 text-slate-600">이곳은 관리자 페이지입니다. 앞으로 기능이 추가될 예정입니다.</p>
                </div>
            </main>
        </div>
    );
};

export default AdminPage;
