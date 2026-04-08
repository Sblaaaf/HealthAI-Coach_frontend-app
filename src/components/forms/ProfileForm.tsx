'use client';

import { useState } from 'react';
import { Save, User, Activity, Target } from 'lucide-react';

export function ProfileForm() {
  const [formData, setFormData] = useState({
    gender: 'homme',
    age: 30,
    height: 175,
    weight: 70,
    activityLevel: 'sedentaire',
    goal: 'maintien',
  });

  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsSaved(false); // Réinitialise le message de sauvegarde si on modifie un champ
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Envoi des données vers le service Kcal via la Gateway
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/kcal/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Adaptation des champs selon ce qu'attend votre API Kcal
          age: formData.age,
          weight: formData.weight,
          height: formData.height,
          gender: formData.gender,
          activity_level: formData.activityLevel
        })
      });

      if (res.ok) {
        const result = await res.json();
        console.log("Résultat du backend :", result);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
      } else {
        console.error("Erreur de validation côté serveur");
      }
    } catch (error) {
      console.error("Impossible de joindre l'API", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 md:p-8">
      
      {/* Section 1 : Mensurations */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          Mensurations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Sexe</label>
            <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50">
              <option value="homme">Homme</option>
              <option value="femme">Femme</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Âge (années)</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} min="15" max="100" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Taille (cm)</label>
            <input type="number" name="height" value={formData.height} onChange={handleChange} min="100" max="250" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Poids Actuel (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} min="30" max="200" step="0.1" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none" />
          </div>
        </div>
      </div>

      {/* Section 2 : Activité et Objectifs */}
      <div className="mb-8 border-t border-slate-100 pt-8">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-600" />
          Style de vie & Objectifs
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4" /> Niveau d'activité
            </label>
            <select name="activityLevel" value={formData.activityLevel} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50">
              <option value="sedentaire">Sédentaire (Peu ou pas d'exercice)</option>
              <option value="modere">Modéré (Exercice 3-5 fois/semaine)</option>
              <option value="intense">Intense (Exercice 6-7 fois/semaine)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2 flex items-center gap-2">
              <Target className="w-4 h-4" /> Objectif Principal
            </label>
            <select name="goal" value={formData.goal} onChange={handleChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-600 outline-none bg-slate-50">
              <option value="perte">Perte de poids</option>
              <option value="maintien">Maintien du poids</option>
              <option value="masse">Prise de masse musculaire</option>
            </select>
          </div>
        </div>
      </div>

      {/* Bouton de sauvegarde */}
      <div className="flex items-center justify-between border-t border-slate-100 pt-6">
        <span className={`text-sm text-green-600 font-medium transition-opacity duration-300 ${isSaved ? 'opacity-100' : 'opacity-0'}`}>
          ✓ Profil mis à jour avec succès
        </span>
        <button type="submit" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          <Save className="w-5 h-5" />
          Enregistrer le profil
        </button>
      </div>
    </form>
  );
}