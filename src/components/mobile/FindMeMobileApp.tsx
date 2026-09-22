import React, { useState } from 'react';
import { 
  Home, 
  FileText, 
  Bell, 
  User, 
  Compass, 
  Smartphone, 
  Maximize2, 
  Layers, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  RotateCcw,
  CheckCircle2,
  ShieldCheck,
  PlusCircle
} from 'lucide-react';
import { MobileScreen, CitizenReportFormState, CitizenUser } from './types';
import { PhoneFrame } from './PhoneFrame';
import { SplashScreen } from './SplashScreen';
import { LoginScreen } from './LoginScreen';
import { OtpScreen } from './OtpScreen';
import { HomeScreen } from './HomeScreen';
import { ReportFlow } from './ReportFlow';
import { ConfirmationScreen } from './ConfirmationScreen';
import { ReportStatusScreen } from './ReportStatusScreen';
import { AuthorityNotifiedScreen } from './AuthorityNotifiedScreen';
import { MyReportsScreen } from './MyReportsScreen';
import { NotificationCenterScreen } from './NotificationCenterScreen';
import { ProfileScreen } from './ProfileScreen';
import { HelpSafetyModal } from './HelpSafetyModal';
import { SightingCase } from '../../types';
import { SAMPLE_GALLERY_PHOTOS } from './mockData';

interface FindMeMobileAppProps {
  cases: SightingCase[];
  onNewSightingSubmitted: (newCase: SightingCase) => void;
  onOpenConsoleCase?: (caseId: string) => void;
  onSwitchToConsole?: () => void;
}

export const FindMeMobileApp: React.FC<FindMeMobileAppProps> = ({
  cases,
  onNewSightingSubmitted,
  onOpenConsoleCase,
  onSwitchToConsole
}) => {
  // Screen Navigation State
  const [currentScreen, setCurrentScreen] = useState<MobileScreen>('home');
  const [isFrameless, setIsFrameless] = useState(false);
  const [helpModalOpen, setHelpModalOpen] = useState(false);

  // Authenticated User State
  const [user, setUser] = useState<CitizenUser>({
    name: 'Sarah Jenkins',
    phone: '+1 (555) 234-5678',
    email: 'sarah.jenkins@community.org',
    isVerified: true,
    verificationDate: 'Sept 2026',
    totalReports: 3
  });

  const [activeReportId, setActiveReportId] = useState<string>('FM-10427');
  const [isAuthorityApproved, setIsAuthorityApproved] = useState(false);

  // Draft submitted data
  const [submittedReport, setSubmittedReport] = useState<CitizenReportFormState>({
    photo: SAMPLE_GALLERY_PHOTOS[0].url,
    photoName: 'Captured Photo — Sighting_IMG_0412.jpg',
    location: 'Central District, 4th & Grand Ave (Transit Plaza)',
    coordinates: { lat: 40.7128, lng: -74.006 },
    dateTime: 'Today, 10:35 AM',
    description: 'Individual matching public alert seen near transit pavilion coffee kiosk. Appeared disoriented.',
    clothingDetails: 'Charcoal zip-up windbreaker jacket, dark denim trousers, tan hiking shoes.',
    needsImmediateAssistance: false,
    reporterVerified: true,
    generatedCaseId: 'FM-10427'
  });

  // Handle Submission from Step 3
  const handleReportSubmitted = (formData: CitizenReportFormState) => {
    setSubmittedReport(formData);
    setActiveReportId(formData.generatedCaseId);
    setIsAuthorityApproved(false);

    // Also sync to the enterprise Reviewer Console state!
    const newCaseRecord: SightingCase = {
      id: formData.generatedCaseId,
      sightingTime: 'Today, Just now',
      rawTimestamp: new Date().toISOString(),
      location: formData.location,
      district: 'Central District',
      coordinates: formData.coordinates,
      aiConfidence: 87,
      priority: formData.needsImmediateAssistance ? 'High' : 'Medium',
      status: 'New',
      reportedImage: formData.photo,
      reporter: {
        name: `${user.name} (Verified Citizen)`,
        status: 'Verified',
        channel: 'FindMe Public Mobile App v4.2',
        contactMasked: user.phone.replace(/(\+\d\s\(\d{3}\)\s)\d{3}/, '$1•••'),
        submittedAt: 'Today, Just now',
        reputationScore: 99
      },
      description: formData.description || 'Citizen reported sighting via mobile camera.',
      clothingDetails: formData.clothingDetails || 'Details captured in review photo.',
      physicalAttributes: {
        approxAge: '32–36 years',
        height: '5 ft 10 in',
        gender: 'Male',
        distinguishingMarks: ['Faint scar above left eyebrow']
      },
      aiAnalysis: {
        confidenceScore: 87,
        potentialMatchFound: true,
        matchingRecordId: 'MP-44021',
        recordName: 'Marcus Vance',
        recordMissingSince: 'Sept 07, 2026',
        recordLastKnownLocation: 'Harborview Medical Center area',
        recordImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
        recordAge: 34,
        recordHeight: '5 ft 10 in',
        facialSimilarity: 89,
        imageQuality: 'High',
        imageQualityScore: 92,
        ageSimilarity: 'Estimated 32-36 vs Record 34',
        otherAttributes: {
          clothingMatch: 'Upper garment color matches reported missing advisory',
          temporalSpatialPlausibility: '9.4 miles from last confirmed sighting',
          biometricLandmarks: 'Inter-pupillary distance: 98.2% alignment'
        },
        disclaimer: 'AI results support authorized human review and do not independently confirm identity.'
      },
      timeline: [
        { title: 'Sighting Submitted', status: 'completed', time: 'Just now' },
        { title: 'AI Match Analysis', status: 'completed', time: 'Just now' },
        { title: 'Human Verification Required', status: 'in_progress', time: 'Pending' },
        { title: 'Authority CAD Forwarding', status: 'pending' },
        { title: 'Field Response', status: 'pending' }
      ],
      auditTrail: []
    };

    onNewSightingSubmitted(newCaseRecord);
    setCurrentScreen('confirmation');
  };

  // Determine if Bottom Nav should be visible (on main tabbed screens)
  const isTabbedScreen = ['home', 'my-reports', 'notifications', 'profile'].includes(currentScreen);

  // Screens list for quick jump reviewer bar
  const prototypeScreens: { id: MobileScreen; label: string; number: number }[] = [
    { id: 'splash', label: '1. Splash Screen', number: 1 },
    { id: 'login', label: '2. Login / Welcome', number: 2 },
    { id: 'otp', label: '3. OTP Verification', number: 3 },
    { id: 'home', label: '4. Home Dashboard', number: 4 },
    { id: 'report-capture', label: '5. Report a Sighting', number: 5 },
    { id: 'confirmation', label: '6. Confirmation', number: 6 },
    { id: 'report-status', label: '7. Report Status (87% AI)', number: 7 },
    { id: 'authority-notified', label: '8. Authorities Notified', number: 8 },
    { id: 'my-reports', label: '9. My Reports', number: 9 },
    { id: 'notifications', label: '10. Notifications', number: 10 },
    { id: 'profile', label: '11. Profile & Settings', number: 11 }
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Prototype Navigation & Control Bar */}
      <div className="bg-white border-b border-slate-200 px-4 py-2.5 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Brand & Prototype Label */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-xs">
              <Smartphone className="w-4 h-4" />
              <span>Citizen Mobile Prototype</span>
            </div>
            <span className="hidden sm:inline text-xs text-slate-500 font-medium">
              FindMe AI • iOS/Android High-Fidelity
            </span>
          </div>

          {/* Screen Jumper Dropdown / Quick Links */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
              <span className="text-[11px] font-bold text-slate-500 pl-2 pr-1 hidden md:inline">
                Jump to Screen:
              </span>
              <select
                value={currentScreen === 'report-details' || currentScreen === 'report-review' ? 'report-capture' : currentScreen}
                onChange={(e) => setCurrentScreen(e.target.value as MobileScreen)}
                className="bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-800 px-2.5 py-1 outline-hidden cursor-pointer"
              >
                {prototypeScreens.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Frame Mode Toggle (iPhone Mockup vs Frameless) */}
            <button
              onClick={() => setIsFrameless(!isFrameless)}
              className="p-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title={isFrameless ? 'Switch to Phone Frame' : 'Switch to Frameless View'}
            >
              {isFrameless ? <Smartphone className="w-4 h-4 text-blue-600" /> : <Maximize2 className="w-4 h-4 text-blue-600" />}
              <span className="hidden sm:inline">{isFrameless ? 'Phone Frame' : 'Frameless'}</span>
            </button>

            {/* Switch to Human Review Console */}
            {onSwitchToConsole && (
              <button
                onClick={onSwitchToConsole}
                className="py-1.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
              >
                <span>CAD Review Console</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Interactive Screen Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6">
        <PhoneFrame isFrameless={isFrameless} currentTime="10:35">
          {/* 1. SPLASH SCREEN */}
          {currentScreen === 'splash' && (
            <SplashScreen onContinue={() => setCurrentScreen('login')} />
          )}

          {/* 2. LOGIN / WELCOME */}
          {currentScreen === 'login' && (
            <LoginScreen
              onContinue={(contact) => {
                if (contact.includes('@')) {
                  setUser(prev => ({ ...prev, email: contact }));
                } else {
                  setUser(prev => ({ ...prev, phone: contact }));
                }
                setCurrentScreen('otp');
              }}
              onOpenTerms={() => setHelpModalOpen(true)}
              onOpenPrivacy={() => setHelpModalOpen(true)}
            />
          )}

          {/* 3. OTP VERIFICATION */}
          {currentScreen === 'otp' && (
            <OtpScreen
              phoneOrEmail={user.phone}
              onVerified={() => setCurrentScreen('home')}
              onBack={() => setCurrentScreen('login')}
            />
          )}

          {/* 4. HOME DASHBOARD */}
          {currentScreen === 'home' && (
            <HomeScreen
              user={user}
              myReportsCount={cases.length}
              onStartReport={() => setCurrentScreen('report-capture')}
              onNavigateToReports={() => setCurrentScreen('my-reports')}
              onNavigateToAlerts={() => setCurrentScreen('notifications')}
              onNavigateToHelp={() => setHelpModalOpen(true)}
              onOpenReportDetails={(id) => {
                setActiveReportId(id);
                setCurrentScreen('report-status');
              }}
            />
          )}

          {/* 5. REPORT A SIGHTING (Guided 3-Step Flow) */}
          {(currentScreen === 'report-capture' || currentScreen === 'report-details' || currentScreen === 'report-review') && (
            <ReportFlow
              initialCaseId={`FM-${Math.floor(10430 + Math.random() * 50)}`}
              onCancel={() => setCurrentScreen('home')}
              onSubmitReport={handleReportSubmitted}
            />
          )}

          {/* 6. SUBMISSION CONFIRMATION */}
          {currentScreen === 'confirmation' && (
            <ConfirmationScreen
              reportData={submittedReport}
              onTrackReport={() => setCurrentScreen('report-status')}
              onBackToHome={() => setCurrentScreen('home')}
            />
          )}

          {/* 7. REPORT STATUS */}
          {currentScreen === 'report-status' && (
            <ReportStatusScreen
              reportId={activeReportId}
              reportData={submittedReport}
              isAuthorityNotified={isAuthorityApproved}
              onBack={() => setCurrentScreen('home')}
              onSimulateApproveToAuthority={() => {
                setIsAuthorityApproved(true);
                setCurrentScreen('authority-notified');
              }}
            />
          )}

          {/* 8. AUTHORITY NOTIFIED */}
          {currentScreen === 'authority-notified' && (
            <AuthorityNotifiedScreen
              reportId={activeReportId}
              onViewTimeline={() => {
                setIsAuthorityApproved(true);
                setCurrentScreen('report-status');
              }}
              onBackToHome={() => setCurrentScreen('home')}
            />
          )}

          {/* 9. MY REPORTS */}
          {currentScreen === 'my-reports' && (
            <MyReportsScreen
              cases={cases}
              onSelectReport={(caseId) => {
                setActiveReportId(caseId);
                setCurrentScreen('report-status');
              }}
              onStartNewReport={() => setCurrentScreen('report-capture')}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {/* 10. NOTIFICATIONS */}
          {currentScreen === 'notifications' && (
            <NotificationCenterScreen
              onSelectCase={(caseId) => {
                setActiveReportId(caseId);
                setCurrentScreen('report-status');
              }}
              onBack={() => setCurrentScreen('home')}
            />
          )}

          {/* 11. PROFILE & SETTINGS */}
          {currentScreen === 'profile' && (
            <ProfileScreen
              user={user}
              onSignOut={() => setCurrentScreen('login')}
              onBack={() => setCurrentScreen('home')}
              onOpenHelp={() => setHelpModalOpen(true)}
            />
          )}

          {/* Bottom Navigation Bar (Visible on primary tabbed views) */}
          {isTabbedScreen && (
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-t border-slate-200 px-6 flex items-center justify-around z-30 shadow-lg select-none">
              {/* Home */}
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  currentScreen === 'home' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="text-[10px] font-bold">Home</span>
              </button>

              {/* My Reports */}
              <button
                onClick={() => setCurrentScreen('my-reports')}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  currentScreen === 'my-reports' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <FileText className="w-5 h-5" />
                <span className="text-[10px] font-bold">Reports</span>
              </button>

              {/* Center Quick Report Action */}
              <button
                onClick={() => setCurrentScreen('report-capture')}
                className="w-11 h-11 -mt-5 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-600/30 transition-transform active:scale-95 cursor-pointer"
                title="Report Sighting"
              >
                <PlusCircle className="w-6 h-6" />
              </button>

              {/* Alerts / Notifications */}
              <button
                onClick={() => setCurrentScreen('notifications')}
                className={`relative flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  currentScreen === 'notifications' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 right-2 w-2 h-2 rounded-full bg-blue-600 ring-2 ring-white" />
                <span className="text-[10px] font-bold">Alerts</span>
              </button>

              {/* Profile */}
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${
                  currentScreen === 'profile' ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-[10px] font-bold">Profile</span>
              </button>
            </div>
          )}
        </PhoneFrame>
      </div>

      {/* Safety & Terms Modal */}
      <HelpSafetyModal
        isOpen={helpModalOpen}
        onClose={() => setHelpModalOpen(false)}
      />
    </div>
  );
};
