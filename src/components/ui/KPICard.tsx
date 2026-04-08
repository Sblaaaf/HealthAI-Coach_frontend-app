import { ReactNode } from 'react';

interface KPICardProps {
  title: string;
  value: string | number;
  status?: string;
  isPositive?: boolean;
  icon?: ReactNode;
}

export function KPICard({ title, value, status, isPositive, icon }: KPICardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-full transition-transform hover:scale-[1.02] duration-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-slate-500 font-medium text-sm">{title}</h3>
        {icon && <div className="text-blue-500">{icon}</div>}
      </div>
      <div>
        <p className="text-3xl font-bold text-slate-800">{value}</p>
        {status && (
          <p className={`text-sm mt-2 font-medium ${isPositive ? 'text-green-500' : 'text-slate-400'}`}>
            {status}
          </p>
        )}
      </div>
    </div>
  );
}