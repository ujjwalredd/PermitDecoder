import React, { useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { PermitReport } from '../types';

interface ReportViewerProps {
  report: PermitReport;
  isStreaming?: boolean;
}

const ReportViewer: React.FC<ReportViewerProps> = ({ report, isStreaming }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const MarkdownComponent = (ReactMarkdown as any).default || ReactMarkdown;

  useEffect(() => {
    if (isStreaming && scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [report.content, isStreaming]);

  return (
    <div className="max-w-4xl mx-auto mb-16 animate-in fade-in zoom-in-95 duration-500">
      <div className="report-card bg-white rounded-2xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-slate-100 overflow-hidden relative">
        
        {/* Optimized Header Area */}
        <div className="bg-slate-900 px-6 py-8 md:px-10 md:py-10 text-white relative overflow-hidden print:bg-white print:text-black print:px-0 print:py-4">
          <div className="relative z-10 space-y-4">
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-blue-600/20 border border-blue-600/20 rounded text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] print:text-blue-600 print:border-blue-600">
                  Compliance Directive
                </div>
                <h1 className="text-xl md:text-3xl font-black tracking-tighter leading-tight max-w-2xl print:text-2xl">
                  {report.query}
                </h1>
              </div>
              
              <div className="flex flex-col md:items-end gap-1 font-mono text-[9px] opacity-60 print:text-black print:opacity-100">
                <div className="flex gap-2">
                  <span className="text-slate-500">UID:</span>
                  <span className="font-bold">{report.id}</span>
                </div>
                <div className="flex gap-2 font-sans font-bold uppercase tracking-wider">
                  <span>{new Date(report.timestamp).toLocaleDateString()}</span>
                  <span>{new Date(report.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 text-slate-400 font-bold uppercase tracking-widest text-[9px] print:text-slate-500">
              <span>Phase: Analysis</span>
              <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
              <span>Jurisdiction: Local Municipal</span>
            </div>
          </div>

          {/* Abstract Geometry (Decorative) */}
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 print:hidden"></div>
        </div>

        {/* Content Body */}
        <div className="p-6 md:p-10 bg-white relative">
          <div className="prose prose-slate prose-sm md:prose-base max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
            prose-table:border prose-table:rounded-xl prose-table:overflow-hidden
            prose-th:bg-slate-50 prose-th:px-4 prose-th:py-2.5 prose-th:text-[9px] prose-th:uppercase prose-th:tracking-[0.2em] prose-th:font-black prose-th:text-slate-500
            prose-td:px-4 prose-td:py-2.5 prose-td:text-xs prose-td:font-medium
            prose-strong:text-slate-900 prose-strong:font-bold
            prose-p:leading-relaxed prose-li:leading-relaxed">
            
            <MarkdownComponent remarkPlugins={[remarkGfm]}>
              {report.content || (isStreaming ? "Connecting to municipal records..." : "Ready to decode...")}
            </MarkdownComponent>
            
            <div ref={scrollRef} className="h-4" />
          </div>

          {/* Verification Resources */}
          {report.sources && report.sources.length > 0 && !isStreaming && (
            <div className="mt-12 pt-8 border-t border-slate-100 print-visible">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
                  Evidence Sources
                </h3>
                <div className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded-full border border-emerald-100 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  VERIFIED ACTIVE DATA
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {report.sources.map((source, idx) => {
                  const url = source.web?.uri;
                  if (!url) return null;
                  return (
                    <a
                      key={idx}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 p-3.5 bg-slate-50 border border-slate-100 rounded-xl transition-all hover:bg-white hover:border-blue-600 hover:shadow-lg print:border-slate-200"
                    >
                      <div className="w-9 h-9 flex-shrink-0 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 00-2 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-black text-slate-800 truncate mb-0.5 group-hover:text-blue-600">
                          {source.web?.title || 'Documentation Source'}
                        </p>
                        <p className="text-[9px] text-slate-400 font-mono truncate">{url}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer/Disclaimer */}
        <div className="bg-slate-50 border-t border-slate-100 p-6 flex flex-col md:flex-row gap-8 items-center md:items-start opacity-70">
          <div className="relative w-16 h-16 flex-shrink-0 print:hidden opacity-30">
            <div className="absolute inset-0 bg-slate-200 rounded-full border-[6px] border-slate-100 flex items-center justify-center">
              <div className="text-slate-400 font-black italic text-lg rotate-12">VERI</div>
            </div>
          </div>
          <div className="flex-1 space-y-2 text-center md:text-left">
            <h4 className="text-[9px] font-black text-slate-900 uppercase tracking-[0.2em]">Institutional Verification Warranty</h4>
            <p className="text-[9px] leading-relaxed text-slate-400 font-bold uppercase tracking-tight">
              Automated Synthesis via PermitDecoder v7.0. Derived from current public municipal datasets. Verification with the Authority Having Jurisdiction (AHJ) is mandatory prior to project initiation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;