import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import HomePage from './components/HomePage';
import TranslatePage from './components/TranslatePage';
import HistoryPage from './components/HistoryPage';
import ProfilePage from './components/ProfilePage';
import './App.css';
import './styles/animations.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [translationHistory, setTranslationHistory] = useState([]);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    avatar: '👤'
  });

  const addToHistory = (entry) => {
    setTranslationHistory([entry, ...translationHistory]);
  };

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('login');
  };

  if (!user) {
    return currentPage === 'login' ? (
      <LoginPage 
        onLogin={handleLogin}
        onSwitchToRegister={() => setCurrentPage('register')}
      />
    ) : (
      <RegisterPage 
        onRegister={handleLogin}
        onSwitchToLogin={() => setCurrentPage('login')}
      />
    );
  }

  return (
    <div>
      {currentPage === 'home' && (
        <HomePage 
          user={user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
        />
      )}
      {currentPage === 'translate' && (
        <TranslatePage 
          user={user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          onAddToHistory={addToHistory}
        />
      )}
      {currentPage === 'history' && (
        <HistoryPage 
          user={user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          history={translationHistory}
        />
      )}
      {currentPage === 'profile' && (
        <ProfilePage 
          user={user}
          onNavigate={setCurrentPage}
          onLogout={handleLogout}
          profile={profile}
          setProfile={setProfile}
          translationHistory={translationHistory}
        />
      )}
    </div>
  );
};

export default App;