
import React from 'react';
import { PermitReport } from '../types';

interface HistoryListProps {
  history: PermitReport[];
  onSelect: (report: PermitReport) => void;
  activeId?: string;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect, activeId }) => {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-5xl mx-auto mb-20 px-4">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-3">
          <span className="w-8 h-px bg-slate-200"></span>
          Your Analysis Vault
        </h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {history.map((report) => (
          <button
            key={report.id}
            onClick={() => onSelect(report)}
            className={`group text-left p-6 rounded-3xl border-2 transition-all relative overflow-hidden ${
              activeId === report.id
                ? 'bg-white border-blue-600 ring-4 ring-blue-500/5 shadow-2xl'
                : 'bg-white border-slate-100 hover:border-blue-200 hover:shadow-xl hover:-translate-y-1'
            }`}
          >
            {activeId === report.id && (
              <div className="absolute top-0 right-0 p-2">
                <div className="bg-blue-600 text-white p-1 rounded-full">
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            )}
            <div className={`text-[10px] font-black uppercase tracking-widest mb-3 ${activeId === report.id ? 'text-blue-600' : 'text-slate-400 group-hover:text-blue-500'}`}>
              {new Date(report.timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
            <p className={`font-extrabold text-lg leading-tight line-clamp-2 ${activeId === report.id ? 'text-slate-900' : 'text-slate-700 group-hover:text-slate-900'}`}>
              {report.query}
            </p>
            <div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
              View Report
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
