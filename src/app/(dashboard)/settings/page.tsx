import { ProfileForm } from '@/components/forms/ProfileForm';

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Paramètres du Profil</h1>
        <p className="text-slate-500 mt-1">
          Mettez à jour vos informations pour affiner les calculs de l'Intelligence Artificielle.
        </p>
      </header>

      <div className="max-w-4xl">
        <ProfileForm />
      </div>
    </div>
  );
}