import React, { useState } from 'react';

interface InputSectionProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const FEATURED_PROJECTS = [
  { icon: "🏡", category: "Residential", label: "Custom Deck", query: "Residential deck building permit Indianapolis, IN" },
  { icon: "🚛", category: "Commercial", label: "Food Truck", query: "Commercial food truck operation requirements Austin, TX" },
  { icon: "⚡", category: "Utility", label: "Solar Installation", query: "Residential solar panel requirements Denver, CO" },
  { icon: "🏗️", category: "Industrial", label: "Office Remodel", query: "Commercial office interior renovation Seattle, WA" }
];

const InputSection: React.FC<InputSectionProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="relative pt-44 pb-32 px-6 max-w-7xl mx-auto">
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-20 left-1/4 w-[40rem] h-[40rem] bg-blue-100/50 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-[30rem] h-[30rem] bg-indigo-100/40 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-4xl mx-auto text-center space-y-12">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-3 px-5 py-2 glass rounded-full text-blue-700 text-[11px] font-black uppercase tracking-[0.3em] shadow-sm animate-in fade-in slide-in-from-top-4">
            Authorized Compliance Engine
          </div>
          
          <h1 className="text-6xl sm:text-8xl font-black text-slate-900 tracking-tighter leading-[0.9] animate-in fade-in slide-in-from-top-6 duration-700">
            The standard in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 italic">municipal research.</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-top-8 delay-200">
            Professional AI-driven synthesis of complex building codes and zoning ordinances. Instant, verified, and actionable.
          </p>
        </div>

        {/* Command Center Search Bar */}
        <form 
          onSubmit={handleSubmit} 
          className="relative max-w-3xl mx-auto mt-16 animate-in zoom-in-95 delay-300"
        >
          <div className={`relative flex items-center glass border-2 p-3 rounded-[2.5rem] transition-all duration-500 ${
            isLoading 
              ? 'border-blue-200 shadow-2xl scale-[0.98] opacity-90' 
              : 'border-white shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] hover:shadow-[0_48px_80px_-20px_rgba(37,99,235,0.12)] focus-within:border-blue-500 focus-within:ring-8 focus-within:ring-blue-500/5'
          }`}>
            <div className="pl-6 text-slate-300 transition-colors group-focus-within:text-blue-500">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <input
              type="text"
              className="w-full bg-transparent border-none py-6 px-6 text-2xl font-bold text-slate-900 placeholder-slate-300 focus:outline-none"
              placeholder="Enter project details and city..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              disabled={isLoading}
            />

            <button
              type="submit"
              disabled={isLoading || !query.trim()}
              className={`h-[72px] px-12 rounded-[1.8rem] font-black transition-all flex items-center justify-center gap-3 ${
                isLoading || !query.trim()
                  ? 'bg-slate-100 text-slate-300'
                  : 'bg-slate-900 text-white hover:bg-black active:scale-[0.96] shadow-xl'
              }`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Analyze</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Professional Project Chips */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 animate-in fade-in slide-in-from-bottom-8 delay-500">
          {FEATURED_PROJECTS.map((project) => (
            <button
              key={project.label}
              onClick={() => { setQuery(project.query); onSearch(project.query); }}
              disabled={isLoading}
              className="group flex flex-col items-start gap-4 p-6 bg-white border border-slate-100 rounded-3xl text-left hover-lift shadow-sm hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all"
            >
              <div className="text-2xl group-hover:scale-110 transition-transform">{project.icon}</div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{project.category}</p>
                <p className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{project.label}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InputSection;