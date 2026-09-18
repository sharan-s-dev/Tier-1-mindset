import React, { useState } from 'react';
import { CheckCircle, Circle, ArrowRight, Clock, Target, ShieldCheck, AlertTriangle, Sparkles, ChevronRight, Zap, BookOpen, Rocket, RotateCcw } from 'lucide-react';
import { UserProgressState } from '../types';
import { DSA_CURRICULUM } from '../data/dsaCurriculum';
import { DAILY_WAKEUP_MANTRAS } from '../data/brutalTruthData';
import { PhaseZeroBridge } from './PhaseZeroBridge';

interface RoadmapViewProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
  onNavigateToSyllabusTopic: (topicId: string) => void;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  state,
  onUpdateState,
  onNavigateToSyllabusTopic
}) => {
  const [selectedTimeline, setSelectedTimeline] = useState<number>(state.targetTimelineDays);
  const [showPhaseZeroDetails, setShowPhaseZeroDetails] = useState<boolean>(state.currentDay === 0);

  const handleTimelineChange = (days: number) => {
    setSelectedTimeline(days);
    onUpdateState(prev => ({ ...prev, targetTimelineDays: days }));
  };

  const handleLaunchDayOne = () => {
    onUpdateState(prev => ({
      ...prev,
      currentDay: 1,
      streakDays: Math.max(1, prev.streakDays),
      startDate: new Date().toISOString().split('T')[0]
    }));
  };

  const handleRevertToDayZero = () => {
    if (window.confirm('Return to Day 0 (Course Foundation Mode)? You can resume the countdown anytime.')) {
      onUpdateState(prev => ({
        ...prev,
        currentDay: 0
      }));
    }
  };

  const handleAdvanceDay = (increment: number) => {
    onUpdateState(prev => {
      const nextDay = Math.max(1, Math.min(prev.targetTimelineDays, prev.currentDay + increment));
      const newStreak = increment > 0 ? prev.streakDays + 1 : prev.streakDays;
      return {
        ...prev,
        currentDay: nextDay,
        streakDays: newStreak
      };
    });
  };

  const toggleDailyTask = (taskId: string) => {
    onUpdateState(prev => {
      const completed = !prev.dailyTasksCompleted[taskId];
      const newCompleted = { ...prev.dailyTasksCompleted, [taskId]: completed };
      return {
        ...prev,
        dailyTasksCompleted: newCompleted
      };
    });
  };

  const isDayZero = state.currentDay === 0;

  // Determine current active phase based on current day and total days
  const progressRatio = state.targetTimelineDays > 0 ? state.currentDay / state.targetTimelineDays : 0;
  let currentLevelKey: 'phase-0' | 'noobie' | 'medium' | 'advanced' | 'elite' = isDayZero ? 'phase-0' : 'noobie';
  if (!isDayZero) {
    if (progressRatio >= 0.75) currentLevelKey = 'elite';
    else if (progressRatio >= 0.5) currentLevelKey = 'advanced';
    else if (progressRatio >= 0.2) currentLevelKey = 'medium';
  }

  const phases = [
    {
      id: 'phase-0',
      level: 'noobie',
      name: 'Phase 1: Noobie Foundations',
      subtitle: 'Complexity, Math, Pointers, Basic Recursion',
      dayRange: `Day 1 - ${Math.round(state.targetTimelineDays * 0.2)}`,
      targetHours: '60 hrs',
      color: 'cyan',
      topics: DSA_CURRICULUM.filter(t => t.level === 'noobie'),
      outcomes: 'Zero panic on time complexities. Fluency in STL/Collections and two-pointer operations.'
    },
    {
      id: 'phase-1',
      level: 'medium',
      name: 'Phase 2: Core Fighter',
      subtitle: 'Sliding Window, Trees/BST, Linked Lists, Stacks, Binary Search, Intervals & Matrix',
      dayRange: `Day ${Math.round(state.targetTimelineDays * 0.2) + 1} - ${Math.round(state.targetTimelineDays * 0.5)}`,
      targetHours: '160 hrs',
      color: 'indigo',
      topics: DSA_CURRICULUM.filter(t => t.level === 'medium'),
      outcomes: 'Solve LeetCode Medium tree and sliding window questions without looking at solutions within 30 minutes.'
    },
    {
      id: 'phase-2',
      level: 'advanced',
      name: 'Phase 3: Advanced Beast',
      subtitle: 'Graphs, Topological Sort, 1D/2D Dynamic Programming, Tries',
      dayRange: `Day ${Math.round(state.targetTimelineDays * 0.5) + 1} - ${Math.round(state.targetTimelineDays * 0.75)}`,
      targetHours: '130 hrs',
      color: 'amber',
      topics: DSA_CURRICULUM.filter(t => t.level === 'advanced'),
      outcomes: 'Recognize optimal substructure in DP and implement Dijkstra/DSU in under 20 minutes bug-free.'
    },
    {
      id: 'phase-3',
      level: 'elite',
      name: 'Phase 4: Elite Microsoft & FAANG Finisher',
      subtitle: 'LRU/LFU System Designs, Top 50 Company Tagged, Core CS & Mock OA',
      dayRange: `Day ${Math.round(state.targetTimelineDays * 0.75) + 1} - ${state.targetTimelineDays}`,
      targetHours: '90 hrs',
      color: 'emerald',
      topics: DSA_CURRICULUM.filter(t => t.level === 'elite'),
      outcomes: 'Confidence to pass live Microsoft technical rounds (100% test case pass rate on OA).'
    }
  ];

  // Dynamic daily tasks based on current day
  const dailyTasks = isDayZero ? [
    { id: 'day-0-task-1', label: 'Watch 1-2 concept lectures in your DSA course (take notes on syntax & memory)', time: '60 min' },
    { id: 'day-0-task-2', label: 'Close the video tab and write the code independently in your IDE', time: '45 min' },
    { id: 'day-0-task-3', label: 'Solve 1-2 easy warm-up problems on LeetCode without looking at hints', time: '45 min' },
    { id: 'day-0-task-4', label: 'Check off cleared foundational gates in Phase 0 checklist', time: '15 min' }
  ] : [
    { id: `day-${state.currentDay}-task-1`, label: 'Solve 2 curated LeetCode problems from active phase', time: '90 min' },
    { id: `day-${state.currentDay}-task-2`, label: 'Write out Time & Space complexity proofs on paper without looking', time: '20 min' },
    { id: `day-${state.currentDay}-task-3`, label: 'Review 1 Core CS subject concept (OS / DBMS / OOP)', time: '30 min' },
    { id: `day-${state.currentDay}-task-4`, label: 'Work on portfolio project architecture / git commit', time: '60 min' }
  ];

  const mantraIndex = Math.abs(state.currentDay) % DAILY_WAKEUP_MANTRAS.length;

  return (
    <div className="space-y-8 pb-12">
      {/* If Day 0, feature the Phase 0 Launchpad directly */}
      {isDayZero && (
        <PhaseZeroBridge
          state={state}
          onUpdateState={onUpdateState}
          onLaunchDayOne={handleLaunchDayOne}
        />
      )}

      {/* Hero Tracker Section */}
      <div className="bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-0 right-1/4 w-96 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 relative z-10">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-950 text-indigo-300 border border-indigo-700/40">
                <Zap className="w-3 h-3 mr-1 text-indigo-400" />
                {isDayZero ? 'STATUS: PHASE 0 (FOUNDATION COURSE MODE)' : `ACTIVE STAGE: ${currentLevelKey.toUpperCase()} LEVEL`}
              </span>
              <span className="text-xs text-slate-400">
                Roadmap Target: {state.targetTimelineDays} Days
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {isDayZero ? (
                <>
                  Day <span className="text-cyan-400 font-mono">0</span>: Foundation Course Mode
                </>
              ) : (
                <>
                  Day <span className="text-cyan-400 font-mono">{state.currentDay}</span> of {state.targetTimelineDays}
                </>
              )}
            </h1>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl">
              {isDayZero
                ? 'You are currently mastering core programming basics in your DSA course. The strict countdown begins when you click "Launch Day 1".'
                : 'Strict 0-to-Hero progression. Master algorithmic patterns tested in Microsoft interviews, eliminate resume disqualifiers, and achieve 80%+ odds.'}
            </p>
          </div>

          {/* Timeline & Day Controls */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800">
            <div>
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Select Roadmap Pace:</span>
              <div className="flex gap-1">
                {[75, 120, 150, 180].map((days) => (
                  <button
                    key={days}
                    id={`timeline-btn-${days}`}
                    onClick={() => handleTimelineChange(days)}
                    className={`px-2.5 py-1 text-xs font-semibold rounded-md transition ${
                      state.targetTimelineDays === days
                        ? 'bg-indigo-600 text-white shadow'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    {days}d
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:border-l sm:border-slate-800 sm:pl-3 w-full sm:w-auto">
              <span className="text-[11px] text-slate-400 font-medium block mb-1">Day Progression:</span>
              <div className="flex items-center gap-1.5">
                {isDayZero ? (
                  <button
                    id="btn-launch-day-one-tracker"
                    onClick={handleLaunchDayOne}
                    className="px-3.5 py-1.5 text-xs font-bold rounded bg-emerald-600 hover:bg-emerald-500 text-white shadow transition flex items-center gap-1.5"
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>Launch Day 1</span>
                  </button>
                ) : (
                  <>
                    <button
                      id="btn-prev-day"
                      onClick={() => handleAdvanceDay(-1)}
                      disabled={state.currentDay <= 1}
                      className="px-2 py-1 text-xs rounded bg-slate-900 hover:bg-slate-800 disabled:opacity-40 text-slate-300 border border-slate-800 transition"
                    >
                      -1d
                    </button>
                    <button
                      id="btn-next-day"
                      onClick={() => handleAdvanceDay(1)}
                      disabled={state.currentDay >= state.targetTimelineDays}
                      className="px-3 py-1 text-xs font-medium rounded bg-cyan-600 hover:bg-cyan-500 disabled:opacity-40 text-white shadow transition flex items-center gap-1"
                    >
                      <span>Next Day (+1)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                    <button
                      onClick={handleRevertToDayZero}
                      title="Pause and return to Day 0 (Course Foundation Mode)"
                      className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800 transition text-[10px]"
                    >
                      Day 0
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mt-6 pt-6 border-t border-slate-800/80">
          <div className="flex justify-between items-center text-xs text-slate-400 mb-2">
            <span>
              {isDayZero
                ? 'Roadmap Countdown: Paused (Day 0 - Foundation Prep)'
                : `Roadmap Completion: ${Math.round((state.currentDay / state.targetTimelineDays) * 100)}%`}
            </span>
            <span>{Math.max(0, state.targetTimelineDays - state.currentDay)} Days Remaining</span>
          </div>
          <div className="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 relative">
            <div
              className="bg-gradient-to-r from-cyan-500 via-indigo-500 to-emerald-500 h-full transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(100, Math.max(isDayZero ? 0 : 3, (state.currentDay / state.targetTimelineDays) * 100))}%` }}
            />
          </div>

          {/* Phase Indicators */}
          <div className="grid grid-cols-4 gap-1 text-[11px] mt-2 text-slate-400">
            <div className={!isDayZero && progressRatio >= 0 ? 'text-cyan-400 font-semibold' : ''}>1. Noobie</div>
            <div className={progressRatio >= 0.2 ? 'text-indigo-400 font-semibold' : ''}>2. Core Medium</div>
            <div className={progressRatio >= 0.5 ? 'text-amber-400 font-semibold' : ''}>3. Advanced</div>
            <div className={progressRatio >= 0.75 ? 'text-emerald-400 font-semibold' : ''}>4. Elite Finisher</div>
          </div>
        </div>

        {/* Brutal Daily Reality Banner */}
        <div className="mt-5 p-3.5 rounded-xl bg-rose-950/20 border border-rose-800/40 flex items-start gap-3">
          <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-400">
              {isDayZero ? 'Patience & Realism Check for Day 0' : `Brutal Reality Check for Day ${state.currentDay}`}
            </span>
            <p className="text-xs text-rose-200 mt-0.5">
              "{DAILY_WAKEUP_MANTRAS[mantraIndex]}"
            </p>
          </div>
        </div>
      </div>

      {/* If Day 1+, optionally show collapsed toggle for Phase 0 */}
      {!isDayZero && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <BookOpen className="w-4 h-4 text-cyan-400" />
            <span>Review Phase 0 Course Checkpoints & Fundamentals Gate</span>
          </div>
          <button
            onClick={() => setShowPhaseZeroDetails(!showPhaseZeroDetails)}
            className="text-xs font-semibold text-cyan-400 hover:text-cyan-300"
          >
            {showPhaseZeroDetails ? 'Hide Pre-Flight Checkpoints' : 'View Pre-Flight Checkpoints'}
          </button>
        </div>
      )}

      {!isDayZero && showPhaseZeroDetails && (
        <PhaseZeroBridge
          state={state}
          onUpdateState={onUpdateState}
          onLaunchDayOne={handleLaunchDayOne}
        />
      )}

      {/* Today's Battle Plan Checklist */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-bold text-white">
              {isDayZero ? "Day 0: Course Study Routine Checklist" : "Today's Daily Target Checklist"}
            </h2>
          </div>
          <span className="text-xs text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
            Target: ~{state.dailyHoursGoal} Hours Focused Study
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {dailyTasks.map((task) => {
            const isDone = !!state.dailyTasksCompleted[task.id];
            return (
              <div
                key={task.id}
                onClick={() => toggleDailyTask(task.id)}
                className={`flex items-start gap-3 p-3.5 rounded-lg border transition cursor-pointer select-none ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 text-slate-200'
                }`}
              >
                <div className="mt-0.5">
                  {isDone ? (
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-medium ${isDone ? 'line-through text-slate-400' : 'text-slate-200'}`}>
                    {task.label}
                  </p>
                  <span className="text-[10px] text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    Est. {task.time}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Structured Journey from Beginning to Advanced (Phase Breakdown) */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">The 4 Progression Pillars Awaiting You</h2>
            <p className="text-xs text-slate-400 mt-0.5">From absolute beginner syntax to passing Microsoft live system coding.</p>
          </div>
        </div>

        <div className="space-y-4">
          {phases.map((phase) => {
            const isCurrent = phase.level === currentLevelKey;
            return (
              <div
                key={phase.id}
                className={`rounded-xl border p-5 transition-all ${
                  isCurrent
                    ? 'bg-slate-900 border-indigo-500/60 ring-1 ring-indigo-500/30 shadow-lg'
                    : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/60">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-sm ${
                      phase.color === 'cyan' ? 'bg-cyan-950/80 text-cyan-400 border border-cyan-800' :
                      phase.color === 'indigo' ? 'bg-indigo-950/80 text-indigo-400 border border-indigo-800' :
                      phase.color === 'amber' ? 'bg-amber-950/80 text-amber-400 border border-amber-800' :
                      'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
                    }`}>
                      {phase.level === 'noobie' ? 'L0' : phase.level === 'medium' ? 'L1' : phase.level === 'advanced' ? 'L2' : 'L3'}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-white">{phase.name}</h3>
                        {isCurrent && (
                          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 font-semibold px-2 py-0.5 rounded border border-indigo-500/30">
                            Current Stage
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400">{phase.subtitle}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 font-mono">
                      {phase.dayRange}
                    </span>
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800">
                      Target: {phase.targetHours}
                    </span>
                  </div>
                </div>

                {/* Milestone Outcome */}
                <div className="my-3 text-xs text-slate-300 flex items-start gap-2 bg-slate-900/40 p-2.5 rounded-lg border border-slate-800/50">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-200">Milestone Mastery Standard: </span>
                    <span>{phase.outcomes}</span>
                  </div>
                </div>

                {/* Topics in this Phase */}
                <div>
                  <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                    Core Topics ({phase.topics.length}):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {phase.topics.map((topic) => {
                      const isMastered = state.masteredTopicIds.includes(topic.id);
                      const solvedInTopic = topic.problems.filter(p => state.solvedProblemIds.includes(p.id)).length;

                      return (
                        <button
                          key={topic.id}
                          onClick={() => onNavigateToSyllabusTopic(topic.id)}
                          className="flex items-center justify-between p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 hover:border-slate-700 text-left transition group"
                        >
                          <div className="min-w-0 pr-2">
                            <span className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 block truncate">
                              {topic.title}
                            </span>
                            <span className="text-[10px] text-slate-500">
                              {solvedInTopic}/{topic.problems.length} solved · {topic.estimatedHours}h
                            </span>
                          </div>
                          {isMastered ? (
                            <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                          ) : (
                            <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-slate-400 shrink-0" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

