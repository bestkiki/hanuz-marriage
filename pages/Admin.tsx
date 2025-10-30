
import React from 'https://esm.sh/react@18.2.0';
import { useNavigate } from 'https://esm.sh/react-router-dom@6.23.1';
import { signOut } from 'https://esm.sh/firebase@10.12.2/auth';
import { auth } from '../lib/firebase';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Error signing out: ', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Admin Page</h1>
          <button
            onClick={handleLogout}
            className="bg-slate-700 text-white font-bold py-2 px-4 rounded-lg hover:bg-slate-800 transition-colors"
          >
            Logout
          </button>
        </div>
        <div className="border-t border-gray-200 pt-6">
          <p className="text-slate-600">Welcome to the admin dashboard. This is a placeholder page.</p>
          {/* Future admin content will go here */}
        </div>
      </div>
    </div>
  );
};

export default Admin;