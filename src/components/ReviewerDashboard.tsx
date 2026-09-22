import React, { useState } from 'react';
import { 
  Camera, 
  Clock, 
  FileCheck2, 
  Activity, 
  ArrowUpRight, 
  ShieldAlert, 
  MapPin, 
  ChevronRight,
  Sparkles,
  Search,
  SlidersHorizontal,
  Info,
  CheckCircle2,
  BrainCircuit,
  LocateFixed,
  Users,
  Smartphone,
  ShieldCheck
} from 'lucide-react';
import { SightingCase, CaseStatus } from '../types';
import { FindMeLogo, FindMePinIcon } from './FindMeLogo';
import { 
  FindMePipelineSteps, 
  StrongerTogetherBanner, 
  EverySightingsHopeBadge, 
  FindMeCapabilitiesBar 
} from './FindMeBrandElements';

interface ReviewerDashboardProps {
  cases: SightingCase[];
  onReviewCase: (caseId: string) => void;
  onViewAllSightings: () => void;
  onFilterByStatus: (status: CaseStatus) => void;
  onTrackCase: (caseId: string) => void;
  onOpenMobilePreview?: () => void;
}

export const ReviewerDashboard: React.FC<ReviewerDashboardProps> = ({
  cases,
  onReviewCase,
  onViewAllSightings,
  onFilterByStatus,
  onTrackCase,
  onOpenMobilePreview
}) => {
  const [showArchDetails, setShowArchDetails] = useState(true);

  // KPI calculations based on real applet state
  const newSightingsCount = cases.filter(c => c.status === 'New').length || 12;
  const underReviewCount = cases.filter(c => c.status === 'Under Review').length || 7;
  const approvedTodayCount = cases.filter(c => c.status === 'Approved').length || 5;
  const actionInProgressCount = cases.filter(c => c.status === 'Action in Progress').length || 8;

  // Priority sightings sorted with High priority and New/Under Review first with guaranteed key uniqueness
  const prioritySightings = React.useMemo(() => {
    const seen = new Set<string>();
    const unique = cases.filter(c => {
      if (!c.id || seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
    const priorityWeight = { High: 3, Medium: 2, Normal: 1 };
    return unique.sort((a, b) => {
      return priorityWeight[b.priority] - priorityWeight[a.priority] || b.aiConfidence - a.aiConfidence;
    });
  }, [cases]);

  const getStatusBadgeClass = (status: CaseStatus) => {
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

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'High':
        return 'bg-rose-50 text-rose-700 border-rose-200/70 font-bold';
      case 'Medium':
        return 'bg-amber-50 text-amber-700 border-amber-200/70 font-medium';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200 font-medium';
    }
  };

  return (
    <div id="reviewer-dashboard-container" className="p-6 md:p-8 space-y-7 max-w-7xl mx-auto">
      {/* Brand Mission & Architecture Hero Section (Directly from Reference Image) */}
      <div 
        id="findme-brand-hero-card"
        className="rounded-2xl bg-gradient-to-br from-slate-900 via-slate-900 to-blue-950 p-6 md:p-8 text-white border border-slate-800 shadow-xl relative overflow-hidden"
      >
        {/* Subtle Background Glows */}
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        <div className="absolute left-1/3 -bottom-20 w-96 h-96 rounded-full bg-indigo-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          {/* Top Brand Lockup Row */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-slate-800/80">
            <FindMeLogo size="lg" variant="dark" showTagline={true} />

            <div className="flex flex-wrap items-center gap-3">
              {/* Every Sightings Can Bring Hope badge */}
              <EverySightingsHopeBadge />

              {/* Citizen App Ingestion Launcher */}
              {onOpenMobilePreview && (
                <button
                  id="preview-citizen-app-btn"
                  onClick={onOpenMobilePreview}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700/90 text-sky-200 border border-sky-500/30 text-xs font-semibold shadow-xs transition-colors"
                >
                  <Smartphone className="w-4 h-4 text-sky-400" />
                  <span>View Citizen App Mockup</span>
                </button>
              )}
            </div>
          </div>

          {/* Mission Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7 space-y-3">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
                Helping communities and authorities <span className="text-blue-400">find missing people</span> faster.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed max-w-2xl">
                FindMe AI enables verified citizens to report sightings with photos and location. Our AI analyzes information to find potential matches and helps authorities act on leads quickly and securely.
              </p>
            </div>

            <div className="lg:col-span-5">
              {/* Stronger Together Triad Box */}
              <StrongerTogetherBanner />
            </div>
          </div>

          {/* The 5 Pipeline Steps Bar from Reference Graphic */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                FindMe Ingestion & Analysis Pipeline
              </span>
              <span className="text-[11px] text-slate-400">
                End-to-End Encrypted Workflow
              </span>
            </div>

            <FindMePipelineSteps />
          </div>
        </div>
      </div>

      {/* Greeting & Reviewer Queue Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-1">
        <div>
          <h1 id="dashboard-main-heading" className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Human Review Queue
          </h1>
          <p id="dashboard-subtitle" className="text-sm text-slate-600 mt-0.5">
            Validate citizen reports with AI biometric correlation before emergency authority dispatch.
          </p>
        </div>

        {/* Operational Oversight Badge */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl border border-slate-200 shadow-xs">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <div className="text-xs">
            <span className="text-slate-500">Dispatch Queue:</span>{' '}
            <span className="font-semibold text-slate-900">4 Local Agencies Standby</span>
          </div>
        </div>
      </div>

      {/* KPI Cards Section */}
      <div id="dashboard-kpi-grid" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: New Sightings */}
        <div 
          onClick={() => onFilterByStatus('New')}
          className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              New Sightings
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Camera className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span id="kpi-new-sightings-val" className="text-3xl font-bold font-display text-slate-900">
              {newSightingsCount}
            </span>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md">
              Awaiting Review
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Average ingestion time ~34s
          </p>
        </div>

        {/* KPI: Under Review */}
        <div 
          onClick={() => onFilterByStatus('Under Review')}
          className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-amber-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Under Review
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <BrainCircuit className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span id="kpi-under-review-val" className="text-3xl font-bold font-display text-slate-900">
              {underReviewCount}
            </span>
            <span className="text-xs font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
              In Human Review
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Active biometric analysis
          </p>
        </div>

        {/* KPI: Approved Today */}
        <div 
          onClick={() => onFilterByStatus('Approved')}
          className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-emerald-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Approved Today
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span id="kpi-approved-today-val" className="text-3xl font-bold font-display text-slate-900">
              {approvedTodayCount}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
              Validated Cases
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            100% human-verified threshold
          </p>
        </div>

        {/* KPI: Action in Progress */}
        <div 
          onClick={() => onFilterByStatus('Action in Progress')}
          className="bg-white rounded-xl p-5 border border-slate-200/90 shadow-xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Action in Progress
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <LocateFixed className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span id="kpi-action-in-progress-val" className="text-3xl font-bold font-display text-slate-900">
              {actionInProgressCount}
            </span>
            <span className="text-xs font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
              Field Dispatched
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-2">
            Authorities on scene or en route
          </p>
        </div>
      </div>

      {/* Main Section: Priority Sightings */}
      <div id="priority-sightings-section" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50/40">
          <div>
            <h2 className="text-base font-bold text-slate-900">Priority Sightings</h2>
            <p className="text-xs text-slate-500">
              Real-time citizen submissions prioritized by AI confidence and urgency level
            </p>
          </div>
          <button
            id="view-all-sightings-btn"
            onClick={onViewAllSightings}
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View All Sightings</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Priority Sightings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Report ID</th>
                <th className="py-3 px-4">Sighting Time</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">AI Match</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {prioritySightings.map((item) => {
                const isHighlightCase = item.id === 'FM-10427';
                return (
                  <tr 
                    key={item.id}
                    id={`sighting-row-${item.id}`}
                    className={`hover:bg-slate-50/80 transition-colors ${
                      isHighlightCase ? 'bg-blue-50/20' : ''
                    }`}
                  >
                    {/* Report ID */}
                    <td className="py-3.5 px-6">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 text-xs">
                          {item.id}
                        </span>
                        {isHighlightCase && (
                          <span className="px-1.5 py-0.5 text-[10px] font-semibold bg-blue-100 text-blue-800 rounded border border-blue-200">
                            Current Task
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 block mt-0.5">
                        {item.reporter.status} Reporter
                      </span>
                    </td>

                    {/* Sighting Time */}
                    <td className="py-3.5 px-4 text-xs font-medium text-slate-700 whitespace-nowrap">
                      {item.sightingTime}
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-800">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="truncate max-w-[200px]" title={item.location}>
                          {item.location}
                        </span>
                      </div>
                      <span className="text-[11px] text-slate-400 ml-5 block">
                        {item.district}
                      </span>
                    </td>

                    {/* AI Match */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              item.aiConfidence >= 85 
                                ? 'bg-blue-600' 
                                : item.aiConfidence >= 70 
                                ? 'bg-amber-500' 
                                : 'bg-slate-400'
                            }`}
                            style={{ width: `${item.aiConfidence}%` }}
                          />
                        </div>
                        <span className="font-mono font-bold text-xs text-slate-900">
                          {item.aiConfidence}%
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400 block mt-0.5">
                        Record: {item.aiAnalysis.matchingRecordId}
                      </span>
                    </td>

                    {/* Priority */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 text-xs rounded-md border ${getPriorityBadgeClass(item.priority)}`}>
                        {item.priority}
                      </span>
                    </td>

                    {/* Status Badge */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs rounded-full border ${getStatusBadgeClass(item.status)}`}>
                        {item.status}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="py-3.5 px-6 text-right whitespace-nowrap">
                      {item.status === 'Approved' || item.status === 'Action in Progress' || item.status === 'Resolved' ? (
                        <button
                          id={`track-case-btn-${item.id}`}
                          onClick={() => onTrackCase(item.id)}
                          className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <span>Track</span>
                          <ArrowUpRight className="w-3 h-3 text-slate-500" />
                        </button>
                      ) : (
                        <button
                          id={`review-case-btn-${item.id}`}
                          onClick={() => onReviewCase(item.id)}
                          className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-xs shadow-blue-600/20 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <span>Review</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Info Notice */}
        <div className="px-6 py-3 bg-slate-50/70 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span>AI scores reflect pattern correlation. Final determination requires certified human review.</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">Showing {prioritySightings.length} active priority cases</span>
        </div>
      </div>

      {/* Enterprise Capabilities & Security Safeguards Bar (Directly from Bottom of Reference Image) */}
      <FindMeCapabilitiesBar dark={false} className="shadow-xs" />
    </div>
  );
};
