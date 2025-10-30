
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Apply: React.FC = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [inquiry, setInquiry] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log({ name, phone, inquiry });
        setLoading(false);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center text-center px-4">
                <div className="max-w-md w-full mx-auto bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-slate-700 mb-4">신청 완료!</h2>
                    <p className="text-slate-600 mb-6">상담 신청이 성공적으로 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.</p>
                    <Link to="/" className="bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-6 rounded-full transition-all">
                        홈으로 돌아가기
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
             <div className="max-w-md w-full mx-auto">
                <Link to="/" className="block text-center text-3xl font-bold text-slate-800 mb-8">
                    한우즈 국제결혼
                </Link>
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <h2 className="text-2xl font-bold text-center text-slate-700 mb-6">무료 상담 신청</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="name">
                                성함
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500"
                                id="name"
                                type="text"
                                placeholder="홍길동"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="phone">
                                연락처
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500"
                                id="phone"
                                type="tel"
                                placeholder="010-1234-5678"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor="inquiry">
                                문의 내용 (선택)
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500"
                                id="inquiry"
                                placeholder="궁금한 점이나 희망사항을 적어주세요."
                                value={inquiry}
                                onChange={(e) => setInquiry(e.target.value)}
                                rows={4}
                            />
                        </div>
                        <div className="flex items-center justify-between">
                            <button
                                className={`w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? '신청 중...' : '상담 신청하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Apply;
