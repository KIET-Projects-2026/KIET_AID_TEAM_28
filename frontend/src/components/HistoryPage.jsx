import React from 'react';
import Navigation from './Navigation';
import { Clock, Languages, Copy, Share2 } from 'lucide-react';

const HistoryPage = ({ user, onNavigate, onLogout, history }) => {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleShare = (item) => {
    if (navigator.share) {
      navigator.share({
        title: 'Translation',
        text: `${item.source}\n\nTranslation:\n${item.translation}`
      });
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2f1 100%)' }}
    >
      <Navigation currentPage="history" onNavigate={onNavigate} onLogout={onLogout} />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 gradient-text animate-fade-in-up">
          Translation History
        </h1>

        {history.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-xl animate-fade-in-up">
            <Clock className="w-24 h-24 mx-auto mb-6 text-gray-300" />
            <h3 className="text-2xl font-semibold text-gray-600 mb-4">No translations yet</h3>
            <p className="text-gray-500 mb-6">Start translating to see your history here</p>
            <button
              onClick={() => onNavigate('translate')}
              className="px-6 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
              style={{ background: 'linear-gradient(135deg, #008B8B, #20B2AA)' }}
            >
              Start Translating
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {history.map((item, index) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className="p-2 rounded-full"
                      style={{ background: 'linear-gradient(135deg, #008B8B, #20B2AA)' }}
                    >
                      <Languages className="w-5 h-5 text-white" />
                    </div>
                    <span className="font-semibold" style={{ color: '#008B8B' }}>
                      {item.language}
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{item.timestamp}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Original Text</h4>
                    <p className="text-gray-700">{item.source}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">Translation</h4>
                    <p className="text-gray-700">{item.translation}</p>
                  </div>
                </div>

                <div className="mt-4 flex space-x-3">
                  <button
                    onClick={() => handleCopy(item.translation)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white border-2 rounded-lg font-medium hover:shadow-md transition-all"
                    style={{ borderColor: '#20B2AA', color: '#20B2AA' }}
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </button>
                  <button
                    onClick={() => handleShare(item)}
                    className="flex items-center space-x-2 px-4 py-2 text-white rounded-lg font-medium hover:shadow-md transition-all"
                    style={{ background: 'linear-gradient(135deg, #20B2AA, #66CDAA)' }}
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;