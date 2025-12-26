import React from 'react';
import Navigation from './Navigation';
import { Globe2, Clock, Share2 } from 'lucide-react';

const HomePage = ({ user, onNavigate, onLogout }) => {
  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2f1 100%)' }}
    >
      <Navigation currentPage="home" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 gradient-text">
            Welcome to TranslateTe
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Seamless Telugu to English Translation
          </p>
          <button
            onClick={() => onNavigate('translate')}
            className="px-8 py-4 text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
            style={{ background: 'linear-gradient(135deg, #008B8B, #20B2AA)' }}
          >
            Start Translating
          </button>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all animate-fade-in-up delay-100">
            <div
              className="inline-block p-4 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #008B8B, #20B2AA)' }}
            >
              <Globe2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#008B8B' }}>
              Accurate Translation
            </h3>
            <p className="text-gray-600">
              Get precise translations powered by advanced language models
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all animate-fade-in-up delay-200">
            <div
              className="inline-block p-4 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #20B2AA, #66CDAA)' }}
            >
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#008B8B' }}>
              Translation History
            </h3>
            <p className="text-gray-600">
              Access all your previous translations anytime, anywhere
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all animate-fade-in-up delay-300">
            <div
              className="inline-block p-4 rounded-full mb-4"
              style={{ background: 'linear-gradient(135deg, #66CDAA, #008B8B)' }}
            >
              <Share2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold mb-3" style={{ color: '#008B8B' }}>
              Easy Sharing
            </h3>
            <p className="text-gray-600">
              Share and copy translations with a single click
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white rounded-3xl p-12 shadow-xl animate-fade-in-up delay-400">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">1000+</div>
              <div className="text-gray-600 text-lg">Translations</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">500+</div>
              <div className="text-gray-600 text-lg">Active Users</div>
            </div>
            <div>
              <div className="text-5xl font-bold gradient-text mb-2">99%</div>
              <div className="text-gray-600 text-lg">Accuracy Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;