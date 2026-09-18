import React, { useState } from 'react';
import { Plus, Trash2, ExternalLink, CheckCircle2, AlertTriangle, Hammer, Code, ShieldCheck, Terminal, Layers } from 'lucide-react';
import { UserProgressState, UserCustomProject } from '../types';
import { PROJECT_BLUEPRINTS, GENERIC_PROJECT_RED_FLAGS } from '../data/projectsData';

interface ProjectStudioViewProps {
  state: UserProgressState;
  onUpdateState: (updater: (prev: UserProgressState) => UserProgressState) => void;
}

export const ProjectStudioView: React.FC<ProjectStudioViewProps> = ({
  state,
  onUpdateState
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newStack, setNewStack] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [hasLiveDemo, setHasLiveDemo] = useState(false);
  const [hasUnitTests, setHasUnitTests] = useState(false);
  const [hasCiCd, setHasCiCd] = useState(false);
  const [hasArchitectureDiagram, setHasArchitectureDiagram] = useState(false);
  const [hasDockerOrCloud, setHasDockerOrCloud] = useState(false);
  const [hasComplexLogic, setHasComplexLogic] = useState(false);

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newProject: UserCustomProject = {
      id: `custom-proj-${Date.now()}`,
      title: newTitle.trim(),
      techStack: newStack.trim() || 'TypeScript, Node.js, Docker',
      description: newDesc.trim() || 'Engineered scalable system with automated tests.',
      hasLiveDemo,
      hasUnitTests,
      hasCiCd,
      hasArchitectureDiagram,
      hasDockerOrCloud,
      hasComplexLogic
    };

    onUpdateState(prev => ({
      ...prev,
      customProjects: [...prev.customProjects, newProject]
    }));

    // Reset form
    setNewTitle('');
    setNewStack('');
    setNewDesc('');
    setHasLiveDemo(false);
    setHasUnitTests(false);
    setHasCiCd(false);
    setHasArchitectureDiagram(false);
    setHasDockerOrCloud(false);
    setHasComplexLogic(false);
    setShowAddModal(false);
  };

  const handleDeleteProject = (id: string) => {
    onUpdateState(prev => ({
      ...prev,
      customProjects: prev.customProjects.filter(p => p.id !== id)
    }));
  };

  const toggleProjectFeature = (id: string, feature: keyof UserCustomProject) => {
    onUpdateState(prev => ({
      ...prev,
      customProjects: prev.customProjects.map(p => {
        if (p.id !== id) return p;
        return {
          ...p,
          [feature]: !p[feature]
        };
      })
    }));
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Hammer className="w-5 h-5 text-indigo-400" />
              <h1 className="text-2xl font-bold text-white tracking-tight">Production Portfolio Studio</h1>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Tier-1 engineering teams look for systems depth over generic tutorial clones. Log your active or planned projects, measure them against engineering rubrics, and explore production-grade blueprints.
            </p>
          </div>

          <button
            id="btn-open-add-project"
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition whitespace-nowrap self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Upcoming Project</span>
          </button>
        </div>
      </div>

      {/* Generic Project Red Flags Warning */}
      <div className="bg-rose-950/20 border border-rose-900/40 rounded-xl p-5">
        <div className="flex items-center gap-2 text-rose-400 mb-2">
          <AlertTriangle className="w-4 h-4" />
          <h2 className="text-xs font-bold uppercase tracking-wider">The "Instant Rejection" Resume Blacklist</h2>
        </div>
        <p className="text-xs text-slate-300 mb-3">
          If your resume contains any of the following without substantial unique engineering, it will be discarded in the 6-second scan:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
          {GENERIC_PROJECT_RED_FLAGS.map((flag, idx) => (
            <div key={idx} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-rose-900/30 text-slate-300 text-xs">
              <span className="text-rose-400 font-bold shrink-0">✕</span>
              <span>{flag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* User's Logged Projects */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-white">Your Logged Portfolio Projects ({state.customProjects.length})</h2>
            <p className="text-xs text-slate-400">These directly contribute up to 25 points to your overall FAANG selection odds.</p>
          </div>
        </div>

        {state.customProjects.length === 0 ? (
          <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-xl p-8 text-center">
            <Layers className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No projects registered yet</p>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              Add the projects you plan to build or have in progress. Score them against production criteria like unit tests and live URLs.
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="mt-4 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition"
            >
              + Add First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {state.customProjects.map((project) => {
              // Calculate points for this specific project
              let score = 6;
              if (project.hasLiveDemo) score += 4;
              if (project.hasUnitTests) score += 4;
              if (project.hasCiCd) score += 3;
              if (project.hasArchitectureDiagram) score += 3;
              if (project.hasDockerOrCloud) score += 2;
              if (project.hasComplexLogic) score += 3;

              return (
                <div key={project.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-bold text-white">{project.title}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                          score >= 20 ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                          score >= 14 ? 'bg-indigo-950 text-indigo-300 border border-indigo-800' :
                          'bg-amber-950 text-amber-300 border border-amber-800'
                        }`}>
                          {score}/25 Quality Pts
                        </span>
                      </div>
                      <p className="text-xs text-indigo-300 font-mono mt-0.5">{project.techStack}</p>
                    </div>

                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="text-slate-500 hover:text-rose-400 p-1 rounded transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-2.5 rounded border border-slate-800/80">
                    {project.description}
                  </p>

                  {/* Engineering Verification Checkboxes */}
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-2">
                      Engineering Rigor Checklist (Click to update):
                    </span>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {[
                        { key: 'hasLiveDemo', label: 'Live Deployed URL', pts: '+4' },
                        { key: 'hasUnitTests', label: 'Unit Tests (>70%)', pts: '+4' },
                        { key: 'hasCiCd', label: 'GitHub CI/CD Action', pts: '+3' },
                        { key: 'hasArchitectureDiagram', label: 'Architecture Diagram', pts: '+3' },
                        { key: 'hasDockerOrCloud', label: 'Docker / Cloud Hosting', pts: '+2' },
                        { key: 'hasComplexLogic', label: 'Concurrency / Cache / CRDT', pts: '+3' }
                      ].map((item) => {
                        const isChecked = !!project[item.key as keyof UserCustomProject];
                        return (
                          <div
                            key={item.key}
                            onClick={() => toggleProjectFeature(project.id, item.key as keyof UserCustomProject)}
                            className={`flex items-center justify-between p-2 rounded cursor-pointer border select-none transition ${
                              isChecked
                                ? 'bg-emerald-950/20 border-emerald-800/40 text-slate-200'
                                : 'bg-slate-950 border-slate-800 text-slate-500 hover:border-slate-700'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 truncate pr-1">
                              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isChecked ? 'text-emerald-400' : 'text-slate-600'}`} />
                              <span className="truncate">{item.label}</span>
                            </div>
                            <span className="text-[10px] font-mono opacity-70">{item.pts}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FAANG Blueprints Catalog */}
      <div className="space-y-4 pt-4 border-t border-slate-800">
        <div>
          <h2 className="text-lg font-bold text-white">4 Curated FAANG & Microsoft Blueprints</h2>
          <p className="text-xs text-slate-400">Pick one of these to build over 20-30 days to guarantee top 5% resume rank.</p>
        </div>

        <div className="space-y-4">
          {PROJECT_BLUEPRINTS.map((blueprint) => (
            <div key={blueprint.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{blueprint.title}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      blueprint.difficulty === 'Extreme' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      blueprint.difficulty === 'Hard' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-indigo-950 text-indigo-300 border border-indigo-800'
                    }`}>
                      {blueprint.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{blueprint.tagline}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {blueprint.techStack.map((tech, idx) => (
                    <span key={idx} className="text-[10px] bg-slate-950 text-slate-300 px-2 py-0.5 rounded border border-slate-800">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Recruiter Love Reason */}
              <div className="bg-indigo-950/20 border border-indigo-800/30 p-3 rounded-lg text-xs text-slate-300">
                <span className="font-semibold text-indigo-300">Why Recruiters Value This: </span>
                <span>{blueprint.recruitersLoveReason}</span>
              </div>

              {/* Architecture Pillars */}
              <div>
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
                  Core Architecture Deliverables:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {blueprint.architecture.map((arch, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-300 bg-slate-950/60 p-2 rounded border border-slate-800/60">
                      <span className="text-cyan-400 font-mono">0{idx + 1}.</span>
                      <span>{arch}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* GitHub README Checklist */}
              <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/50">
                <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Required GitHub Artifacts:
                </span>
                <div className="flex flex-wrap gap-2">
                  {blueprint.githubChecklist.map((item, idx) => (
                    <span key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-lg font-bold text-white">Log Upcoming / Active Project</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddProject} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Distributed In-Memory Cache with Raft"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Tech Stack</label>
                <input
                  type="text"
                  placeholder="e.g. Go, gRPC, Docker, Prometheus, Redis"
                  value={newStack}
                  onChange={(e) => setNewStack(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-1">Core Description & Impact</label>
                <textarea
                  rows={3}
                  placeholder="Explain the problem solved, throughput benchmarks, and concurrency architecture."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Feature checkboxes */}
              <div>
                <label className="text-xs font-semibold text-slate-300 block mb-2">Verified Artifacts & Rigor</label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasLiveDemo}
                      onChange={(e) => setHasLiveDemo(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">Live Deployed URL</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasUnitTests}
                      onChange={(e) => setHasUnitTests(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">Unit Tests (&gt;70%)</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasCiCd}
                      onChange={(e) => setHasCiCd(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">GitHub CI/CD Actions</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasArchitectureDiagram}
                      onChange={(e) => setHasArchitectureDiagram(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">Architecture Diagram</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasDockerOrCloud}
                      onChange={(e) => setHasDockerOrCloud(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">Docker / Cloud</span>
                  </label>

                  <label className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={hasComplexLogic}
                      onChange={(e) => setHasComplexLogic(e.target.checked)}
                      className="accent-indigo-500"
                    />
                    <span className="text-slate-300">Concurrency / CRDT / Caching</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 shadow"
                >
                  Save to Portfolio (+Points)
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
