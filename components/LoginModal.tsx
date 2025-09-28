import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../lib/AuthContext';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login, signup, loginWithGoogle } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (password !== confirmPassword) {
          setError('Passwords do not match');
          setLoading(false);
          return;
        }
        if (password.length < 6) {
          setError('Password must be at least 6 characters');
          setLoading(false);
          return;
        }
        await signup(email, password);
      }
      onClose();
    } catch (error: any) {
      setError(error.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onClose();
    } catch (error: any) {
      setError(error.message || 'Google login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md flex flex-col items-center gap-4 text-white"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <h2 className="text-3xl font-bold">
          {isLogin ? 'Welcome Back' : 'Create Account'}
        </h2>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full bg-black/20 rounded-lg p-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              required
            />
          </div>
          
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full bg-black/20 rounded-lg p-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
              required
            />
          </div>
          
          {!isLogin && (
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                className="w-full bg-black/20 rounded-lg p-3 text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                required
              />
            </div>
          )}
          
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full text-lg font-semibold text-center text-white bg-orange-500 py-3 px-8 rounded-full transform transition-transform duration-200 hover:scale-105 hover:bg-orange-600 shadow-lg disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:scale-100"
          >
            {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div className="w-full flex items-center gap-4">
          <div className="flex-1 h-px bg-white/20"></div>
          <span className="text-white/60 text-sm">or</span>
          <div className="flex-1 h-px bg-white/20"></div>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full text-lg font-semibold text-center text-white bg-white/10 backdrop-blur-sm border-2 border-white/80 py-3 px-8 rounded-full transform transition-transform duration-200 hover:scale-105 hover:bg-white hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24">
            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>
        
        <div className="text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-400 hover:text-orange-300 transition-colors text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="mt-2 text-neutral-300 hover:text-white transition-colors"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
