import { EvolutionChart } from '@/components/charts/EvolutionChart';
import { KPICard } from '@/components/ui/KPICard';
import { Activity, Flame, Scale } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-50 w-full">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Bonjour, Master 👋</h1>
        <p className="text-slate-500 mt-1">Voici votre résumé de santé pour cette semaine.</p>
      </header>

      {/* Cartes KPI */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard 
          title="Poids Actuel" 
          value="71.5 kg" 
          status="-1.0 kg ce mois" 
          isPositive={true}
          icon={<Scale className="w-6 h-6" />}
        />
        <KPICard 
          title="Indice de Masse Corporelle" 
          value="23.3" 
          status="Corpulence Normale" 
          isPositive={true}
          icon={<Activity className="w-6 h-6" />}
        />
        <KPICard 
          title="Moyenne Calories Brûlées" 
          value="2 292" 
          status="Objectif : 2500 kcal" 
          isPositive={false}
          icon={<Flame className="w-6 h-6" />}
        />
      </div>

      {/* Graphique */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-800">Évolution sur 7 jours</h2>
        </div>
        <EvolutionChart />
      </div>
    </div>
  );
}