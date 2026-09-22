export type FieldScreen = 
  | 'login'
  | 'home'
  | 'case-details'
  | 'navigation'
  | 'action-in-progress'
  | 'arrival'
  | 'field-assessment'
  | 'person-located'
  | 'resolution'
  | 'case-history'
  | 'notifications'
  | 'profile-settings';

export type AvailabilityStatus = 
  | 'Available for Dispatch'
  | 'On Active Response'
  | 'Busy / Standby'
  | 'Off-Duty';

export interface FieldOfficerProfile {
  id: string;
  name: string;
  badgeNumber: string;
  unit: string;
  callSign: string;
  organization: string;
  status: AvailabilityStatus;
  shiftHours: string;
  avatar: string;
  cjisClearance: string;
  directRadioFreq: string;
}

export type FieldCasePriority = 'High' | 'Medium' | 'Low';

export type FieldCaseStatus = 
  | 'New Assignment'
  | 'Assigned'
  | 'Response Active'
  | 'Action in Progress'
  | 'Arrived on Scene'
  | 'Assessment in Progress'
  | 'Person Located'
  | 'Case Resolved'
  | 'Unable to Locate';

export interface FieldCase {
  id: string;
  title: string;
  reportedIndividual: string;
  age: number;
  location: string;
  district: string;
  distanceKm: number;
  travelTimeMin: number;
  priority: FieldCasePriority;
  status: FieldCaseStatus;
  aiConfidence: number;
  reportedTime: string;
  rawTimestamp: string;
  description: string;
  clothingDetails: string;
  sightingImage: string;
  referenceRecordImage?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  reporter: {
    name: string;
    type: 'Verified Citizen' | 'Trusted Partner';
    contactMasked: string;
  };
}

export interface FieldAssessmentState {
  personLocated: boolean;
  identityVerified: boolean;
  immediateSafetyConcern: boolean;
  medicalRequired: boolean;
  additionalSupportRequired: boolean;
  fieldNotes: string;
  submittedAt?: string;
}

export type ResolutionOption = 
  | 'Person Located'
  | 'Referred to Appropriate Authority'
  | 'Unable to Locate'
  | 'False / Invalid Report'
  | 'Additional Investigation Required';

export interface FieldResolutionData {
  caseId: string;
  resolutionType: ResolutionOption;
  notes: string;
  supportingEvidenceAttached: boolean;
  evidenceFileName?: string;
  resolvedAt: string;
  officerId: string;
  officerName: string;
}

export interface FieldTimelineItem {
  id: string;
  time: string;
  title: string;
  subtitle?: string;
  actor: string;
  role: string;
  status: 'completed' | 'current' | 'pending';
  iconType: 'sighting' | 'ai' | 'reviewer' | 'authority' | 'field' | 'arrival' | 'located' | 'resolved';
}

export type FieldNotificationType = 
  | 'new_case_assigned'
  | 'priority_case_updated'
  | 'reviewer_approval'
  | 'dispatch_instructions'
  | 'additional_support_requested'
  | 'case_status_changed';

export interface FieldNotification {
  id: string;
  type: FieldNotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  caseId?: string;
  priority?: 'High' | 'Normal';
}
