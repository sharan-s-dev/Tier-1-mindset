import React, { useState, useEffect } from 'react';
import { UserProgressState } from './types';
import { loadUserProgress, saveUserProgress, resetToDayZero, loadEliteDemoState } from './utils/storage';
import { Header } from './components/Header';
import { RoadmapView } from './components/RoadmapView';
import { SyllabusView } from './components/SyllabusView';
import { ProbabilityCalculatorView } from './components/ProbabilityCalculatorView';
import { ProjectStudioView } from './components/ProjectStudioView';
import { CsCoreView } from './components/CsCoreView';
import { BrutalRealityView } from './components/BrutalRealityView';
import { ProfileModal } from './components/ProfileModal';
import { BackupModal } from './components/BackupModal';

export default function App() {
  const [state, setState] = useState<UserProgressState>(() => loadUserProgress());
  const [activeTab, setActiveTab] = useState<string>('roadmap');
  const [highlightTopicId, setHighlightTopicId] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isBackupModalOpen, setIsBackupModalOpen] = useState<boolean>(false);

  // Sync state to localStorage whenever state changes
  useEffect(() => {
    saveUserProgress(state);
  }, [state]);

  const handleUpdateState = (updater: (prev: UserProgressState) => UserProgressState) => {
    setState(prev => {
      const next = updater(prev);
      saveUserProgress(next);
      return next;
    });
  };

  const handleLogHour = (amount: number) => {
    handleUpdateState(prev => ({
      ...prev,
      hoursLoggedTotal: Math.round((prev.hoursLoggedTotal + amount) * 10) / 10
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset everything back to pristine Day 0 (Course Foundation Mode)? All progress will be set to clean zero.')) {
      const clean = resetToDayZero();
      setState(clean);
    }
  };

  const handleLoadElite = () => {
    const elite = loadEliteDemoState();
    setState(elite);
  };

  const handleNavigateToSyllabus = (topicId: string) => {
    setHighlightTopicId(topicId);
    setActiveTab('syllabus');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation & Key Metric Bar */}
      <Header
        state={state}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogHour={handleLogHour}
        onResetToDayZero={handleReset}
        onLoadEliteState={handleLoadElite}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenBackupModal={() => setIsBackupModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {activeTab === 'roadmap' && (
          <RoadmapView
            state={state}
            onUpdateState={handleUpdateState}
            onNavigateToSyllabusTopic={handleNavigateToSyllabus}
          />
        )}

        {activeTab === 'syllabus' && (
          <SyllabusView
            state={state}
            onUpdateState={handleUpdateState}
            highlightTopicId={highlightTopicId}
          />
        )}

        {activeTab === 'calculator' && (
          <ProbabilityCalculatorView
            state={state}
            onUpdateState={handleUpdateState}
          />
        )}

        {activeTab === 'projects' && (
          <ProjectStudioView
            state={state}
            onUpdateState={handleUpdateState}
          />
        )}

        {activeTab === 'cscore' && (
          <CsCoreView
            state={state}
            onUpdateState={handleUpdateState}
          />
        )}

        {activeTab === 'brutal' && (
          <BrutalRealityView />
        )}
      </main>

      {/* Candidate Profile Tuner Modal */}
      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        state={state}
        onUpdateState={handleUpdateState}
      />

      {/* Backup & Restore Progress Modal */}
      <BackupModal
        isOpen={isBackupModalOpen}
        onClose={() => setIsBackupModalOpen(false)}
        state={state}
        onRestoreState={(restoredState) => setState(restoredState)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>The Tier-1 Mindset · Software Engineering Milestone & Readiness Tracker</span>
          <span className="font-mono text-slate-400">
            Target: &gt;80% Interview Readiness Before Hiring Drives
          </span>
        </div>
      </footer>
    </div>
  );
}

