import React from 'react';
import { useStore } from '../../context/StoreContext';
import { CheckCircle2, Info } from 'lucide-react';

export const Toast = () => {
  const { toast } = useStore();

  if (!toast) return null;

  return (
    <div className="fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-slate-900 text-white shadow-2xl border border-slate-700/80 animate-in fade-in slide-in-from-top-3 duration-200">
      {toast.type === 'success' ? (
        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
      ) : (
        <Info className="w-4 h-4 text-cyan-400 shrink-0" />
      )}
      <span className="text-xs font-semibold">{toast.message}</span>
    </div>
  );
};
