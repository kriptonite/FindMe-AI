import { FieldOfficerProfile, FieldCase, FieldTimelineItem, FieldNotification } from './types';

export const DEFAULT_OFFICER: FieldOfficerProfile = {
  id: 'OFF-4028',
  name: 'Officer J. Mercer',
  badgeNumber: '#4028',
  unit: 'Field Response Unit 4',
  callSign: 'Mobile Unit 4 (Tango)',
  organization: 'Metro Emergency Response & Public Safety',
  status: 'Available for Dispatch',
  shiftHours: '14:00 – 22:00 EDT',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
  cjisClearance: 'CJIS Level 4 (Tactical Field Cleared)',
  directRadioFreq: 'CAD Dispatch Channel TAC-4 (460.125 MHz)'
};

export const INITIAL_PRIORITY_CASE: FieldCase = {
  id: 'FM-10427',
  title: 'Potential Missing Person',
  reportedIndividual: 'Leo Martinez',
  age: 9,
  location: 'Central District, 4th & Grand Ave (Transit Plaza)',
  district: 'Central District',
  distanceKm: 1.8,
  travelTimeMin: 6,
  priority: 'High',
  status: 'New Assignment',
  aiConfidence: 87,
  reportedTime: 'Today, 5:42 PM',
  rawTimestamp: '2026-09-21T17:42:00',
  description: 'Child wearing gray hoodie and dark trousers.',
  clothingDetails: 'Heather-gray pullover hooded sweatshirt with small chest logo, navy/dark charcoal cargo trousers, black athletic sneakers with reflective white heel trim.',
  sightingImage: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?auto=format&fit=crop&w=600&q=80',
  referenceRecordImage: 'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?auto=format&fit=crop&w=600&q=80',
  coordinates: {
    lat: 40.7128,
    lng: -74.0060
  },
  reporter: {
    name: 'Julian Vance (Verified Citizen)',
    type: 'Verified Citizen',
    contactMasked: '+1 (555) •••-9184'
  }
};

export const SECONDARY_CASES: FieldCase[] = [
  INITIAL_PRIORITY_CASE,
  {
    id: 'FM-10429',
    title: 'Vulnerable Adult Sighting',
    reportedIndividual: 'Eleanor Davis',
    age: 78,
    location: 'Westside Market Promenade, Pier 12',
    district: 'Westside Harbor',
    distanceKm: 3.4,
    travelTimeMin: 11,
    priority: 'High',
    status: 'New Assignment',
    aiConfidence: 91,
    reportedTime: 'Today, 5:18 PM',
    rawTimestamp: '2026-09-21T17:18:00',
    description: 'Elderly woman wearing lavender cardigan with silver cane, resting on bench near flower stall.',
    clothingDetails: 'Lavender knit cardigan over cream blouse, dark pleated skirt, carrying tan canvas tote bag.',
    sightingImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    referenceRecordImage: 'https://images.unsplash.com/photo-1581579438747-1dc8d17bbce4?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      lat: 40.7306,
      lng: -74.0110
    },
    reporter: {
      name: 'Security Officer Chen',
      type: 'Trusted Partner',
      contactMasked: '+1 (555) •••-4482'
    }
  },
  {
    id: 'FM-10418',
    title: 'Missing Teenager Lead',
    reportedIndividual: 'Maya Lin',
    age: 16,
    location: 'Metro Central Station, Platform 3 Concourse',
    district: 'Downtown Station',
    distanceKm: 2.1,
    travelTimeMin: 8,
    priority: 'Medium',
    status: 'Action in Progress',
    aiConfidence: 84,
    reportedTime: 'Today, 4:55 PM',
    rawTimestamp: '2026-09-21T16:55:00',
    description: 'Female teenager with dark ponytail wearing oversized green bomber jacket and maroon backpack.',
    clothingDetails: 'Olive green bomber jacket, white crewneck tee, black jeans, burgundy school backpack.',
    sightingImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    coordinates: {
      lat: 40.7180,
      lng: -74.0020
    },
    reporter: {
      name: 'Transit Attendant Ramos',
      type: 'Trusted Partner',
      contactMasked: '+1 (555) •••-7721'
    }
  }
];

export const DEFAULT_TIMELINE_EVENTS: FieldTimelineItem[] = [
  {
    id: 't-1',
    time: '5:42 PM',
    title: 'Sighting submitted',
    subtitle: 'Citizen mobile capture with verified location metadata and photo',
    actor: 'Julian Vance (Citizen App)',
    role: 'Verified Reporter',
    status: 'completed',
    iconType: 'sighting'
  },
  {
    id: 't-2',
    time: '5:43 PM',
    title: 'AI analysis completed',
    subtitle: '87% visual correlation against active Missing Bulletin MP-44021',
    actor: 'FindMe Neural Vision v5.1',
    role: 'Automated Diagnostic',
    status: 'completed',
    iconType: 'ai'
  },
  {
    id: 't-3',
    time: '5:46 PM',
    title: 'Human reviewer approved',
    subtitle: 'Evidence validated by Senior Reviewer Elena Rostova (REV-8042)',
    actor: 'Elena Rostova (REV-8042)',
    role: 'CAD Reviewer',
    status: 'completed',
    iconType: 'reviewer'
  },
  {
    id: 't-4',
    time: '5:48 PM',
    title: 'Authority notified',
    subtitle: 'CAD incident packet transmitted to Central Emergency Dispatch',
    actor: 'Metro Emergency CAD Gateway',
    role: 'Dispatch System',
    status: 'completed',
    iconType: 'authority'
  },
  {
    id: 't-5',
    time: '5:52 PM',
    title: 'Field team assigned',
    subtitle: 'Assigned to Unit 4 (Officer J. Mercer) — Priority Emergency Response',
    actor: 'Central Dispatcher K. Ramos',
    role: 'Field Dispatcher',
    status: 'completed',
    iconType: 'field'
  },
  {
    id: 't-6',
    time: '5:58 PM',
    title: 'Team arrived',
    subtitle: 'Unit 4 on scene at Central District Transit Plaza pavilion',
    actor: 'Officer J. Mercer (#4028)',
    role: 'Field Responder',
    status: 'completed',
    iconType: 'arrival'
  },
  {
    id: 't-7',
    time: '6:04 PM',
    title: 'Person located',
    subtitle: 'Individual safely identified and safeguarded by responding officers',
    actor: 'Unit 4 Field Team',
    role: 'Field Responder',
    status: 'completed',
    iconType: 'located'
  },
  {
    id: 't-8',
    time: '6:10 PM',
    title: 'Case resolved',
    subtitle: 'Transferred to Family Safeguarding Liaison and case closed in CAD',
    actor: 'Officer J. Mercer & Dispatch',
    role: 'Authorized Closure',
    status: 'completed',
    iconType: 'resolved'
  }
];

export const DEFAULT_NOTIFICATIONS: FieldNotification[] = [
  {
    id: 'notif-1',
    type: 'new_case_assigned',
    title: 'New case assigned: FM-10427',
    message: 'High priority missing person assignment: Central District Transit Plaza (1.8 km). Immediate response requested.',
    timestamp: '2 min ago',
    read: false,
    caseId: 'FM-10427',
    priority: 'High'
  },
  {
    id: 'notif-2',
    type: 'priority_case_updated',
    title: 'Priority case updated: FM-10427',
    message: 'Updated description received from transit security: Child observed wearing gray hoodie near east coffee kiosk.',
    timestamp: '8 min ago',
    read: false,
    caseId: 'FM-10427',
    priority: 'High'
  },
  {
    id: 'notif-3',
    type: 'reviewer_approval',
    title: 'Reviewer approval confirmed',
    message: 'Human Reviewer Elena Rostova approved sighting evidence (87% advisory correlation score).',
    timestamp: '14 min ago',
    read: true,
    caseId: 'FM-10427'
  },
  {
    id: 'notif-4',
    type: 'dispatch_instructions',
    title: 'Dispatch instructions: Approach caution',
    message: 'Supervisor note: Subject may be non-verbal or startled by sirens. Maintain low-profile visual approach.',
    timestamp: '22 min ago',
    read: true,
    caseId: 'FM-10427'
  },
  {
    id: 'notif-5',
    type: 'additional_support_requested',
    title: 'Additional support requested',
    message: 'Unit 2 requested perimeter support in North Sector regarding Case FM-10419.',
    timestamp: '35 min ago',
    read: true,
    priority: 'Normal'
  },
  {
    id: 'notif-6',
    type: 'case_status_changed',
    title: 'Case status changed: FM-10420',
    message: 'Case FM-10420 marked Resolved by Field Unit 3. Subject safely reunited with family.',
    timestamp: '1 hour ago',
    read: true
  }
];
