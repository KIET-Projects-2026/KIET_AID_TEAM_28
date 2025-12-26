import React, { useState, useEffect } from 'react';
import Navigation from './Navigation';
import { User, Mail, Phone, Edit3, Check, Camera, Zap, Target, Award, Calendar } from 'lucide-react';

const ProfilePage = ({ user, onNavigate, onLogout, profile, setProfile, translationHistory = [] }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editedProfile, setEditedProfile] = useState({});
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  // Initialize edited profile when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setEditedProfile({
        name: profile?.name || user?.name || '',
        email: profile?.email || user?.email || '',
        phone: profile?.phone || '',
        bio: profile?.bio || '',
        avatar: profile?.avatar || '😊'
      });
    }
  }, [isEditing, profile, user]);

  const showNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Update profile in parent component
      setProfile(editedProfile);
      
      // Here you can add API call to update backend
      // const response = await fetch(`http://localhost:5000/api/user/${user.email}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(editedProfile)
      // });
      
      setTimeout(() => {
        setIsSaving(false);
        setIsEditing(false);
        showNotification('Profile updated successfully!', 'success');
      }, 800);
    } catch (error) {
      setIsSaving(false);
      showNotification('Failed to update profile', 'error');
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedProfile({});
  };

  const handleInputChange = (field, value) => {
    setEditedProfile(prev => ({ ...prev, [field]: value }));
  };

  const avatarEmojis = ['😊', '🎯', '🚀', '💡', '🌟', '🎨', '✨', '🌈', '🦄', '🎭', '🎪', '🌺'];

  // Use edited profile data when editing, otherwise use current profile/user data
  const displayData = isEditing ? editedProfile : {
    name: profile?.name || user?.name || 'User Name',
    email: profile?.email || user?.email || 'user@example.com',
    phone: profile?.phone || '',
    bio: profile?.bio || '',
    avatar: profile?.avatar || '😊'
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2f1 100%)' }}>
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 opacity-5 rounded-full animate-float" style={{ background: '#008B8B' }}></div>
        <div
          className="absolute bottom-20 right-20 w-96 h-96 opacity-5 rounded-full animate-float"
          style={{ background: '#20B2AA', animationDelay: '1s' }}
        ></div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-slide-down {
          animation: slideDown 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .stat-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .stat-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0, 139, 139, 0.2);
        }
      `}</style>

      <Navigation currentPage="profile" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-20 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl animate-slide-down ${
          notification.type === 'success' ? 'text-white' : 'bg-red-500 text-white'
        } font-semibold`}
        style={notification.type === 'success' ? { background: 'linear-gradient(135deg, #008B8B, #20B2AA)' } : {}}>
          {notification.message}
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden mb-6 animate-fade-in">
          <div className="relative h-32" style={{ background: 'linear-gradient(135deg, #008B8B 0%, #20B2AA 100%)' }}>
            {/* Animated background shapes */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white rounded-full -mr-20 -mt-20 animate-float"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full -ml-32 -mb-32" style={{ animationDelay: '1s' }}></div>
            </div>
          </div>
          
          <div className="relative px-6 pb-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-4 -mt-16">
              {/* Avatar */}
              <div className="relative group">
                <div className="w-28 h-28 rounded-2xl bg-white flex items-center justify-center text-6xl shadow-xl ring-4 ring-white transform transition-all hover:scale-105">
                  {displayData.avatar}
                </div>
                {isEditing && (
                  <div className="absolute -bottom-2 -right-2 p-2.5 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-110" style={{ background: '#008B8B' }}>
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left mb-3 md:mb-0">
                <h1 className="text-3xl font-bold mb-1" style={{ color: '#008B8B' }}>
                  {displayData.name}
                </h1>
                <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-4 h-4" />
                  {displayData.email}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="px-5 py-2.5 rounded-xl font-semibold text-gray-700 shadow-md hover:shadow-lg transform hover:scale-105 transition-all bg-gray-100 hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  disabled={isSaving}
                  className="px-6 py-2.5 rounded-xl font-semibold text-white shadow-md hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 flex items-center gap-2"
                  style={{ background: 'linear-gradient(135deg, #008B8B, #20B2AA)' }}
                >
                  {isSaving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </>
                  ) : isEditing ? (
                    <><Check className="w-4 h-4" /> Save</>
                  ) : (
                    <><Edit3 className="w-4 h-4" /> Edit Profile</>
                  )}
                </button>
              </div>
            </div>

            {/* Avatar Selection */}
            {isEditing && (
              <div className="mt-6 p-5 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl animate-fade-in">
                <p className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: '#008B8B' }}>
                  <Camera className="w-4 h-4" />
                  Choose your avatar
                </p>
                <div className="flex flex-wrap gap-2.5 justify-center md:justify-start">
                  {avatarEmojis.map((emoji, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleInputChange('avatar', emoji)}
                      className={`text-3xl w-14 h-14 rounded-xl transition-all transform ${
                        displayData.avatar === emoji
                          ? 'bg-white scale-110 shadow-lg ring-2'
                          : 'bg-white hover:bg-gray-50 hover:scale-105 shadow-md'
                      }`}
                      style={displayData.avatar === emoji ? { ringColor: '#008B8B' } : {}}
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid - Only 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-5 shadow-lg stat-card">
            <div className="flex items-center justify-between mb-3">
              <Zap className="w-8 h-8" style={{ color: '#008B8B' }} />
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#20B2AA' }}>TOTAL</span>
            </div>
            <div className="text-4xl font-bold mb-1" style={{ color: '#008B8B' }}>{translationHistory.length}</div>
            <div className="text-gray-600 font-medium">Translations</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg stat-card">
            <div className="flex items-center justify-between mb-3">
              <Target className="w-8 h-8" style={{ color: '#008B8B' }} />
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#20B2AA' }}>RATE</span>
            </div>
            <div className="text-4xl font-bold mb-1" style={{ color: '#008B8B' }}>98%</div>
            <div className="text-gray-600 font-medium">Accuracy</div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-lg stat-card">
            <div className="flex items-center justify-between mb-3">
              <Award className="w-8 h-8" style={{ color: '#008B8B' }} />
              <span className="text-xs font-bold px-3 py-1 rounded-full text-white" style={{ background: '#20B2AA' }}>LEVEL</span>
            </div>
            <div className="text-4xl font-bold mb-1" style={{ color: '#008B8B' }}>Pro</div>
            <div className="text-gray-600 font-medium">User Rank</div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="bg-white rounded-2xl shadow-lg p-6 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-2xl font-bold mb-5 flex items-center gap-2" style={{ color: '#008B8B' }}>
            <User className="w-6 h-6" />
            Personal Information
          </h2>
          
          <div className="space-y-4">
            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <User className="w-4 h-4" style={{ color: '#008B8B' }} />
                Full Name
              </label>
              <input
                type="text"
                value={displayData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                disabled={!isEditing}
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-gray-800 font-medium ${
                  isEditing
                    ? 'border-teal-300 focus:ring-4 focus:ring-teal-100 bg-white'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed'
                } focus:outline-none`}
                style={isEditing ? { borderColor: '#20B2AA' } : {}}
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4" style={{ color: '#008B8B' }} />
                Email Address
              </label>
              <input
                type="email"
                value={displayData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={true}
                className="w-full px-4 py-3 rounded-xl border-2 transition-all text-gray-800 font-medium border-gray-200 bg-gray-50 cursor-not-allowed focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                <Phone className="w-4 h-4" style={{ color: '#008B8B' }} />
                Phone Number
              </label>
              <input
                type="tel"
                value={displayData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
                placeholder="Enter phone number"
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all font-medium ${
                  isEditing
                    ? 'border-teal-300 focus:ring-4 focus:ring-teal-100 bg-white text-gray-800'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-800 placeholder-gray-400'
                } focus:outline-none`}
                style={isEditing ? { borderColor: '#20B2AA' } : {}}
              />
            </div>

            <div className="group">
              <label className="block text-sm font-semibold text-gray-700 mb-2">About You</label>
              <textarea
                value={displayData.bio}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                disabled={!isEditing}
                placeholder="Share something about yourself..."
                className={`w-full px-4 py-3 rounded-xl border-2 transition-all resize-none font-medium ${
                  isEditing
                    ? 'border-teal-300 focus:ring-4 focus:ring-teal-100 bg-white text-gray-800'
                    : 'border-gray-200 bg-gray-50 cursor-not-allowed text-gray-800 placeholder-gray-400'
                } focus:outline-none`}
                style={isEditing ? { borderColor: '#20B2AA' } : {}}
                rows="3"
              />
            </div>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mt-6 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2" style={{ color: '#008B8B' }}>
            <Calendar className="w-6 h-6" />
            Account Details
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1 font-medium">Member Since</p>
              <p className="text-xl font-bold" style={{ color: '#008B8B' }}>December 2024</p>
            </div>
            
            <div className="bg-gradient-to-r from-teal-50 to-cyan-50 rounded-xl p-4">
              <p className="text-gray-600 text-sm mb-1 font-medium">Account Status</p>
              <p className="text-xl font-bold flex items-center gap-2" style={{ color: '#008B8B' }}>
                <span className="w-2.5 h-2.5 rounded-full animate-pulse" style={{ background: '#20B2AA' }}></span>
                Active
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;