import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Car, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Filter, 
  Search,
  Radio,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCheck
} from 'lucide-react';
import { SightingCase, AuthorityStatus } from '../types';

interface AuthoritiesViewProps {
  cases: SightingCase[];
  onTrackCase: (caseId: string) => void;
  onAdvanceAuthorityStatus: (caseId: string, nextStatus: AuthorityStatus) => void;
}

export const AuthoritiesView: React.FC<AuthoritiesViewProps> = ({
  cases,
  onTrackCase,
  onAdvanceAuthorityStatus
}) => {
  const [selectedAuthority, setSelectedAuthority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Forwarded cases: cases that are Approved, Action in Progress, or Resolved (or have forwarding info) with guaranteed key uniqueness
  const filteredCases = React.useMemo(() => {
    const seen = new Set<string>();
    const forwarded = cases.filter(
      c => c.forwarding !== undefined || c.status === 'Approved' || c.status === 'Action in Progress' || c.status === 'Resolved'
    );

    return forwarded.filter((c) => {
      if (!c.id || seen.has(c.id)) return false;
      seen.add(c.id);

      const authorityName = c.forwarding?.destinationAuthority || 'Metro Emergency Dispatch — Precinct 4';
      const status = c.forwarding?.currentAuthorityStatus || (c.status === 'Resolved' ? 'Resolved' : c.status === 'Action in Progress' ? 'Action in Progress' : 'Notified');

      if (selectedAuthority !== 'All' && !authorityName.includes(selectedAuthority)) return false;
      if (selectedStatus !== 'All' && status !== selectedStatus) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          c.id.toLowerCase().includes(q) ||
          c.location.toLowerCase().includes(q) ||
          authorityName.toLowerCase().includes(q) ||
          (c.forwarding?.assignedUnit || '').toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [cases, selectedAuthority, selectedStatus, searchQuery]);

  const getAuthorityBadgeClass = (status: AuthorityStatus) => {
    switch (status) {
      case 'Notified':
        return 'bg-blue-50 text-blue-700 border-blue-200/80 font-semibold';
      case 'Acknowledged':
        return 'bg-amber-50 text-amber-800 border-amber-200/80 font-semibold';
      case 'Action in Progress':
        return 'bg-indigo-50 text-indigo-700 border-indigo-200/80 font-semibold';
      case 'Resolved':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200/80 font-semibold';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="authorities-view-container" className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 id="authorities-dashboard-title" className="text-2xl font-bold font-display text-slate-900 tracking-tight">
              Forwarded Cases — Authorities Dashboard
            </h1>
            <span className="px-2.5 py-0.5 text-xs font-semibold bg-indigo-50 text-indigo-700 rounded-full border border-indigo-200">
              Live Agency Sync
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor real-time status and field unit deployments across connected emergency response jurisdictions.
          </p>
        </div>

        {/* Agency stats badge */}
        <div className="bg-white p-2.5 px-4 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
          <Building2 className="w-4 h-4 text-blue-600" />
          <div className="text-xs">
            <span className="text-slate-500">Connected Jurisdictions:</span>{' '}
            <span className="font-bold text-slate-900">4 Active Precincts</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Case ID, unit or authority..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto text-xs">
          <select
            value={selectedAuthority}
            onChange={(e) => setSelectedAuthority(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Authorities</option>
            <option value="Precinct 4">Metro Dispatch — Precinct 4</option>
            <option value="Transit Police">Transit Police Authority</option>
            <option value="Riverfront">Riverfront Precinct 6</option>
            <option value="Juvenile">Juvenile Response Division</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Statuses</option>
            <option value="Notified">Notified</option>
            <option value="Acknowledged">Acknowledged</option>
            <option value="Action in Progress">Action in Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Authorities Forwarded Table */}
      <div id="authorities-forwarded-table" className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Case ID</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Authority</th>
                <th className="py-3 px-4">Assigned Unit</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Update</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCases.map((c) => {
                const authorityStatus = (c.forwarding?.currentAuthorityStatus || 
                  (c.status === 'Resolved' ? 'Resolved' : c.status === 'Action in Progress' ? 'Action in Progress' : 'Notified')) as AuthorityStatus;
                
                const authorityName = c.forwarding?.destinationAuthority || 'Metro Emergency Dispatch — Precinct 4';
                const assignedUnit = c.forwarding?.assignedUnit || 'Unit 14-B (Rapid Patrol)';
                const lastUpdate = c.forwarding?.forwardedAt || c.sightingTime;

                return (
                  <tr key={c.id} className="hover:bg-slate-50/80 transition-colors">
                    {/* Case ID */}
                    <td className="py-3.5 px-6">
                      <span className="font-mono font-bold text-xs text-slate-900">
                        {c.id}
                      </span>
                      <span className="text-[11px] text-slate-500 block">
                        {c.aiAnalysis.recordName}
                      </span>
                    </td>

                    {/* Location */}
                    <td className="py-3.5 px-4">
                      <div className="text-xs font-medium text-slate-800 truncate max-w-[200px]" title={c.location}>
                        {c.location}
                      </div>
                      <span className="text-[11px] text-slate-400 block">{c.district}</span>
                    </td>

                    {/* Authority */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-800 font-medium">
                        <Building2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span className="truncate max-w-[220px]" title={authorityName}>
                          {authorityName}
                        </span>
                      </div>
                    </td>

                    {/* Assigned Unit */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 text-xs text-slate-700">
                        <Car className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span className="font-mono">{assignedUnit}</span>
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 text-xs rounded-full border ${getAuthorityBadgeClass(authorityStatus)}`}>
                        {authorityStatus}
                      </span>
                    </td>

                    {/* Last Update */}
                    <td className="py-3.5 px-4 text-xs text-slate-500 whitespace-nowrap font-mono">
                      {lastUpdate}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-6 text-right whitespace-nowrap space-x-2">
                      {/* Interactive simulation controls for prototype demonstration */}
                      {authorityStatus === 'Notified' && (
                        <button
                          onClick={() => onAdvanceAuthorityStatus(c.id, 'Acknowledged')}
                          className="px-2.5 py-1 text-xs font-medium text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-md transition-colors"
                          title="Simulate Authority Acknowledgment"
                        >
                          Acknowledge
                        </button>
                      )}

                      {authorityStatus === 'Acknowledged' && (
                        <button
                          onClick={() => onAdvanceAuthorityStatus(c.id, 'Action in Progress')}
                          className="px-2.5 py-1 text-xs font-medium text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-md transition-colors"
                          title="Simulate Unit Dispatched"
                        >
                          Dispatch
                        </button>
                      )}

                      {authorityStatus === 'Action in Progress' && (
                        <button
                          onClick={() => onAdvanceAuthorityStatus(c.id, 'Resolved')}
                          className="px-2.5 py-1 text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-md transition-colors"
                          title="Simulate Subject Located & Resolved"
                        >
                          Resolve
                        </button>
                      )}

                      <button
                        onClick={() => onTrackCase(c.id)}
                        className="px-3 py-1 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors inline-flex items-center gap-1"
                      >
                        <span>Track</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
