import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Eye, 
  Calendar, 
  ShieldCheck,
  Building2
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  // Required KPIs:
  // • Sightings received: 248
  // • AI potential matches: 182
  // • Human approvals: 38
  // • Cases forwarded: 38
  // • Average review time: 3m 42s
  // • Cases resolved: 29

  const weeklyData = [
    { day: 'Mon', sightings: 32, matches: 24, approved: 5, resolved: 4 },
    { day: 'Tue', sightings: 41, matches: 30, approved: 7, resolved: 6 },
    { day: 'Wed', sightings: 38, matches: 28, approved: 6, resolved: 5 },
    { day: 'Thu', sightings: 45, matches: 33, approved: 8, resolved: 5 },
    { day: 'Fri', sightings: 52, matches: 39, approved: 7, resolved: 6 },
    { day: 'Sat', sightings: 22, matches: 15, approved: 3, resolved: 2 },
    { day: 'Sun (Today)', sightings: 18, matches: 13, approved: 2, resolved: 1 }
  ];

  return (
    <div id="analytics-dashboard-container" className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-2xl font-bold font-display text-slate-900 tracking-tight">
            Operational Analytics & Review Performance
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Throughput, human verification ratios, and authority dispatch resolution metrics.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-mono text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>Reporting Window: Last 7 Days</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {/* Sightings Received */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Sightings Received
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-slate-900">248</span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              +14% wk
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Citizen & CCTV feeds</p>
        </div>

        {/* AI Potential Matches */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            AI Potential Matches
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-indigo-900">182</span>
            <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
              73.3% triage
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Confidence &gt; 60%</p>
        </div>

        {/* Human Approvals */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Human Approvals
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-emerald-900">38</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              Verified
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">20.8% validation rate</p>
        </div>

        {/* Cases Forwarded */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Cases Forwarded
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-blue-900">38</span>
            <span className="text-[10px] font-semibold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
              100% routed
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sent to local CAD</p>
        </div>

        {/* Average Review Time */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Avg. Review Time
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-amber-900 font-mono">3m 42s</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              &lt; 5m SLA
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Target 05:00 min</p>
        </div>

        {/* Cases Resolved */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
            Cases Resolved
          </span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-bold font-display text-slate-900">29</span>
            <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              76.3% success
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Safe outcomes closed</p>
        </div>
      </div>

      {/* Clean Analytics Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Volume Bar Chart */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Weekly Sighting Ingestion & Verification Volume
              </h3>
              <p className="text-xs text-slate-500">
                Comparison of daily incoming reports vs validated forwarded cases
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-blue-500" />
                <span className="text-slate-600">Sightings Received</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded bg-emerald-500" />
                <span className="text-slate-600">Forwarded</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Chart */}
          <div className="pt-4 h-64 w-full">
            <svg className="w-full h-full" viewBox="0 0 600 200" preserveAspectRatio="none">
              {/* Horizontal Grid lines */}
              <line x1="0" y1="40" x2="600" y2="40" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="90" x2="600" y2="90" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="140" x2="600" y2="140" stroke="#f1f5f9" strokeWidth="1" />
              <line x1="0" y1="180" x2="600" y2="180" stroke="#cbd5e1" strokeWidth="1" />

              {/* Data bars */}
              {weeklyData.map((d, i) => {
                const x = 30 + i * 82;
                const hSightings = (d.sightings / 60) * 140;
                const hForwarded = (d.approved / 60) * 140;

                return (
                  <g key={d.day}>
                    {/* Sighting bar */}
                    <rect
                      x={x}
                      y={180 - hSightings}
                      width="26"
                      height={hSightings}
                      rx="4"
                      fill="#3b82f6"
                      className="hover:opacity-80 transition-opacity"
                    />
                    {/* Forwarded bar */}
                    <rect
                      x={x + 30}
                      y={180 - hForwarded}
                      width="16"
                      height={hForwarded}
                      rx="3"
                      fill="#10b981"
                      className="hover:opacity-80 transition-opacity"
                    />
                    {/* Day label */}
                    <text
                      x={x + 23}
                      y="195"
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize="11"
                      fontFamily="sans-serif"
                    >
                      {d.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Human Verification Triage Ratios */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Human Reviewer Outcomes
            </h3>
            <p className="text-xs text-slate-500">
              Distribution of reviewer triage decisions
            </p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Approved & Forwarded</span>
                <span className="text-emerald-700 font-mono">38 cases (20.8%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-600 h-full rounded-full" style={{ width: '20.8%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">Rejected (False Positives)</span>
                <span className="text-rose-700 font-mono">112 cases (61.5%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '61.5%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-700">More Info / Secondary Angle</span>
                <span className="text-purple-700 font-mono">32 cases (17.7%)</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full rounded-full" style={{ width: '17.7%' }} />
              </div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800">Oversight Efficiency:</span>
            <p>
              Human verification prevented 112 unnecessary authority field dispatches this week while maintaining zero delayed responses on critical alerts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
