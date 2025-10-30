import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface FormData {
    name: string;
    birthdate: string;
    phone: string;
    region: string;
    job: string;
    email: string;
    maritalStatus: '초혼' | '재혼' | '사실혼' | '기타' | '';
    maritalStatusOther: string;
    heightWeight: string;
    drinks: boolean;
    smokes: boolean;
    noneLifestyle: boolean;
    idealPartner: string;
    questions: string;
    privacy: boolean;
}

const Apply: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        birthdate: '',
        phone: '',
        region: '',
        job: '',
        email: '',
        maritalStatus: '',
        maritalStatusOther: '',
        heightWeight: '',
        drinks: false,
        smokes: false,
        noneLifestyle: false,
        idealPartner: '',
        questions: '',
        privacy: false,
    });
    const [error, setError] = useState('');
    const [isPolicyVisible, setIsPolicyVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;

        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            
            if (name === 'noneLifestyle') {
                setFormData(prev => ({ 
                    ...prev, 
                    drinks: false,
                    smokes: false,
                    noneLifestyle: checked 
                }));
            } else if (name === 'drinks' || name === 'smokes') {
                 setFormData(prev => ({ 
                    ...prev, 
                    [name]: checked,
                    noneLifestyle: false
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: checked }));
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const requiredFields: { key: keyof FormData; label: string }[] = [
            { key: 'name', label: '성함' },
            { key: 'birthdate', label: '생년월일' },
            { key: 'phone', label: '연락처' },
            { key: 'region', label: '거주지역' },
            { key: 'job', label: '직업' },
            { key: 'email', label: '이메일' },
            { key: 'maritalStatus', label: '결혼경력' },
            { key: 'idealPartner', label: '희망하는 여성상' },
        ];
    
        for (const field of requiredFields) {
            if (!formData[field.key]) {
                setError(`'${field.label}' 항목을 입력해주세요.`);
                document.getElementsByName(field.key)[0]?.focus();
                return;
            }
        }

        if (formData.maritalStatus === '기타' && !formData.maritalStatusOther) {
            setError('결혼경력이 ‘기타’인 경우, 상세 내용을 입력해주세요.');
            document.getElementsByName('maritalStatusOther')[0]?.focus();
            return;
        }
        
        if (!formData.privacy) {
            setError('개인정보 수집 및 이용 동의에 체크해주세요.');
            document.getElementsByName('privacy')[0]?.focus();
            return;
        }

        setError('');
        
        const finalData = { ...formData };
        delete (finalData as any).noneLifestyle;
        console.log('Form data submitted:', finalData);
        
        alert('상담 신청이 접수되었습니다. 확인 후 연락드리겠습니다.');
        navigate('/');
    };
    
    const inputStyle = "w-full px-4 py-3 border border-slate-300 rounded-md focus:ring-rose-500 focus:border-rose-500 transition";

    const FormGroup: React.FC<{ label: string; required?: boolean; children: React.ReactNode }> = ({ label, required, children }) => (
        <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
                {label} {required && <span className="text-red-500">*</span>}
            </label>
            {children}
        </div>
    );

    return (
        <div className="bg-slate-50 min-h-screen">
            <header className="bg-white shadow-sm sticky top-0 z-10">
                 <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold text-slate-800">한우즈 국제결혼</Link>
                    <Link to="/" className="text-sm text-slate-600 hover:text-rose-500">&larr; 홈페이지로 돌아가기</Link>
                </div>
            </header>
            <main className="container mx-auto px-6 py-12">
                <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-lg">
                    <img src="https://lh7-rt.googleusercontent.com/formsz/AN7BsVDOegkeGIBja0i1co3LfoIAVhtjqLqQAPH_hTdSmTJqwjsnpLkywHVAw5wkYTUoQMtWXATFwnHHioNOakFirQ8fqEPcamKwx4DvrWjwsKzUdMBAZAUKNKcjFHu7_PkNZtv30DtxZSzk-iCnXDFGjt7g_mCOMNd0KhzFxmJeyV0dIhpNitaTpFFfBLiBsRpYcBciwPgEdI6Pb-U=w740?key=BM9gqd9Q3t4Tui3ITbR-MA" alt="Hanuz International Marriage Banner" className="w-full rounded-lg mb-8" />
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-bold text-slate-800">한우즈 국제결혼 상담 신청서</h1>
                        <p className="text-slate-600 mt-3">국제결혼의 희망을 전하는 호프맨이 고객님들의 소중한 만남을 위해 정성을 다하겠습니다.</p>
                        <p className="mt-4 text-sm text-red-500">* 표시는 필수 질문임</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <FormGroup label="성함" required><input type="text" name="name" value={formData.name} onChange={handleChange} required className={inputStyle} /></FormGroup>
                        <FormGroup label="생년월일" required><input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} required className={inputStyle} /></FormGroup>
                        <FormGroup label="연락처" required><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className={inputStyle} placeholder="010-1234-5678" /></FormGroup>
                        <FormGroup label="거주지역" required><input type="text" name="region" value={formData.region} onChange={handleChange} required className={inputStyle} placeholder="경기도 고양시" /></FormGroup>
                        <FormGroup label="직업" required><input type="text" name="job" value={formData.job} onChange={handleChange} required className={inputStyle} /></FormGroup>
                        <FormGroup label="이메일" required><input type="email" name="email" value={formData.email} onChange={handleChange} required className={inputStyle} placeholder="example@email.com" /></FormGroup>
                        
                        <FormGroup label="결혼경력" required>
                            <div className="space-y-2">
                                {['초혼', '재혼', '사실혼', '기타'].map(status => (
                                    <div key={status} className="flex items-center">
                                        <input type="radio" id={status} name="maritalStatus" value={status} checked={formData.maritalStatus === status} onChange={handleChange} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300" />
                                        <label htmlFor={status} className="ml-3 block text-sm text-slate-800">{status}</label>
                                    </div>
                                ))}
                                {formData.maritalStatus === '기타' && (
                                    <input type="text" name="maritalStatusOther" value={formData.maritalStatusOther} onChange={handleChange} className={`${inputStyle} mt-2`} placeholder="기타 내용을 입력하세요" />
                                )}
                            </div>
                        </FormGroup>

                        <FormGroup label="신장/체중"><input type="text" name="heightWeight" value={formData.heightWeight} onChange={handleChange} className={inputStyle} placeholder="175cm / 75kg" /></FormGroup>

                        <FormGroup label="음주/흡연">
                             <div className="space-y-2">
                                <div className="flex items-center"><input type="checkbox" id="drinks" name="drinks" checked={formData.drinks} onChange={handleChange} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded" /><label htmlFor="drinks" className="ml-3 text-sm text-slate-800">음주</label></div>
                                <div className="flex items-center"><input type="checkbox" id="smokes" name="smokes" checked={formData.smokes} onChange={handleChange} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded" /><label htmlFor="smokes" className="ml-3 text-sm text-slate-800">흡연</label></div>
                                <div className="flex items-center"><input type="checkbox" id="noneLifestyle" name="noneLifestyle" checked={formData.noneLifestyle} onChange={handleChange} className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-slate-300 rounded" /><label htmlFor="noneLifestyle" className="ml-3 text-sm text-slate-800">해당 없음</label></div>
                            </div>
                        </FormGroup>

                        <FormGroup label="희망하는 여성상" required><textarea name="idealPartner" value={formData.idealPartner} onChange={handleChange} rows={5} required className={inputStyle} placeholder="성격, 가치관, 외모 등 희망하는 여성상에 대해 자유롭게 기술해주세요."></textarea></FormGroup>
                        <FormGroup label="궁금한 점"><textarea name="questions" value={formData.questions} onChange={handleChange} rows={4} className={inputStyle} placeholder="국제결혼 절차나 비용 등 궁금한 점이 있다면 편하게 작성해주세요."></textarea></FormGroup>

                        <div className="border-t border-slate-200 pt-6">
                            <FormGroup label="개인정보 수집 및 이용 동의" required>
                                <div className="bg-slate-100 p-4 rounded-md text-sm text-slate-600">
                                    <div className="flex items-start">
                                        <input type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleChange} required className="h-4 w-4 mt-1 text-rose-600 focus:ring-rose-500 border-slate-300 rounded" />
                                        <label htmlFor="privacy" className="ml-3 block text-sm text-slate-800">
                                            개인정보 수집 및 이용에 동의합니다.
                                            <span onClick={() => setIsPolicyVisible(!isPolicyVisible)} className="ml-2 text-rose-600 hover:underline cursor-pointer text-xs">(자세히 보기)</span>
                                        </label>
                                    </div>
                                     {isPolicyVisible && (
                                        <div className="mt-4 space-y-2 text-xs">
                                            <p><strong>1. 수집하는 개인정보의 항목:</strong> 성함, 생년월일, 연락처, 거주지역, 직업, 이메일, 결혼경력, 신장/체중, 음주/흡연 여부</p>
                                            <p><strong>2. 개인정보의 수집 및 이용 목적:</strong> 국제결혼 상담 및 관련 서비스 제공</p>
                                            <p><strong>3. 개인정보의 보유 및 이용 기간:</strong> 상담 신청일로부터 3년 또는 정보주체의 삭제 요청 시까지</p>
                                            <p><strong>4. 귀하는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있습니다.</strong> 다만, 필수 항목에 대한 동의를 거부할 경우 상담 서비스 제공이 제한될 수 있습니다.</p>
                                        </div>
                                    )}
                                </div>
                            </FormGroup>
                        </div>

                        {error && <p className="text-sm text-red-600 text-center bg-red-100 p-3 rounded-md">{error}</p>}

                        <div>
                            <button type="submit" className="w-full bg-rose-500 text-white font-bold py-4 px-6 rounded-md hover:bg-rose-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 text-lg" disabled={!formData.privacy}>
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
