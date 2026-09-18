import React from 'react';
import { UserProgressState } from '../types';
import { calculateSelectionProbability } from '../utils/probabilityEngine';
import { Award, X, CheckCircle2 } from 'lucide-react';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  state,
  onUpdateState
}) => {
  if (!isOpen) return null;

  const prob = calculateSelectionProbability(state);

  return (
    <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Your Candidate Metric Profile</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Odds Banner */}
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-semibold block">Calculated Odds</span>
            <span className="text-2xl font-black text-white font-mono">{prob.overallProbability}%</span>
            <span className="text-xs text-slate-400 block">{prob.status}</span>
          </div>
          <div className="text-right text-xs text-slate-400">
            <div>DSA: {prob.dsaScore}/35</div>
            <div>Projects: {prob.projectScore}/25</div>
            <div>CGPA: {prob.cgpaScore}/15</div>
          </div>
        </div>

        {/* Inputs */}
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-300">CGPA / GPA (10.0 Scale)</label>
              <span className="font-mono font-bold text-cyan-400">{state.cgpa.toFixed(1)}</span>
            </div>
            <input
              type="range"
              min="5.0"
              max="10.0"
              step="0.1"
              value={state.cgpa}
              onChange={(e) => onUpdateState(p => ({ ...p, cgpa: parseFloat(e.target.value) }))}
              className="w-full accent-indigo-500"
            />
            <span className="text-[10px] text-slate-400">
              Cutoffs: &lt;7.0 High drop risk · 7.5-8.0 Standard · &gt;8.5 Immune to ATS filters.
            </span>
          </div>

          <div>
            <label className="font-semibold text-slate-300 block mb-1">College Tier</label>
            <div className="grid grid-cols-3 gap-2">
              {(['Tier 1', 'Tier 2', 'Tier 3'] as const).map((tier) => (
                <button
                  key={tier}
                  type="button"
                  onClick={() => onUpdateState(p => ({ ...p, tierCollege: tier }))}
                  className={`py-1.5 px-3 rounded-lg border font-medium transition ${
                    state.tierCollege === tier
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white'
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-slate-950 border border-slate-800">
              <div>
                <span className="font-semibold text-slate-200 block">Internal Employee Referral</span>
                <span className="text-[10px] text-slate-400">Bypasses initial resume black hole.</span>
              </div>
              <button
                type="button"
                onClick={() => onUpdateState(p => ({ ...p, hasReferral: !p.hasReferral }))}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${
                  state.hasReferral
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                    : 'bg-slate-900 text-slate-400 border border-slate-800'
                }`}
              >
                {state.hasReferral ? '✓ Referral Active' : 'No Referral'}
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="font-semibold text-slate-300">Daily Study Hours Goal</label>
              <span className="font-mono font-bold text-white">{state.dailyHoursGoal} hrs / day</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={state.dailyHoursGoal}
              onChange={(e) => onUpdateState(p => ({ ...p, dailyHoursGoal: parseFloat(e.target.value) }))}
              className="w-full accent-cyan-500"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
          >
            Apply & Save Profile
          </button>
        </div>
      </div>
    </div>
  );
};
