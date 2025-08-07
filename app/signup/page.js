'use client';

import { useState } from 'react';
import Link from 'next/link';

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

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'student'
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
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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
      // Store staff data in localStorage for demo purposes
      if (formData.userType === 'staff') {
        const staffData = {
          id: Date.now(),
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          userType: formData.userType,
          staffId: `STF${String(Date.now()).slice(-3)}`,
          department: 'Hostel Management',
          position: 'Staff Member',
          phoneNumber: '',
          joinDate: new Date().toISOString().split('T')[0],
          address: '',
          dateOfBirth: '',
          emergencyContact: '',
          bloodGroup: '',
          shift: 'Day Shift',
          status: 'Active',
          createdAt: new Date().toISOString()
        };
        
        // Store in localStorage (in a real app, this would be sent to your backend)
        const existingStaff = JSON.parse(localStorage.getItem('staffData') || '[]');
        existingStaff.push(staffData);
        localStorage.setItem('staffData', JSON.stringify(existingStaff));
        
        console.log('Staff signup successful:', staffData);
      } else {
        console.log('Signup attempt:', formData);
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect to login page after successful signup
      alert(`${formData.userType.charAt(0).toUpperCase() + formData.userType.slice(1)} account created successfully! Please login.`);
      // router.push('/login');
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: 'Signup failed. Please try again.' });
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
            Create your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Join the Hostel Management System
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
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-slate-700 mb-1">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  autoComplete="given-name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                    errors.firstName ? 'border-red-300' : 'border-white/30'
                  } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                  placeholder="First name"
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-slate-700 mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  autoComplete="family-name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                    errors.lastName ? 'border-red-300' : 'border-white/30'
                  } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                  placeholder="Last name"
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
            </div>

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

            {/* User Type Selection */}
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-slate-700 mb-1">
                User Type
              </label>
              <select
                id="userType"
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="appearance-none rounded-xl relative block w-full px-3 py-2 border border-white/30 bg-white/50 backdrop-blur-sm placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300"
              >
                <option value="student">Student</option>
                <option value="admin">Administrator</option>
                <option value="staff">Staff</option>
              </select>
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
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                  errors.password ? 'border-red-300' : 'border-white/30'
                } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                placeholder="Create a password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1">
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`appearance-none rounded-xl relative block w-full px-3 py-2 border bg-white/50 backdrop-blur-sm ${
                  errors.confirmPassword ? 'border-red-300' : 'border-white/30'
                } placeholder-slate-500 text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition-all duration-300`}
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-white/30 rounded bg-white/50"
              required
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
              I agree to the{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Terms and Conditions
              </a>{' '}
              and{' '}
              <a href="#" className="text-indigo-600 hover:text-indigo-500 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-2xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-black/10 hover:shadow-xl hover:shadow-black/20"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </button>
          </div>

          {/* Sign in link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                Sign in here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
