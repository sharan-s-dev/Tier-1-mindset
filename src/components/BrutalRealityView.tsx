import React, { useState } from 'react';
import { Skull, AlertTriangle, ShieldAlert, Copy, Check, ExternalLink, Flame, MessageSquare, Terminal } from 'lucide-react';
import { BRUTAL_TRUTHS, DAILY_WAKEUP_MANTRAS } from '../data/brutalTruthData';

export const BrutalRealityView: React.FC = () => {
  const [copiedScript, setCopiedScript] = useState(false);

  const referralScript = `Hi [Name], I noticed your work on the Azure Core team at Microsoft. Over the last 4 months, I engineered a distributed in-memory key-value store in Go utilizing the Raft consensus algorithm and LRU eviction (benchmarked at 65k QPS with automated chaos-mesh testing).

Here is the live GitHub repo with architecture diagrams and benchmarks: [Your GitHub Link]

Given your experience in distributed infrastructure, I would genuinely appreciate any 2-minute technical feedback on my partition tolerance handling. If my engineering meets the bar, I would also love to be considered for an employee referral for the upcoming Software Engineering Internship opening. Thank you for your time!`;

  const handleCopyScript = () => {
    navigator.clipboard.writeText(referralScript);
    setCopiedScript(true);
    setTimeout(() => setCopiedScript(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-rose-950/60 via-slate-900 to-slate-950 border border-rose-900/40 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-2 text-rose-400">
          <Skull className="w-6 h-6" />
          <h1 className="text-2xl font-black text-white tracking-tight uppercase">
            The Unvarnished Reality: Technical Interview Standards
          </h1>
        </div>
        <p className="text-xs text-rose-200 max-w-3xl leading-relaxed">
          The tech industry does not grade on effort. If you fail to prepare the exact requirements—or rely on internet myths—the opportunity closes, and you face a mandatory 6–12 month recruitment cooldown. Here is what interviewers actually look for.
        </p>
      </div>

      {/* The 5 Brutal Reality Vectors */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white">The 5 Silent Elimination Vectors</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {BRUTAL_TRUTHS.map((rule) => (
            <div key={rule.id} className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                  {rule.category}
                </span>
              </div>

              <h3 className="text-sm font-bold text-white">{rule.title}</h3>

              {/* The Hard Reality */}
              <div className="bg-slate-950 p-3 rounded-lg border border-slate-800/80 text-xs text-slate-300">
                <span className="font-bold text-rose-400 block mb-1">The Reality:</span>
                <p className="leading-relaxed">{rule.brutalTruth}</p>
              </div>

              {/* Fatal Mistake */}
              <div className="bg-rose-950/20 p-3 rounded-lg border border-rose-900/30 text-xs text-rose-200">
                <span className="font-bold text-rose-400 block mb-1">Fatal Candidate Mistake:</span>
                <p className="leading-relaxed">{rule.fatalMistake}</p>
              </div>

              {/* Mitigation Strategy */}
              <div className="bg-emerald-950/20 p-3 rounded-lg border border-emerald-900/30 text-xs text-emerald-200">
                <span className="font-bold text-emerald-400 block mb-1">Battle-Tested Counter-Strategy:</span>
                <p className="leading-relaxed">{rule.mitigationStrategy}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* The Rejection Cooldown & "Dream is Gone" Reality Check */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex items-center gap-2 text-amber-400">
          <AlertTriangle className="w-5 h-5" />
          <h2 className="text-base font-bold text-white">What Happens If You Procrastinate & Fail?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-300">
          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="font-bold text-white block mb-1">1. The 6–12 Month Hard Freeze</span>
            <p className="text-slate-400 leading-relaxed">
              If you fail a technical interview round at Microsoft or Google, your profile enters a mandatory cooldown. You cannot re-interview until the next hiring year, effectively ending your internship window before college graduation.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="font-bold text-white block mb-1">2. Zero Margin for "Almost Solved"</span>
            <p className="text-slate-400 leading-relaxed">
              In campus hiring with 5,000 applicants for 15 slots, an interviewer will not pass a candidate who wrote 90% working code with syntax errors. There are 50 candidates who wrote 100% bug-free code with clean tests.
            </p>
          </div>

          <div className="bg-slate-950 p-3.5 rounded-lg border border-slate-800">
            <span className="font-bold text-white block mb-1">3. The Off-Campus Multiplier</span>
            <p className="text-slate-400 leading-relaxed">
              If your college is Tier 2 or Tier 3, off-campus hiring has a 0.2% acceptance rate. Without referrals and high-impact projects, your resume is literally never opened by a human eye.
            </p>
          </div>
        </div>
      </div>

      {/* Proven LinkedIn Referral Script */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400">
            <MessageSquare className="w-5 h-5" />
            <h2 className="text-base font-bold text-white">The High-Conversion LinkedIn Referral Script</h2>
          </div>
          <button
            onClick={handleCopyScript}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
          >
            {copiedScript ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedScript ? 'Copied to Clipboard!' : 'Copy Template'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          Never send "Hi Sir, please refer me". Engineers ignore spam. Send this exact value-first, architecture-led message:
        </p>

        <pre className="bg-slate-950 p-4 rounded-lg border border-slate-800 text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed overflow-x-auto">
          {referralScript}
        </pre>
      </div>

      {/* The Daily Discipline Contract */}
      <div className="bg-slate-950 border border-indigo-900/40 rounded-xl p-6 text-center space-y-3">
        <Flame className="w-8 h-8 text-indigo-400 mx-auto" />
        <h3 className="text-lg font-bold text-white">The Daily 0-to-Hero Contract</h3>
        <p className="text-xs text-slate-300 max-w-lg mx-auto leading-relaxed">
          "I will not skip two consecutive days. I will prioritize understanding problem patterns over blind memorization. I will treat every test case failure as an opportunity to harden my engineering."
        </p>
      </div>
    </div>
  );
};
