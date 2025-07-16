import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router";
import { Camera, Edit3, Mail, Phone, Calendar, Shield, CheckCircle, Settings, Bell, Lock, User, LogOut } from "lucide-react";
import { api } from "../../api/api";

const Profile = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [userData,setUserData] = useState({})
  const navigate = useNavigate()

  useEffect(()=>{
        fetchProfile()
  },[])
  
  const fetchProfile = async ()=>{
     try {
            const response = await api.get("/users/profile")

            console.log(response.data.data)
            setUserData(response.data.data)
            if(response.data.success===true){
            }
        } catch (error) {
            
        }
  }


  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Profile</h1>
          <p className="text-gray-600">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              {/* Profile Header */}
              <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-8">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative text-center">
                  <div className="relative inline-block">
                    <img
                      src={userData.avatar}
                      alt={userData.fullName}
                      className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover mx-auto"
                    />
                    <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-shadow duration-200">
                      <Camera className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                  <h2 className="mt-4 text-xl font-bold text-white capitalize">{userData.fullName}</h2>
                  <p className="text-blue-100">@{userData.username}</p>
                  <div className="flex items-center justify-center mt-2">
                    {userData.isVerified ? (
                      <div className="flex items-center text-green-200">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        <span className="text-sm">Verified</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-yellow-200">
                        <Shield className="w-4 h-4 mr-1" />
                        <span className="text-sm">Unverified</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="p-4">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center px-4 py-3 rounded-lg mb-2 transition-all duration-200 ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-600 shadow-sm'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5 mr-3" />
                    {tab.label}
                  </button>
                ))}
                <button 
                onClick={()=>navigate("/login")}
                className="w-full flex items-center px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors duration-200 mt-4">
                  <LogOut className="w-5 h-5 mr-3" />
                  Sign Out
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
              {activeTab === 'overview' && (
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-bold text-gray-900">Personal Information</h3>
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                      <Edit3 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={userData.fullName}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 capitalize"
                            readOnly
                          />
                          <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={userData.username}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            readOnly
                          />
                          <span className="absolute left-3 top-3 text-gray-400">@</span>
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                        <div className="relative">
                          <input
                            type="email"
                            value={userData.email}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            readOnly
                          />
                          <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-6">
                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                        <div className="relative">
                          <input
                            type="tel"
                            value={userData.phone}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                            readOnly
                          />
                          <Phone className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Account Created</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formatDate(userData.createdAt)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                            readOnly
                          />
                          <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>

                      <div className="group">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Last Updated</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={formatDate(userData.updatedAt)}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg"
                            readOnly
                          />
                          <Calendar className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Account Status</h4>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${userData.isVerified ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                        <span className="text-gray-700">
                          {userData.isVerified ? 'Account Verified' : 'Verification Pending'}
                        </span>
                      </div>
                      {!userData.isVerified && (
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                          Verify Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'security' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Security Settings</h3>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2">Password</h4>
                      <p className="text-gray-600 mb-4">Manage your password settings</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Change Password
                      </button>
                    </div>
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2">Two-Factor Authentication</h4>
                      <p className="text-gray-600 mb-4">Add an extra layer of security to your account</p>
                      <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200">
                        Enable 2FA
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'notifications' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Notification Preferences</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Email Notifications</h4>
                        <p className="text-gray-600">Receive updates via email</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <h4 className="font-semibold">Push Notifications</h4>
                        <p className="text-gray-600">Receive push notifications</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="p-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div className="p-6 border border-gray-200 rounded-lg">
                      <h4 className="text-lg font-semibold mb-2">Account Privacy</h4>
                      <p className="text-gray-600 mb-4">Manage your privacy settings</p>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Privacy Settings
                      </button>
                    </div>
                    <div className="p-6 border border-red-200 rounded-lg bg-red-50">
                      <h4 className="text-lg font-semibold mb-2 text-red-800">Delete Account</h4>
                      <p className="text-red-600 mb-4">Permanently delete your account and all data</p>
                      <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200">
                        Delete Account
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Profile; 