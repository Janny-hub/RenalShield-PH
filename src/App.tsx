import React, { useState } from 'react';
import { FILIPINO_RENAL_FOODS, getCKDStage } from './data/renalData';

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'food' | 'fistula' | 'philhealth'>('calculator');
  const [age, setAge] = useState<number>(54);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [creatinineUnit, setCreatinineUnit] = useState<'mg_dl' | 'umol_l'>('mg_dl');
  const [creatinineInput, setCreatinineInput] = useState<string>('2.1');
  const [calculatedEgfr, setCalculatedEgfr] = useState<number | null>(34.2);
  const [foodSearch, setFoodSearch] = useState('');

  const calculateCKDEPI = () => {
    const rawVal = parseFloat(creatinineInput);
    if (!rawVal || isNaN(rawVal) || !age) {
      setCalculatedEgfr(null);
      return;
    }
    const scr = creatinineUnit === 'umol_l' ? rawVal / 88.4 : rawVal;
    const kappa = sex === 'female' ? 0.7 : 0.9;
    const alpha = sex === 'female' ? -0.241 : -0.302;
    const femaleFactor = sex === 'female' ? 1.012 : 1.0;

    const minPart = Math.min(scr / kappa, 1) ** alpha;
    const maxPart = Math.max(scr / kappa, 1) ** -1.200;
    const agePart = 0.9938 ** age;

    const egfr = 142 * minPart * maxPart * agePart * femaleFactor;
    setCalculatedEgfr(parseFloat(egfr.toFixed(1)));
  };

  const currentStage = calculatedEgfr !== null ? getCKDStage(calculatedEgfr) : null;

  const filteredFoods = FILIPINO_RENAL_FOODS.filter((item) => 
    item.name.toLowerCase().includes(foodSearch.toLowerCase()) || 
    item.filipinoName.toLowerCase().includes(foodSearch.toLowerCase())
  );

  return (
    <div className="bg-slate-950 text-slate-100 min-h-screen flex flex-col font-sans">
      <header className="bg-slate-900 border-b border-slate-800 p-4 sticky top-0 z-40 backdrop-blur flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-600 to-rose-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-rose-600/20">
            RS
          </div>
          <div>
            <h1 className="font-extrabold text-base text-white tracking-tight">RenalShield PH</h1>
            <p className="text-[11px] text-slate-400 font-mono">Sangga ng Bato Bago ang Dialysis</p>
          </div>
        </div>

        {calculatedEgfr !== null && currentStage && (
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs px-2.5 py-1 bg-slate-950 border border-slate-800 rounded-lg text-slate-300">
              eGFR: <strong className="text-white">{calculatedEgfr}</strong> mL/min
            </span>
            <span className={`font-mono text-xs font-bold px-2.5 py-1 rounded-lg border ${currentStage.color}`}>
              {currentStage.stage}
            </span>
          </div>
        )}
      </header>

      <nav className="bg-slate-900/60 border-b border-slate-800 px-4 py-2 flex gap-2 text-xs font-semibold overflow-x-auto">
        <button onClick={() => setActiveTab('calculator')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'calculator' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>
          🧮 1. eGFR Calculator
        </button>
        <button onClick={() => setActiveTab('food')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'food' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>
          🍲 2. Palengke Food Matrix
        </button>
        <button onClick={() => setActiveTab('fistula')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'fistula' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>
          🛡️ 3. AV Fistula Roadmap
        </button>
        <button onClick={() => setActiveTab('philhealth')} className={`px-3 py-1.5 rounded-lg ${activeTab === 'philhealth' ? 'bg-rose-600 text-white' : 'text-slate-400'}`}>
          🇵🇭 4. PhilHealth 156-Session
        </button>
      </nav>

      <main className="flex-1 p-4 max-w-4xl w-full mx-auto space-y-6">
        {activeTab === 'calculator' && (
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
              <h2 className="text-lg font-bold text-white">2021 CKD-EPI Creatinine to eGFR</h2>
              <p className="text-xs text-slate-400 mt-1">Race-neutral clinical standard used across Philippine diagnostic laboratories.</p>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Sex</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button onClick={() => setSex('male')} className={`p-2 text-xs font-bold rounded-lg border ${sex === 'male' ? 'bg-rose-600/30 border-rose-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Male</button>
                    <button onClick={() => setSex('female')} className={`p-2 text-xs font-bold rounded-lg border ${sex === 'female' ? 'bg-rose-600/30 border-rose-500 text-white' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>Female</button>
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Age</label>
                  <input type="number" value={age} onChange={(e) => setAge(parseInt(e.target.value) || 0)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Unit</label>
                  <select value={creatinineUnit} onChange={(e) => setCreatinineUnit(e.target.value as any)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white">
                    <option value="mg_dl">mg/dL</option>
                    <option value="umol_l">µmol/L</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 uppercase font-mono mb-1">Creatinine</label>
                  <input type="text" value={creatinineInput} onChange={(e) => setCreatinineInput(e.target.value)} className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white" />
                </div>
              </div>

              <button onClick={calculateCKDEPI} className="mt-4 px-5 py-2 bg-rose-600 hover:bg-rose-500 font-bold text-xs text-white rounded-xl">Calculate</button>
            </div>

            {calculatedEgfr !== null && currentStage && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 font-mono">Calculated eGFR:</span>
                    <div className="text-3xl font-black text-white">{calculatedEgfr} <span className="text-sm font-normal text-slate-400">mL/min/1.73m²</span></div>
                  </div>
                  <div className={`p-3 rounded-xl border text-center ${currentStage.color}`}>
                    <div className="text-2xl font-black">{currentStage.stage}</div>
                    <div className="text-xs">{currentStage.label}</div>
                  </div>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl text-xs text-slate-300 border border-slate-800">
                  <strong className="text-amber-400 block font-mono text-[10px] uppercase">Clinical Action:</strong>
                  {currentStage.actionRequired}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'food' && (
          <div className="space-y-4">
            <input 
              type="text" 
              placeholder="Search Filipino dish (e.g., Tuyo, Monggo, Sayote)..." 
              value={foodSearch} 
              onChange={(e) => setFoodSearch(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {filteredFoods.map((item) => (
                <div key={item.id} className="bg-slate-900 border border-slate-800 p-4 rounded-xl space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-white text-sm">{item.filipinoName}</h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30">Na: {item.sodiumLevel}</span>
                  </div>
                  <p className="text-xs text-slate-400">{item.actionNote}</p>
                  <div className="text-xs text-emerald-400 bg-emerald-950/20 p-2 rounded-lg border border-emerald-900/30">
                    <strong>Smart Swap:</strong> {item.swapAlternative}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'fistula' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">AV Fistula & Vein Preservation Protocol</h2>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h3 className="font-bold text-rose-400 uppercase font-mono">1. Save the Vein (Non-Dominant Arm)</h3>
              <p className="text-slate-300">Never allow blood draws, IV lines, or blood pressure cuffs on your non-dominant arm. Keep these veins intact for vascular access surgery.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h3 className="font-bold text-rose-400 uppercase font-mono">2. Doppler Ultrasound Mapping</h3>
              <p className="text-slate-300">Map radial and cephalic vessels when eGFR drops below 20 mL/min to confirm adequate vessel diameter before surgery.</p>
            </div>
          </div>
        )}

        {activeTab === 'philhealth' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h2 className="text-lg font-bold text-white">PhilHealth Circular 2024-0023 Dialysis Benefit</h2>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xl font-black text-rose-400">156</div>
                <div className="text-[10px] text-slate-400">Sessions / Year</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xl font-black text-emerald-400">₱6,350</div>
                <div className="text-[10px] text-slate-400">Per Session Rate</div>
              </div>
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                <div className="text-xl font-black text-cyan-400">₱990,600</div>
                <div className="text-[10px] text-slate-400">Annual Max Benefit</div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
