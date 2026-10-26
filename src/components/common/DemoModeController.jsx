import React, { useState } from 'react';
import { Clock, Zap, Sunrise, Sparkles, Gift, RotateCcw, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useActiveOffers, SIMULATION_MODES } from '../../hooks/useActiveOffers';

export const DemoModeController = () => {
  const { simulationMode, setSimulationMode, activeOffers } = useActiveOffers();
  const [isOpen, setIsOpen] = useState(false);

  const modes = [
    { id: SIMULATION_MODES.REAL, label: 'Real Clock', icon: Clock, desc: 'Uses actual system time' },
    { id: SIMULATION_MODES.MORNING, label: 'Morning Deal (10:30 AM)', icon: Sunrise, desc: 'Triggers Free Charger offer' },
    { id: SIMULATION_MODES.EVENING, label: 'Evening Flash Sale (7:30 PM)', icon: Zap, desc: 'Triggers 10% Extra OFF on Audio/Cases' },
    { id: SIMULATION_MODES.WEEKEND, label: 'Weekend Special (Sat 4 PM)', icon: Sparkles, desc: 'Triggers ₹2,000 Off on Laptops' },
    { id: SIMULATION_MODES.FESTIVE, label: 'Festive Season Special', icon: Gift, desc: 'Triggers Festive Celebrations & Discounts' },
  ];

  return (
    <div className="fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom,0px))] left-3 sm:bottom-6 sm:left-6 z-40">
      {/* Floating Pill Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-[#132217]/95 hover:bg-[#1C3224] text-white text-[11px] sm:text-xs font-semibold shadow-xl border border-[#2B4B35] backdrop-blur-md flex items-center gap-1.5 sm:gap-2 group transition-all cursor-pointer"
        title="Simulate time windows to show dynamic offers to the shop owner"
      >
        <span className="w-2 h-2 rounded-full bg-[#86EFAC] animate-pulse" />
        <span className="font-heading text-[#E2ECE4] hidden min-[360px]:inline">Client Demo</span>
        <span className="bg-[#24452F] text-[#86EFAC] text-[9px] sm:text-[10px] px-1.5 py-0.2 rounded font-mono">
          {simulationMode.toUpperCase()}
        </span>
        {isOpen ? <ChevronDown className="w-3.5 h-3.5 text-[#86EFAC]" /> : <ChevronUp className="w-3.5 h-3.5 text-[#86EFAC]" />}
      </button>

      {/* Expanded Modal / Popup */}
      {isOpen && (
        <div className="absolute bottom-12 left-0 w-[calc(100vw-1.5rem)] max-w-xs sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#CFE0D3] p-4 text-[#16271D] animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-[#E8EFEA]">
            <div>
              <h4 className="font-bold text-xs font-heading text-[#16271D] flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#264E33]" />
                Time Warp Simulator
              </h4>
              <p className="text-[10px] text-[#5A7061]">Show shop owner how ads switch automatically</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="mt-3 space-y-1.5">
            {modes.map((m) => {
              const Icon = m.icon;
              const isSelected = simulationMode === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSimulationMode(m.id);
                  }}
                  className={`w-full text-left p-2.5 rounded-xl text-xs flex items-start gap-2.5 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#1C3224] text-white shadow-md'
                      : 'hover:bg-[#F2F6F3] text-[#283C2F]'
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${isSelected ? 'text-[#86EFAC]' : 'text-[#2C5438]'}`} />
                  <div>
                    <div className="font-bold">{m.label}</div>
                    <div className={`text-[10px] ${isSelected ? 'text-[#D1E0D4]' : 'text-[#627869]'}`}>
                      {m.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-2 border-t border-[#E8EFEA] flex items-center justify-between text-[11px] text-[#5A7061]">
            <span>Active live promos: <strong className="text-[#1E3A27] font-bold">{activeOffers.length}</strong></span>
            <button
              onClick={() => setSimulationMode(SIMULATION_MODES.REAL)}
              className="text-[#4E6655] hover:text-[#16271D] flex items-center gap-1 font-medium cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
