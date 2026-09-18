import React, { useState } from 'react';
import { Brain, CheckCircle2, Circle, BookOpen, Layers, Cpu, Database, Network, ShieldCheck } from 'lucide-react';
import { UserProgressState } from '../types';
import { CORE_CS_QUESTIONS } from '../data/csCoreData';

interface CsCoreViewProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
}

export const CsCoreView: React.FC<CsCoreViewProps> = ({
  state,
  onUpdateState
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [expandedCardId, setExpandedCardId] = useState<string | null>('os-process-vs-thread');

  const toggleQuestionReviewed = (qId: string) => {
    onUpdateState(prev => {
      const isReviewed = prev.reviewedCsQuestionIds.includes(qId);
      const newReviewed = isReviewed
        ? prev.reviewedCsQuestionIds.filter(id => id !== qId)
        : [...prev.reviewedCsQuestionIds, qId];
      return {
        ...prev,
        reviewedCsQuestionIds: newReviewed
      };
    });
  };

  const filteredQuestions = CORE_CS_QUESTIONS.filter(q => {
    if (selectedSubject === 'ALL') return true;
    return q.subject === selectedSubject;
  });

  const reviewedCount = state.reviewedCsQuestionIds.length;
  const totalQuestions = CORE_CS_QUESTIONS.length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-emerald-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Core CS & System Fundamentals Vault</h1>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Microsoft Technical Round 2 & As-Appropriate (AA) rounds drill deeply into Operating Systems, Database Internals, and Computer Networks. Review these core cross-examination concepts.
            </p>
          </div>

          <div className="bg-slate-950 px-4 py-2.5 rounded-lg border border-slate-800 text-xs self-start sm:self-auto">
            <span className="text-slate-400 block">Concepts Mastered:</span>
            <span className="text-base font-bold text-emerald-400 font-mono">
              {reviewedCount} / {totalQuestions}
            </span>
          </div>
        </div>

        {/* Subject Filters */}
        <div className="flex items-center gap-2 mt-5 overflow-x-auto pb-1">
          {[
            { id: 'ALL', label: 'All Subjects', icon: Layers },
            { id: 'OS', label: 'Operating Systems', icon: Cpu },
            { id: 'DBMS', label: 'DBMS & SQL', icon: Database },
            { id: 'OOP', label: 'OOP & LLD', icon: BookOpen },
            { id: 'CN', label: 'Computer Networks', icon: Network }
          ].map(subject => {
            const Icon = subject.icon;
            const isSelected = selectedSubject === subject.id;
            return (
              <button
                key={subject.id}
                onClick={() => setSelectedSubject(subject.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{subject.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Questions Grid */}
      <div className="space-y-4">
        {filteredQuestions.map((q) => {
          const isReviewed = state.reviewedCsQuestionIds.includes(q.id);
          const isExpanded = expandedCardId === q.id;

          return (
            <div
              key={q.id}
              className={`rounded-xl border transition-all ${
                isReviewed
                  ? 'bg-slate-900/90 border-emerald-500/30'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question Bar */}
              <div
                onClick={() => setExpandedCardId(isExpanded ? null : q.id)}
                className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
              >
                <div className="flex items-start gap-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleQuestionReviewed(q.id);
                    }}
                    className="mt-0.5 shrink-0"
                    title="Toggle Reviewed"
                  >
                    {isReviewed ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                        {q.subject}
                      </span>
                      {q.microsoftTag && (
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Microsoft High Frequency
                        </span>
                      )}
                    </div>
                    <h3 className={`text-sm font-bold ${isReviewed ? 'text-slate-300' : 'text-white'}`}>
                      {q.question}
                    </h3>
                  </div>
                </div>

                <span className="text-xs text-slate-500 shrink-0">
                  {isExpanded ? '▲ Hide' : '▼ View Answer'}
                </span>
              </div>

              {/* Answer Body */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-3">
                  <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800/80">
                    <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block mb-1">
                      Crisp Technical Summary:
                    </span>
                    <p className="text-xs text-slate-200 leading-relaxed font-medium">
                      {q.quickAnswer}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3.5 rounded-lg border border-indigo-900/20">
                    <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider block mb-1.5">
                      Interviewer Follow-Up & Deep Dive Angles:
                    </span>
                    <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                      {q.depthNotes.map((note, idx) => (
                        <li key={idx} className="leading-relaxed">{note}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      onClick={() => toggleQuestionReviewed(q.id)}
                      className={`px-3 py-1.5 text-xs font-semibold rounded-md border transition ${
                        isReviewed
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                          : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                      }`}
                    >
                      {isReviewed ? '✓ Marked Mastered' : 'Mark as Mastered (+Points)'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
