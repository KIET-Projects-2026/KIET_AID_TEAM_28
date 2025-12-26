import React, { useState } from 'react';
import { Home, Languages, Clock, User, LogOut, Menu, X } from 'lucide-react';

const Navigation = ({ currentPage, onNavigate, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'translate', label: 'Translate', icon: Languages },
    { id: 'history', label: 'History', icon: Clock },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <nav className="shadow-lg" style={{background: 'linear-gradient(90deg, #008B8B, #20B2AA)'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <Languages className="w-8 h-8 text-white" />
            <span className="text-white text-xl font-bold">TranslateTe</span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onNavigate(id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  currentPage === id ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
                }`}
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white">{label}</span>
              </button>
            ))}
            <button
              onClick={onLogout}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <LogOut className="w-5 h-5 text-white" />
              <span className="text-white">Logout</span>
            </button>
          </div>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => {
                  onNavigate(id);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
              >
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white">{label}</span>
              </button>
            ))}
            <button
              onClick={() => {
                onLogout();
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center space-x-2 w-full px-4 py-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all"
            >
              <LogOut className="w-5 h-5 text-white" />
              <span className="text-white">Logout</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;