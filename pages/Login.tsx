import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/admin');
        } catch (err: any) {
            if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
                setError('이메일 또는 비밀번호가 잘못되었습니다.');
            } else {
                setError('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center">
            <div className="max-w-md w-full mx-auto">
                <a href="/" className="block text-center text-3xl font-bold text-slate-800 mb-8">
                    한우즈 국제결혼
                </a>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">관리자 로그인</h2>
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="email">
                                이메일
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500"
                                id="email"
                                type="email"
                                placeholder="admin@example.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                aria-label="Email"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="password">
                                비밀번호
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500"
                                id="password"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                aria-label="Password"
                            />
                        </div>
                        {error && <p className="bg-red-100 text-red-700 text-sm p-3 rounded mb-4 text-center">{error}</p>}
                        <div className="flex items-center justify-between">
                            <button
                                className={`w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? '로그인 중...' : '로그인'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
