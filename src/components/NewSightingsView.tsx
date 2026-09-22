import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  Calendar, 
  ShieldCheck, 
  SlidersHorizontal, 
  LayoutGrid, 
  Table as TableIcon, 
  ExternalLink,
  ChevronRight,
  ZoomIn,
  Eye,
  CheckCircle2,
  Sparkles,
  ArrowUpDown
} from 'lucide-react';
import { SightingCase, CaseStatus, PriorityLevel } from '../types';

interface NewSightingsViewProps {
  cases: SightingCase[];
  onReviewCase: (caseId: string) => void;
  onTrackCase: (caseId: string) => void;
  onInspectImage: (imageUrl: string, title: string) => void;
  initialStatusFilter?: CaseStatus | 'All';
}

export const NewSightingsView: React.FC<NewSightingsViewProps> = ({
  cases,
  onReviewCase,
  onTrackCase,
  onInspectImage,
  initialStatusFilter = 'All'
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [confidenceFilter, setConfidenceFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState<string>(initialStatusFilter);
  const [dateFilter, setDateFilter] = useState('All');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');

  // Filter logic with guaranteed key uniqueness
  const filteredCases = React.useMemo(() => {
    const seen = new Set<string>();
    return cases.filter((c) => {
      if (!c.id || seen.has(c.id)) return false;
      seen.add(c.id);

      // Search query matches ID or Location
      const matchesSearch = 
        c.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.aiAnalysis.matchingRecordId.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // District filter
      if (districtFilter !== 'All' && c.district !== districtFilter) return false;

      // Priority filter
      if (priorityFilter !== 'All' && c.priority !== priorityFilter) return false;

      // Status filter
      if (statusFilter !== 'All' && c.status !== statusFilter) return false;

      // Confidence filter
      if (confidenceFilter === 'High' && c.aiConfidence < 80) return false;
      if (confidenceFilter === 'Moderate' && (c.aiConfidence < 60 || c.aiConfidence >= 80)) return false;
      if (confidenceFilter === 'Low' && c.aiConfidence >= 60) return false;

      return true;
    });
  }, [cases, searchQuery, districtFilter, priorityFilter, statusFilter, confidenceFilter]);

  const getStatusBadge = (status: CaseStatus) => {
    switch (status) {
      case 'New':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 font-semibold';
      case 'Under Review':
        return 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold';
      case 'Approved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 font-semibold';
      case 'Action in Progress':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80 font-semibold';
      case 'Resolved':
        return 'bg-slate-100 text-slate-700 border-slate-300 font-semibold';
      case 'More Info Requested':
        return 'bg-purple-50 text-purple-700 border-purple-200 font-semibold';
      case 'Rejected':
        return 'bg-rose-50 text-rose-700 border-rose-200 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: PriorityLevel) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  return (
    <div id="new-sightings-view-container" className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 id="new-sightings-header" className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            New Sighting Reports
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Filter, examine biometric evidence, and select cases for human verification triage.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-1 bg-white p-1 rounded-lg border border-slate-200 self-start sm:self-auto shadow-2xs">
          <button
            onClick={() => setViewMode('cards')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'cards' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Card View"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Cards</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-1.5 rounded-md text-xs font-medium flex items-center gap-1.5 transition-colors ${
              viewMode === 'table' 
                ? 'bg-slate-900 text-white shadow-xs' 
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
            title="Table View"
          >
            <TableIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div id="sightings-filter-bar" className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-3">
        {/* Search row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              id="search-sightings-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search report ID or location (e.g. Central District, FM-10427)..."
              className="w-full pl-10 pr-4 py-2 text-sm bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-900 rounded-lg border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-hidden transition-all"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            {/* Location filter */}
            <select
              id="filter-location-select"
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Locations</option>
              <option value="Central District">Central District</option>
              <option value="North Bay">North Bay</option>
              <option value="Riverfront">Riverfront</option>
              <option value="Eastside">Eastside</option>
              <option value="South Market">South Market</option>
            </select>

            {/* Match Confidence filter */}
            <select
              id="filter-confidence-select"
              value={confidenceFilter}
              onChange={(e) => setConfidenceFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Match Confidences</option>
              <option value="High">High (&gt;= 80%)</option>
              <option value="Moderate">Moderate (60% - 79%)</option>
              <option value="Low">Low (&lt; 60%)</option>
            </select>

            {/* Priority filter */}
            <select
              id="filter-priority-select"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Normal">Normal</option>
            </select>

            {/* Status filter */}
            <select
              id="filter-status-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Under Review">Under Review</option>
              <option value="Approved">Approved</option>
              <option value="Action in Progress">Action in Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="More Info Requested">More Info Requested</option>
              <option value="Rejected">Rejected</option>
            </select>

            {(searchQuery || districtFilter !== 'All' || confidenceFilter !== 'All' || priorityFilter !== 'All' || statusFilter !== 'All') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setDistrictFilter('All');
                  setConfidenceFilter('All');
                  setPriorityFilter('All');
                  setStatusFilter('All');
                }}
                className="px-2.5 py-2 text-slate-500 hover:text-slate-800 text-xs font-semibold"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>Found {filteredCases.length} matching reports</span>
          <span className="text-[11px] font-mono">Triage standard: Response within 15 minutes for High Priority</span>
        </div>
      </div>

      {/* Cards View */}
      {viewMode === 'cards' && (
        <div id="sightings-cards-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredCases.map((c) => (
            <div
              key={c.id}
              id={`sighting-card-${c.id}`}
              className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col group"
            >
              {/* Card Top: Image thumbnail + Quick Overlay */}
              <div className="relative h-48 bg-slate-900 overflow-hidden">
                <img
                  src={c.reportedImage}
                  alt={`Reported sighting ${c.id}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient shade */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/30" />

                {/* Badges on Image */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 bg-slate-900/90 text-white rounded-md backdrop-blur-xs border border-white/20">
                    {c.id}
                  </span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-md border backdrop-blur-xs ${getPriorityBadge(c.priority)}`}>
                    {c.priority}
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <button
                    onClick={() => onInspectImage(c.reportedImage, `Evidence Capture — Case ${c.id}`)}
                    className="p-1.5 rounded-lg bg-black/50 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
                    title="Inspect High-Res Evidence Capture"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </button>
                </div>

                {/* Bottom Bar over Image: AI Match Confidence */}
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-sky-200">
                      AI Match
                    </span>
                    <span className="font-mono font-bold text-sm bg-blue-600/90 px-2 py-0.5 rounded border border-blue-400/40">
                      {c.aiConfidence}%
                    </span>
                  </div>
                  <span className="text-xs text-slate-300 font-mono">
                    Ref: {c.aiAnalysis.matchingRecordId}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>{c.sightingTime}</span>
                    </div>
                    <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusBadge(c.status)}`}>
                      {c.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-slate-800">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="font-medium line-clamp-1" title={c.location}>
                      {c.location}
                    </span>
                  </div>

                  {/* Reporter Status */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-600 bg-slate-50 px-2.5 py-1.5 rounded-lg border border-slate-100">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="font-semibold text-slate-800">Reporter:</span>
                    <span className="text-emerald-700 font-medium">{c.reporter.status}</span>
                    <span className="text-slate-400 truncate">• {c.reporter.name}</span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">
                    {c.description}
                  </p>
                </div>

                {/* Card Action */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Quality: {c.aiAnalysis.imageQuality}
                  </span>

                  {c.status === 'Approved' || c.status === 'Action in Progress' || c.status === 'Resolved' ? (
                    <button
                      id={`track-btn-card-${c.id}`}
                      onClick={() => onTrackCase(c.id)}
                      className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <span>Track Dispatch</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button
                      id={`review-btn-card-${c.id}`}
                      onClick={() => onReviewCase(c.id)}
                      className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-600/20 rounded-lg transition-colors flex items-center gap-1.5"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review Case</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div id="sightings-table-container" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Thumbnail</th>
                  <th className="py-3 px-4">Report ID</th>
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Reporter Status</th>
                  <th className="py-3 px-4">AI Match</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredCases.map((c) => (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-2 px-4">
                      <div 
                        onClick={() => onInspectImage(c.reportedImage, `Evidence — ${c.id}`)}
                        className="w-12 h-12 rounded-lg bg-slate-900 overflow-hidden relative group cursor-pointer border border-slate-200 shrink-0"
                      >
                        <img 
                          src={c.reportedImage} 
                          alt={c.id} 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform" 
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                          <ZoomIn className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-mono font-bold text-xs text-slate-900">{c.id}</div>
                      <span className={`inline-block mt-0.5 text-[10px] px-1.5 py-0.2 rounded border ${getPriorityBadge(c.priority)}`}>
                        {c.priority}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {c.sightingTime}
                    </td>

                    <td className="py-3 px-4">
                      <div className="text-xs text-slate-800 font-medium truncate max-w-[200px]" title={c.location}>
                        {c.location}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{c.district}</span>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1 text-xs">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="font-semibold text-slate-700">{c.reporter.status}</span>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-blue-600">
                          {c.aiConfidence}%
                        </span>
                        <div className="w-12 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div 
                            className="bg-blue-600 h-full rounded-full" 
                            style={{ width: `${c.aiConfidence}%` }} 
                          />
                        </div>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {c.aiAnalysis.matchingRecordId}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span className={`px-2 py-0.5 text-xs rounded-full border ${getStatusBadge(c.status)}`}>
                        {c.status}
                      </span>
                    </td>

                    <td className="py-3 px-6 text-right whitespace-nowrap">
                      {c.status === 'Approved' || c.status === 'Action in Progress' || c.status === 'Resolved' ? (
                        <button
                          onClick={() => onTrackCase(c.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors"
                        >
                          Track
                        </button>
                      ) : (
                        <button
                          onClick={() => onReviewCase(c.id)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                        >
                          Review Case
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
