'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Animated Background Component
function AnimatedBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Floating Balls */}
      <div className="absolute top-1/4 left-1/4 w-4 h-4 bg-indigo-400/30 rounded-full animate-float-1"></div>
      <div className="absolute top-1/3 right-1/4 w-6 h-6 bg-purple-400/20 rounded-full animate-float-2"></div>
      <div className="absolute top-2/3 left-1/3 w-3 h-3 bg-blue-400/40 rounded-full animate-float-3"></div>
      <div className="absolute top-1/2 right-1/3 w-5 h-5 bg-indigo-300/25 rounded-full animate-float-4"></div>
      <div className="absolute top-3/4 left-1/2 w-4 h-4 bg-purple-300/30 rounded-full animate-float-5"></div>
      <div className="absolute top-1/6 right-1/2 w-3 h-3 bg-blue-300/35 rounded-full animate-float-6"></div>
      
      {/* Larger Floating Elements */}
      <div className="absolute top-1/4 right-1/6 w-8 h-8 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-full animate-float-slow"></div>
      <div className="absolute top-2/3 right-1/4 w-10 h-10 bg-gradient-to-r from-blue-400/15 to-indigo-400/15 rounded-full animate-float-slow-reverse"></div>
      
      {/* Particle Grid */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-300/40 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/6 w-32 h-32 bg-gradient-to-r from-indigo-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-1/4 right-1/6 w-40 h-40 bg-gradient-to-r from-blue-400/8 to-indigo-400/8 rounded-full blur-3xl animate-pulse-slow-reverse"></div>
    </div>
  );
}

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check for admin credentials
      if (formData.email === 'admin@gmail.com' && formData.password === '123456') {
        // Admin login - redirect to admin dashboard
        console.log('Admin login successful');
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/admin/dashboard');
        return;
      }
      
      // Check for staff credentials (including the hardcoded one and any registered staff)
      const staffData = JSON.parse(localStorage.getItem('staffData') || '[]');
      const isHardcodedStaff = formData.email === 'shaff@gmail.com' && formData.password === 'shafff123';
      const registeredStaff = staffData.find(staff => 
        staff.email === formData.email && staff.password === formData.password
      );
      
      if (isHardcodedStaff || registeredStaff) {
        // Staff login - store current staff info and redirect to staff dashboard
        console.log('Staff login successful');
        
        // Store current staff info for the dashboard
        const currentStaff = isHardcodedStaff ? {
          firstName: 'Shaff',
          lastName: 'Ahmed',
          email: 'shaff@gmail.com',
          staffId: 'STF001'
        } : registeredStaff;
        
        localStorage.setItem('currentStaff', JSON.stringify(currentStaff));
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push('/staff/dashboard');
        return;
      }
      
      // Regular user login logic (placeholder for now)
      console.log('User login attempt:', formData);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For now, redirect to home page for regular users
      router.push('/');
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Login failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      {/* Animated Background */}
      <AnimatedBackground />
      
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-slate-900 tracking-tight">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back to Hostel Management System
          </p>
        </div>

        {/* Form */}
        <form className="mt-8 space-y-6 bg-white/40 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-black/10 border border-white/30" onSubmit={handleSubmit}>
          {errors.general && (
            <div className="bg-red-50/80 backdrop-blur-sm border border-red-300 text-red-600 px-4 py-3 rounded-xl text-sm">
              {errors.general}
            </div>
          )}
          
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                  errors.email ? 'border-red-300' : 'border-white/30'
                } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                  errors.password ? 'border-red-300' : 'border-white/30'
                } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
          </div>

          {/* Remember me and Forgot password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/50"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </a>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-white/30 text-sm font-semibold rounded-2xl text-slate-800 bg-white/40 backdrop-blur-xl hover:bg-white/50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-slate-800 mr-2"></div>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </div>

          {/* Sign up link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign up here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
