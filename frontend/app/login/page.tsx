// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthContext';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        // Erfolgreicher Login - zum Dashboard weiterleiten
        router.push('/dashboard');
      } else {
        setError('Ungültige Anmeldedaten');
      }
    } catch (err) {
      setError('Verbindungsfehler zum Server');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const fillDemoCredentials = (role: 'admin' | 'editor' | 'customer') => {
    const credentials = {
      admin: { email: 'admin@fockenbrock.de', password: 'admin123' },
      editor: { email: 'editor@fockenbrock.de', password: 'editor123' },
      customer: { email: 'kunde@beispiel.de', password: 'kunde123' }
    };
    
    setFormData(credentials[role]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-full inline-block mb-4">
            <span className="text-3xl">⚡</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Fockenbrock Elektrotechnik
          </h1>
          <p className="text-blue-200">
            Wiki & Projekt-Management System
          </p>
        </div>

        {/* Login-Form */}
        <div className="bg-white rounded-lg shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Anmelden
          </h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                E-Mail-Adresse
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="ihre.email@fockenbrock.de"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passwort
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Ihr Passwort"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? 'Wird angemeldet...' : 'Anmelden'}
            </button>
          </form>

          {/* Demo-Zugänge */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-4 text-center">
              Demo-Zugänge zum Testen:
            </p>
            
            <div className="space-y-2">
              <button
                type="button"
                onClick={() => fillDemoCredentials('admin')}
                className="w-full text-left px-3 py-2 text-sm bg-red-50 hover:bg-red-100 rounded border border-red-200 transition-colors"
              >
                👑 <strong>Administrator</strong> - Vollzugriff
              </button>
              
              <button
                type="button"
                onClick={() => fillDemoCredentials('editor')}
                className="w-full text-left px-3 py-2 text-sm bg-yellow-50 hover:bg-yellow-100 rounded border border-yellow-200 transition-colors"
              >
                ✏️ <strong>Editor</strong> - Wiki & Templates
              </button>
              
              <button
                type="button"
                onClick={() => fillDemoCredentials('customer')}
                className="w-full text-left px-3 py-2 text-sm bg-green-50 hover:bg-green-100 rounded border border-green-200 transition-colors"
              >
                👤 <strong>Kunde</strong> - Nur Lesezugriff
              </button>
            </div>
          </div>

          {/* Passwort vergessen */}
          <div className="mt-6 text-center">
            <a 
              href="#" 
              className="text-sm text-blue-600 hover:text-blue-800"
              onClick={(e) => {
                e.preventDefault();
                alert('Passwort-Reset: Wenden Sie sich an admin@fockenbrock.de');
              }}
            >
              Passwort vergessen?
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-blue-200 text-sm">
          © 2025 Fockenbrock Elektrotechnik GmbH
        </div>
      </div>
    </div>
  );
}