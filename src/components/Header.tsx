import React from 'react';
import { Flame, Clock, Award, ShieldAlert, Sparkles, RotateCcw, CheckCircle2, Download, BookOpen } from 'lucide-react';
import { UserProgressState } from '../types';
import { calculateSelectionProbability } from '../utils/probabilityEngine';

interface HeaderProps {
  state: UserProgressState;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogHour: (amount: number) => void;
  onResetToDayZero: () => void;
  onLoadEliteState: () => void;
  onOpenProfileModal: () => void;
  onOpenBackupModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  activeTab,
  setActiveTab,
  onLogHour,
  onResetToDayZero,
  onLoadEliteState,
  onOpenProfileModal,
  onOpenBackupModal
}) => {
  const probabilityData = calculateSelectionProbability(state);
  const isDayZero = state.currentDay === 0;
  const daysLeft = Math.max(0, state.targetTimelineDays - state.currentDay);

  const getProbColor = (color: string) => {
    switch (color) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      default:
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
    }
  };

  const navItems = [
    { id: 'roadmap', label: isDayZero ? '🧭 Day 0 & Roadmap' : '🧭 0-to-Hero Roadmap', icon: '' },
    { id: 'syllabus', label: 'Complete DSA Syllabus', icon: '📚' },
    { id: 'calculator', label: '80%+ Readiness Engine', icon: '🎯' },
    { id: 'projects', label: 'Portfolio Project Studio', icon: '🛠️' },
    { id: 'cscore', label: 'CS Core Vault', icon: '🧠' },
    { id: 'brutal', label: 'Interview Reality & Rules', icon: '⚖️' }
  ];

  return (
    <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      {/* Top Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-3 pb-2">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                THE TIER-1 MINDSET
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono font-medium border border-slate-700">
                SDE READINESS TRACKER
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Structured milestone journey, problem-solving patterns, system engineering & interview readiness.
            </p>
          </div>

          {/* Key Metric Chips */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Probability Badge */}
            <button
              id="header-probability-trigger"
              onClick={onOpenProfileModal}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border font-semibold transition-all hover:scale-105 ${getProbColor(probabilityData.statusColor)}`}
              title="Click to tune CGPA, Referral, and Acceptance Profile"
            >
              <Award className="w-4 h-4" />
              <span>{probabilityData.overallProbability}% SDE Ready</span>
              <span className="text-[10px] opacity-75 hidden sm:inline">({probabilityData.status.split(' ')[0]})</span>
            </button>

            {/* Streak */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-orange-950/30 text-orange-400 border border-orange-800/40 font-medium">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span>{state.streakDays} Day Streak</span>
            </div>

            {/* Hours Logged */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-medium">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{state.hoursLoggedTotal}h Studied</span>
              <button
                id="header-quick-log-hour"
                onClick={() => onLogHour(1)}
                className="ml-1 text-[10px] bg-slate-800 hover:bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded transition"
                title="Add 1 study hour today"
              >
                +1h
              </button>
            </div>

            {/* Days Left / Mode */}
            <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-cyan-950/30 text-cyan-300 border border-cyan-800/40 font-mono">
              {isDayZero ? (
                <span className="flex items-center gap-1">
                  <BookOpen className="w-3 h-3 text-cyan-400" />
                  Day 0 (Course Mode)
                </span>
              ) : (
                <>
                  <span>Day {state.currentDay}/{state.targetTimelineDays}</span>
                  <span className="text-slate-400 text-[10px]">({daysLeft}d left)</span>
                </>
              )}
            </div>

            {/* State actions dropdown / buttons */}
            <div className="flex items-center gap-1 ml-auto md:ml-0">
              <button
                id="header-backup-trigger"
                onClick={onOpenBackupModal}
                className="flex items-center gap-1 px-2 py-1 text-[11px] rounded bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 transition"
                title="Export or Restore JSON Backup"
              >
                <Download className="w-3 h-3 text-cyan-400" />
                <span className="hidden sm:inline">Backup</span>
              </button>

              <button
                id="header-load-elite-state"
                onClick={onLoadEliteState}
                className="flex items-center gap-1 px-2 py-1 text-[11px] rounded bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 transition"
                title="Preview what an 85%+ Interview Ready candidate profile looks like"
              >
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span className="hidden sm:inline">Preview 85%+</span>
              </button>

              <button
                id="header-reset-state"
                onClick={onResetToDayZero}
                className="flex items-center gap-1 px-2 py-1 text-[11px] rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition"
                title="Completely reset all progress to pristine Day 0"
              >
                <RotateCcw className="w-3 h-3" />
                <span className="hidden sm:inline">Day 0 Reset</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 overflow-x-auto mt-3 pt-1 border-t border-slate-800/80 scrollbar-none">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                id={`nav-tab-${item.id}`}
                onClick={() => setActiveTab(item.id)}
                className={`flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-t-lg transition whitespace-nowrap border-b-2 ${
                  isActive
                    ? 'border-indigo-400 text-white bg-slate-900/90 shadow-sm'
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
