import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, doc, deleteDoc, Timestamp } from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import { db, auth } from '../firebaseConfig';

interface Application {
    id: string;
    name: string;
    birthDate: string;
    contact: string;
    address: string;
    residenceType: string;
    jobAndIncome: string;
    email: string;
    maritalHistory: string;
    maritalHistoryOther?: string;
    hasChildren: string;
    heightWeight: string;
    drinkingSmoking: string[];
    motivation?: string;
    preferredPartner: string;
    questions?: string;
    consultationMethod: string;
    consultationTime: string;
    createdAt: Timestamp;
}

const Admin: React.FC = () => {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedApp, setSelectedApp] = useState<Application | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const q = query(collection(db, 'applications'), orderBy('createdAt', 'desc'));
                const querySnapshot = await getDocs(q);
                const appsData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as Application));
                setApplications(appsData);
            } catch (err) {
                setError('신청서 목록을 불러오는 데 실패했습니다.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchApplications();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (err) {
            alert('로그아웃 중 오류가 발생했습니다.');
        }
    };
    
    const handleDelete = async (id: string) => {
        if (window.confirm('정말로 이 신청서를 삭제하시겠습니까?')) {
            try {
                await deleteDoc(doc(db, 'applications', id));
                setApplications(applications.filter(app => app.id !== id));
                if (selectedApp?.id === id) {
                    setSelectedApp(null);
                }
                alert('삭제되었습니다.');
            } catch (err) {
                alert('삭제 중 오류가 발생했습니다.');
                console.error(err);
            }
        }
    };

    const ApplicationDetailsModal: React.FC<{ app: Application, onClose: () => void }> = ({ app, onClose }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
            <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl md:text-2xl font-bold text-slate-800">상담 신청서 상세 정보</h2>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-3xl">&times;</button>
                </div>
                <div className="space-y-3 text-slate-700">
                    <p><strong>신청일:</strong> {app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</p>
                    <p><strong>성함:</strong> {app.name}</p>
                    <p><strong>생년월일:</strong> {app.birthDate}</p>
                    <p><strong>연락처:</strong> {app.contact}</p>
                    <p><strong>이메일:</strong> {app.email}</p>
                    <p><strong>거주지역:</strong> {app.address}</p>
                    <p><strong>거주형태:</strong> {app.residenceType}</p>
                    <p><strong>직업/소득:</strong> {app.jobAndIncome}</p>
                    <p><strong>결혼경력:</strong> {app.maritalHistory}{app.maritalHistoryOther ? ` (${app.maritalHistoryOther})` : ''}</p>
                    <p><strong>자녀 유무:</strong> {app.hasChildren}</p>
                    <p><strong>신장/체중:</strong> {app.heightWeight}</p>
                    <p><strong>음주/흡연:</strong> {app.drinkingSmoking.join(', ')}</p>
                    <p><strong>지원 동기:</strong> {app.motivation || 'N/A'}</p>
                    <p><strong>원하는 여성상:</strong> {app.preferredPartner}</p>
                    <p><strong>궁금한 점:</strong> {app.questions || 'N/A'}</p>
                    <p><strong>상담 방식:</strong> {app.consultationMethod}</p>
                    <p><strong>상담 시간:</strong> {app.consultationTime}</p>
                </div>
                <div className="mt-6 flex justify-end space-x-3">
                    <button onClick={onClose} className="bg-slate-500 text-white font-bold py-2 px-4 rounded hover:bg-slate-600">닫기</button>
                    <button onClick={() => handleDelete(app.id)} className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-600">삭제</button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-rose-500"></div>
            </div>
        );
    }

    if (error) {
        return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-red-500">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-slate-100">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-slate-800">한우즈 관리자 페이지</h1>
                    <button
                        onClick={handleLogout}
                        className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded transition-colors"
                    >
                        로그아웃
                    </button>
                </div>
            </header>

            <main className="container mx-auto p-6">
                <h2 className="text-xl font-semibold text-slate-700 mb-4">상담 신청 목록 ({applications.length}건)</h2>
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full table-auto">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">신청일</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">이름</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">연락처</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">상담시간</th>
                                    <th className="px-4 py-3 text-center text-xs font-medium text-slate-500 uppercase tracking-wider">관리</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-slate-200">
                                {applications.length > 0 ? (
                                    applications.map(app => (
                                        <tr key={app.id} className="hover:bg-slate-50">
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{app.createdAt ? new Date(app.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{app.name}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{app.contact}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600">{app.consultationTime}</td>
                                            <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium">
                                                <button onClick={() => setSelectedApp(app)} className="text-indigo-600 hover:text-indigo-900 mr-3">상세보기</button>
                                                {/* <button onClick={() => handleDelete(app.id)} className="text-red-600 hover:text-red-900">삭제</button> */}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="text-center py-10 text-slate-500">
                                            접수된 신청서가 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
            {selectedApp && <ApplicationDetailsModal app={selectedApp} onClose={() => setSelectedApp(null)} />}
        </div>
    );
};

export default Admin;
