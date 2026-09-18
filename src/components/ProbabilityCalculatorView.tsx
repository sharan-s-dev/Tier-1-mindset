import React from 'react';
import { Award, AlertTriangle, ShieldCheck, CheckCircle2, TrendingUp, HelpCircle, Users, Zap, Terminal } from 'lucide-react';
import { UserProgressState } from '../types';
import { calculateSelectionProbability } from '../utils/probabilityEngine';

interface ProbabilityCalculatorViewProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
}

export const ProbabilityCalculatorView: React.FC<ProbabilityCalculatorViewProps> = ({
  state,
  onUpdateState
}) => {
  const prob = calculateSelectionProbability(state);

  const handleCgpaChange = (newCgpa: number) => {
    onUpdateState(prev => ({ ...prev, cgpa: Math.round(newCgpa * 10) / 10 }));
  };

  const handleCollegeTierChange = (tier: 'Tier 1' | 'Tier 2' | 'Tier 3') => {
    onUpdateState(prev => ({ ...prev, tierCollege: tier }));
  };

  const handleReferralToggle = () => {
    onUpdateState(prev => ({ ...prev, hasReferral: !prev.hasReferral }));
  };

  const handleContestRatingChange = (rating: number) => {
    onUpdateState(prev => ({ ...prev, leetcodeContestRating: rating }));
  };

  const handleMocksChange = (count: number) => {
    onUpdateState(prev => ({ ...prev, mockInterviewsDone: Math.max(0, count) }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Probability Header & Big Meter */}
      <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700 text-xs font-semibold text-slate-300">
              <Award className="w-4 h-4 text-cyan-400" />
              <span>ALGORITHMIC SELECTION PROBABILITY MODEL</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {prob.overallProbability}% Selection Probability
            </h1>
            <div className="flex items-center justify-center lg:justify-start gap-2">
              <span className={`inline-flex items-center px-3 py-1 rounded-md text-xs font-bold ${
                prob.statusColor === 'emerald' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                prob.statusColor === 'indigo' ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                prob.statusColor === 'amber' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                'bg-rose-950 text-rose-300 border border-rose-800'
              }`}>
                {prob.status}
              </span>
            </div>
            <p className="text-xs text-slate-300 max-w-xl">
              Calculated from 5 weighted vectors: DSA coverage, portfolio engineering depth, CGPA ATS filter resistance, core CS mastery, and mock interview composure.
            </p>
          </div>

          {/* Big Gauge Visual */}
          <div className="flex flex-col items-center justify-center bg-slate-950 p-6 rounded-2xl border border-slate-800 min-w-[240px]">
            <div className="relative flex items-center justify-center">
              <svg className="w-36 h-36 transform -rotate-90">
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke="#1e293b"
                  strokeWidth="12"
                  fill="transparent"
                />
                <circle
                  cx="72"
                  cy="72"
                  r="58"
                  stroke={
                    prob.overallProbability >= 80 ? '#10b981' :
                    prob.overallProbability >= 65 ? '#6366f1' :
                    prob.overallProbability >= 45 ? '#f59e0b' : '#f43f5e'
                  }
                  strokeWidth="12"
                  strokeDasharray={364}
                  strokeDashoffset={364 - (364 * Math.min(100, prob.overallProbability)) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-700 ease-out"
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center text-center">
                <span className="text-3xl font-black text-white font-mono">{prob.overallProbability}%</span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">FAANG Odds</span>
              </div>
            </div>
            <span className="text-[11px] text-slate-400 mt-2 text-center">
              {prob.overallProbability >= 80
                ? '⭐ Meets 80%+ Elite Bar'
                : 'Target: 80%+ for safe offer'}
            </span>
          </div>
        </div>

        {/* 5 Score Factor Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mt-8 pt-6 border-t border-slate-800">
          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">1. DSA Mastery</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-white font-mono">{prob.dsaScore}</span>
              <span className="text-xs text-slate-500">/ 35 pts</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-cyan-500 h-full" style={{ width: `${(prob.dsaScore / 35) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">2. Project Depth</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-white font-mono">{prob.projectScore}</span>
              <span className="text-xs text-slate-500">/ 25 pts</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-indigo-500 h-full" style={{ width: `${(prob.projectScore / 25) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">3. CGPA & Referral</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-white font-mono">{prob.cgpaScore}</span>
              <span className="text-xs text-slate-500">/ 15 pts</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-amber-500 h-full" style={{ width: `${(prob.cgpaScore / 15) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">4. Core CS (OS/DB)</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-white font-mono">{prob.coreCsScore}</span>
              <span className="text-xs text-slate-500">/ 15 pts</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-emerald-500 h-full" style={{ width: `${(prob.coreCsScore / 15) * 100}%` }} />
            </div>
          </div>

          <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 col-span-2 sm:col-span-1">
            <span className="text-[10px] text-slate-400 font-semibold uppercase block">5. Mocks & Contests</span>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-xl font-bold text-white font-mono">{prob.mockAndContestScore}</span>
              <span className="text-xs text-slate-500">/ 10 pts</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full mt-2 overflow-hidden">
              <div className="bg-purple-500 h-full" style={{ width: `${(prob.mockAndContestScore / 10) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Profile Simulator */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-indigo-400" />
          <h2 className="text-lg font-bold text-white">Live Candidate Profile Tuner</h2>
          <span className="text-xs text-slate-400 ml-auto">Adjust variables to see immediate odds changes</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CGPA Slider */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">College CGPA</span>
              <span className={`text-sm font-bold font-mono ${
                state.cgpa >= 8.5 ? 'text-emerald-400' :
                state.cgpa >= 7.5 ? 'text-amber-400' : 'text-rose-400'
              }`}>
                {state.cgpa.toFixed(1)} / 10.0
              </span>
            </div>
            <input
              id="slider-cgpa"
              type="range"
              min="5.0"
              max="10.0"
              step="0.1"
              value={state.cgpa}
              onChange={(e) => handleCgpaChange(parseFloat(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              {state.cgpa >= 8.5 ? 'Safe: Clears all campus & ATS cutoffs.' :
               state.cgpa >= 8.0 ? 'Standard: Clears 90% of job boards.' :
               state.cgpa >= 7.5 ? 'Warning: May hit 8.0 cutoff screens.' :
               'Danger: Automated ATS drop without referral.'}
            </p>
          </div>

          {/* Employee Referral Toggle */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-semibold text-slate-300">Employee Referral</span>
                <span className={`text-xs font-bold ${state.hasReferral ? 'text-emerald-400' : 'text-slate-500'}`}>
                  {state.hasReferral ? 'Secured' : 'None'}
                </span>
              </div>
              <p className="text-[10px] text-slate-400">
                Bypasses 6-second ATS portal queues and mitigates borderline CGPA.
              </p>
            </div>
            <button
              id="btn-toggle-referral"
              onClick={handleReferralToggle}
              className={`mt-3 w-full py-1.5 px-3 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1.5 ${
                state.hasReferral
                  ? 'bg-emerald-950 text-emerald-300 border border-emerald-700 hover:bg-emerald-900'
                  : 'bg-slate-900 text-slate-400 border border-slate-800 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{state.hasReferral ? 'Referral Active (+15% Bypass)' : 'Mark Referral Secured'}</span>
            </button>
          </div>

          {/* LeetCode Contest Rating */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">Contest Rating</span>
              <span className="text-sm font-bold font-mono text-cyan-400">
                {state.leetcodeContestRating || 'Unrated'}
              </span>
            </div>
            <input
              id="slider-contest-rating"
              type="range"
              min="1200"
              max="2100"
              step="25"
              value={state.leetcodeContestRating}
              onChange={(e) => handleContestRatingChange(parseInt(e.target.value))}
              className="w-full accent-cyan-500 cursor-pointer"
            />
            <p className="text-[10px] text-slate-400 mt-2">
              {state.leetcodeContestRating >= 1850 ? 'Knight / Top 5% — OA test guarantees pass.' :
               state.leetcodeContestRating >= 1650 ? 'Solid — Can solve 3 out of 4 in contest.' :
               'Developing — Practice timed virtual contests.'}
            </p>
          </div>

          {/* Mock Interviews Conducted */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col justify-between">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-semibold text-slate-300">Peer Mocks Done</span>
              <span className="text-sm font-bold font-mono text-purple-400">
                {state.mockInterviewsDone} Sessions
              </span>
            </div>
            <p className="text-[10px] text-slate-400">
              Practices explaining thoughts out-loud without freezing under interviewer gaze.
            </p>
            <div className="flex items-center gap-2 mt-3">
              <button
                id="btn-mock-minus"
                onClick={() => handleMocksChange(state.mockInterviewsDone - 1)}
                className="flex-1 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs"
              >
                -1
              </button>
              <button
                id="btn-mock-plus"
                onClick={() => handleMocksChange(state.mockInterviewsDone + 1)}
                className="flex-1 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 text-xs"
              >
                +1 Mock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Fatal Flaws & Leverage Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fatal Disqualifiers */}
        <div className="bg-slate-900/60 border border-rose-900/40 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3 text-rose-400">
            <AlertTriangle className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Active Elimination Hazards ({prob.fatalFlaws.length})</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            If you walked into an interview cycle today, these factors pose the highest risk of immediate rejection:
          </p>

          {prob.fatalFlaws.length === 0 ? (
            <div className="p-4 rounded-lg bg-emerald-950/20 border border-emerald-800/40 text-emerald-300 text-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero critical disqualifiers identified! Your baseline profile is competitive.</span>
            </div>
          ) : (
            <div className="space-y-2.5">
              {prob.fatalFlaws.map((flaw, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/30 flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <p className="text-xs text-rose-200 leading-relaxed">{flaw}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Highest Leverage Interventions */}
        <div className="bg-slate-900/60 border border-cyan-900/40 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3 text-cyan-400">
            <Zap className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">Highest Leverage Actions (+% Boost)</h3>
          </div>
          <p className="text-xs text-slate-400 mb-4">
            Focus on these 3 concrete actions to yield the fastest leap towards the 80%+ threshold:
          </p>

          <div className="space-y-2.5">
            {prob.highestLeverageActions.map((action, idx) => (
              <div key={idx} className="p-3 rounded-lg bg-cyan-950/20 border border-cyan-900/30 flex items-start gap-2.5">
                <span className="text-xs font-mono font-bold text-cyan-400 shrink-0 mt-0.5">0{idx + 1}.</span>
                <p className="text-xs text-cyan-200 leading-relaxed font-medium">{action}</p>
              </div>
            ))}
          </div>

          {/* Current strengths */}
          {prob.strengths.length > 0 && (
            <div className="mt-4 pt-4 border-t border-slate-800">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                Validated Profile Strengths:
              </span>
              <div className="space-y-1">
                {prob.strengths.map((str, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{str}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
