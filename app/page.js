import Link from "next/link";

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

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background */}
      <AnimatedBackground />
      
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-slate-900 tracking-tight">
                Hostel Management System
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-slate-600 hover:text-slate-900 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-100"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900 sm:text-6xl md:text-7xl tracking-tight">
            <span className="block">Welcome to</span>
            <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Hostel Management
            </span>
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600 sm:text-xl leading-relaxed">
            Streamline your hostel operations with our comprehensive management system. 
            Handle bookings, manage residents, and track payments all in one place.
          </p>
          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center md:mt-10">
            <div className="rounded-xl shadow-lg">
              <Link
                href="/signup"
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-base font-semibold rounded-xl text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Get Started
              </Link>
            </div>
            <div className="mt-4 rounded-xl shadow-lg sm:mt-0 sm:ml-4">
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-8 py-4 border border-slate-300 text-base font-semibold rounded-xl text-slate-700 bg-white hover:bg-slate-50 md:py-4 md:text-lg md:px-10 transition-all duration-200"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-sm font-semibold text-indigo-600 tracking-wide uppercase">Features</h2>
              <p className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl tracking-tight">
                Everything you need to manage your hostel
              </p>
              <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
                Comprehensive tools designed to simplify hostel administration and enhance student experience.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-12">
                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Student Management</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Efficiently manage student registrations, room assignments, and personal information with our intuitive interface.
                  </p>
                </div>

                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Payment Tracking</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Keep track of all payments, dues, and financial transactions with automated reminders and detailed reports.
                  </p>
                </div>

                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Room Management</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Manage room allocations, availability, and maintenance schedules with real-time updates and notifications.
                  </p>
                </div>

                <div className="relative p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="flex items-center justify-center h-14 w-14 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                    <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-slate-900">Reports & Analytics</h3>
                  <p className="mt-3 text-slate-600 leading-relaxed">
                    Generate detailed reports and gain valuable insights into your hostel operations with interactive dashboards.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
