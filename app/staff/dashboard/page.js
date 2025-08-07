'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Mock staff data - In a real app, this would come from your database
const mockStaffData = {
  id: 1,
  firstName: 'Shaff',
  lastName: 'Ahmed',
  email: 'shaff@gmail.com',
  staffId: 'STF001',
  department: 'Hostel Management',
  position: 'Warden',
  phoneNumber: '+1-555-0150',
  joinDate: '2022-01-15',
  address: '789 Staff Quarters, Campus, State 12350',
  dateOfBirth: '1985-07-20',
  emergencyContact: 'Fatima Ahmed (+1-555-0151)',
  bloodGroup: 'B+',
  shift: 'Day Shift (9 AM - 6 PM)',
  status: 'Active',
  responsibilities: [
    'Student supervision and discipline',
    'Room allocation and management',
    'Maintenance coordination',
    'Emergency response',
    'Daily reports and documentation'
  ],
  recentActivities: [
    { id: 1, date: '2024-08-07', activity: 'Completed morning room inspection', type: 'inspection' },
    { id: 2, date: '2024-08-07', activity: 'Resolved noise complaint in Block A', type: 'complaint' },
    { id: 3, date: '2024-08-06', activity: 'Coordinated maintenance for Room B-205', type: 'maintenance' },
    { id: 4, date: '2024-08-06', activity: 'New student orientation session', type: 'orientation' },
    { id: 5, date: '2024-08-05', activity: 'Monthly safety drill conducted', type: 'safety' }
  ],
  assignedRooms: [
    { roomNumber: 'A-101', capacity: 2, occupied: 2, status: 'Full' },
    { roomNumber: 'A-102', capacity: 2, occupied: 1, status: 'Vacant' },
    { roomNumber: 'A-103', capacity: 2, occupied: 2, status: 'Full' },
    { roomNumber: 'A-104', capacity: 2, occupied: 0, status: 'Maintenance' },
    { roomNumber: 'A-105', capacity: 2, occupied: 2, status: 'Full' }
  ],
  studentsUnderSupervision: [
    { id: 1, name: 'John Doe', roomNumber: 'A-101', status: 'Good' },
    { id: 2, name: 'Sarah Johnson', roomNumber: 'A-102', status: 'Good' },
    { id: 3, name: 'Michael Chen', roomNumber: 'A-103', status: 'Warning' },
    { id: 4, name: 'Emily Davis', roomNumber: 'A-105', status: 'Good' }
  ],
  pendingTasks: [
    { id: 1, task: 'Submit weekly inspection report', priority: 'High', dueDate: '2024-08-08' },
    { id: 2, task: 'Schedule maintenance for Block A common area', priority: 'Medium', dueDate: '2024-08-10' },
    { id: 3, task: 'Review disciplinary cases', priority: 'High', dueDate: '2024-08-09' },
    { id: 4, task: 'Update room occupancy records', priority: 'Low', dueDate: '2024-08-12' }
  ]
};

export default function StaffDashboard() {
  const router = useRouter();
  const [staffData, setStaffData] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load current staff data from localStorage
    const timer = setTimeout(() => {
      const currentStaff = JSON.parse(localStorage.getItem('currentStaff') || '{}');
      
      if (currentStaff.email) {
        // Merge current staff info with mock data structure
        const staffInfo = {
          ...mockStaffData,
          firstName: currentStaff.firstName || mockStaffData.firstName,
          lastName: currentStaff.lastName || mockStaffData.lastName,
          email: currentStaff.email || mockStaffData.email,
          staffId: currentStaff.staffId || mockStaffData.staffId,
          department: currentStaff.department || mockStaffData.department,
          position: currentStaff.position || mockStaffData.position,
          phoneNumber: currentStaff.phoneNumber || mockStaffData.phoneNumber,
          joinDate: currentStaff.joinDate || mockStaffData.joinDate,
          address: currentStaff.address || mockStaffData.address,
          dateOfBirth: currentStaff.dateOfBirth || mockStaffData.dateOfBirth,
          emergencyContact: currentStaff.emergencyContact || mockStaffData.emergencyContact,
          bloodGroup: currentStaff.bloodGroup || mockStaffData.bloodGroup,
          shift: currentStaff.shift || mockStaffData.shift,
          status: currentStaff.status || mockStaffData.status
        };
        setStaffData(staffInfo);
      } else {
        // Fallback to mock data if no current staff
        setStaffData(mockStaffData);
      }
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'inspection':
        return (
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'complaint':
        return (
          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
        );
      case 'maintenance':
        return (
          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
        );
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoomStatusColor = (status) => {
    switch (status) {
      case 'Full': return 'bg-red-100 text-red-800';
      case 'Vacant': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStudentStatusColor = (status) => {
    switch (status) {
      case 'Good': return 'bg-green-100 text-green-800';
      case 'Warning': return 'bg-yellow-100 text-yellow-800';
      case 'Disciplinary': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleLogout = () => {
    // Clear current staff data
    localStorage.removeItem('currentStaff');
    console.log('Staff logged out');
    router.push('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading staff dashboard...</p>
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
              <h1 className="text-3xl font-bold text-gray-900">Staff Dashboard</h1>
              <p className="text-gray-600">Hostel Management System</p>
              <p className="text-sm text-green-600">
                Welcome back, {staffData.firstName} {staffData.lastName}!
              </p>
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
        {/* Staff Info Card */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <div className="h-20 w-20 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">
                  {staffData.firstName[0]}{staffData.lastName[0]}
                </span>
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900">
                {staffData.firstName} {staffData.lastName}
              </h2>
              <p className="text-lg text-gray-600">{staffData.position}</p>
              <p className="text-sm text-gray-500">{staffData.department}</p>
              <div className="mt-2 flex space-x-4 text-sm text-gray-500">
                <span>ID: {staffData.staffId}</span>
                <span>•</span>
                <span>{staffData.email}</span>
                <span>•</span>
                <span>{staffData.shift}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <span className="inline-flex px-3 py-1 text-sm font-semibold rounded-full bg-green-100 text-green-800">
                {staffData.status}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white shadow rounded-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {[
                { id: 'overview', label: 'Overview' },
                { id: 'rooms', label: 'Room Management' },
                { id: 'students', label: 'Students' },
                { id: 'tasks', label: 'Tasks' },
                { id: 'profile', label: 'Profile' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-green-500 text-green-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10.707 2.293a1 1 0 00-1.414 0l-9 9a1 1 0 001.414 1.414L8 5.414V17a1 1 0 102 0V5.414l6.293 6.293a1 1 0 001.414-1.414l-9-9z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-blue-600">Assigned Rooms</p>
                        <p className="text-2xl font-bold text-blue-900">{staffData.assignedRooms.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-green-600">Students Supervised</p>
                        <p className="text-2xl font-bold text-green-900">{staffData.studentsUnderSupervision.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-yellow-600">Pending Tasks</p>
                        <p className="text-2xl font-bold text-yellow-900">{staffData.pendingTasks.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <div className="flex items-center">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </div>
                      <div className="ml-4">
                        <p className="text-sm font-medium text-purple-600">Recent Activities</p>
                        <p className="text-2xl font-bold text-purple-900">{staffData.recentActivities.length}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Activities */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activities</h3>
                  <div className="space-y-3">
                    {staffData.recentActivities.slice(0, 5).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        {getActivityIcon(activity.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-gray-900">{activity.activity}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Room Management Tab */}
            {activeTab === 'rooms' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Assigned Rooms</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Occupied</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffData.assignedRooms.map((room) => (
                        <tr key={room.roomNumber}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {room.roomNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room.capacity}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {room.occupied}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRoomStatusColor(room.status)}`}>
                              {room.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              Inspect
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              Details
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Students Under Supervision</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Room</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {staffData.studentsUnderSupervision.map((student) => (
                        <tr key={student.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                                  <span className="text-xs font-medium text-gray-700">
                                    {student.name.split(' ').map(n => n[0]).join('')}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900">{student.name}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {student.roomNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStudentStatusColor(student.status)}`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-green-600 hover:text-green-900 mr-3">
                              View Profile
                            </button>
                            <button className="text-blue-600 hover:text-blue-900">
                              Contact
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Tasks Tab */}
            {activeTab === 'tasks' && (
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Tasks</h3>
                <div className="space-y-3">
                  {staffData.pendingTasks.map((task) => (
                    <div key={task.id} className="bg-gray-50 p-4 rounded-lg flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{task.task}</p>
                        <p className="text-xs text-gray-500">Due: {task.dueDate}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        <button className="text-green-600 hover:text-green-900 text-sm font-medium">
                          Complete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Name:</span>
                      <span className="text-sm text-gray-900">{staffData.firstName} {staffData.lastName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Staff ID:</span>
                      <span className="text-sm text-gray-900">{staffData.staffId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Email:</span>
                      <span className="text-sm text-gray-900">{staffData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Phone:</span>
                      <span className="text-sm text-gray-900">{staffData.phoneNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Date of Birth:</span>
                      <span className="text-sm text-gray-900">{staffData.dateOfBirth}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Blood Group:</span>
                      <span className="text-sm text-gray-900">{staffData.bloodGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Address:</span>
                      <span className="text-sm text-gray-900">{staffData.address}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Emergency Contact:</span>
                      <span className="text-sm text-gray-900">{staffData.emergencyContact}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Work Information</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Position:</span>
                      <span className="text-sm text-gray-900">{staffData.position}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Department:</span>
                      <span className="text-sm text-gray-900">{staffData.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Join Date:</span>
                      <span className="text-sm text-gray-900">{staffData.joinDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Shift:</span>
                      <span className="text-sm text-gray-900">{staffData.shift}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-gray-500">Status:</span>
                      <span className="text-sm text-gray-900">{staffData.status}</span>
                    </div>
                  </div>

                  <div className="mt-6">
                    <h5 className="text-sm font-medium text-gray-700 mb-2">Responsibilities:</h5>
                    <ul className="text-sm text-gray-600 space-y-1">
                      {staffData.responsibilities.map((responsibility, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-green-500 mr-2">•</span>
                          {responsibility}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
