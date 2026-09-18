import React, { useState } from 'react';
import { UserProgressState } from '../types';
import { PHASE_ZERO_MILESTONES, DSA_COURSE_BEST_PRACTICES } from '../data/phaseZeroData';
import { BookOpen, CheckCircle2, Circle, Rocket, AlertTriangle, Lightbulb, Compass, Award, FileEdit, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';

interface PhaseZeroBridgeProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
  onLaunchDayOne: () => void;
}

export const PhaseZeroBridge: React.FC<PhaseZeroBridgeProps> = ({
  state,
  onUpdateState,
  onLaunchDayOne
}) => {
  const [expandedMilestoneId, setExpandedMilestoneId] = useState<string | null>('p0-lang-memory');
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [courseNotesInput, setCourseNotesInput] = useState(state.dsaCourseNotes || '');

  const toggleMilestone = (id: string) => {
    onUpdateState(prev => {
      const current = !!prev.phaseZeroChecklist[id];
      return {
        ...prev,
        phaseZeroChecklist: {
          ...prev.phaseZeroChecklist,
          [id]: !current
        }
      };
    });
  };

  const handleSaveNotes = () => {
    onUpdateState(prev => ({
      ...prev,
      dsaCourseNotes: courseNotesInput
    }));
    setIsEditingNotes(false);
  };

  const completedCount = PHASE_ZERO_MILESTONES.filter(m => !!state.phaseZeroChecklist[m.id]).length;
  const isDayZero = state.currentDay === 0;

  return (
    <div className="space-y-6">
      {/* Hero Welcome Card for Candidates Currently Taking a DSA Course */}
      <div className="bg-gradient-to-r from-cyan-950/60 via-slate-900 to-indigo-950/60 border border-cyan-800/50 rounded-2xl p-6 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-900/60 text-cyan-300 border border-cyan-700/50">
                <BookOpen className="w-3.5 h-3.5" />
                {isDayZero ? 'PHASE 0: PRE-FLIGHT / DSA COURSE IN PROGRESS' : 'PHASE 0 FOUNDATION ARCHIVE'}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {completedCount} of {PHASE_ZERO_MILESTONES.length} Pre-Flight Gates Cleared
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isDayZero ? 'Day 0: Master the Basics in Your DSA Course First' : 'Phase 0 Fundamentals Gate'}
            </h1>

            <p className="text-sm text-slate-300 leading-relaxed">
              Starting a high-pressure 150-day countdown before you understand pointers, loops, and Big-O is the #1 reason candidates burn out. 
              <span className="text-cyan-300 font-medium"> Focus entirely on your course basics right now.</span> Use these 8 gates to ensure you are actually building problem-solving intuition rather than just copying video solutions.
            </p>
          </div>

          {/* Launch Day 1 CTA */}
          <div className="bg-slate-950/90 border border-slate-800 p-4 rounded-xl flex flex-col items-center justify-center text-center shrink-0 min-w-[240px]">
            <span className="text-xs text-slate-400 mb-1">When You're Confident in Basics:</span>
            {isDayZero ? (
              <button
                id="btn-launch-day-one"
                onClick={onLaunchDayOne}
                className="w-full mt-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/50 transition transform hover:scale-[1.02]"
              >
                <Rocket className="w-4 h-4" />
                <span>Launch Day 1 Countdown</span>
              </button>
            ) : (
              <div className="text-xs text-emerald-400 font-semibold flex items-center gap-1.5 py-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Active on Day {state.currentDay}</span>
              </div>
            )}
            <span className="text-[10px] text-slate-500 mt-2">
              {isDayZero ? 'You can stay on Day 0 as long as you need!' : 'You can reset back to Day 0 anytime.'}
            </span>
          </div>
        </div>

        {/* Progress Bar for Phase 0 */}
        <div className="mt-6 pt-5 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-1.5">
            <span>Pre-Flight Readiness: {Math.round((completedCount / PHASE_ZERO_MILESTONES.length) * 100)}%</span>
            <span>{PHASE_ZERO_MILESTONES.length - completedCount} Gates Remaining</span>
          </div>
          <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="bg-gradient-to-r from-cyan-500 to-indigo-500 h-full transition-all duration-300 rounded-full"
              style={{ width: `${Math.max(4, (completedCount / PHASE_ZERO_MILESTONES.length) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Course Tracker & Scratchpad */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <FileEdit className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Your DSA Course & Learning Log</h3>
          </div>
          <button
            onClick={() => {
              if (isEditingNotes) handleSaveNotes();
              else setIsEditingNotes(true);
            }}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            {isEditingNotes ? 'Save Log' : 'Edit Log'}
          </button>
        </div>

        {isEditingNotes ? (
          <div className="space-y-2">
            <textarea
              value={courseNotesInput}
              onChange={(e) => setCourseNotesInput(e.target.value)}
              placeholder="e.g. Taking Striver's A2Z DSA Sheet / Abdul Bari / NeetCode. Currently on Chapter 2: Pointers and Arrays..."
              rows={3}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            />
            <button
              onClick={handleSaveNotes}
              className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded text-xs font-semibold transition"
            >
              Save Notes
            </button>
          </div>
        ) : (
          <p className="text-xs text-slate-300 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 font-mono leading-relaxed">
            {state.dsaCourseNotes || 'No notes added yet. Click "Edit Log" to record what course you are taking and your current module.'}
          </p>
        )}
      </div>

      {/* How to Avoid Tutorial Hell While Taking Your Course */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-amber-400">
          <Lightbulb className="w-4 h-4" />
          <h3 className="text-sm font-bold text-white">The 4 Golden Rules to Prevent "Tutorial Hell" in Your Course</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {DSA_COURSE_BEST_PRACTICES.map((bp, i) => (
            <div key={i} className="bg-slate-950/80 p-3 rounded-lg border border-slate-800 text-xs space-y-1">
              <span className="font-bold text-cyan-300 block">{bp.rule}</span>
              <p className="text-slate-400 leading-relaxed text-[11px]">{bp.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* The 8 Pre-Flight Milestones List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>The 8 Foundational Pre-Flight Milestones</span>
          </h2>
          <span className="text-xs text-slate-400">
            Click any milestone to check it off or review key checklist items
          </span>
        </div>

        <div className="space-y-3">
          {PHASE_ZERO_MILESTONES.map((m) => {
            const isCompleted = !!state.phaseZeroChecklist[m.id];
            const isExpanded = expandedMilestoneId === m.id;

            return (
              <div
                key={m.id}
                className={`rounded-xl border transition-all ${
                  isCompleted
                    ? 'bg-slate-900/90 border-emerald-500/40'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                }`}
              >
                {/* Header Bar */}
                <div
                  onClick={() => setExpandedMilestoneId(isExpanded ? null : m.id)}
                  className="p-4 flex items-center justify-between gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleMilestone(m.id);
                      }}
                      className="shrink-0"
                      title="Toggle Milestone Completion"
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                      )}
                    </button>

                    <div>
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.2 rounded bg-slate-800 text-cyan-400">
                          {m.category}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
                            Completed & Verified
                          </span>
                        )}
                      </div>
                      <h3 className={`text-sm font-bold ${isCompleted ? 'text-slate-300' : 'text-white'}`}>
                        {m.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-400 shrink-0">
                    <span className="hidden sm:inline text-[11px]">
                      {isCompleted ? '✓ Done' : 'Pending'}
                    </span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 space-y-3 text-xs">
                    <p className="text-slate-300 leading-relaxed">
                      {m.description}
                    </p>

                    {/* Sub-checklist */}
                    <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
                        Specific Checkpoints to Master in Your Course:
                      </span>
                      <ul className="space-y-1.5">
                        {m.checklistItems.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                            <span className="text-cyan-400 shrink-0 font-bold">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Warning & Habit */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[11px]">
                      <div className="bg-rose-950/20 p-2.5 rounded border border-rose-900/30 text-rose-200">
                        <span className="font-bold text-rose-400 block mb-0.5">⚠️ Tutorial Trap to Avoid:</span>
                        <p>{m.tutorialHellWarning}</p>
                      </div>

                      <div className="bg-emerald-950/20 p-2.5 rounded border border-emerald-900/30 text-emerald-200">
                        <span className="font-bold text-emerald-400 block mb-0.5">⭐ Golden Habit:</span>
                        <p>{m.goldenHabit}</p>
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => toggleMilestone(m.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                            : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                        }`}
                      >
                        {isCompleted ? '✓ Mark as Pending' : 'Mark Gate as Cleared'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
