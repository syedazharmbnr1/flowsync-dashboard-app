import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Layers, Mail, Lock, User, AlertCircle, Loader } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Validate form
    if (!formData.fullName.trim()) {
      setError('Full name is required');
      return;
    }
    
    if (!formData.email.trim()) {
      setError('Email is required');
      return;
    }
    
    if (!formData.password) {
      setError('Password is required');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    try {
      setLoading(true);
      await signUp(
        formData.email, 
        formData.password, 
        { full_name: formData.fullName }
      );
      
      // Redirect to login page after successful registration
      navigate('/login', { 
        state: { message: 'Registration successful! Please check your email to confirm your account.' } 
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.message || 'Failed to register. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-900">
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="w-full max-w-sm mx-auto lg:w-96">
          <div className="flex justify-center mb-6">
            <div className="bg-green-500 p-1 rounded">
              <Layers size={32} className="text-gray-900" />
            </div>
          </div>
          
          <div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-white">
              Create a new account
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Or{' '}
              <Link to="/login" className="font-medium text-green-500 hover:text-green-400">
                sign in to your existing account
              </Link>
            </p>
          </div>

          <div className="mt-8">
            {error && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-20 border border-red-500 rounded-md">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                  <span className="text-sm text-red-400">{error}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleRegister} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    autoComplete="name"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="block w-full pl-10 border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm py-2"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Email address
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm py-2"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm py-2"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 border-gray-700 rounded-md bg-gray-800 text-gray-300 focus:ring-green-500 focus:border-green-500 sm:text-sm py-2"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-75"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
                      Creating account...
                    </>
                  ) : (
                    'Create account'
                  )}
                </button>
              </div>
            </form>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.164 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.602-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.891 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.16 22 16.418 22 12c0-5.523-4.477-10-10-10z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                <div>
                  <button
                    type="button"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm6.36 14.83c-1.43-1.74-4.9-1.33-6.36-1.32-.27 0-.55 0-.82-.01-.67-.04-1.35-.13-2.02-.27-.65-.14-1.28-.35-1.88-.64-.29-.14-.57-.32-.83-.51-.12-.08-.23-.18-.32-.29-.12-.14-.22-.3-.28-.47-.01-.04-.02-.07-.02-.11 0-.23.09-.45.24-.61.15-.16.36-.26.58-.27.11 0 .21.02.31.06.11.04.22.1.33.15.31.14.64.25.98.32.79.15 1.6.2 2.4.17h.28c.55-.03 1.1-.16 1.61-.37.47-.2.88-.5 1.22-.89.32-.36.56-.8.7-1.27.13-.48.19-.98.15-1.47l.02.01c-.01-.46.4-.84.86-.86h.09c.22.01.43.09.58.25.16.15.24.37.23.58v.02c.05.82-.05 1.65-.29 2.45-.24.8-.63 1.55-1.15 2.21-.53.67-1.17 1.24-1.9 1.66-.7.39-1.48.64-2.26.72 0 0-.04 0-.06.01h-.16c-.61.01-1.21-.05-1.8-.17-.56-.12-1.1-.3-1.6-.56-.44-.23-.84-.53-1.18-.88-.32-.33-.58-.71-.77-1.13-.17-.41-.16-.87.02-1.28.18-.4.5-.72.9-.91.4-.19.85-.22 1.28-.09.42.13.78.4 1.06.76.03.04.05.09.08.14.32.63.98 1.04 1.7 1.04h.13c.5-.07.94-.35 1.25-.77.32-.42.47-.93.43-1.45-.05-.96-.82-1.75-1.78-1.81-.96-.06-1.81.63-1.96 1.58-.03.15-.04.3-.03.45 0 .13-.05.26-.14.35-.1.09-.22.15-.35.15h-.01c-.14.01-.28-.04-.39-.13-.11-.09-.18-.22-.2-.37v-.14c.04-1.43 1.2-2.58 2.63-2.62h.23c.7.02 1.39.28 1.92.73.54.45.9 1.07 1.02 1.75v.09c.06.61-.08 1.22-.4 1.74-.32.53-.8.93-1.37 1.13-.13.05-.27.08-.41.1-.25.04-.51.05-.76.03h-.14c-.16-.01-.32.04-.45.15-.12.1-.2.25-.22.42v.21c0 .35.13.69.37.95.24.26.57.42.92.43h.32c.42.02.84-.02 1.26-.13.4-.11.78-.29 1.12-.53.35-.25.66-.56.89-.92.21-.35.36-.74.44-1.15l.06-.04s0-.03 0-.05v-.04c.12-.8-.2-1.6-.81-2.06-.26-.19-.56-.32-.88-.38-.24-.05-.49-.07-.73-.06h-.13c-.21-.01-.38-.18-.4-.39 0-.05 0-.1.02-.15.02-.05.05-.1.08-.13.08-.07.18-.1.28-.09h.13c.52-.01 1.04.13 1.47.41.44.27.79.67 1.02 1.15.55 1.15.23 2.53-.77 3.27-.43.32-.93.55-1.46.66-.6.13-1.21.16-1.82.08h-.13c-.46-.04-.88-.34-1.09-.76-.2-.41-.19-.9.03-1.3.2-.36.5-.66.87-.84.22-.11.46-.19.7-.23.47-.08.95-.05 1.41.1.29.09.57.23.8.42.19.15.34.35.44.58.08.23.09.48.03.72-.05.43-.33.79-.72.95-.39.16-.83.11-1.17-.14-.07-.05-.13-.11-.2-.17-.14-.13-.31-.21-.5-.23-.3-.04-.6.07-.8.29-.21.22-.31.53-.26.83.03.62.54 1.11 1.16 1.12.59 0 1.15-.38 1.32-.95.1-.3.12-.63.07-.94.12-.59.09-1.2-.09-1.77-.18-.57-.5-1.1-.92-1.52-.64-.68-1.5-1.1-2.43-1.19-.75-.08-1.5.08-2.15.45-.66.37-1.2.92-1.54 1.58-.43.83-.52 1.8-.24 2.69.26.83.81 1.55 1.55 2.01.6.38 1.26.64 1.96.78.82.15 1.67.17 2.5.05.19-.02.38-.06.56-.09 0 0 .08 0 .09.01.48-.11.94-.26 1.38-.47.83-.4 1.52-1.06 1.97-1.87.45-.81.7-1.71.72-2.64v-.04c.04-.21-.04-.43-.19-.59-.16-.16-.37-.23-.59-.2h-.04c-.71.01-1.28.59-1.28 1.3v.71c-.04.72-.31 1.41-.76 1.97-.46.56-1.09.94-1.79 1.09h-.17c-.64.03-1.28-.06-1.88-.25-.6-.19-1.17-.49-1.65-.87-.49-.38-.89-.87-1.17-1.42-.28-.54-.42-1.15-.43-1.76 0-.89.33-1.75.92-2.41.59-.66 1.41-1.07 2.29-1.15h.14c1.15.02 2.2.67 2.8 1.7.18.3.29.64.31.99 0 .09 0 .19.01.28l.05-.04c.03-.28.12-.55.28-.78.15-.23.36-.43.61-.56.5-.26 1.1-.19 1.52.18.27.23.43.58.43.94v.02c.11.86.03 1.72-.24 2.55-.25.77-.68 1.49-1.24 2.08"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block relative w-0 flex-1">
        <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          <div className="max-w-md p-6">
            <h2 className="text-3xl font-bold text-white mb-4">Join FlowSync Today</h2>
            <p className="text-gray-300 mb-6">
              Create an account to start automating your workflows, track team performance, and gain valuable insights from your data.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300">Free 14-day trial, no credit card required</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300">Access to all core features during trial</p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-300">Premium support to help you get started</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;