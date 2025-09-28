import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';
import LoginModal from './LoginModal';

const UserProfile: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setShowDropdown(false);
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  if (!currentUser) {
    return (
      <>
        <button
          onClick={() => setShowLoginModal(true)}
          className="text-lg font-semibold text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-2 px-6 rounded-full transform transition-transform duration-200 hover:scale-105 hover:bg-white hover:text-black"
        >
          Sign In
        </button>
        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-2 px-4 rounded-full transform transition-transform duration-200 hover:scale-105 hover:bg-white hover:text-black"
      >
        <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
          {currentUser.email?.charAt(0).toUpperCase() || 'U'}
        </div>
        <span className="hidden sm:block">
          {currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}
        </span>
        <svg 
          className={`w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {showDropdown && (
        <motion.div
          className="absolute right-0 mt-2 w-48 bg-white/10 backdrop-blur-lg rounded-lg shadow-lg border border-white/20 z-50"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
        >
          <div className="p-4 border-b border-white/20">
            <p className="text-white font-medium truncate">
              {currentUser.displayName || 'User'}
            </p>
            <p className="text-white/60 text-sm truncate">
              {currentUser.email}
            </p>
          </div>
          <div className="p-2">
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 text-white hover:bg-white/10 rounded-md transition-colors"
            >
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default UserProfile;
