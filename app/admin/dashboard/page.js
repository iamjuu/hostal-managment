'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock student data - In a real app, this would come from your database
const mockStudentData = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@university.edu',
    studentId: 'STU001',
    class: 'Computer Science - Year 3',
    roomNumber: 'A-101',
    phoneNumber: '+1-555-0123',
    guardianName: 'Robert Doe',
    guardianPhone: '+1-555-0124',
    address: '123 Main St, City, State 12345',
    dateOfBirth: '2001-05-15',
    admissionDate: '2022-09-01',
    feeStatus: 'Paid',
    emergencyContact: 'Jane Doe (+1-555-0125)',
    bloodGroup: 'O+',
    medicalConditions: 'None',
    status: 'Active',
    profileImage: 'https://i.pravatar.cc/150?img=11',
    attendance: [88, 92, 85, 90, 95, 87],
    marks: [
      { subject: 'Math', score: 89 },
      { subject: 'CS', score: 93 },
      { subject: 'Electronics', score: 84 },
      { subject: 'Algorithms', score: 91 }
    ]
  },
  {
    id: 2,
    firstName: 'Sarah',
    lastName: 'Johnson',
    email: 'sarah.johnson@university.edu',
    studentId: 'STU002',
    class: 'Business Administration - Year 2',
    roomNumber: 'B-205',
    phoneNumber: '+1-555-0126',
    guardianName: 'Michael Johnson',
    guardianPhone: '+1-555-0127',
    address: '456 Oak Ave, City, State 12346',
    dateOfBirth: '2002-08-22',
    admissionDate: '2023-09-01',
    feeStatus: 'Pending',
    emergencyContact: 'Lisa Johnson (+1-555-0128)',
    bloodGroup: 'A+',
    medicalConditions: 'Asthma',
    status: 'Active',
    profileImage: 'https://i.pravatar.cc/150?img=12',
    attendance: [76, 81, 79, 85, 88, 82],
    marks: [
      { subject: 'Accounting', score: 78 },
      { subject: 'Marketing', score: 85 },
      { subject: 'Economics', score: 80 },
      { subject: 'Statistics', score: 83 }
    ]
  },
  {
    id: 3,
    firstName: 'Michael',
    lastName: 'Chen',
    email: 'michael.chen@university.edu',
    studentId: 'STU003',
    class: 'Engineering - Year 1',
    roomNumber: 'C-312',
    phoneNumber: '+1-555-0129',
    guardianName: 'David Chen',
    guardianPhone: '+1-555-0130',
    address: '789 Pine St, City, State 12347',
    dateOfBirth: '2003-12-10',
    admissionDate: '2024-09-01',
    feeStatus: 'Paid',
    emergencyContact: 'Maria Chen (+1-555-0131)',
    bloodGroup: 'B+',
    medicalConditions: 'None',
    status: 'Active',
    profileImage: 'https://i.pravatar.cc/150?img=13',
    attendance: [90, 92, 88, 91, 93, 94],
    marks: [
      { subject: 'Physics', score: 86 },
      { subject: 'Chemistry', score: 82 },
      { subject: 'Math', score: 90 },
      { subject: 'Mechanics', score: 88 }
    ]
  },
  {
    id: 4,
    firstName: 'Emily',
    lastName: 'Davis',
    email: 'emily.davis@university.edu',
    studentId: 'STU004',
    class: 'Psychology - Year 4',
    roomNumber: 'A-205',
    phoneNumber: '+1-555-0132',
    guardianName: 'James Davis',
    guardianPhone: '+1-555-0133',
    address: '321 Elm St, City, State 12348',
    dateOfBirth: '2000-03-18',
    admissionDate: '2021-09-01',
    feeStatus: 'Overdue',
    emergencyContact: 'Susan Davis (+1-555-0134)',
    bloodGroup: 'AB+',
    medicalConditions: 'Diabetes',
    status: 'Active',
    profileImage: 'https://i.pravatar.cc/150?img=14',
    attendance: [70, 75, 72, 78, 74, 69],
    marks: [
      { subject: 'Clinical', score: 76 },
      { subject: 'Cognition', score: 72 },
      { subject: 'Neuro', score: 68 },
      { subject: 'Research', score: 74 }
    ]
  },
  {
    id: 5,
    firstName: 'Alex',
    lastName: 'Rodriguez',
    email: 'alex.rodriguez@university.edu',
    studentId: 'STU005',
    class: 'Mathematics - Year 2',
    roomNumber: 'B-108',
    phoneNumber: '+1-555-0135',
    guardianName: 'Carlos Rodriguez',
    guardianPhone: '+1-555-0136',
    address: '654 Maple Dr, City, State 12349',
    dateOfBirth: '2002-11-05',
    admissionDate: '2023-09-01',
    feeStatus: 'Paid',
    emergencyContact: 'Ana Rodriguez (+1-555-0137)',
    bloodGroup: 'O-',
    medicalConditions: 'None',
    status: 'Active',
    profileImage: 'https://i.pravatar.cc/150?img=15',
    attendance: [82, 85, 80, 88, 86, 84],
    marks: [
      { subject: 'Algebra', score: 88 },
      { subject: 'Calculus', score: 91 },
      { subject: 'Statistics', score: 85 },
      { subject: 'Geometry', score: 87 }
    ]
  }
];

export default function AdminDashboard() {
  const router = useRouter();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setStudents(mockStudentData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Filter students based on search and filters
  const filteredStudents = students.filter(student => {
    const matchesSearch = 
      student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesClass = filterClass === '' || student.class.includes(filterClass);
    const matchesStatus = filterStatus === '' || student.feeStatus === filterStatus;
    
    return matchesSearch && matchesClass && matchesStatus;
  });

  // Get unique classes for filter dropdown
  const uniqueClasses = [...new Set(students.map(student => student.class.split(' - ')[0]))];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid': return 'bg-green-100 text-green-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  // Helpers for simple pie charts using CSS conic-gradient
  const pieColors = ['#6366F1', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#14B8A6', '#3B82F6', '#F97316', '#22C55E', '#E11D48'];
  const buildConicGradient = (slices) => {
    const total = slices.reduce((sum, s) => sum + Math.max(0, s.value || 0), 0);
    if (total <= 0) return 'conic-gradient(#e5e7eb 0 360deg)';
    let current = 0;
    const stops = slices.map((s) => {
      const angle = (Math.max(0, s.value) / total) * 360;
      const start = current;
      const end = current + angle;
      current = end;
      return `${s.color} ${start}deg ${end}deg`;
    });
    return `conic-gradient(${stops.join(',')})`;
  };

  const handleLogout = () => {
    // In a real app, you would clear authentication tokens/session here
    console.log('Admin logged out');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600">Hostel Management System</p>
              <p className="text-sm text-indigo-600">Welcome back, Administrator!</p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Students</dt>
                    <dd className="text-lg font-medium text-gray-900">{students.length}</dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Fees Paid</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {students.filter(s => s.feeStatus === 'Paid').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Pending Fees</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {students.filter(s => s.feeStatus === 'Pending').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Overdue Fees</dt>
                    <dd className="text-lg font-medium text-gray-900">
                      {students.filter(s => s.feeStatus === 'Overdue').length}
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search Students</label>
              <input
                type="text"
                placeholder="Search by name, ID, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Class</label>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Classes</option>
                {uniqueClasses.map(className => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by Fee Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">All Statuses</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterClass('');
                  setFilterStatus('');
                }}
                className="flex-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium"
              >
                Clear Filters
              </button>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setFilterClass('');
                  setFilterStatus('');
                }}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium"
              >
                Show All Students
              </button>
            </div>
          </div>
        </div>

        {/* Students Table */}
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Student Details ({filteredStudents.length} students)
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Complete information about all registered students
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class & Room</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div
                            className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center cursor-pointer hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 overflow-hidden"
                            onClick={() => setSelectedStudent(student)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                setSelectedStudent(student);
                              }
                            }}
                            aria-label={`View details for ${student.firstName} ${student.lastName}`}
                            title={`View details for ${student.firstName} ${student.lastName}`}
                          >
                            {student.profileImage ? (
                              // eslint-disable-next-line @next/next/no-img-element
                              <img
                                src={student.profileImage}
                                alt={`${student.firstName} ${student.lastName}`}
                                className="h-10 w-10 object-cover"
                              />
                            ) : (
                              <span className="text-sm font-medium text-white">
                                {student.firstName[0]}{student.lastName[0]}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{student.studentId}</div>
                          <div className="text-sm text-gray-500">{student.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.class}</div>
                      <div className="text-sm text-gray-500">Room: {student.roomNumber}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{student.phoneNumber}</div>
                      <div className="text-sm text-gray-500">{student.guardianName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(student.feeStatus)}`}>
                        {student.feeStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="text-indigo-600 hover:text-indigo-900 mr-3"
                      >
                        View Details
                      </button>
                      <button className="text-green-600 hover:text-green-900 mr-3">
                        Edit
                      </button>
                      <button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Student Details - {selectedStudent.firstName} {selectedStudent.lastName}
              </h3>
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[34rem] overflow-y-auto">
              <div className="flex items-center space-x-4 md:col-span-2">
                <div className="h-16 w-16 rounded-full bg-indigo-500 overflow-hidden flex items-center justify-center">
                  {selectedStudent.profileImage ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={selectedStudent.profileImage}
                      alt={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
                      className="h-16 w-16 object-cover"
                    />
                  ) : (
                    <span className="text-lg font-medium text-white">
                      {selectedStudent.firstName[0]}{selectedStudent.lastName[0]}
                    </span>
                  )}
                </div>
                <div>
                  <div className="text-base font-semibold text-gray-900">
                    {selectedStudent.firstName} {selectedStudent.lastName}
                  </div>
                  <div className="text-sm text-gray-500">{selectedStudent.studentId}</div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Personal Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Name:</span> {selectedStudent.firstName} {selectedStudent.lastName}</p>
                  <p><span className="font-medium">Student ID:</span> {selectedStudent.studentId}</p>
                  <p><span className="font-medium">Email:</span> {selectedStudent.email}</p>
                  <p><span className="font-medium">Phone:</span> {selectedStudent.phoneNumber}</p>
                  <p><span className="font-medium">Date of Birth:</span> {selectedStudent.dateOfBirth}</p>
                  <p><span className="font-medium">Blood Group:</span> {selectedStudent.bloodGroup}</p>
                  <p><span className="font-medium">Address:</span> {selectedStudent.address}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Academic & Hostel Details</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Class:</span> {selectedStudent.class}</p>
                  <p><span className="font-medium">Room Number:</span> {selectedStudent.roomNumber}</p>
                  <p><span className="font-medium">Admission Date:</span> {selectedStudent.admissionDate}</p>
                  <p><span className="font-medium">Status:</span> {selectedStudent.status}</p>
                  <p><span className="font-medium">Fee Status:</span> 
                    <span className={`ml-2 px-2 py-1 text-xs rounded-full ${getStatusColor(selectedStudent.feeStatus)}`}>
                      {selectedStudent.feeStatus}
                    </span>
                  </p>
                </div>
              </div>
              
              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-700 mb-2">Attendance (last 6 months)</h4>
                <div className="flex items-end space-x-3 h-32 bg-gray-50 p-3 rounded">
                  {selectedStudent.attendance && selectedStudent.attendance.length > 0 ? (
                    selectedStudent.attendance.map((value, idx) => (
                      <div key={`att-${idx}`} className="flex flex-col items-center justify-end h-full">
                        <div
                          className="w-6 bg-indigo-500 rounded"
                          style={{ height: `${Math.max(4, Math.min(100, value))}%` }}
                          title={`${value}%`}
                        />
                        <span className="mt-1 text-[10px] text-gray-500">M{idx + 1}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No attendance data</div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-700 mb-2">Attendance Overview (Pie Chart)</h4>
                <div className="flex items-center space-x-6">
                  <div className="relative w-32 h-32">
                    <div
                      className="w-32 h-32 rounded-full"
                      style={{
                        background: buildConicGradient([
                          { value: selectedStudent.attendance?.reduce((sum, val) => sum + val, 0) / (selectedStudent.attendance?.length || 1), color: '#10B981' },
                          { value: 100 - (selectedStudent.attendance?.reduce((sum, val) => sum + val, 0) / (selectedStudent.attendance?.length || 1)), color: '#EF4444' }
                        ])
                      }}
                    />
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {Math.round(selectedStudent.attendance?.reduce((sum, val) => sum + val, 0) / (selectedStudent.attendance?.length || 1))}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Present</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Absent</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-700 mb-2">Marks</h4>
                <div className="flex items-end space-x-3 h-40 bg-gray-50 p-3 rounded">
                  {selectedStudent.marks && selectedStudent.marks.length > 0 ? (
                    selectedStudent.marks.map((item, idx) => (
                      <div key={`mark-${idx}`} className="flex flex-col items-center justify-end h-full">
                        <div
                          className="w-8 bg-green-500 rounded"
                          style={{ height: `${Math.max(4, Math.min(100, item.score))}%` }}
                          title={`${item.subject}: ${item.score}`}
                        />
                        <span className="mt-1 text-[10px] text-gray-500 truncate max-w-[3rem]" title={item.subject}>{item.subject}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-gray-500">No marks data</div>
                  )}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="font-semibold text-gray-700 mb-2">Marks Distribution (Pie Chart)</h4>
                <div className="flex items-center space-x-6">
                  <div className="relative w-32 h-32">
                    <div
                      className="w-32 h-32 rounded-full"
                      style={{
                        background: buildConicGradient(
                          selectedStudent.marks?.map((mark, idx) => ({
                            value: mark.score,
                            color: pieColors[idx % pieColors.length]
                          })) || []
                        )
                      }}
                    />
                    <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center">
                      <span className="text-sm font-semibold text-gray-700">
                        {Math.round(selectedStudent.marks?.reduce((sum, mark) => sum + mark.score, 0) / (selectedStudent.marks?.length || 1))}%
                      </span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {selectedStudent.marks?.map((mark, idx) => (
                      <div key={`legend-${idx}`} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: pieColors[idx % pieColors.length] }}
                        ></div>
                        <span className="text-sm text-gray-600">{mark.subject}: {mark.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Guardian Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Guardian Name:</span> {selectedStudent.guardianName}</p>
                  <p><span className="font-medium">Guardian Phone:</span> {selectedStudent.guardianPhone}</p>
                  <p><span className="font-medium">Emergency Contact:</span> {selectedStudent.emergencyContact}</p>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">Medical Information</h4>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">Medical Conditions:</span> {selectedStudent.medicalConditions}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-6 space-x-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              >
                Close
              </button>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
                Edit Student
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
