import React, { useState } from 'react';
import { 
  MOCK_CASES, 
  CURRENT_REVIEWER, 
  INITIAL_AUDIT_LOGS, 
  MOCK_NOTIFICATIONS 
} from './data/mockCases';
import { 
  SightingCase, 
  NavSection, 
  AuditEvent, 
  NotificationItem, 
  ReviewerStatus, 
  AuthorityStatus,
  CaseStatus 
} from './types';
import { ActiveNavTab } from './components/Sidebar';

// Layout Components
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';

// View Components
import { ReviewerDashboard } from './components/ReviewerDashboard';
import { NewSightingsView } from './components/NewSightingsView';
import { CaseReviewScreen } from './components/CaseReviewScreen';
import { CaseTrackingView } from './components/CaseTrackingView';
import { AuthoritiesView } from './components/AuthoritiesView';
import { NotificationsPanel } from './components/NotificationsPanel';
import { AnalyticsView } from './components/AnalyticsView';
import { AuditLogView } from './components/AuditLogView';
import { SettingsView } from './components/SettingsView';
import { ImageInspectorModal } from './components/ImageInspectorModal';
import { CitizenMobileAppModal } from './components/CitizenMobileAppModal';
import { FindMeMobileApp } from './components/mobile/FindMeMobileApp';
import { FindMeFieldApp } from './components/field/FindMeFieldApp';
import { FindMeVideoPresentation } from './components/video/FindMeVideoPresentation';
import { FindMeCinematicFilm } from './components/film/FindMeCinematicFilm';

// Helper to guarantee strictly unique incremental case IDs (e.g. FM-10431, FM-10432)
const getNextUniqueCaseId = (existingCases: SightingCase[]): string => {
  let highestNum = 10430;
  for (const c of existingCases) {
    const match = c.id.match(/\d+/);
    if (match) {
      const num = parseInt(match[0], 10);
      if (!isNaN(num) && num > highestNum) {
        highestNum = num;
      }
    }
  }
  let candidate = `FM-${highestNum + 1}`;
  while (existingCases.some(c => c.id === candidate)) {
    highestNum++;
    candidate = `FM-${highestNum + 1}`;
  }
  return candidate;
};

export default function App() {
  // State with guaranteed initial uniqueness
  const [cases, setCases] = useState<SightingCase[]>(() => {
    const seen = new Set<string>();
    return MOCK_CASES.filter(c => {
      if (seen.has(c.id)) return false;
      seen.add(c.id);
      return true;
    });
  });
  const [auditLogs, setAuditLogs] = useState<AuditEvent[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [reviewer, setReviewer] = useState(CURRENT_REVIEWER);
  const [searchQuery, setSearchQuery] = useState('');

  // Navigation State
  const [currentTab, setCurrentTab] = useState<ActiveNavTab | 'case-review' | 'case-tracking'>('dashboard');
  const [selectedCaseId, setSelectedCaseId] = useState<string>('FM-10427');

  // High-Res Image Inspector State
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [inspectorImage, setInspectorImage] = useState('');
  const [inspectorTitle, setInspectorTitle] = useState('');

  // Citizen Mobile App Preview Modal State
  const [mobileModalOpen, setMobileModalOpen] = useState(false);

  // Application Mode: 'film' (Cinematic Product Film) | 'video' (Video Tour) | 'field' (Field Response App) | 'mobile' (Citizen Mobile Prototype) | 'console' (Reviewer CAD Console)
  const [appMode, setAppMode] = useState<'film' | 'video' | 'field' | 'mobile' | 'console'>('film');

  // Derived selected case object
  const selectedCase = cases.find(c => c.id === selectedCaseId) || cases[0];

  // Counts for Badges
  const newCasesCount = cases.filter(c => c.status === 'New').length;
  const underReviewCount = cases.filter(c => c.status === 'Under Review').length;
  const approvedCount = cases.filter(c => c.status === 'Approved' || c.status === 'Action in Progress').length;
  const authoritiesCount = cases.filter(c => c.forwarding !== undefined).length;
  const unreadNotifCount = notifications.filter(n => !n.read).length;

  // Handlers
  const handleOpenCaseReview = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentTab('case-review');
    
    // Mark as Under Review if currently New
    setCases(prev => prev.map(c => {
      if (c.id === caseId && c.status === 'New') {
        return { ...c, status: 'Under Review' as CaseStatus };
      }
      return c;
    }));

    // Append audit log for case opening
    addAuditLog(
      caseId,
      'Reviewer opened case',
      reviewer.name,
      'Senior Reviewer',
      `Review lock acquired on station TERM-04 for case ${caseId}.`
    );
  };

  const handleOpenCaseTracking = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentTab('case-tracking');
  };

  const handleApproveAndForward = (caseId: string, notes: string, authority: string) => {
    const timestamp = 'Today, ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'Approved' as CaseStatus,
          humanVerification: {
            decision: 'Confirm Potential Match' as const,
            reviewerNotes: notes,
            reviewedBy: reviewer.name,
            reviewerId: reviewer.reviewerId,
            reviewedAt: timestamp,
            reviewTimeTaken: '3m 12s'
          },
          forwarding: {
            destinationAuthority: authority,
            authorityContact: '+1 (555) 019-4400',
            assignedUnit: 'Unit 14-B (Rapid Patrol)',
            precinctCode: 'PCT-04-CTR',
            forwardedAt: timestamp,
            currentAuthorityStatus: 'Notified' as const,
            dispatchedOfficer: 'Officer J. Ramos',
            etaOrLastReport: 'Field response unit en route to coordinate perimeter.'
          }
        };
      }
      return c;
    }));

    // Add audit log
    addAuditLog(
      caseId,
      'Human verification completed',
      reviewer.name,
      'Senior Reviewer',
      `Reviewer notes appended; confirmed biometric feature correlation. Notes: "${notes}"`
    );

    addAuditLog(
      caseId,
      'Local authority notified',
      'FindMe Dispatch Gateway',
      'System Automation',
      `Forwarded encrypted evidentiary dossier to ${authority}.`
    );

    // Add notification
    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'authority_ack',
      title: 'Authorities Notified',
      message: `Case ${caseId} forwarded to ${authority}. Response units deployed.`,
      timestamp: 'Just now',
      read: false,
      caseId: caseId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const handleRejectCase = (caseId: string, notes: string) => {
    const timestamp = 'Today, ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'Rejected' as CaseStatus,
          humanVerification: {
            decision: 'Reject Match' as const,
            reviewerNotes: notes,
            reviewedBy: reviewer.name,
            reviewerId: reviewer.reviewerId,
            reviewedAt: timestamp,
            reviewTimeTaken: '2m 45s'
          }
        };
      }
      return c;
    }));

    addAuditLog(
      caseId,
      'Case rejected by reviewer',
      reviewer.name,
      'Senior Reviewer',
      `Dismissed as negative correlation. Reason: "${notes}"`
    );

    setCurrentTab('dashboard');
  };

  const handleRequestMoreInfo = (caseId: string, notes: string) => {
    const timestamp = 'Today, ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        return {
          ...c,
          status: 'More Info Requested' as CaseStatus,
          humanVerification: {
            decision: 'Request More Information' as const,
            reviewerNotes: notes,
            reviewedBy: reviewer.name,
            reviewerId: reviewer.reviewerId,
            reviewedAt: timestamp,
            reviewTimeTaken: '1m 55s'
          }
        };
      }
      return c;
    }));

    addAuditLog(
      caseId,
      'Supplementary information requested',
      reviewer.name,
      'Senior Reviewer',
      `Requested additional CCTV angles or eyewitness confirmation: "${notes}"`
    );
  };

  const handleAdvanceAuthorityStatus = (caseId: string, nextStatus: AuthorityStatus) => {
    setCases(prev => prev.map(c => {
      if (c.id === caseId) {
        const updatedStatus: CaseStatus = nextStatus === 'Resolved' ? 'Resolved' : nextStatus === 'Action in Progress' ? 'Action in Progress' : c.status;
        return {
          ...c,
          status: updatedStatus,
          forwarding: c.forwarding ? {
            ...c.forwarding,
            currentAuthorityStatus: nextStatus,
            etaOrLastReport: nextStatus === 'Resolved' 
              ? 'Subject located, identified, and verified safe. Case closed in CAD.' 
              : nextStatus === 'Action in Progress' 
              ? 'Field unit on scene. Perimeter contact established.' 
              : c.forwarding.etaOrLastReport
          } : undefined
        };
      }
      return c;
    }));

    addAuditLog(
      caseId,
      `Authority status: ${nextStatus}`,
      'Metro CAD Dispatch System',
      'Authority Partner',
      `Agency updated response status to "${nextStatus}".`
    );

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: nextStatus === 'Resolved' ? 'resolved' : 'status_changed',
      title: nextStatus === 'Resolved' ? 'Case Successfully Resolved' : `Status Updated: ${nextStatus}`,
      message: `Case ${caseId} status updated to ${nextStatus}.`,
      timestamp: 'Just now',
      read: false,
      caseId: caseId
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  const addAuditLog = (caseId: string, action: string, actor: string, role: string, details: string) => {
    const time = 'Today, ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
    const newLog: AuditEvent = {
      id: `aud-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      caseId,
      action,
      actor,
      actorRole: role,
      timestamp: time,
      details,
      hash: `SHA256: ${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  const handleInspectImage = (imageUrl: string, title: string) => {
    setInspectorImage(imageUrl);
    setInspectorTitle(title);
    setInspectorOpen(true);
  };

  const handleMarkAllNotifsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleMarkNotifAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleResetDemoData = () => {
    setCases(MOCK_CASES);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    setNotifications(MOCK_NOTIFICATIONS);
    setSelectedCaseId('FM-10427');
    setCurrentTab('dashboard');
  };

  const handleSimulateIncomingSighting = () => {
    const newId = getNextUniqueCaseId(cases);
    const newCase: SightingCase = {
      id: newId,
      sightingTime: 'Today, Just now',
      rawTimestamp: new Date().toISOString(),
      location: 'Central District, Metro Station Exit 2',
      district: 'Central District',
      coordinates: { lat: 40.7138, lng: -74.0048 },
      aiConfidence: 89,
      priority: 'High',
      status: 'New',
      reportedImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
      reporter: {
        name: 'Eyewitness S. Chen (Public Kiosk)',
        status: 'Verified',
        channel: 'Emergency Call Box Kiosk',
        contactMasked: '+1 (555) •••-2819',
        submittedAt: 'Just now',
        reputationScore: 92
      },
      description: 'Individual matching high-priority missing notice seen near ticket vending machines.',
      clothingDetails: 'Green parka coat, brown beanie, dark jeans.',
      physicalAttributes: {
        approxAge: '28-32',
        height: '5 ft 6 in',
        gender: 'Female',
        distinguishingMarks: ['Small tattoo on right wrist']
      },
      aiAnalysis: {
        confidenceScore: 89,
        potentialMatchFound: true,
        matchingRecordId: 'MP-44088',
        recordName: 'Hannah Chen',
        recordMissingSince: 'Sept 15, 2026',
        recordLastKnownLocation: 'Civic Center Boulevard',
        recordImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
        recordAge: 30,
        recordHeight: '5 ft 6 in',
        facialSimilarity: 91,
        imageQuality: 'High',
        imageQualityScore: 94,
        ageSimilarity: 'High Match',
        otherAttributes: {
          clothingMatch: 'Garment style matches advisory',
          temporalSpatialPlausibility: '3.1 miles from residence',
          biometricLandmarks: 'Facial landmarks match reference record'
        },
        disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
      },
      timeline: [
        { title: 'Sighting Submitted', status: 'completed', time: 'Just now' },
        { title: 'AI Analysis Completed', status: 'completed', time: 'Just now' },
        { title: 'Human Review Pending', status: 'in_progress', time: 'Waiting for reviewer' }
      ],
      auditTrail: []
    };

    setCases(prev => [newCase, ...prev.filter(c => c.id !== newId)]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'high_confidence',
      title: 'High-Confidence Sighting Ingested',
      message: `Case ${newId}: 89% biometric correlation detected in Central District.`,
      timestamp: 'Just now',
      read: false,
      caseId: newId
    };
    setNotifications(prev => [newNotif, ...prev]);

    addAuditLog(
      newId,
      'Sighting submitted',
      'Eyewitness S. Chen',
      'Verified Reporter',
      'High-resolution mobile image uploaded at Metro Station Exit 2'
    );
  };

  const handleMobileSightingSubmitted = (newCase: SightingCase) => {
    setCases(prev => [newCase, ...prev.filter(c => c.id !== newCase.id)]);

    const newNotif: NotificationItem = {
      id: `notif-${Date.now()}`,
      type: 'high_confidence',
      title: 'Citizen Sighting Ingested via Mobile App',
      message: `Report ${newCase.id}: ${newCase.aiConfidence}% AI correlation detected in ${newCase.district}.`,
      timestamp: 'Just now',
      read: false,
      caseId: newCase.id
    };
    setNotifications(prev => [newNotif, ...prev]);

    addAuditLog(
      newCase.id,
      'Citizen mobile sighting submitted',
      newCase.reporter.name,
      'Verified Citizen',
      `Mobile photo and GPS captured at ${newCase.location}`
    );
  };

  // If in Cinematic Product Film Mode, render FindMeCinematicFilm
  if (appMode === 'film') {
    return (
      <div id="findme-film-root" className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased">
        {/* Top Ecosystem Switcher Banner */}
        <header className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-50 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-bold text-white tracking-wide">FindMe AI Platform</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-blue-400 font-medium hidden sm:inline">Photorealistic Cinematic Product Film (16:9)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setAppMode('film')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer bg-blue-600 text-white shadow-xs flex items-center gap-1"
            >
              <span>🎥 Product Film</span>
            </button>
            <button
              onClick={() => setAppMode('video')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🎬 Video Tour
            </button>
            <button
              onClick={() => setAppMode('field')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🚔 Field Response
            </button>
            <button
              onClick={() => setAppMode('mobile')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              📱 Citizen App
            </button>
            <button
              onClick={() => setAppMode('console')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🖥️ CAD Console
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <FindMeCinematicFilm
            onSwitchToCitizen={() => setAppMode('mobile')}
            onSwitchToConsole={() => setAppMode('console')}
            onSwitchToField={() => setAppMode('field')}
          />
        </div>
      </div>
    );
  }

  // If in Video Presentation Mode, render FindMeVideoPresentation
  if (appMode === 'video') {
    return (
      <div id="findme-video-root" className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased">
        {/* Top Ecosystem Switcher Banner */}
        <header className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-50 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
            <span className="font-bold text-white tracking-wide">FindMe AI Platform</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-amber-300 font-medium hidden sm:inline">Tri-App Ecosystem Video Tour (72s Narration)</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setAppMode('film')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-blue-400 hover:text-blue-300"
            >
              🎥 Product Film
            </button>
            <button
              onClick={() => setAppMode('video')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer bg-amber-500 text-slate-950 shadow-xs flex items-center gap-1"
            >
              <span>🎬 Video Tour</span>
            </button>
            <button
              onClick={() => setAppMode('field')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🚔 Field Response
            </button>
            <button
              onClick={() => setAppMode('mobile')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              📱 Citizen App
            </button>
            <button
              onClick={() => setAppMode('console')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🖥️ CAD Console
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <FindMeVideoPresentation
            onSwitchToCitizen={() => setAppMode('mobile')}
            onSwitchToConsole={() => setAppMode('console')}
            onSwitchToField={() => setAppMode('field')}
          />
        </div>
      </div>
    );
  }

  // If in Field Response App Prototype mode, render FindMeFieldApp
  if (appMode === 'field') {
    return (
      <div id="findme-field-root" className="min-h-screen bg-slate-950 flex flex-col font-sans antialiased">
        {/* Top Ecosystem Switcher Banner */}
        <header className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-50 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-white tracking-wide">FindMe AI Platform</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Authorized Field Response & Dispatch</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setAppMode('film')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-blue-400 hover:text-blue-300"
            >
              🎥 Product Film
            </button>
            <button
              onClick={() => setAppMode('video')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-amber-400 hover:text-amber-300 hover:bg-amber-950/40"
            >
              🎬 Video Tour
            </button>
            <button
              onClick={() => setAppMode('field')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer bg-blue-600 text-white shadow-xs"
            >
              🚔 Field Response
            </button>
            <button
              onClick={() => setAppMode('mobile')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              📱 Citizen App
            </button>
            <button
              onClick={() => setAppMode('console')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🖥️ CAD Console
            </button>
          </div>
        </header>

        <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
          <FindMeFieldApp
            onSwitchToCitizen={() => setAppMode('mobile')}
            onSwitchToConsole={() => setAppMode('console')}
          />
        </div>
      </div>
    );
  }

  // If in Citizen Mobile App Prototype mode, render FindMeMobileApp
  if (appMode === 'mobile') {
    return (
      <div id="findme-mobile-root" className="min-h-screen bg-slate-900 flex flex-col font-sans antialiased">
        {/* Top Ecosystem Switcher Banner */}
        <header className="bg-slate-950 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between text-xs z-50 shrink-0 select-none">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-white tracking-wide">FindMe AI Platform</span>
            <span className="text-slate-600 hidden sm:inline">•</span>
            <span className="text-slate-400 hidden sm:inline">Citizen Ingestion Prototype</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setAppMode('film')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-blue-400 hover:text-blue-300"
            >
              🎥 Product Film
            </button>
            <button
              onClick={() => setAppMode('video')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-amber-400 hover:text-amber-300 hover:bg-amber-950/40"
            >
              🎬 Video Tour
            </button>
            <button
              onClick={() => setAppMode('field')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🚔 Field Response
            </button>
            <button
              onClick={() => setAppMode('mobile')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer bg-blue-600 text-white shadow-xs"
            >
              📱 Citizen App
            </button>
            <button
              onClick={() => setAppMode('console')}
              className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-slate-400 hover:text-white"
            >
              🖥️ CAD Console
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <FindMeMobileApp
            cases={cases}
            onNewSightingSubmitted={handleMobileSightingSubmitted}
            onSwitchToConsole={() => setAppMode('console')}
            onOpenConsoleCase={(caseId) => {
              setSelectedCaseId(caseId);
              setCurrentTab('case-review');
              setAppMode('console');
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div id="findme-console-root" className="flex flex-col h-screen bg-slate-50 text-slate-800 font-sans antialiased overflow-hidden">
      {/* Top Ecosystem Switcher Banner for Console Mode */}
      <header className="bg-slate-950 border-b border-slate-800 px-4 py-2 flex items-center justify-between text-xs z-40 shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-white tracking-wide">FindMe AI Platform</span>
          <span className="text-slate-600 hidden sm:inline">•</span>
          <span className="text-slate-400 hidden sm:inline">Reviewer CAD Workstation</span>
        </div>

        <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800">
          <button
            onClick={() => setAppMode('film')}
            className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-blue-400 hover:text-blue-300"
          >
            🎥 Product Film
          </button>
          <button
            onClick={() => setAppMode('video')}
            className="px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer text-amber-400 hover:text-amber-300 hover:bg-amber-950/40"
          >
            🎬 Video Tour
          </button>
          <button
            onClick={() => setAppMode('field')}
            className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            🚔 Field Response
          </button>
          <button
            onClick={() => setAppMode('mobile')}
            className="px-3 py-1 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            📱 Citizen App
          </button>
          <button
            onClick={() => setAppMode('console')}
            className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-600 text-white shadow-xs transition-all cursor-pointer"
          >
            🖥️ CAD Console
          </button>
        </div>
      </header>

      <div className="flex-1 flex min-w-0 h-full overflow-hidden">
        {/* PERSISTENT LEFT SIDEBAR */}
        <Sidebar
          currentTab={currentTab as ActiveNavTab}
          onTabChange={(tab: ActiveNavTab) => setCurrentTab(tab)}
          badgeCounts={{
            newSightings: newCasesCount,
            underReview: underReviewCount,
            approvedCases: approvedCount,
            authorities: authoritiesCount,
            unreadNotifs: unreadNotifCount
          }}
          reviewer={reviewer}
          onOpenMobilePreview={() => setMobileModalOpen(true)}
          onSwitchToMobilePrototype={() => setAppMode('mobile')}
          onSwitchToFieldApp={() => setAppMode('field')}
          onSwitchToVideoTour={() => setAppMode('video')}
        />

        {/* MAIN VIEW AREA */}
        <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden">
          {/* TOP NAVIGATION BAR */}
          <TopBar
            reviewer={reviewer}
            searchQuery={searchQuery}
            onSearchChange={(q: string) => {
              setSearchQuery(q);
              const found = cases.find(c => 
                c.id.toLowerCase().includes(q.toLowerCase()) || 
                c.aiAnalysis.recordName.toLowerCase().includes(q.toLowerCase())
              );
              if (found && q.length >= 4) {
                handleOpenCaseReview(found.id);
              }
            }}
            notifications={notifications}
            onOpenNotifications={() => setCurrentTab('notifications')}
            onSelectNotificationCase={(caseId: string) => {
              const target = cases.find(c => c.id === caseId);
              if (target?.status === 'Approved' || target?.status === 'Action in Progress' || target?.status === 'Resolved') {
                handleOpenCaseTracking(caseId);
              } else {
                handleOpenCaseReview(caseId);
              }
            }}
            onOpenHelpModal={() => setCurrentTab('settings')}
            onSimulateIncomingSighting={handleSimulateIncomingSighting}
            onOpenMobilePreview={() => setMobileModalOpen(true)}
            onSwitchToMobilePrototype={() => setAppMode('mobile')}
          />

        {/* SCROLLABLE MAIN CONTENT AREA */}
        <main className="flex-1 overflow-y-auto bg-slate-50/70">
          {/* Active Section Rendering */}
          {currentTab === 'dashboard' && (
            <ReviewerDashboard
              cases={cases}
              onReviewCase={handleOpenCaseReview}
              onTrackCase={handleOpenCaseTracking}
              onViewAllSightings={() => setCurrentTab('new-sightings')}
              onFilterByStatus={(status: CaseStatus) => {
                if (status === 'New') setCurrentTab('new-sightings');
                else if (status === 'Under Review') setCurrentTab('under-review');
                else if (status === 'Approved') setCurrentTab('approved-cases');
              }}
              onOpenMobilePreview={() => setMobileModalOpen(true)}
            />
          )}

          {currentTab === 'new-sightings' && (
            <NewSightingsView
              cases={cases}
              initialStatusFilter="New"
              onReviewCase={handleOpenCaseReview}
              onTrackCase={handleOpenCaseTracking}
              onInspectImage={handleInspectImage}
            />
          )}

          {currentTab === 'under-review' && (
            <NewSightingsView
              cases={cases}
              initialStatusFilter="Under Review"
              onReviewCase={handleOpenCaseReview}
              onTrackCase={handleOpenCaseTracking}
              onInspectImage={handleInspectImage}
            />
          )}

          {currentTab === 'approved-cases' && (
            <NewSightingsView
              cases={cases}
              initialStatusFilter="Approved"
              onReviewCase={handleOpenCaseReview}
              onTrackCase={handleOpenCaseTracking}
              onInspectImage={handleInspectImage}
            />
          )}

          {currentTab === 'case-review' && (
            <CaseReviewScreen
              sightingCase={selectedCase}
              reviewer={reviewer}
              onBack={() => setCurrentTab('dashboard')}
              onApproveAndForward={handleApproveAndForward}
              onRejectCase={handleRejectCase}
              onRequestMoreInfo={handleRequestMoreInfo}
              onTrackCase={handleOpenCaseTracking}
              onInspectImage={handleInspectImage}
            />
          )}

          {currentTab === 'case-tracking' && (
            <CaseTrackingView
              sightingCase={selectedCase}
              onBack={() => setCurrentTab('case-review')}
              onAdvanceToActionInProgress={(caseId) => handleAdvanceAuthorityStatus(caseId, 'Action in Progress')}
              onAdvanceToResolved={(caseId) => handleAdvanceAuthorityStatus(caseId, 'Resolved')}
              onViewAuthoritiesHub={() => setCurrentTab('authorities')}
            />
          )}

          {currentTab === 'authorities' && (
            <AuthoritiesView
              cases={cases}
              onTrackCase={handleOpenCaseTracking}
              onAdvanceAuthorityStatus={handleAdvanceAuthorityStatus}
            />
          )}

          {currentTab === 'notifications' && (
            <NotificationsPanel
              notifications={notifications}
              onSelectCase={(caseId) => {
                const targetCase = cases.find(c => c.id === caseId);
                if (targetCase?.status === 'Approved' || targetCase?.status === 'Action in Progress' || targetCase?.status === 'Resolved') {
                  handleOpenCaseTracking(caseId);
                } else {
                  handleOpenCaseReview(caseId);
                }
              }}
              onMarkAllAsRead={handleMarkAllNotifsAsRead}
              onMarkAsRead={handleMarkNotifAsRead}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView />
          )}

          {currentTab === 'audit-log' && (
            <AuditLogView
              auditLogs={auditLogs}
              onSelectCase={handleOpenCaseReview}
            />
          )}

          {currentTab === 'settings' && (
            <SettingsView
              reviewer={reviewer}
              onResetData={handleResetDemoData}
            />
          )}
        </main>
      </div>
    </div>

      {/* Fullscreen High-Resolution Image Inspector Modal */}
      <ImageInspectorModal
        isOpen={inspectorOpen}
        onClose={() => setInspectorOpen(false)}
        imageUrl={inspectorImage}
        title={inspectorTitle}
      />

      {/* Citizen Mobile App Ingestion Mockup Modal */}
      <CitizenMobileAppModal
        isOpen={mobileModalOpen}
        onClose={() => setMobileModalOpen(false)}
        onSimulateReport={(newCaseData) => {
          // Add newly reported citizen case to cases queue with strictly unique ID
          const newSightingId = getNextUniqueCaseId(cases);
          const freshCase: SightingCase = {
            id: newSightingId,
            sightingTime: 'Just now',
            rawTimestamp: new Date().toISOString(),
            location: newCaseData?.location || 'Central Plaza, Community Park',
            district: 'Metro District',
            coordinates: { lat: 40.7128 + (Math.random() - 0.5) * 0.05, lng: -74.006 + (Math.random() - 0.5) * 0.05 },
            aiConfidence: newCaseData?.confidence || 87,
            priority: 'High',
            status: 'New',
            reportedImage: newCaseData?.image || 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=600&q=80',
            reporter: {
              name: 'Sarah Chen (Mobile Citizen App)',
              status: 'Verified',
              channel: 'FindMe Public Mobile App v4.2',
              contactMasked: '+1 (555) •••-2089',
              submittedAt: 'Just now',
              reputationScore: 98
            },
            description: newCaseData?.description || 'Young subject matching public bulletin observed near park playground.',
            clothingDetails: 'Blue crewneck t-shirt, dark shorts, gray running sneakers.',
            physicalAttributes: {
              approxAge: '7–9 years',
              height: '4 ft 2 in',
              gender: 'Male',
              distinguishingMarks: ['Small band-aid on left elbow', 'Brown wavy hair']
            },
            aiAnalysis: {
              confidenceScore: newCaseData?.confidence || 87,
              potentialMatchFound: true,
              matchingRecordId: 'MP-44019',
              recordName: 'Aarav Patel',
              recordMissingSince: 'Sept 19, 2026',
              recordLastKnownLocation: 'Highland Elementary School District',
              recordImage: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=600&q=80',
              recordAge: 8,
              recordHeight: '4 ft 2 in',
              facialSimilarity: 88,
              imageQuality: 'High',
              imageQualityScore: 94,
              ageSimilarity: 'Exact correlation (8 yrs old)',
              otherAttributes: {
                clothingMatch: 'Blue shirt confirmed in bulletin broadcast',
                temporalSpatialPlausibility: '2.3 km from school grounds',
                biometricLandmarks: '92.4% feature landmark correspondence'
              },
              disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
            },
            timeline: [
              { title: 'Sighting Submitted', status: 'completed', time: 'Just now', description: 'Citizen verified report uploaded via mobile app' },
              { title: 'AI Analysis Completed', status: 'completed', time: 'Just now', description: 'Biometric neural model matched MP-44019 (87%)' },
              { title: 'Human Review Completed', status: 'pending', description: 'Awaiting reviewer confirmation' },
              { title: 'Authorities Notified', status: 'pending', description: 'On standby for reviewer sign-off' },
              { title: 'Action in Progress', status: 'pending', description: 'Field units ready for dispatch' },
              { title: 'Resolved', status: 'pending', description: 'Case resolution' }
            ],
            auditTrail: [
              {
                id: `aud-${Date.now()}`,
                timestamp: 'Just now',
                action: 'Sighting submitted via FindMe Mobile App',
                actor: 'Citizen #CV-2089',
                actorRole: 'Verified Reporter',
                caseId: newSightingId,
                details: 'Direct citizen mobile upload with photo and GPS location (2.3 km away)',
                hash: 'SHA256: 8f9b...a109'
              }
            ]
          };

          setCases(prev => [freshCase, ...prev.filter(c => c.id !== newSightingId)]);
          handleOpenCaseReview(newSightingId);
        }}
      />
    </div>
  );
}
