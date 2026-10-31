export interface RenalFoodItem {
  id: string;
  name: string;
  filipinoName: string;
  category: 'ulam' | 'gulay' | 'isda_seafood' | 'sawsawan' | 'meryenda';
  serving: string;
  sodiumLevel: 'LOW' | 'MODERATE' | 'HIGH' | 'DANGEROUS';
  potassiumLevel: 'LOW' | 'MODERATE' | 'HIGH';
  phosphorusLevel: 'LOW' | 'MODERATE' | 'HIGH';
  actionNote: string;
  swapAlternative: string;
}

export const FILIPINO_RENAL_FOODS: RenalFoodItem[] = [
  {
    id: 'f1',
    name: 'Dried Salted Fish',
    filipinoName: 'Tuyo / Daing / Danggit',
    category: 'isda_seafood',
    serving: '2 small pcs (30g)',
    sodiumLevel: 'DANGEROUS',
    potassiumLevel: 'MODERATE',
    phosphorusLevel: 'HIGH',
    actionNote: 'Extreme salt load causing severe fluid retention and hypertensive spikes. Avoid in CKD 3b-5.',
    swapAlternative: 'Fresh Tilapia or Bangus belly (steamed with calamansi & ginger)',
  },
  {
    id: 'f2',
    name: 'Fermented Shrimp Paste',
    filipinoName: 'Bagoong Alamang / Isda',
    category: 'sawsawan',
    serving: '1 tbsp (15g)',
    sodiumLevel: 'DANGEROUS',
    potassiumLevel: 'LOW',
    phosphorusLevel: 'HIGH',
    actionNote: 'One tablespoon exceeds the daily sodium limit for a renal patient.',
    swapAlternative: 'Calamansi with fresh chopped chili or crushed garlic',
  },
  {
    id: 'f3',
    name: 'Mung Bean Soup',
    filipinoName: 'Ginisang Monggo',
    category: 'ulam',
    serving: '1 cup cooked (200g)',
    sodiumLevel: 'MODERATE',
    potassiumLevel: 'HIGH',
    phosphorusLevel: 'HIGH',
    actionNote: 'High potassium and phosphorus content. Dangerous when eGFR < 30.',
    swapAlternative: 'Ginisang Sayote with lean ground pork (leached twice)',
  },
  {
    id: 'f4',
    name: 'Chayote Squash',
    filipinoName: 'Sayote',
    category: 'gulay',
    serving: '1 cup sliced (130g)',
    sodiumLevel: 'LOW',
    potassiumLevel: 'LOW',
    phosphorusLevel: 'LOW',
    actionNote: 'Optimal renal-safe vegetable. Boil in excess water and discard the broth.',
    swapAlternative: 'Safe choice! Pair with cucumber or bottle gourd (Upo)',
  },
  {
    id: 'f5',
    name: 'Instant Noodles / Pancit Canton',
    filipinoName: 'Instant Noodles / Pancit Canton',
    category: 'meryenda',
    serving: '1 pack (65g-80g)',
    sodiumLevel: 'DANGEROUS',
    potassiumLevel: 'MODERATE',
    phosphorusLevel: 'HIGH',
    actionNote: 'Contains inorganic phosphorus additives that absorb at 90-100% into blood.',
    swapAlternative: 'Sotanghon (vermicelli) boiled fresh with garlic and scallions',
  },
  {
    id: 'f6',
    name: 'Tamarind Broth Mix',
    filipinoName: 'Sinigang Broth Mix',
    category: 'ulam',
    serving: '1 cup broth (240ml)',
    sodiumLevel: 'DANGEROUS',
    potassiumLevel: 'HIGH',
    phosphorusLevel: 'MODERATE',
    actionNote: 'Commercial powder contains 1,100mg+ sodium per serving. Do not drink the broth.',
    swapAlternative: 'Fresh boiled sampaloc fruit from scratch; do not drink remaining broth',
  }
];

export interface CKDStageInfo {
  stage: string;
  label: string;
  range: string;
  color: string;
  actionRequired: string;
}

export const getCKDStage = (egfr: number): CKDStageInfo => {
  if (egfr >= 90) return { stage: 'G1', label: 'Normal Kidney Function', range: '≥ 90 mL/min', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400', actionRequired: 'Screen BP and blood sugar yearly. Avoid NSAID pain relievers.' };
  if (egfr >= 60) return { stage: 'G2', label: 'Mildly Decreased', range: '60 – 89 mL/min', color: 'bg-teal-500/10 border-teal-500/30 text-teal-400', actionRequired: 'Screen for urine protein (uACR). Maintain strict BP control below 130/80.' };
  if (egfr >= 45) return { stage: 'G3a', label: 'Mild-to-Moderate Loss', range: '45 – 59 mL/min', color: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400', actionRequired: 'Nephrologist consult. Begin low-salt regimen and monitor medication clearance.' };
  if (egfr >= 30) return { stage: 'G3b', label: 'Moderate-to-Severe Loss', range: '30 – 44 mL/min', color: 'bg-amber-500/10 border-amber-500/30 text-amber-400', actionRequired: 'Strict dietary protein limit (0.6-0.8g/kg/day). Monitor potassium monthly.' };
  if (egfr >= 15) return { stage: 'G4', label: 'Severe Loss (Pre-Dialysis Window)', range: '15 – 29 mL/min', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400', actionRequired: 'VASCULAR ACCESS PLANNING. Protect non-dominant arm veins for AV Fistula.' };
  return { stage: 'G5', label: 'Kidney Failure (ESRD)', range: '< 15 mL/min', color: 'bg-rose-500/10 border-rose-500/30 text-rose-400', actionRequired: 'Renal Replacement Therapy required (Hemodialysis, PD, or Transplant).' };
};
