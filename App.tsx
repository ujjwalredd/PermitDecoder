import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ReportViewer from './components/ReportViewer';
import HistoryList from './components/HistoryList';
import { generatePermitReportStream } from './services/geminiService';
import { PermitReport, GroundingChunk } from './types';

const App: React.FC = () => {
  const [reports, setReports] = useState<PermitReport[]>([]);
  const [activeReport, setActiveReport] = useState<PermitReport | null>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [streamingContent, setStreamingContent] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('permit_history_v7');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) setReports(parsed);
      } catch (e) { console.error("History load error", e); }
    }
  }, []);

  const handleSearch = async (query: string) => {
    setIsStreaming(true);
    setStreamingContent("");
    setActiveReport(null);
    setError(null);
    setIsWorkspaceOpen(true);

    try {
      const result = await generatePermitReportStream(query);
      let accumulatedText = "";
      let allGroundingChunks: GroundingChunk[] = [];

      for await (const chunk of result) {
        if (chunk.text) {
          accumulatedText += chunk.text;
          setStreamingContent(accumulatedText);
        }
        
        const chunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
        if (chunks && chunks.length > 0) {
          chunks.forEach(c => {
            if (c.web && !allGroundingChunks.some(existing => existing.web?.uri === c.web?.uri)) {
              allGroundingChunks.push(c);
            }
          });
        }
      }

      const newReport: PermitReport = {
        id: `PDR-${Math.random().toString(36).substring(2, 6).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        query,
        content: accumulatedText,
        timestamp: Date.now(),
        sources: allGroundingChunks
      };

      const updated = [newReport, ...reports].slice(0, 15);
      setReports(updated);
      setActiveReport(newReport);
      localStorage.setItem('permit_history_v7', JSON.stringify(updated));
    } catch (err: any) {
      setError(err.message || "Decoding process failed. Gateway timeout.");
      setIsWorkspaceOpen(false);
    } finally {
      setIsStreaming(false);
      setStreamingContent("");
    }
  };

  const closeWorkspace = () => {
    setIsWorkspaceOpen(false);
    setActiveReport(null);
  };

  const openReportFromHistory = (report: PermitReport) => {
    setActiveReport(report);
    setIsWorkspaceOpen(true);
  };

  return (
    <div className={`min-h-screen flex flex-col transition-all duration-700 ease-in-out ${isWorkspaceOpen ? 'bg-slate-100' : 'bg-[#fdfdfe]'}`}>
      {!isWorkspaceOpen && <Header />}
      
      <main className={`flex-grow container mx-auto px-6 max-w-7xl relative z-10 transition-all duration-1000 ${isWorkspaceOpen ? 'blur-3xl opacity-0 scale-95 pointer-events-none' : 'opacity-100 scale-100'}`}>
        <InputSection onSearch={handleSearch} isLoading={isStreaming} />

        {error && (
          <div className="max-w-4xl mx-auto mb-20 glass rounded-[2.5rem] p-8 flex items-center gap-8 text-rose-600 shadow-2xl animate-in slide-in-from-top-12">
            <div className="w-16 h-16 flex-shrink-0 bg-rose-50 rounded-2xl flex items-center justify-center text-rose-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-black tracking-tight mb-1 uppercase">Analysis Obstruction</p>
              <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-[10px] italic">{error}</p>
            </div>
          </div>
        )}

        {reports.length > 0 && (
          <div className="mt-12 pb-32 border-t border-slate-100 pt-20">
            <HistoryList 
              history={reports} 
              onSelect={openReportFromHistory} 
              activeId={activeReport?.id} 
            />
          </div>
        )}
      </main>

      {/* Protocol Workspace */}
      {isWorkspaceOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col animate-in slide-in-from-bottom-24 duration-700">
          {/* Compressed Toolbar */}
          <div className="bg-white/95 backdrop-blur-3xl border-b border-slate-200 px-6 py-4 flex items-center justify-between shadow-lg print-hide">
            <div className="flex items-center gap-6">
              <button 
                onClick={closeWorkspace}
                className="group flex items-center gap-2 px-3 py-2 hover:bg-slate-100 rounded-xl transition-all font-black text-slate-900 text-xs"
              >
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                <span>Console</span>
              </button>
              
              <div className="w-px h-6 bg-slate-200"></div>
              
              <div>
                <h3 className="font-black text-slate-900 leading-none mb-1.5 tracking-tight text-sm">Protocol Workspace</h3>
                <div className="flex items-center gap-3">
                  <p className={`text-[8px] font-black uppercase tracking-[0.3em] ${isStreaming ? 'text-blue-600 animate-pulse' : 'text-emerald-600'}`}>
                    {isStreaming ? 'SYNTHESIZING DATA' : 'ANALYSIS VERIFIED'}
                  </p>
                  <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                  {/* Google Translate Integration in Workspace */}
                  <div id="google_translate_element" className="scale-[0.85] origin-left"></div>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => window.print()}
              className="group flex items-center gap-2.5 px-6 py-2.5 bg-slate-900 text-white font-black rounded-xl text-xs hover:bg-black transition-all shadow-xl active:scale-95"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Export</span>
            </button>
          </div>
          
          <div className="flex-grow overflow-y-auto bg-[#f0f2f5] p-4 md:p-8 scroll-smooth">
            <ReportViewer 
              report={activeReport || { 
                id: 'SESSION_REALTIME', 
                query: 'Initializing Analysis...', 
                content: streamingContent, 
                timestamp: Date.now(), 
                sources: [] 
              }} 
              isStreaming={isStreaming}
            />
          </div>
        </div>
      )}

      <footer className={`mt-auto border-t border-slate-100 py-16 bg-white ${isWorkspaceOpen ? 'hidden' : ''}`}>
        <div className="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3 grayscale opacity-30 hover:opacity-100 transition-all cursor-default">
            <div className="bg-slate-900 p-2 rounded-xl shadow-lg">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <span className="text-xl font-black tracking-tighter text-slate-900 uppercase">PermitDecoder</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">© 2025 Institutional Grade v7.4.2</p>
        </div>
      </footer>
    </div>
  );
};

export default App;