import React, { useState } from 'react';
import { UserProgressState } from '../types';
import { exportProgressJson, importProgressJson } from '../utils/storage';
import { Download, Upload, Copy, Check, X, ShieldAlert } from 'lucide-react';

interface BackupModalProps {
  isOpen: boolean;
  onClose: () => void;
  state: UserProgressState;
  onRestoreState: (newState: UserProgressState) => void;
}

export const BackupModal: React.FC<BackupModalProps> = ({
  isOpen,
  onClose,
  state,
  onRestoreState
}) => {
  const [importJson, setImportJson] = useState('');
  const [copied, setCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const exportedString = exportProgressJson(state);

  const handleCopy = () => {
    navigator.clipboard.writeText(exportedString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([exportedString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `faang-microsoft-prep-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = () => {
    setErrorMsg(null);
    setSuccessMsg(null);
    if (!importJson.trim()) {
      setErrorMsg('Please paste valid JSON backup data.');
      return;
    }

    const restored = importProgressJson(importJson);
    if (!restored) {
      setErrorMsg('Invalid JSON format. Please ensure you copied the complete backup object.');
      return;
    }

    onRestoreState(restored);
    setSuccessMsg('Progress successfully restored!');
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Backup & Restore Progress</span>
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">
          Since you are taking your time with your DSA course, you can safely export your roadmap state or restore it anytime on any browser or device.
        </p>

        {/* Export Section */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-200">Current Progress Snapshot</span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy JSON'}</span>
              </button>
              <button
                onClick={handleDownload}
                className="flex items-center gap-1 px-2.5 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition shadow"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .json</span>
              </button>
            </div>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-2 pt-3 border-t border-slate-800">
          <span className="text-xs font-semibold text-slate-200 block">Restore from Backup JSON</span>
          <textarea
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder="Paste exported backup JSON here..."
            rows={4}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
          />

          {errorMsg && (
            <p className="text-xs text-rose-400 font-medium">{errorMsg}</p>
          )}
          {successMsg && (
            <p className="text-xs text-emerald-400 font-medium">{successMsg}</p>
          )}

          <div className="flex justify-end pt-1">
            <button
              onClick={handleImport}
              className="flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow transition"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Restore Backup</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
