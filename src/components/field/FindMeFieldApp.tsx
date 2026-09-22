import React, { useState } from 'react';
import { 
  FieldScreen, 
  FieldOfficerProfile, 
  FieldCase, 
  FieldTimelineItem, 
  FieldNotification, 
  FieldAssessmentState, 
  FieldResolutionData,
  AvailabilityStatus
} from './types';
import { 
  DEFAULT_OFFICER, 
  INITIAL_PRIORITY_CASE, 
  SECONDARY_CASES, 
  DEFAULT_TIMELINE_EVENTS, 
  DEFAULT_NOTIFICATIONS 
} from './mockData';
import { PhoneFrame } from '../mobile/PhoneFrame';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { CaseDetailsScreen } from './screens/CaseDetailsScreen';
import { NavigationScreen } from './screens/NavigationScreen';
import { ActionInProgressScreen } from './screens/ActionInProgressScreen';
import { ArrivalScreen } from './screens/ArrivalScreen';
import { FieldAssessmentScreen } from './screens/FieldAssessmentScreen';
import { PersonLocatedScreen } from './screens/PersonLocatedScreen';
import { ResolutionScreen } from './screens/ResolutionScreen';
import { CaseHistoryScreen } from './screens/CaseHistoryScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileSettingsScreen } from './screens/ProfileSettingsScreen';
import { FieldBottomNav } from './FieldBottomNav';
import { QuickScenarioBar } from './QuickScenarioBar';
import { ContactDispatchModal } from './ContactDispatchModal';
import { EvidenceInspectionModal } from './EvidenceInspectionModal';
import { CheckCircle2, Bell, AlertTriangle, Radio } from 'lucide-react';

interface FindMeFieldAppProps {
  onSwitchToCitizen?: () => void;
  onSwitchToConsole?: () => void;
}

export const FindMeFieldApp: React.FC<FindMeFieldAppProps> = ({
  onSwitchToCitizen,
  onSwitchToConsole
}) => {
  // Screen state - Default to 'home' or 'login'
  const [currentScreen, setCurrentScreen] = useState<FieldScreen>('login');
  const [isFrameless, setIsFrameless] = useState(false);

  // Officer Profile state
  const [officer, setOfficer] = useState<FieldOfficerProfile>(DEFAULT_OFFICER);

  // Cases state
  const [cases, setCases] = useState<FieldCase[]>(SECONDARY_CASES);
  const [selectedCase, setSelectedCase] = useState<FieldCase>(INITIAL_PRIORITY_CASE);

  // Timeline events state
  const [timeline, setTimeline] = useState<FieldTimelineItem[]>(DEFAULT_TIMELINE_EVENTS);

  // Notifications state
  const [notifications, setNotifications] = useState<FieldNotification[]>(DEFAULT_NOTIFICATIONS);

  // Modals state
  const [dispatchModalOpen, setDispatchModalOpen] = useState(false);
  const [evidenceModalOpen, setEvidenceModalOpen] = useState(false);

  // Micro-interaction banner state
  const [toastAlert, setToastAlert] = useState<{ title: string; message: string; type: 'info' | 'success' | 'alert' } | null>(null);

  const showToast = (title: string, message: string, type: 'info' | 'success' | 'alert' = 'info') => {
    setToastAlert({ title, message, type });
    setTimeout(() => {
      setToastAlert(null);
    }, 4500);
  };

  // Status transitions
  const handleStartResponse = () => {
    // Update case status
    setSelectedCase(prev => ({ ...prev, status: 'Response Active' }));
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'Response Active' } : c));
    setOfficer(prev => ({ ...prev, status: 'On Active Response' }));
    showToast('Case Response Started', 'Unit 4 en route to Central District Transit Plaza', 'info');
    setCurrentScreen('navigation');
  };

  const handleArrivedOnScene = () => {
    setSelectedCase(prev => ({ ...prev, status: 'Arrived on Scene' }));
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'Arrived on Scene' } : c));
    showToast('Arrival Logged in CAD', '10-97 on scene at Central District Plaza (5:58 PM)', 'success');
    setCurrentScreen('arrival');
  };

  const handleBeginAssessment = () => {
    setSelectedCase(prev => ({ ...prev, status: 'Assessment in Progress' }));
    setCurrentScreen('field-assessment');
  };

  const handleSubmitAssessment = (assessment: FieldAssessmentState) => {
    if (assessment.personLocated) {
      setSelectedCase(prev => ({ ...prev, status: 'Person Located' }));
      setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'Person Located' } : c));
      showToast('Person Located Confirmation', 'Subject verified safe. Safeguarding in progress.', 'success');
      setCurrentScreen('person-located');
    } else {
      setSelectedCase(prev => ({ ...prev, status: 'Unable to Locate' }));
      showToast('Assessment Completed', 'Unable to locate subject. Escalating to supervisor.', 'alert');
      setCurrentScreen('resolution');
    }
  };

  const handleSubmitResolution = (resData: FieldResolutionData) => {
    setSelectedCase(prev => ({ ...prev, status: 'Case Resolved' }));
    setCases(prev => prev.map(c => c.id === selectedCase.id ? { ...c, status: 'Case Resolved' } : c));
    setOfficer(prev => ({ ...prev, status: 'Available for Dispatch' }));
    showToast('Case Closed Successfully', `Incident ${resData.caseId} marked ${resData.resolutionType}`, 'success');
  };

  const handleUpdateAvailability = (status: AvailabilityStatus) => {
    setOfficer(prev => ({ ...prev, status }));
    showToast('Unit Status Updated', `Unit 4 availability changed to: ${status}`, 'info');
  };

  const handleTriggerSimulatedAlert = () => {
    const newNotif: FieldNotification = {
      id: `sim-${Date.now()}`,
      type: 'priority_case_updated',
      title: 'URGENT CAD UPDATE: FM-10427',
      message: 'Citizen reporter updated: Child was seen heading towards coffee kiosk east concourse.',
      timestamp: 'Just now',
      read: false,
      caseId: 'FM-10427',
      priority: 'High'
    };
    setNotifications(prev => [newNotif, ...prev]);
    showToast('Priority Radio Dispatch Alert', newNotif.message, 'alert');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <LoginScreen
            onSignInSuccess={() => {
              showToast('Authorized Access Granted', 'Officer J. Mercer logged into Unit 4 Terminal', 'success');
              setCurrentScreen('home');
            }}
          />
        );

      case 'home':
        return (
          <HomeScreen
            officer={officer}
            cases={cases}
            onSelectCase={(c) => {
              setSelectedCase(c);
              setCurrentScreen('case-details');
            }}
            onToggleStatus={() => {
              const nextStatus: AvailabilityStatus = 
                officer.status === 'Available for Dispatch' ? 'Busy / Standby' : 'Available for Dispatch';
              handleUpdateAvailability(nextStatus);
            }}
            onOpenNotifications={() => setCurrentScreen('notifications')}
            unreadNotifsCount={notifications.filter(n => !n.read).length}
          />
        );

      case 'case-details':
        return (
          <CaseDetailsScreen
            caseItem={selectedCase}
            onBack={() => setCurrentScreen('home')}
            onStartResponse={handleStartResponse}
            onContactDispatch={() => setDispatchModalOpen(true)}
            onViewEvidence={() => setEvidenceModalOpen(true)}
          />
        );

      case 'navigation':
        return (
          <NavigationScreen
            caseItem={selectedCase}
            onBack={() => setCurrentScreen('case-details')}
            onArrived={handleArrivedOnScene}
            onContactDispatch={() => setDispatchModalOpen(true)}
            onStartActionInProgress={() => setCurrentScreen('action-in-progress')}
          />
        );

      case 'action-in-progress':
        return (
          <ActionInProgressScreen
            caseItem={selectedCase}
            onUpdateStatus={() => setCurrentScreen('arrival')}
            onContactDispatch={() => setDispatchModalOpen(true)}
            onOpenMap={() => setCurrentScreen('navigation')}
            onViewEvidence={() => setEvidenceModalOpen(true)}
          />
        );

      case 'arrival':
        return (
          <ArrivalScreen
            caseItem={selectedCase}
            arrivalTimestamp="Today at 5:58 PM"
            onBeginAssessment={handleBeginAssessment}
            onUnableToLocate={() => setCurrentScreen('resolution')}
            onRequestSupport={() => {
              setDispatchModalOpen(true);
              showToast('Backup Requested', 'CAD request broadcast for additional support unit', 'alert');
            }}
            onContactDispatch={() => setDispatchModalOpen(true)}
          />
        );

      case 'field-assessment':
        return (
          <FieldAssessmentScreen
            caseItem={selectedCase}
            onBack={() => setCurrentScreen('arrival')}
            onSubmitAssessment={handleSubmitAssessment}
          />
        );

      case 'person-located':
        return (
          <PersonLocatedScreen
            caseItem={selectedCase}
            locatedTimestamp="Today at 6:04 PM"
            onContinueToResolution={() => setCurrentScreen('resolution')}
            onRequestSupport={() => setDispatchModalOpen(true)}
          />
        );

      case 'resolution':
        return (
          <ResolutionScreen
            caseItem={selectedCase}
            onBack={() => setCurrentScreen('person-located')}
            onSubmitSuccess={handleSubmitResolution}
            onViewTimeline={() => setCurrentScreen('case-history')}
          />
        );

      case 'case-history':
        return (
          <CaseHistoryScreen
            caseItem={selectedCase}
            timeline={timeline}
            onBack={() => setCurrentScreen('home')}
            onReturnToHome={() => setCurrentScreen('home')}
          />
        );

      case 'notifications':
        return (
          <NotificationsScreen
            notifications={notifications}
            onBack={() => setCurrentScreen('home')}
            onSelectNotificationCase={(caseId) => {
              const target = cases.find(c => c.id === caseId);
              if (target) {
                setSelectedCase(target);
                setCurrentScreen('case-details');
              }
            }}
            onMarkAllRead={() => {
              setNotifications(prev => prev.map(n => ({ ...n, read: true })));
            }}
          />
        );

      case 'profile-settings':
        return (
          <ProfileSettingsScreen
            officer={officer}
            onBack={() => setCurrentScreen('home')}
            onUpdateStatus={handleUpdateAvailability}
            onSignOut={() => {
              setCurrentScreen('login');
              showToast('Unit Signed Out', 'Terminal locked. Be safe in the field.', 'info');
            }}
            onContactDispatch={() => setDispatchModalOpen(true)}
          />
        );

      default:
        return null;
    }
  };

  const unreadNotifCount = notifications.filter(n => !n.read).length;

  return (
    <div className="flex-1 flex flex-col bg-slate-950 overflow-hidden relative">
      {/* Quick Scenario & Developer Evaluation Bar */}
      <QuickScenarioBar
        currentScreen={currentScreen}
        onSelectScreen={(scr) => setCurrentScreen(scr)}
        isFrameless={isFrameless}
        onToggleFrameless={() => setIsFrameless(!isFrameless)}
        onOpenDispatch={() => setDispatchModalOpen(true)}
        onTriggerNewCaseAlert={handleTriggerSimulatedAlert}
        onResetFlow={() => setCurrentScreen('login')}
      />

      {/* Floating Micro-Interaction Toast Notification */}
      {toastAlert && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-11/12 max-w-sm animate-in slide-in-from-top-4 fade-in duration-300">
          <div className={`p-3 rounded-2xl shadow-2xl border flex items-start gap-2.5 backdrop-blur-md ${
            toastAlert.type === 'success' 
              ? 'bg-emerald-950/95 border-emerald-500 text-emerald-100'
              : toastAlert.type === 'alert'
              ? 'bg-rose-950/95 border-rose-500 text-rose-100'
              : 'bg-blue-950/95 border-blue-500 text-blue-100'
          }`}>
            {toastAlert.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />}
            {toastAlert.type === 'alert' && <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />}
            {toastAlert.type === 'info' && <Bell className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />}
            
            <div className="min-w-0 flex-1 text-xs">
              <span className="font-extrabold block text-white">{toastAlert.title}</span>
              <span className="text-[11px] opacity-90 leading-tight">{toastAlert.message}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Prototype Viewport */}
      <div className="flex-1 flex items-center justify-center overflow-y-auto p-0 sm:p-4">
        <PhoneFrame isFrameless={isFrameless} currentTime="17:58">
          <div className="flex-1 flex flex-col min-h-0 bg-slate-50 relative">
            {/* Screen View */}
            <div className="flex-1 overflow-y-auto flex flex-col">
              {renderScreen()}
            </div>

            {/* Bottom Navigation */}
            <FieldBottomNav
              currentScreen={currentScreen}
              onNavigate={(scr) => setCurrentScreen(scr)}
              unreadCount={unreadNotifCount}
              hasActiveResponse={selectedCase.status === 'Response Active' || selectedCase.status === 'Arrived on Scene'}
            />
          </div>
        </PhoneFrame>
      </div>

      {/* Contact Dispatch Radio Modal */}
      <ContactDispatchModal
        isOpen={dispatchModalOpen}
        onClose={() => setDispatchModalOpen(false)}
        caseId={selectedCase.id}
        location={selectedCase.location}
        onStatusUpdate={(msg) => showToast('CAD Message Sent', msg, 'info')}
      />

      {/* Evidence Inspection Modal */}
      <EvidenceInspectionModal
        isOpen={evidenceModalOpen}
        onClose={() => setEvidenceModalOpen(false)}
        caseItem={selectedCase}
      />
    </div>
  );
};
