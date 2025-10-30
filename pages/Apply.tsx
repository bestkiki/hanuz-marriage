
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';

// Helper components are defined OUTSIDE the main component to prevent re-creation on every render.
// This is the fix for the input bug.
interface FormGroupProps {
  label: string;
  id: string;
  children: React.ReactNode;
  isOptional?: boolean;
}

const FormGroup: React.FC<FormGroupProps> = ({ label, id, children, isOptional }) => (
  <div className="mb-6">
    <label className="block text-slate-600 text-sm font-bold mb-2" htmlFor={id}>
      {label} {isOptional ? <span className="text-xs font-normal text-slate-500">(선택)</span> : <span className="text-red-500">*</span>}
    </label>
    {children}
  </div>
);

const Apply: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        birthDate: '',
        contact: '',
        address: '',
        residenceType: '',
        jobAndIncome: '',
        email: '',
        maritalHistory: '',
        maritalHistoryOther: '',
        hasChildren: '',
        heightWeight: '',
        drinkingSmoking: [] as string[],
        motivation: '',
        preferredPartner: '',
        questions: '',
        consultationMethod: '',
        consultationTime: '',
        privacyPolicy: false,
    });
    
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            if (name === 'privacyPolicy') {
                setFormData(prev => ({ ...prev, [name]: checked }));
            } else { // For drinkingSmoking
                setFormData(prev => {
                    const currentValues = prev.drinkingSmoking;
                    if (checked) {
                        if(value === '해당 없음') return { ...prev, drinkingSmoking: ['해당 없음'] };
                        const filteredValues = currentValues.filter(v => v !== '해당 없음');
                        return { ...prev, drinkingSmoking: [...filteredValues, value] };
                    } else {
                        return { ...prev, drinkingSmoking: currentValues.filter(v => v !== value) };
                    }
                });
            }
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const requiredFields: (keyof typeof formData)[] = ['name', 'birthDate', 'contact', 'address', 'residenceType', 'jobAndIncome', 'email', 'maritalHistory', 'hasChildren', 'heightWeight', 'consultationMethod', 'consultationTime', 'privacyPolicy'];
        
        for (const field of requiredFields) {
            if (!formData[field]) {
                 if(field === 'privacyPolicy') {
                    alert('개인정보 처리방침에 동의해주세요.');
                 } else {
                    alert(`필수 항목을 모두 입력해주세요.`);
                 }
                return;
            }
        }
        if (formData.maritalHistory === '기타' && !formData.maritalHistoryOther) {
            alert('결혼경력 기타 사유를 입력해주세요.');
            return;
        }

        setLoading(true);
        try {
            await addDoc(collection(db, "applications"), {
                ...formData,
                createdAt: serverTimestamp()
            });
            alert('상담 신청이 성공적으로 접수되었습니다. 홈으로 이동합니다.');
            navigate('/');
        } catch (error) {
            console.error("Error adding document: ", error);
            alert('신청서 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
             <div className="max-w-2xl w-full mx-auto">
                <div className="bg-white p-8 rounded-lg shadow-lg">
                    <img src="https://lh7-rt.googleusercontent.com/formsz/AN7BsVDOegkeGIBja0i1co3LfoIAVhtjqLqQAPH_hTdSmTJqwjsnpLkywHVAw5wkYTUoQMtWXATFwnHHioNOakFirQ8fqEPcamKwx4DvrWjwsKzUdMBAZAUKNKcjFHu7_PkNZtv30DtxZSzk-iCnXDFGjt7g_mCOMNd0KhzFxmJeyV0dIhpNitaTpFFfBLiBsRpYcBciwPgEdI6Pb-U=w740?key=BM9gqd9Q3t4Tui3ITbR-MA" alt="Hanuz Banner" className="w-full h-auto rounded-t-lg mb-6" />
                    <h2 className="text-2xl font-bold text-center text-slate-700 mb-2">우즈베키스탄 국제결혼 상담 신청서</h2>
                    <p className="text-center text-slate-500 mb-8">호프맨이 당신의 소중한 인연을 찾아드립니다. 아래 신청서를 작성해주시면, 확인 후 연락드리겠습니다.</p>
                    
                    <form onSubmit={handleSubmit} noValidate>
                        <FormGroup label="성함" id="name">
                            <input name="name" id="name" type="text" placeholder="홍길동" required value={formData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="생년월일" id="birthDate">
                             <input name="birthDate" id="birthDate" type="date" required value={formData.birthDate} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>
                        
                        <FormGroup label="연락처 or 카카오톡 아이디" id="contact">
                             <input name="contact" id="contact" type="text" placeholder="010-1234-5678 또는 KakaotalkID" required value={formData.contact} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="거주지역" id="address">
                             <input name="address" id="address" type="text" placeholder="예: 서울시 강남구" required value={formData.address} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>
                        
                        <FormGroup label="거주형태" id="residenceType">
                             <input name="residenceType" id="residenceType" type="text" placeholder="예: 아파트, 빌라, 투룸, 원룸 등" required value={formData.residenceType} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="직업, 월 소득" id="jobAndIncome">
                             <input name="jobAndIncome" id="jobAndIncome" type="text" placeholder="예: 회사원, 300만원" required value={formData.jobAndIncome} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>
                        
                        <FormGroup label="이메일" id="email">
                             <input name="email" id="email" type="email" placeholder="example@email.com" required value={formData.email} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="결혼경력" id="maritalHistory">
                            {['초혼', '재혼(사별)', '재혼(이혼)', '사실혼', '기타'].map(option => (
                                <div key={option} className="flex items-center mb-2">
                                    <input type="radio" id={`marital_${option}`} name="maritalHistory" value={option} checked={formData.maritalHistory === option} onChange={handleChange} className="mr-2" />
                                    <label htmlFor={`marital_${option}`}>{option}</label>
                                </div>
                            ))}
                            {formData.maritalHistory === '기타' && (
                                <input type="text" name="maritalHistoryOther" placeholder="기타 사유를 입력하세요" value={formData.maritalHistoryOther} onChange={handleChange} className="mt-2 shadow appearance-none border rounded w-full py-2 px-3 text-slate-700" />
                            )}
                        </FormGroup>
                        
                        <FormGroup label="자녀 유무" id="hasChildren" isOptional>
                            <select name="hasChildren" id="hasChildren" value={formData.hasChildren} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700">
                                <option value="">선택하세요</option>
                                <option value="없음">없음</option>
                                <option value="있음 (함께 거주)">있음 (함께 거주)</option>
                                <option value="있음 (비동거)">있음 (비동거)</option>
                            </select>
                        </FormGroup>

                        <FormGroup label="신장/체중" id="heightWeight">
                             <input name="heightWeight" id="heightWeight" type="text" placeholder="예: 175cm / 70kg" required value={formData.heightWeight} onChange={handleChange} className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="음주/흡연 여부" id="drinkingSmoking">
                            {['음주', '흡연', '해당 없음'].map(option => (
                                <div key={option} className="flex items-center mb-2">
                                    <input type="checkbox" id={`ds_${option}`} name="drinkingSmoking" value={option} checked={formData.drinkingSmoking.includes(option)} onChange={handleChange} className="mr-2" />
                                    <label htmlFor={`ds_${option}`}>{option}</label>
                                </div>
                            ))}
                        </FormGroup>

                        <FormGroup label="우즈베키스탄 여성과의 결혼에 관심을 갖게 된 계기" id="motivation" isOptional>
                            <textarea name="motivation" id="motivation" value={formData.motivation} onChange={handleChange} rows={5} placeholder="자유롭게 작성해주세요." className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>

                        <FormGroup label="원하는 여성상" id="preferredPartner">
                             <textarea name="preferredPartner" id="preferredPartner" value={formData.preferredPartner} onChange={handleChange} rows={5} placeholder="성격, 가치관, 외모 등 희망하는 여성상에 대해 자유롭게 작성해주세요." required className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>
                        
                        <FormGroup label="기타 궁금한 점" id="questions" isOptional>
                            <textarea name="questions" id="questions" value={formData.questions} onChange={handleChange} rows={5} placeholder="국제결혼에 대해 궁금했던 점이나 요청사항을 자유롭게 남겨주세요." className="shadow appearance-none border rounded w-full py-3 px-4 text-slate-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-rose-500" />
                        </FormGroup>
                        
                        <FormGroup label="상담 희망 방식" id="consultationMethod">
                            {['전화 상담', '카카오톡 상담', '방문 상담(사무실)', '만남 상담(카페)'].map(option => (
                                <div key={option} className="flex items-center mb-2">
                                    <input type="radio" id={`cm_${option}`} name="consultationMethod" value={option} checked={formData.consultationMethod === option} onChange={handleChange} className="mr-2" />
                                    <label htmlFor={`cm_${option}`}>{option}</label>
                                </div>
                            ))}
                        </FormGroup>

                        <FormGroup label="상담 가능 시간" id="consultationTime">
                            {['오전 (09시~12시)', '오후 (12시~18시)', '저녁 (18시~21시)', '주말만 가능'].map(option => (
                                <div key={option} className="flex items-center mb-2">
                                    <input type="radio" id={`ct_${option}`} name="consultationTime" value={option} checked={formData.consultationTime === option} onChange={handleChange} className="mr-2" />
                                    <label htmlFor={`ct_${option}`}>{option}</label>
                                </div>
                            ))}
                        </FormGroup>

                        <div className="mb-6 bg-slate-100 p-4 rounded-lg">
                             <div className="flex items-center">
                                <input type="checkbox" id="privacyPolicy" name="privacyPolicy" checked={formData.privacyPolicy} onChange={handleChange} className="mr-3 h-5 w-5" required />
                                <label htmlFor="privacyPolicy" className="text-slate-700 font-bold">개인정보 처리방침에 동의합니다. <span className="text-red-500">*</span></label>
                            </div>
                            <details className="mt-2">
                                <summary className="text-sm text-slate-600 cursor-pointer hover:underline">자세히 보기</summary>
                                <div className="text-xs text-slate-500 mt-2 p-3 bg-white rounded">
                                    <p>1. 개인정보 수집 목적: 상담 신청 및 회원 관리</p>
                                    <p>2. 수집 항목: 성함, 생년월일, 연락처, 이메일 등 위 기재항목 일체</p>
                                    <p>3. 보유 및 이용 기간: 정보 제공일로부터 3년 (요청 시 즉시 파기)</p>
                                    <p>4. 동의를 거부할 권리가 있으며, 거부 시 상담이 제한될 수 있습니다.</p>
                                </div>
                            </details>
                        </div>

                        <div className="flex items-center justify-between">
                            <button
                                className={`w-full bg-rose-500 hover:bg-rose-600 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline transition-all ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? '신청서 제출 중...' : '상담 신청서 제출하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Apply;
