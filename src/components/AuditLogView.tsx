import React, { useState } from 'react';
import { 
  ScrollText, 
  Search, 
  Filter, 
  ShieldCheck, 
  Clock, 
  Download, 
  Hash, 
  UserCheck, 
  CheckCircle2, 
  Calendar,
  ExternalLink
} from 'lucide-react';
import { AuditEvent } from '../types';

interface AuditLogViewProps {
  auditLogs: AuditEvent[];
  onSelectCase?: (caseId: string) => void;
}

export const AuditLogView: React.FC<AuditLogViewProps> = ({
  auditLogs,
  onSelectCase
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCaseFilter, setSelectedCaseFilter] = useState('All');

  // Filter logs
  const filteredLogs = auditLogs.filter((log) => {
    if (selectedCaseFilter !== 'All' && log.caseId !== selectedCaseFilter) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return (
        log.caseId.toLowerCase().includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.actor.toLowerCase().includes(q) ||
        log.details.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const distinctCases = Array.from(new Set(auditLogs.map(l => l.caseId)));

  return (
    <div id="audit-log-view-container" className="p-6 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
              Chronological Audit Trail & Compliance Ledger
            </h1>
            <span className="px-2 py-0.5 text-xs font-semibold bg-blue-50 text-blue-700 rounded-md border border-blue-200">
              Tamper-Evident SHA256
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Immutable log of all citizen submissions, AI scores, certified reviewer determinations, and authority transmissions.
          </p>
        </div>

        <button
          onClick={() => {
            const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(auditLogs, null, 2));
            const downloadAnchor = document.createElement('a');
            downloadAnchor.setAttribute("href", dataStr);
            downloadAnchor.setAttribute("download", "findme-audit-log.json");
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            downloadAnchor.remove();
          }}
          className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-lg shadow-2xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          <span>Export Audit Log (JSON)</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search action, actor, or details..."
            className="w-full pl-10 pr-4 py-2 text-xs bg-slate-50 rounded-lg border border-slate-200 focus:bg-white focus:border-blue-500 focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto text-xs">
          <span className="text-slate-500 font-medium">Filter by Case:</span>
          <select
            value={selectedCaseFilter}
            onChange={(e) => setSelectedCaseFilter(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 font-medium focus:outline-hidden focus:border-blue-500"
          >
            <option value="All">All Cases</option>
            {distinctCases.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-3 px-6">Timestamp</th>
                <th className="py-3 px-4">Case ID</th>
                <th className="py-3 px-4">Action Event</th>
                <th className="py-3 px-4">Actor & Role</th>
                <th className="py-3 px-4">Details</th>
                <th className="py-3 px-6 text-right">Verification Hash</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-xs">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Timestamp */}
                  <td className="py-3 px-6 text-slate-600 whitespace-nowrap">
                    {log.timestamp}
                  </td>

                  {/* Case ID */}
                  <td className="py-3 px-4 font-bold text-blue-600">
                    {onSelectCase ? (
                      <button 
                        onClick={() => onSelectCase(log.caseId)}
                        className="hover:underline"
                      >
                        {log.caseId}
                      </button>
                    ) : (
                      log.caseId
                    )}
                  </td>

                  {/* Action Event */}
                  <td className="py-3 px-4 font-sans font-bold text-slate-900">
                    {log.action}
                  </td>

                  {/* Actor & Role */}
                  <td className="py-3 px-4 font-sans">
                    <span className="font-semibold text-slate-800 block">
                      {log.actor}
                    </span>
                    <span className="text-[11px] text-slate-400">
                      {log.actorRole}
                    </span>
                  </td>

                  {/* Details */}
                  <td className="py-3 px-4 font-sans text-slate-600 max-w-xs">
                    {log.details}
                  </td>

                  {/* Hash */}
                  <td className="py-3 px-6 text-right text-slate-400 text-[11px] whitespace-nowrap">
                    <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                      {log.hash}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
