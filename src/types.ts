export type PriorityLevel = 'High' | 'Medium' | 'Normal';

export type NavSection = 
  | 'dashboard'
  | 'new-sightings'
  | 'under-review'
  | 'approved-cases'
  | 'authorities'
  | 'notifications'
  | 'analytics'
  | 'audit-log'
  | 'settings'
  | 'case-review'
  | 'case-tracking';

export type ReviewerStatus = 'Reviewer Online' | 'Away' | 'In Consultation';

export type CaseStatus = 
  | 'New'
  | 'Under Review'
  | 'Approved'
  | 'Action in Progress'
  | 'Resolved'
  | 'Rejected'
  | 'More Info Requested';

export type AuthorityStatus = 
  | 'Notified'
  | 'Acknowledged'
  | 'Action in Progress'
  | 'Resolved';

export interface ReporterInfo {
  name: string;
  status: 'Verified' | 'Anonymous' | 'Trusted Partner';
  channel: string;
  contactMasked: string;
  submittedAt: string;
  reputationScore: number;
}

export interface PhysicalAttributes {
  approxAge: string;
  height: string;
  gender: string;
  distinguishingMarks: string[];
}

export interface AIAnalysisDetails {
  confidenceScore: number;
  potentialMatchFound: boolean;
  matchingRecordId: string;
  recordName: string;
  recordMissingSince: string;
  recordLastKnownLocation: string;
  recordImage: string;
  recordAge: number;
  recordHeight: string;
  facialSimilarity: number;
  imageQuality: 'High' | 'Moderate' | 'Low';
  imageQualityScore: number;
  ageSimilarity: string;
  otherAttributes: {
    clothingMatch: string;
    temporalSpatialPlausibility: string;
    biometricLandmarks: string;
  };
  disclaimer: string;
}

export interface HumanVerification {
  decision: 'Confirm Potential Match' | 'Request More Information' | 'Reject Match';
  reviewerNotes: string;
  reviewedBy: string;
  reviewerId: string;
  reviewedAt: string;
  reviewTimeTaken: string;
}

export interface ForwardingInfo {
  destinationAuthority: string;
  authorityContact: string;
  assignedUnit: string;
  precinctCode: string;
  forwardedAt: string;
  currentAuthorityStatus: AuthorityStatus;
  dispatchedOfficer?: string;
  etaOrLastReport?: string;
  authorityNotes?: string;
}

export interface AuditEvent {
  id: string;
  timestamp: string;
  action: string;
  actor: string;
  actorRole: string;
  caseId: string;
  details: string;
  hash: string;
}

export interface TimelineStep {
  title: string;
  status: 'completed' | 'in_progress' | 'pending';
  time?: string;
  description?: string;
}

export interface SightingCase {
  id: string; // e.g. "FM-10427"
  sightingTime: string; // "Today, 5:42 PM"
  rawTimestamp: string; // ISO
  location: string;
  district: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  aiConfidence: number; // 87
  priority: PriorityLevel;
  status: CaseStatus;
  reportedImage: string;
  reporter: ReporterInfo;
  description: string;
  clothingDetails: string;
  physicalAttributes: PhysicalAttributes;
  aiAnalysis: AIAnalysisDetails;
  humanVerification?: HumanVerification;
  forwarding?: ForwardingInfo;
  timeline: TimelineStep[];
  auditTrail: AuditEvent[];
}

export interface NotificationItem {
  id: string;
  title: string;
  caseId: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 
    | 'new_sighting' 
    | 'ai_completed' 
    | 'high_confidence' 
    | 'authority_ack' 
    | 'status_changed' 
    | 'resolved';
}

export interface ReviewerProfile {
  name: string;
  role: string;
  reviewerId: string;
  clearanceLevel: string;
  department: string;
  status: 'Reviewer Online' | 'Away' | 'In Consultation';
  casesReviewedToday: number;
  shiftHours: string;
}
