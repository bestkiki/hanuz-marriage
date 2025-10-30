import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { InstagramIcon, BlogIcon, FacebookIcon, YoutubeIcon, KakaoIcon, PhoneIcon } from '../components/Icons';

type Member = {
  id: number;
  name: string;
  age: number;
  bio: string;
  imageUrl: string;
};

type Testimonial = {
  id: number;
  couple: string;
  story: string;
  imageUrl: string;
};

const members: Member[] = [
  { id: 1, name: '디요라', age: 23, bio: '한국 문화에 관심이 많고, 자상한 분을 만나고 싶어요.', imageUrl: 'https://picsum.photos/seed/member1/400/500' },
  { id: 2, name: '사오닷', age: 25, bio: '요리를 좋아하며, 함께 행복한 가정을 꾸리고 싶습니다.', imageUrl: 'https://picsum.photos/seed/member2/400/500' },
  { id: 3, name: '굴노자', age: 22, bio: '긍정적이고 밝은 성격입니다. 서로 존중하는 관계를 원해요.', imageUrl: 'https://picsum.photos/seed/member3/400/500' },
  { id: 4, name: '카몰라', age: 26, bio: '예술과 음악을 사랑합니다. 감성적인 분과 만나고 싶어요.', imageUrl: 'https://picsum.photos/seed/member4/400/500' },
];

const testimonials: Testimonial[] = [
  { id: 1, couple: '김OO ♥️ 나르기자', story: '한우즈 덕분에 제 인생의 반쪽을 만났습니다. 언어와 문화의 장벽을 넘어 진정한 사랑을 찾게 해주셔서 감사합니다.', imageUrl: 'https://picsum.photos/seed/couple1/600/400' },
  { id: 2, couple: '박XX ♥️ 로라', story: '호프맨님의 진심 어린 상담과 꼼꼼한 진행 덕분에 아름다운 결실을 맺을 수 있었습니다. 매일이 행복합니다.', imageUrl: 'https://picsum.photos/seed/couple2/600/400' },
  { id: 3, couple: '이OO ♥️ 샤흐노자', story: '처음에는 국제결혼에 대해 걱정이 많았지만, 한우즈를 만나고 모든 것이 순조롭게 진행되었습니다. 최고의 선택이었어요!', imageUrl: 'https://picsum.photos/seed/couple3/600/400' },
];

const processSteps = [
  { title: "상담 및 계약", description: "고객님의 상황과 이상형에 대한 심도 깊은 상담을 진행합니다." },
  { title: "여성회원 프로필 제공", description: "상담 내용을 바탕으로 어울리는 우즈베키스탄 여성회원을 소개해드립니다." },
  { title: "화상 맞선", description: "마음에 드는 분과 1:1 화상 통화를 통해 서로를 알아가는 시간을 갖습니다." },
  { title: "우즈베키스탄 출국", description: "현지에서 직접 만나 데이트하며 서로에 대한 확신을 가집니다." },
  { title: "결혼 및 서류 진행", description: "양국 혼인신고 등 결혼에 필요한 모든 서류 절차를 대행합니다." },
  { title: "신부 입국 및 사후관리", description: "신부님의 한국 입국과 안정적인 정착을 위해 지속적으로 지원합니다." },
];


const Header: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
      { name: '한우즈 소개', href: '#about' },
      { name: '결혼 절차', href: '#process' },
      { name: '여성회원', href: '#members' },
      { name: '성혼후기', href: '#testimonials' },
    ];

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
        setIsOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
            <div className="container mx-auto px-6 py-3">
                <div className="flex justify-between items-center">
                    <a href="/" className={`text-2xl font-bold ${isScrolled ? 'text-slate-800' : 'text-white'}`}>한우즈 국제결혼</a>
                    <nav className="hidden md:flex items-center space-x-8">
                        {navLinks.map(link => (
                            <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className={`text-lg hover:text-rose-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-gray-200'}`}>{link.name}</a>
                        ))}
                        <Link to="/login" className={`text-lg hover:text-rose-500 transition-colors ${isScrolled ? 'text-slate-600' : 'text-gray-200'}`}>로그인</Link>
                        <Link to="/apply" className="bg-rose-500 text-white font-bold py-2 px-6 rounded-full hover:bg-rose-600 transition-transform hover:scale-105">상담 신청</Link>
                    </nav>
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className={`${isScrolled ? 'text-slate-800' : 'text-white'}`}>
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
                        </button>
                    </div>
                </div>
                 {isOpen && (
                    <div className="md:hidden mt-4 bg-white rounded-lg shadow-xl">
                        <nav className="flex flex-col items-center space-y-4 p-4">
                             {navLinks.map(link => (
                                <a key={link.name} href={link.href} onClick={(e) => scrollToSection(e, link.href)} className="text-slate-700 hover:text-rose-500 text-lg w-full text-center py-2">{link.name}</a>
                            ))}
                            <Link to="/login" className="text-slate-700 hover:text-rose-500 text-lg w-full text-center py-2">로그인</Link>
                            <Link to="/apply" className="bg-rose-500 text-white font-bold py-3 px-6 rounded-full hover:bg-rose-600 w-full text-center">상담 신청</Link>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};


const Hero: React.FC = () => (
    <section className="relative h-screen flex items-center justify-center text-white text-center bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/wedding/1920/1080')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 p-6">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 leading-tight">우즈베키스탄 국제결혼, <br className="md:hidden" /> 희망을 현실로</h1>
            <p className="text-lg md:text-2xl font-light mb-8 max-w-2xl mx-auto">신뢰와 진심으로 당신의 소중한 인연을 찾아드립니다. 국제결혼의 희망을 전하는 호프맨이 함께합니다.</p>
            <Link to="/apply" className="bg-rose-500 text-white font-bold py-4 px-10 rounded-full text-lg hover:bg-rose-600 transition-transform transform hover:scale-105 inline-block">
                무료 상담 신청하기
            </Link>
        </div>
    </section>
);


const About: React.FC = () => (
    <section id="about" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">왜 한우즈 국제결혼인가?</h2>
                <p className="text-lg text-slate-600 mt-4 max-w-3xl mx-auto">저희는 단순한 중개를 넘어, 진정한 가족이 되는 과정을 함께하는 든든한 동반자입니다.</p>
            </div>
            <div className="flex flex-wrap items-center -mx-4">
                <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
                    <img src="https://picsum.photos/seed/hope/800/600" alt="Hope Man" className="rounded-lg shadow-xl" />
                </div>
                <div className="w-full lg:w-1/2 px-4">
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">희망을 전하는 호프맨</h3>
                    <p className="text-slate-600 text-base leading-relaxed mb-4">
                        안녕하세요. 국제결혼의 희망을 전하는 호프맨입니다. 수많은 국제결혼 커플을 성사시킨 경험과 노하우를 바탕으로, 고객 한 분 한 분에게 꼭 맞는 인연을 찾아드리기 위해 최선을 다하고 있습니다. 
                    </p>
                    <p className="text-slate-600 text-base leading-relaxed mb-6">
                        언어의 장벽, 문화의 차이에 대한 걱정은 저희에게 맡겨주세요. 초기 상담부터 성혼, 그리고 한국에서의 안정적인 정착까지 모든 과정을 책임지고 투명하게 지원합니다. 당신의 행복한 시작을 한우즈가 함께하겠습니다.
                    </p>
                    <a href="#process" onClick={(e) => document.querySelector('#process')?.scrollIntoView({ behavior: 'smooth' })} className="text-rose-600 font-semibold hover:underline">결혼 절차 자세히 보기 &rarr;</a>
                </div>
            </div>
        </div>
    </section>
);


const Process: React.FC = () => (
    <section id="process" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">체계적인 결혼 진행 절차</h2>
                <p className="text-lg text-slate-600 mt-4">고객님의 소중한 시간을 아껴드리는 효율적이고 투명한 프로세스입니다.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {processSteps.map((step, index) => (
                    <div key={index} className="bg-slate-50 p-8 rounded-lg shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all">
                        <div className="flex items-center mb-4">
                            <div className="bg-rose-500 text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl mr-4">{index + 1}</div>
                            <h3 className="text-xl font-bold text-slate-800">{step.title}</h3>
                        </div>
                        <p className="text-slate-600">{step.description}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const Members: React.FC = () => (
    <section id="members" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">아름다운 우즈베키스탄 여성회원</h2>
                <p className="text-lg text-slate-600 mt-4">진정한 사랑을 꿈꾸는 순수하고 아름다운 분들을 소개합니다.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {members.map(member => (
                    <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        <img src={member.imageUrl} alt={member.name} className="w-full h-72 object-cover" />
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-slate-800">{member.name}, {member.age}</h3>
                            <p className="text-slate-600 mt-2">"{member.bio}"</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="text-center mt-8 text-slate-500 text-sm">※ 위 프로필은 예시이며, 실제 상담 시 더 많은 분들을 소개해 드립니다.</p>
        </div>
    </section>
);

const Testimonials: React.FC = () => (
    <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-800">행복한 성혼 이야기</h2>
                <p className="text-lg text-slate-600 mt-4">한우즈를 통해 새로운 삶을 시작한 커플들의 진솔한 후기입니다.</p>
            </div>
            <div className="space-y-12">
                {testimonials.map((testimonial, index) => (
                    <div key={testimonial.id} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}>
                        <div className="md:w-1/2">
                            <img src={testimonial.imageUrl} alt={testimonial.couple} className="rounded-lg shadow-xl w-full" />
                        </div>
                        <div className="md:w-1/2">
                            <p className="text-xl text-slate-600 leading-relaxed italic">"{testimonial.story}"</p>
                            <p className="text-right mt-4 font-bold text-lg text-rose-500">- {testimonial.couple} 커플</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);


const CTA: React.FC = () => (
    <section id="cta" className="py-20 bg-rose-600 text-white">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">이제 당신의 차례입니다</h2>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto">망설이지 마세요. 작은 용기가 당신의 인생을 바꿀 수 있습니다. 지금 바로 한우즈의 문을 두드려보세요.</p>
            <Link to="/apply" className="bg-white text-rose-600 font-bold py-4 px-10 rounded-full text-lg hover:bg-gray-100 transition-transform transform hover:scale-105 inline-block shadow-lg">
                인연 찾기 상담 신청
            </Link>
        </div>
    </section>
);


const Footer: React.FC = () => (
    <footer className="bg-slate-800 text-gray-300 py-12">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                    <h3 className="text-xl font-bold text-white mb-4">💍 한우즈 국제결혼</h3>
                    <p className="text-sm">국제결혼의 희망을 전하는 호프맨</p>
                    <div className="mt-4 flex space-x-4">
                        <a href="https://instagram.com/hanuzmarriage" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400"><InstagramIcon className="w-6 h-6" /></a>
                        <a href="https://blog.naver.com/hopemans2" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400"><BlogIcon className="w-6 h-6" /></a>
                        <a href="https://facebook.com/groups/1944674362953044" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400"><FacebookIcon className="w-6 h-6" /></a>
                        <a href="https://www.youtube.com/@hopemans2" target="_blank" rel="noopener noreferrer" className="hover:text-rose-400"><YoutubeIcon className="w-6 h-6" /></a>
                    </div>
                </div>
                <div className="text-sm space-y-2">
                    <h3 className="text-lg font-semibold text-white mb-2">업체 정보</h3>
                    <p><strong>국제결혼중개업 등록번호:</strong> 경기-고양-국제-25-002호</p>
                    <p><strong>사업자 등록번호:</strong> 117-19-64323</p>
                    <p><strong>통신판매번호:</strong> 제2025-고양일산서-0796호</p>
                    <p><strong>주소:</strong> 경기도 고양시 일산서구 일산로635번길 8-24, 1층</p>
                    <p><strong>보증보험:</strong> SGI서울보증 100-000-2025-0370-9205호</p>
                </div>
                <div className="text-sm space-y-3">
                    <h3 className="text-lg font-semibold text-white mb-2">상담 및 문의</h3>
                    <div className="flex items-center space-x-2">
                        /* <KakaoIcon className="w-5 h-5 text-yellow-300"/> 
                        <span>카카오톡: grada19</span> */
                    </div>
                     <div className="flex items-center space-x-2">
                        /* <PhoneIcon className="w-5 h-5 text-green-400"/>
                        <span>연락처: 010-2738-8199</span> */
                    </div>
                    <Link to="/apply" className="inline-block mt-4 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded">
                        상담신청서 바로가기
                    </Link>
                </div>
            </div>
            <div className="border-t border-slate-700 mt-8 pt-6 text-center text-xs text-gray-400">
                <p>&copy; {new Date().getFullYear()} 한우즈 국제결혼. All rights reserved.</p>
                <p className="mt-1">본 사이트의 모든 컨텐츠는 저작권법의 보호를 받으며, 무단 전재, 복사, 배포 등을 금합니다.</p>
            </div>
        </div>
    </footer>
);

const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <Header />
            <main>
                <Hero />
                <About />
                <Process />
                <Members />
                <Testimonials />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default Home;