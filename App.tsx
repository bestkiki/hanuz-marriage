import React, { useState, useEffect } from 'https://esm.sh/react@18.2.0';
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet,
  Navigate,
  useLocation,
} from 'https://esm.sh/react-router-dom@6.23.1';
import { onAuthStateChanged, User } from 'https://esm.sh/firebase@10.12.2/auth';
import { doc, getDoc } from 'https://esm.sh/firebase@10.12.2/firestore';

// Import Pages
import Login from './pages/Login.tsx';
import Admin from './pages/Admin.tsx';

// Import Firebase services
import { auth, db } from './lib/firebase.ts';

// Import UI components
import { GoogleGenAI } from 'https://esm.sh/@google/genai';
import {
  PhoneIcon,
  BlogIcon,
  FacebookIcon,
  InstagramIcon,
  YoutubeIcon,
  KakaoIcon,
} from './components/Icons.tsx';


// --- Main App Logic ---

// PrivateRoute component to protect admin routes
const PrivateRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        // Check for admin role in Firestore
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists() && userDoc.data().role === 'admin') {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (e) {
            console.error("Error fetching user role:", e);
            setIsAdmin(false);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (isLoading) {
    // Show a loading indicator while checking auth state
    return <div className="min-h-screen flex items-center justify-center"><p>Loading...</p></div>;
  }

  if (!user || !isAdmin) {
    // Redirect to login page if not logged in or not an admin
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};


// --- UI Components ---

const SocialMediaPostGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('instagram');
    const [post, setPost] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
  
    const generatePost = async () => {
      if (!topic) {
        setError('Please enter a topic.');
        return;
      }
      setIsLoading(true);
      setPost('');
      setError('');
  
      try {
        if (!process.env.API_KEY) {
          setError("API_KEY environment variable not set. Please set it to use the Gemini API.");
          setIsLoading(false);
          return;
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Create a ${platform} post about "${topic}". Include relevant hashtags.`;
        
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
        });
  
        setPost(response.text);
      } catch (err) {
        console.error('Error generating post:', err);
        setError('Failed to generate post. Please check the console for details.');
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Generate Social Media Posts
        </h2>
        <div className="space-y-6">
          <div>
            <label htmlFor="topic" className="block text-lg font-semibold text-slate-700 mb-2">
              Topic or Keyword
            </label>
            <input
              id="topic"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Summer vacation deals"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            />
          </div>
          <div>
            <label htmlFor="platform" className="block text-lg font-semibold text-slate-700 mb-2">
              Social Media Platform
            </label>
            <select
              id="platform"
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500 transition"
            >
              <option value="instagram">Instagram</option>
              <option value="facebook">Facebook</option>
              <option value="blog">Blog</option>
              <option value="youtube">Youtube</option>
              <option value="kakao">Kakao Story</option>
            </select>
          </div>
          <button
            onClick={generatePost}
            disabled={isLoading}
            className="w-full bg-rose-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-rose-600 transition-colors disabled:bg-rose-300 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Generating...' : 'Generate Post'}
          </button>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          {post && (
            <div className="mt-8 p-6 bg-slate-50 border border-slate-200 rounded-lg">
              <h3 className="text-xl font-semibold text-slate-800 mb-4">Generated Post:</h3>
              <pre className="text-slate-700 whitespace-pre-wrap font-sans">{post}</pre>
            </div>
          )}
        </div>
      </div>
    );
};

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      <main className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-slate-900 mb-4">
            AI-Powered Content Creation
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Effortlessly generate engaging social media posts for your brand. Just provide a topic, select a platform, and let our AI do the rest.
          </p>
        </div>
        <SocialMediaPostGenerator />
      </main>
    </div>
  );
};
  
const Layout: React.FC = () => {
    return (
      <>
        <header className="bg-white shadow-md">
          <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-rose-500">
              ContentGen AI
            </Link>
            <div className="space-x-4">
              <Link to="/" className="text-slate-600 hover:text-rose-500 transition">Home</Link>
              <Link to="/admin" className="text-slate-600 hover:text-rose-500 transition">Admin</Link>
            </div>
          </nav>
        </header>
        <Outlet />
         <footer className="bg-slate-800 text-white mt-12 py-8">
          <div className="container mx-auto px-4 text-center">
              <div className="flex justify-center items-center space-x-6 mb-4">
                  <a href="#" className="hover:text-rose-400 transition-colors"><PhoneIcon className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-rose-400 transition-colors"><FacebookIcon className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-rose-400 transition-colors"><InstagramIcon className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-rose-400 transition-colors"><BlogIcon className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-rose-400 transition-colors"><YoutubeIcon className="w-6 h-6" /></a>
                  <a href="#" className="hover:text-rose-400 transition-colors"><KakaoIcon className="w-6 h-6" /></a>
              </div>
            <p>&copy; {new Date().getFullYear()} ContentGen AI. All rights reserved.</p>
          </div>
        </footer>
      </>
    );
};

// --- App Component with Routing ---

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route 
            path="admin" 
            element={
              <PrivateRoute>
                <Admin />
              </PrivateRoute>
            } 
          />
        </Route>
        <Route path="login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
