import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Apply: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        birthdate: '',
        phone: '',
        job: '',
        intro: '',
        privacy: false,
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormData(prev => ({ ...prev, [name]: checked }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.privacy) {
            setError('개인정보 처리방침에 동의해주세요.');
            return;
        }
        setError('');
        
        // 2단계에서 데이터베이스 연동 및 저장을 처리할 부분입니다.
        console.log('Form data submitted:', formData);
        
        alert('상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.');
        navigate('/');
    };

    return (
        <div className="bg-slate-50 min-h-screen">
            <header className="bg-white shadow-sm">
                 <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-slate-800">한우즈 국제결혼</Link>
                    <Link to="/" className="text-sm text-slate-600 hover:text-rose-500">&larr; 홈페이지로 돌아가기</Link>
                </div>
            </header>
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-2xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-slate-800">국제결혼 상담 신청</h1>
                        <p className="text-slate-600 mt-2">고객님의 소중한 인연을 위해, 아래 정보를 정성껏 기입해주세요.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-2">이름</label>
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition" placeholder="홍길동" />
                        </div>

                        <div>
                            <label htmlFor="birthdate" className="block text-sm font-bold text-slate-700 mb-2">생년월일</label>
                            <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition" />
                        </div>
                        
                        <div>
                            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-2">연락처</label>
                            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition" placeholder="010-1234-5678" />
                        </div>
                        
                        <div>
                            <label htmlFor="job" className="block text-sm font-bold text-slate-700 mb-2">직업</label>
                            <input type="text" id="job" name="job" value={formData.job} onChange={handleChange} required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition" placeholder="회사원" />
                        </div>

                        <div>
                            <label htmlFor="intro" className="block text-sm font-bold text-slate-700 mb-2">간단한 자기소개</label>
                            <textarea id="intro" name="intro" value={formData.intro} onChange={handleChange} rows={5} required className="w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition" placeholder="자신에 대해 간단히 소개해주세요. (예: 성격, 취미, 이상형 등)"></textarea>
                        </div>
                        
                        <div className="flex items-start">
                            <input type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleChange} className="h-4 w-4 mt-1 text-rose-600 focus:ring-rose-500 border-slate-300 rounded" />
                            <label htmlFor="privacy" className="ml-3 block text-sm text-slate-800">
                                <span className="font-medium text-rose-600 hover:underline cursor-pointer">개인정보 처리방침</span>에 동의합니다. (필수)
                            </label>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>}

                        <div>
                            <button type="submit" className="w-full bg-rose-500 text-white font-bold py-3 px-6 rounded-md hover:bg-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105" disabled={!formData.privacy}>
                                상담 신청서 제출하기
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default Apply;
