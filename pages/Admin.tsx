import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebaseConfig';
import { collection, getDocs, query, orderBy, Timestamp } from 'firebase/firestore';

interface Application {
    id: string;
    name: string;
    contact: string;
    createdAt: Timestamp;
    [key: string]: any; // Allow other properties
}

const Admin: React.FC = () => {
    const navigate = useNavigate();
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const q = query(collection(db, "applications"), orderBy("createdAt", "desc"));
                const querySnapshot = await getDocs(q);
                const appsList = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Application[];
                setApplications(appsList);
            } catch (err) {
                console.error("Error fetching documents: ", err);
                setError("신청 내역을 불러오는 중 오류가 발생했습니다.");
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            console.error('Error signing out: ', error);
        }
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-rose-500"></div>
                </div>
            );
        }

        if (error) {
            return <p className="text-center text-red-500 bg-red-100 p-4 rounded-md">{error}</p>;
        }

        if (applications.length === 0) {
            return <p className="text-center text-slate-500 py-10">아직 접수된 신청서가 없습니다.</p>;
        }

        return (
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-slate-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">신청일</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">이름</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">연락처 or 카톡ID</th>
                            <th className="py-3 px-6 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">상담 방식</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {applications.map((app) => (
                            <tr key={app.id} className="hover:bg-slate-50">
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-700">
                                    {app.createdAt ? app.createdAt.toDate().toLocaleString('ko-KR') : '날짜 없음'}
                                </td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm font-semibold text-slate-900">{app.name}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-700">{app.contact}</td>
                                <td className="py-4 px-6 whitespace-nowrap text-sm text-slate-700">{app.consultationMethod}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col">
            <header className="bg-white shadow-md sticky top-0 z-10">
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
                <div className="bg-white p-6 md:p-8 rounded-lg shadow">
                    <div className="flex justify-between items-center mb-6">
                         <h2 className="text-2xl font-semibold text-slate-700">상담 신청 내역</h2>
                         <span className="text-sm font-medium text-slate-500">총 {applications.length}건</span>
                    </div>
                   {renderContent()}
                </div>
            </main>
        </div>
    );
};

export default Admin;