import React, { useState } from 'react';
import Navigation from './Navigation';
import { Languages, Copy, Share2, CheckCircle2 } from 'lucide-react';

const TranslatePage = ({ onNavigate, onLogout, onAddToHistory }) => {
  const [sourceText, setSourceText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [error, setError] = useState('');

  // Backend API
  const API_URL = 'http://localhost:5000/api/translate';

  const translateText = async () => {
    if (!sourceText.trim()) {
      setError('Please enter some text to translate');
      return;
    }

    setIsTranslating(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sourceText })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setTranslatedText(data.translation);

        const newEntry = {
          id: Date.now(),
          source: sourceText,
          translation: data.translation,
          timestamp: new Date().toLocaleString(),
          language: 'Telugu → English'
        };

        onAddToHistory(newEntry);
      } else {
        setError(data.error || 'Translation failed');
      }
    } catch (err) {
      setError(`Failed to connect to translation server: ${err.message}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText);
    alert('Copied to clipboard!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Translation',
        text: translatedText
      });
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2f1 100%)' }}
    >
      <Navigation
        currentPage="translate"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12">
          Telugu to English Translation
        </h1>

        {error && (
          <div className="mb-6 p-4 bg-red-100 border-2 border-red-400 rounded-xl text-red-700">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-3">Telugu</h3>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              placeholder="Type Telugu text here..."
              className="w-full h-64 p-4 border-2 rounded-xl resize-none text-lg"
            />
            <div className="mt-4 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {sourceText.length} characters
              </span>
              <button
                onClick={translateText}
                disabled={isTranslating}
                className="px-6 py-3 text-white font-semibold rounded-xl bg-teal-600 disabled:opacity-50"
              >
                {isTranslating ? 'Translating...' : 'Translate'}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <h3 className="text-xl font-semibold mb-3">English</h3>

            {isTranslating ? (
              <div className="h-64 flex flex-col items-center justify-center">
                <Languages className="w-12 h-12 animate-spin text-teal-600" />
                <p className="mt-4">Translating...</p>
              </div>
            ) : (
              <div className="h-64 p-4 border-2 rounded-xl overflow-y-auto text-lg">
                {translatedText || 'Translation will appear here'}
              </div>
            )}

            {translatedText && !isTranslating && (
              <div className="mt-4 flex space-x-3">
                <button
                  onClick={handleCopy}
                  className="flex-1 border-2 rounded-xl py-2"
                >
                  <Copy className="inline mr-2" /> Copy
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 bg-teal-600 text-white rounded-xl py-2"
                >
                  <Share2 className="inline mr-2" /> Share
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="mt-10 bg-white rounded-2xl p-6 shadow-xl">
          <h3 className="text-xl font-bold mb-4">Translation Tips</h3>
          <ul className="space-y-2 text-gray-600">
            <li>✔ Use full sentences</li>
            <li>✔ Avoid spelling mistakes</li>
            <li>✔ Ensure backend is running</li>
          </ul>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          Backend: <code>{API_URL}</code>
        </div>
      </div>
    </div>
  );
};

export default TranslatePage;
