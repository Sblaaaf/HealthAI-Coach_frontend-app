'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Activity } from 'lucide-react'; // Icône SVG

interface LoginResponse {
  success: boolean;
  message: string;
  user_id?: number;
  email?: string;
  detail?: string;
}

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8004/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await response.json();

      // Vérifier si success est true
      if (data.success === true) {
        // Authentification réussie
        localStorage.setItem('user_id', data.user_id?.toString() || '');
        localStorage.setItem('email', data.email || '');
        router.push('/dashboard'); // Redirection vers le tableau de bord
      } else {
        // Authentification échouée - utiliser le message detail si disponible
        let errorMessage = 'Identifiants incorrects.';
        
        // Gérer les différents formats de détail d'erreur
        if (data.detail) {
          if (typeof data.detail === 'string') {
            errorMessage = data.detail;
          } else if (typeof data.detail === 'object' && data.detail.msg) {
            // Format Pydantic error
            errorMessage = data.detail.msg;
          }
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Erreur de connexion:', err);
      setError('Erreur de connexion. Veuillez réessayer.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
        
        {/* En-tête du Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 p-3 rounded-full mb-4">
            <Activity className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900">HealthAI Coach</h1>
          <p className="text-slate-500 text-sm mt-2">Connectez-vous à votre espace</p>
        </div>

        {/* Formulaire */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="master@healthai.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:opacity-70"
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  );
}