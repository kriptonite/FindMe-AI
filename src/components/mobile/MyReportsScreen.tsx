import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ChevronRight, 
  Sparkles, 
  Filter, 
  Search, 
  Plus,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { SightingCase, CaseStatus } from '../../types';

interface MyReportsScreenProps {
  cases: SightingCase[];
  onSelectReport: (caseId: string) => void;
  onStartNewReport: () => void;
  onBack: () => void;
}

export const MyReportsScreen: React.FC<MyReportsScreenProps> = ({
  cases,
  onSelectReport,
  onStartNewReport,
  onBack
}) => {
  const [filter, setFilter] = useState<'All' | 'Under Review' | 'Verified' | 'Action in Progress' | 'Resolved'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Normalize statuses to match the user's required badges:
  // Under Review, Verified, Action in Progress, Resolved
  const getBadgeConfig = (caseItem: SightingCase) => {
    if (caseItem.status === 'Resolved') {
      return {
        label: 'Resolved',
        bg: 'bg-emerald-50',
        text: 'text-emerald-800',
        border: 'border-emerald-200'
      };
    }
    if (caseItem.status === 'Action in Progress' || caseItem.status === 'Approved') {
      return {
        label: 'Action in Progress',
        bg: 'bg-blue-50',
        text: 'text-blue-800',
        border: 'border-blue-200'
      };
    }
    if (caseItem.status === 'Under Review' || caseItem.status === 'New') {
      return {
        label: 'Under Review',
        bg: 'bg-amber-50',
        text: 'text-amber-800',
        border: 'border-amber-200'
      };
    }
    return {
      label: 'Verified',
      bg: 'bg-indigo-50',
      text: 'text-indigo-800',
      border: 'border-indigo-200'
    };
  };

  const filteredCases = cases.filter((c) => {
    const badge = getBadgeConfig(c);
    if (filter !== 'All' && badge.label !== filter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        c.id.toLowerCase().includes(q) ||
        c.location.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="min-h-full bg-slate-50/50 pb-20 text-slate-900 select-none">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 pt-3 pb-3 shadow-xs sticky top-0 z-10">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="p-2 -ml-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-base font-bold text-slate-900">My Reports</h1>

          <button
            onClick={onStartNewReport}
            className="p-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
            aria-label="New Report"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports by ID or location..."
            className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 border border-slate-200 rounded-xl focus:bg-white focus:border-blue-600 outline-hidden"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-none">
          {(['All', 'Under Review', 'Action in Progress', 'Resolved'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={`px-3 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                filter === tab
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Reports List */}
      <div className="p-4 space-y-3">
        {filteredCases.length === 0 ? (
          <div className="bg-white rounded-3xl p-8 text-center border border-slate-200">
            <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-slate-900">No reports found</h3>
            <p className="text-xs text-slate-500 mt-1">
              Try adjusting your filter or search criteria.
            </p>
          </div>
        ) : (
          filteredCases.map((item) => {
            const badge = getBadgeConfig(item);
            return (
              <button
                key={item.id}
                onClick={() => onSelectReport(item.id)}
                className="w-full bg-white rounded-2xl p-4 border border-slate-200 hover:border-blue-400 hover:shadow-sm transition-all text-left shadow-xs flex flex-col gap-3 group cursor-pointer"
              >
                {/* Top Row: Report ID, Date & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {item.id}
                    </span>
                    <span className="text-[11px] text-slate-400">•</span>
                    <span className="text-[11px] text-slate-500 font-medium">
                      {item.sightingTime}
                    </span>
                  </div>

                  {/* Status Badge */}
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Location */}
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-600 mt-0.5 shrink-0" />
                  <span className="text-xs font-medium text-slate-800 line-clamp-1">
                    {item.location}
                  </span>
                </div>

                {/* Bottom Row: AI Match Status & Thumbnail */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span className="text-[11px] font-semibold text-slate-700">
                      AI Match Status: <strong className="text-blue-700">{item.aiConfidence}% Correlated</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <img
                      src={item.reportedImage}
                      alt={item.id}
                      className="w-8 h-8 rounded-lg object-cover border border-slate-200"
                    />
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};
