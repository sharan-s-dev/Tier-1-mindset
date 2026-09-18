import React, { useState } from 'react';
import { Search, Filter, CheckCircle2, Circle, ExternalLink, Lightbulb, AlertOctagon, CheckSquare, Sparkles } from 'lucide-react';
import { UserProgressState, Topic } from '../types';
import { DSA_CURRICULUM } from '../data/dsaCurriculum';

interface SyllabusViewProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
  highlightTopicId?: string | null;
}

export const SyllabusView: React.FC<SyllabusViewProps> = ({
  state,
  onUpdateState,
  highlightTopicId
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(highlightTopicId || 'complexity-analysis');

  const toggleProblemSolved = (problemId: string) => {
    onUpdateState(prev => {
      const isSolved = prev.solvedProblemIds.includes(problemId);
      const newSolved = isSolved
        ? prev.solvedProblemIds.filter(id => id !== problemId)
        : [...prev.solvedProblemIds, problemId];
      return {
        ...prev,
        solvedProblemIds: newSolved
      };
    });
  };

  const toggleTopicMastered = (topicId: string) => {
    onUpdateState(prev => {
      const isMastered = prev.masteredTopicIds.includes(topicId);
      const newMastered = isMastered
        ? prev.masteredTopicIds.filter(id => id !== topicId)
        : [...prev.masteredTopicIds, topicId];
      return {
        ...prev,
        masteredTopicIds: newMastered
      };
    });
  };

  const filteredTopics = DSA_CURRICULUM.filter(topic => {
    const matchesLevel = selectedLevel === 'all' || topic.level === selectedLevel;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.problems.some(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.pattern.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesLevel && matchesSearch;
  });

  const totalProblems = DSA_CURRICULUM.reduce((sum, t) => sum + t.problems.length, 0);
  const solvedProblemsCount = state.solvedProblemIds.length;

  return (
    <div className="space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Complete FAANG & Microsoft DSA Syllabus</h1>
            <p className="text-xs text-slate-400 mt-1">
              Curated roadmap from zero to hero. Contains exact problem patterns, interview pitfalls, and code insights.
            </p>
          </div>
          <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-lg border border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block">Total Curated Problems:</span>
              <span className="text-base font-bold text-white font-mono">{solvedProblemsCount} / {totalProblems}</span>
            </div>
            <div className="w-px h-8 bg-slate-800" />
            <div>
              <span className="text-slate-400 block">Topics Mastered:</span>
              <span className="text-base font-bold text-emerald-400 font-mono">
                {state.masteredTopicIds.length} / {DSA_CURRICULUM.length}
              </span>
            </div>
          </div>
        </div>

        {/* Search & Level Filters */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              id="syllabus-search-input"
              type="text"
              placeholder="Search topics, problems, patterns (e.g. Sliding Window, Tree, Dijkstra, LRU)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Levels' },
              { id: 'noobie', label: 'L0: Noobie' },
              { id: 'medium', label: 'L1: Medium' },
              { id: 'advanced', label: 'L2: Advanced' },
              { id: 'elite', label: 'L3: Elite Microsoft' }
            ].map(lvl => (
              <button
                key={lvl.id}
                id={`filter-lvl-${lvl.id}`}
                onClick={() => setSelectedLevel(lvl.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition ${
                  selectedLevel === lvl.id
                    ? 'bg-indigo-600 text-white shadow'
                    : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {lvl.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredTopics.map((topic) => {
          const isExpanded = expandedTopicId === topic.id;
          const isMastered = state.masteredTopicIds.includes(topic.id);
          const solvedInTopic = topic.problems.filter(p => state.solvedProblemIds.includes(p.id)).length;
          const allProblemsSolved = solvedInTopic === topic.problems.length && topic.problems.length > 0;

          return (
            <div
              key={topic.id}
              id={`topic-card-${topic.id}`}
              className={`rounded-xl border transition-all ${
                isMastered
                  ? 'bg-slate-900/90 border-emerald-500/40 ring-1 ring-emerald-500/20'
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Card Header */}
              <div
                onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer select-none"
              >
                <div className="flex items-start sm:items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                    topic.level === 'noobie' ? 'bg-cyan-950 text-cyan-400 border border-cyan-800' :
                    topic.level === 'medium' ? 'bg-indigo-950 text-indigo-400 border border-indigo-800' :
                    topic.level === 'advanced' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                    'bg-emerald-950 text-emerald-400 border border-emerald-800'
                  }`}>
                    {topic.level === 'noobie' ? 'L0' : topic.level === 'medium' ? 'L1' : topic.level === 'advanced' ? 'L2' : 'L3'}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-white">{topic.title}</h3>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                        {topic.category}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 mt-0.5">
                      <span>{topic.estimatedHours} Hours Required</span>
                      <span>·</span>
                      <span>{solvedInTopic}/{topic.problems.length} Problems Solved</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 ml-11 sm:ml-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleTopicMastered(topic.id);
                    }}
                    className={`px-3 py-1 text-xs rounded-md border font-medium flex items-center gap-1.5 transition ${
                      isMastered
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-700 hover:bg-emerald-900'
                        : 'bg-slate-950 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                    }`}
                  >
                    <CheckSquare className={`w-3.5 h-3.5 ${isMastered ? 'text-emerald-400' : 'text-slate-500'}`} />
                    <span>{isMastered ? 'Mastered' : 'Mark Mastered'}</span>
                  </button>

                  <span className="text-xs text-slate-400">
                    {isExpanded ? '▲ Collapse' : '▼ Details'}
                  </span>
                </div>
              </div>

              {/* Expanded Topic Details */}
              {isExpanded && (
                <div className="px-5 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  {/* Pattern Tip & Concepts */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950/80 p-3.5 rounded-lg border border-indigo-900/30">
                      <div className="flex items-center gap-1.5 text-indigo-400 font-semibold text-xs mb-1.5">
                        <Lightbulb className="w-4 h-4" />
                        <span>Golden Problem Pattern Identification</span>
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {topic.patternTip}
                      </p>
                    </div>

                    <div className="bg-slate-950/80 p-3.5 rounded-lg border border-rose-900/30">
                      <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs mb-1.5">
                        <AlertOctagon className="w-4 h-4" />
                        <span>Microsoft Interview Pitfalls & Traps</span>
                      </div>
                      <ul className="text-xs text-slate-300 space-y-1 list-disc list-inside">
                        {topic.interviewTraps.map((trap, idx) => (
                          <li key={idx}>{trap}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Core Concepts */}
                  <div className="bg-slate-950/50 p-3 rounded-lg border border-slate-800">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                      Core Syllabus Concepts to Master:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {topic.coreConcepts.map((concept, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2.5 py-1 rounded bg-slate-900 text-slate-300 border border-slate-800"
                        >
                          {concept}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Curated Representative Problems */}
                  <div>
                    <span className="text-xs font-bold text-white block mb-2">
                      Must-Solve LeetCode Problems for {topic.title} ({topic.problems.length})
                    </span>

                    <div className="space-y-2">
                      {topic.problems.map((prob) => {
                        const isSolved = state.solvedProblemIds.includes(prob.id);
                        return (
                          <div
                            key={prob.id}
                            className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg border gap-3 transition ${
                              isSolved
                                ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-300'
                                : 'bg-slate-950 border-slate-800 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <button
                                onClick={() => toggleProblemSolved(prob.id)}
                                className="mt-0.5 shrink-0"
                                title="Toggle Solved Status"
                              >
                                {isSolved ? (
                                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                ) : (
                                  <Circle className="w-5 h-5 text-slate-600 hover:text-slate-400" />
                                )}
                              </button>

                              <div>
                                <div className="flex flex-wrap items-center gap-2">
                                  <span className={`text-xs font-bold ${isSolved ? 'line-through text-slate-400' : 'text-white'}`}>
                                    {prob.title}
                                  </span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                                    prob.difficulty === 'Easy' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                                    prob.difficulty === 'Medium' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                                    'bg-rose-950 text-rose-400 border border-rose-800'
                                  }`}>
                                    {prob.difficulty}
                                  </span>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-950/60 text-indigo-300 border border-indigo-800/40">
                                    {prob.pattern}
                                  </span>
                                  <span className="text-[10px] text-cyan-400 font-medium">
                                    Microsoft: {prob.microsoftFrequency}
                                  </span>
                                </div>
                                <p className="text-[11px] text-slate-400 mt-1">
                                  <span className="text-slate-300 font-medium">Key Insight:</span> {prob.keyInsight}
                                </p>
                              </div>
                            </div>

                            <a
                              href={prob.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 bg-slate-900 hover:bg-slate-800 border border-slate-800 px-2.5 py-1.5 rounded self-start sm:self-center transition"
                            >
                              <span>LeetCode</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </div>
                        );
                      })}
                    </div>
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
