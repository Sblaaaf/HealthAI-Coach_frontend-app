'use client';

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

// Données de démonstration (à remplacer par un fetch de votre API)
const data = [
  { date: '01/04', poids: 72.5, calories: 2100 },
  { date: '02/04', poids: 72.3, calories: 2400 },
  { date: '03/04', poids: 72.4, calories: 2000 },
  { date: '04/04', poids: 72.1, calories: 2600 },
  { date: '05/04', poids: 71.9, calories: 2300 },
  { date: '06/04', poids: 71.8, calories: 2150 },
  { date: '07/04', poids: 71.5, calories: 2500 },
];

export function EvolutionChart() {
  return (
    <div className="w-full h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorPoids" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
          <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis yAxisId="left" domain={['dataMin - 1', 'dataMax + 1']} axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={false} />
          
          <Tooltip 
            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" />
          
          <Area 
            yAxisId="left"
            type="monotone" 
            dataKey="poids" 
            name="Poids (kg)" 
            stroke="#2563eb" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorPoids)" 
          />
          <Area 
            yAxisId="right"
            type="monotone" 
            dataKey="calories" 
            name="Kcal brûlées" 
            stroke="#10b981" 
            strokeDasharray="5 5" 
            fillOpacity={0} 
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}