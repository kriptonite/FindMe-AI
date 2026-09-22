import { SightingCase, NotificationItem, ReviewerProfile, AuditEvent } from '../types';

export const CURRENT_REVIEWER: ReviewerProfile = {
  name: 'Elena Rostova',
  role: 'Senior Identity Verification Officer',
  reviewerId: 'REV-8042',
  clearanceLevel: 'Tier 3 — Authorized Dispatch',
  department: 'Emergency Missing Persons Triage Unit',
  status: 'Reviewer Online',
  casesReviewedToday: 14,
  shiftHours: '08:00 - 17:00 EST'
};

// High quality curated fictional portraits
export const MOCK_CASES: SightingCase[] = [
  {
    id: 'FM-10427',
    sightingTime: 'Today, 5:42 PM',
    rawTimestamp: '2026-09-21T17:42:00',
    location: 'Central District, 4th & Grand Ave (Transit Plaza)',
    district: 'Central District',
    coordinates: { lat: 40.7128, lng: -74.006 },
    aiConfidence: 87,
    priority: 'High',
    status: 'New',
    reportedImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Julian Vance (Mobile Citizen App)',
      status: 'Verified',
      channel: 'FindMe Public Mobile App v4.2',
      contactMasked: '+1 (555) •••-9184',
      submittedAt: 'Today, 5:42:18 PM',
      reputationScore: 98
    },
    description: 'Individual matching public alert seen entering Grand Ave transit pavilion near east coffee stand. Appeared disoriented, checking digital departure board repeatedly.',
    clothingDetails: 'Charcoal zip-up windbreaker jacket, dark denim trousers, silver analog wristwatch on left wrist, tan hiking boots.',
    physicalAttributes: {
      approxAge: '32–36 years',
      height: '5 ft 10 in (~178 cm)',
      gender: 'Male',
      distinguishingMarks: ['Faint scar above left eyebrow', 'Slight limp on right leg']
    },
    aiAnalysis: {
      confidenceScore: 87,
      potentialMatchFound: true,
      matchingRecordId: 'MP-44021',
      recordName: 'Marcus Vance',
      recordMissingSince: 'Sept 07, 2026 (14 days ago)',
      recordLastKnownLocation: 'Harborview Medical Center area',
      recordImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
      recordAge: 34,
      recordHeight: '5 ft 10 in',
      facialSimilarity: 89,
      imageQuality: 'High',
      imageQualityScore: 92,
      ageSimilarity: 'Estimated 32-36 vs Record 34 (High Match)',
      otherAttributes: {
        clothingMatch: 'Upper garment color matches reported missing advisory',
        temporalSpatialPlausibility: '9.4 miles from last confirmed sighting (within 48hr transit corridor)',
        biometricLandmarks: 'Inter-pupillary distance: 98.2% alignment; Jawline polygon match: 88.4%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '5:42 PM', description: 'Citizen verified report uploaded via mobile app' },
      { title: 'AI Analysis Completed', status: 'completed', time: '5:43 PM', description: 'Biometric neural model matched MP-44021 (87%)' },
      { title: 'Human Review Completed', status: 'pending', description: 'Assigned to Senior Reviewer Elena Rostova' },
      { title: 'Authorities Notified', status: 'pending', description: 'Pending reviewer verification and authorization' },
      { title: 'Action in Progress', status: 'pending', description: 'Field response units on standby' },
      { title: 'Resolved', status: 'pending', description: 'Confirmation of subject safety or safe return' }
    ],
    auditTrail: [
      {
        id: 'aud-001',
        timestamp: '5:42:18 PM',
        action: 'Sighting submitted',
        actor: 'Citizen App (#CV-9184)',
        actorRole: 'Verified Reporter',
        caseId: 'FM-10427',
        details: 'Image and GPS coordinates uploaded with 8.2m precision',
        hash: 'SHA256: 4f8a...c901'
      },
      {
        id: 'aud-002',
        timestamp: '5:43:04 PM',
        action: 'AI analysis completed',
        actor: 'FindMe Biometric Vision Engine v5.1',
        actorRole: 'Automated Diagnostic',
        caseId: 'FM-10427',
        details: 'Scored against 42 active missing bulletins; match found with MP-44021 (87%)',
        hash: 'SHA256: 7b31...88fa'
      },
      {
        id: 'aud-003',
        timestamp: '5:44:11 PM',
        action: 'Reviewer opened case',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Identity Reviewer',
        caseId: 'FM-10427',
        details: 'Review session locked to workstation TERM-04',
        hash: 'SHA256: 9e12...442a'
      }
    ]
  },
  {
    id: 'FM-10428',
    sightingTime: 'Today, 4:15 PM',
    rawTimestamp: '2026-09-21T16:15:00',
    location: 'North Bay, Pier 39 Ferry Promenade',
    district: 'North Bay',
    coordinates: { lat: 40.7589, lng: -73.9851 },
    aiConfidence: 92,
    priority: 'High',
    status: 'Under Review',
    reportedImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Sarah Lin (Pier Security Guard)',
      status: 'Trusted Partner',
      channel: 'Harbor Security Portal',
      contactMasked: '+1 (555) •••-3312',
      submittedAt: 'Today, 4:15:20 PM',
      reputationScore: 99
    },
    description: 'Female matching silver advisory seated on wooden bench near slip 4. Wearing burgundy knit beanie, carrying olive canvas duffle bag.',
    clothingDetails: 'Burgundy knit beanie, beige shearling collar coat, dark leggings, white sneakers.',
    physicalAttributes: {
      approxAge: '27–31 years',
      height: '5 ft 4 in (~163 cm)',
      gender: 'Female',
      distinguishingMarks: ['Small floral tattoo behind right ear', 'Tortoiseshell frame eyeglasses']
    },
    aiAnalysis: {
      confidenceScore: 92,
      potentialMatchFound: true,
      matchingRecordId: 'MP-43980',
      recordName: 'Clara Oswald',
      recordMissingSince: 'Sept 15, 2026 (6 days ago)',
      recordLastKnownLocation: 'Bay Point University Library',
      recordImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80',
      recordAge: 28,
      recordHeight: '5 ft 4 in',
      facialSimilarity: 94,
      imageQuality: 'High',
      imageQualityScore: 96,
      ageSimilarity: 'Estimated 27-31 vs Record 28 (Exceptional Match)',
      otherAttributes: {
        clothingMatch: 'Eyeglasses match specific frame noted in alert record',
        temporalSpatialPlausibility: '3.1 miles from residence, adjacent to ferry route',
        biometricLandmarks: 'Facial contour: 94.6% correlation; Nasal bridge index: 95.1%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '4:15 PM', description: 'Partner security feed upload' },
      { title: 'AI Analysis Completed', status: 'completed', time: '4:16 PM', description: 'AI matched MP-43980 (92% confidence)' },
      { title: 'Human Review Completed', status: 'in_progress', time: '4:18 PM', description: 'Active analysis by Senior Reviewer Elena Rostova' },
      { title: 'Authorities Notified', status: 'pending', description: 'Pending dispatch review' },
      { title: 'Action in Progress', status: 'pending', description: 'North Bay Patrol Unit 08 on priority watch' },
      { title: 'Resolved', status: 'pending', description: 'Awaiting outcome' }
    ],
    auditTrail: [
      {
        id: 'aud-101',
        timestamp: '4:15:20 PM',
        action: 'Sighting submitted',
        actor: 'Sarah Lin (Pier Security Guard)',
        actorRole: 'Trusted Partner',
        caseId: 'FM-10428',
        details: 'Direct feed submission from dockside surveillance checkpoint',
        hash: 'SHA256: 12af...99cd'
      },
      {
        id: 'aud-102',
        timestamp: '4:16:02 PM',
        action: 'AI analysis completed',
        actor: 'FindMe Biometric Vision Engine v5.1',
        actorRole: 'Automated Diagnostic',
        caseId: 'FM-10428',
        details: 'High-confidence correlation triggered alert flag',
        hash: 'SHA256: 44ea...1b02'
      }
    ]
  },
  {
    id: 'FM-10425',
    sightingTime: 'Today, 3:05 PM',
    rawTimestamp: '2026-09-21T15:05:00',
    location: 'Riverfront Park, West Promenade Bike Path',
    district: 'Riverfront',
    coordinates: { lat: 40.7282, lng: -74.0125 },
    aiConfidence: 78,
    priority: 'Medium',
    status: 'Action in Progress',
    reportedImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Anonymous Citizen (Kiosk #12)',
      status: 'Verified',
      channel: 'Park Emergency Call Pillar',
      contactMasked: '+1 (555) •••-8011',
      submittedAt: 'Today, 3:05:14 PM',
      reputationScore: 89
    },
    description: 'Elderly gentleman resting on stone wall near kayak dock. Appeared confused when asked for directions by joggers.',
    clothingDetails: 'Faded navy cardigan, beige slacks, brown loafers, blue baseball cap with anchor emblem.',
    physicalAttributes: {
      approxAge: '68–74 years',
      height: '5 ft 9 in (~175 cm)',
      gender: 'Male',
      distinguishingMarks: ['Graying beard stubble', 'Gold wedding ring on left hand']
    },
    aiAnalysis: {
      confidenceScore: 78,
      potentialMatchFound: true,
      matchingRecordId: 'MP-44109',
      recordName: 'Arthur Pendelton',
      recordMissingSince: 'Sept 19, 2026 (2 days ago)',
      recordLastKnownLocation: 'Sunnyvale Assisted Living',
      recordImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
      recordAge: 72,
      recordHeight: '5 ft 9 in',
      facialSimilarity: 81,
      imageQuality: 'Moderate',
      imageQualityScore: 76,
      ageSimilarity: 'Estimated 68-74 vs Record 72 (Solid Match)',
      otherAttributes: {
        clothingMatch: 'Cap emblem corresponds to former Navy veteran bulletin',
        temporalSpatialPlausibility: '1.8 miles from assisted living facility',
        biometricLandmarks: 'Facial profile ratio: 79.8% match'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Confirm Potential Match',
      reviewerNotes: 'Biometric score 78% corroborated by specific veteran cap emblem and immediate proximity to home district. High urgency due to medication needs.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 3:18 PM',
      reviewTimeTaken: '2m 45s'
    },
    forwarding: {
      destinationAuthority: 'Riverfront Park Ranger & Metro Police Precinct 6',
      authorityContact: 'Dispatch Officer K. Briggs (Unit 22-A)',
      assignedUnit: 'Unit 22-A (Bicycle Patrol)',
      precinctCode: 'PCT-06-RF',
      forwardedAt: 'Today, 3:20 PM',
      currentAuthorityStatus: 'Action in Progress',
      dispatchedOfficer: 'Sgt. D. Kowalski',
      etaOrLastReport: 'Officers currently canvassing West Promenade kayak dock area.',
      authorityNotes: 'Visual contact established near Pier 18 cafe; confirming identity with gentle approach.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '3:05 PM', description: 'Park kiosk emergency alert' },
      { title: 'AI Analysis Completed', status: 'completed', time: '3:06 PM', description: 'Biometric correlation scored 78%' },
      { title: 'Human Review Completed', status: 'completed', time: '3:18 PM', description: 'Validated by Reviewer E. Rostova' },
      { title: 'Authorities Notified', status: 'completed', time: '3:20 PM', description: 'Precinct 6 and Park Rangers dispatched' },
      { title: 'Action in Progress', status: 'in_progress', time: '3:25 PM', description: 'Unit 22-A currently engaged on scene' },
      { title: 'Resolved', status: 'pending', description: 'Pending medical check and family reunion' }
    ],
    auditTrail: [
      {
        id: 'aud-201',
        timestamp: '3:05:14 PM',
        action: 'Sighting submitted',
        actor: 'Park Emergency Pillar #12',
        actorRole: 'Public Infrastructure',
        caseId: 'FM-10425',
        details: 'Citizen initiated call with snapshot upload',
        hash: 'SHA256: aa41...23fc'
      },
      {
        id: 'aud-202',
        timestamp: '3:18:40 PM',
        action: 'Human verification completed',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10425',
        details: 'Decision: Approved and validated for emergency dispatch',
        hash: 'SHA256: cc90...813b'
      },
      {
        id: 'aud-203',
        timestamp: '3:20:12 PM',
        action: 'Local authority notified',
        actor: 'FindMe Dispatch Gateway',
        actorRole: 'System Automation',
        caseId: 'FM-10425',
        details: 'Sent high-priority telemetry payload to Precinct 6 CAD system',
        hash: 'SHA256: de44...09bb'
      }
    ]
  },
  {
    id: 'FM-10424',
    sightingTime: 'Today, 2:18 PM',
    rawTimestamp: '2026-09-21T14:18:00',
    location: 'North Bay Terminal, Gate 14 Bus Concourse',
    district: 'North Bay',
    coordinates: { lat: 40.7510, lng: -73.9930 },
    aiConfidence: 84,
    priority: 'High',
    status: 'Approved',
    reportedImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'David Thorne (Transit Ticket Agent)',
      status: 'Verified',
      channel: 'Transit Authority Mobile App',
      contactMasked: '+1 (555) •••-4521',
      submittedAt: 'Today, 2:18:05 PM',
      reputationScore: 97
    },
    description: 'Young woman purchased one-way bus ticket to Scranton. Looked distressed and frequently checked behind her.',
    clothingDetails: 'Yellow hooded raincoat, black backpack with distinctive red keychain, dark jeans.',
    physicalAttributes: {
      approxAge: '19–22 years',
      height: '5 ft 6 in (~168 cm)',
      gender: 'Female',
      distinguishingMarks: ['Small star tattoo on wrist', 'Slight birthmark on left jawline']
    },
    aiAnalysis: {
      confidenceScore: 84,
      potentialMatchFound: true,
      matchingRecordId: 'MP-43890',
      recordName: 'Maya Ramirez',
      recordMissingSince: 'Sept 18, 2026 (3 days ago)',
      recordLastKnownLocation: 'State University Dormitory Quad',
      recordImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      recordAge: 20,
      recordHeight: '5 ft 6 in',
      facialSimilarity: 86,
      imageQuality: 'High',
      imageQualityScore: 89,
      ageSimilarity: 'Estimated 19-22 vs Record 20 (Strong Correlation)',
      otherAttributes: {
        clothingMatch: 'Backpack keychain matches photo provided by roommate in missing flyer',
        temporalSpatialPlausibility: 'Direct subway line connects university to Gate 14 concourse',
        biometricLandmarks: 'Facial symmetry index: 87.2%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Confirm Potential Match',
      reviewerNotes: 'High facial resemblance and specific yellow raincoat + backpack keychain corroborated by family statement. Urgent notification sent before bus departure.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 2:24 PM',
      reviewTimeTaken: '3m 12s'
    },
    forwarding: {
      destinationAuthority: 'Transit Police Authority — Concourse Division',
      authorityContact: 'Capt. R. Henderson (Badge #409)',
      assignedUnit: 'Unit T-7 (Station Patrol)',
      precinctCode: 'TP-DIST-01',
      forwardedAt: 'Today, 2:25 PM',
      currentAuthorityStatus: 'Acknowledged',
      dispatchedOfficer: 'Officer M. Alvarez',
      etaOrLastReport: 'Unit T-7 dispatched to Gate 14 platform to verify passenger manifest.',
      authorityNotes: 'Transit officers instructed to intercept bus prior to gate departure for welfare check.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '2:18 PM', description: 'Transit employee submission' },
      { title: 'AI Analysis Completed', status: 'completed', time: '2:19 PM', description: 'Match flagged with MP-43890 (84%)' },
      { title: 'Human Review Completed', status: 'completed', time: '2:24 PM', description: 'Approved by Senior Reviewer Elena Rostova' },
      { title: 'Authorities Notified', status: 'completed', time: '2:25 PM', description: 'Transit Police alerted and acknowledged' },
      { title: 'Action in Progress', status: 'pending', description: 'Officers deploying to Gate 14' },
      { title: 'Resolved', status: 'pending', description: 'Awaiting intercept report' }
    ],
    auditTrail: [
      {
        id: 'aud-301',
        timestamp: '2:18:05 PM',
        action: 'Sighting submitted',
        actor: 'David Thorne (Transit Agent)',
        actorRole: 'Verified Reporter',
        caseId: 'FM-10424',
        details: 'Photo taken from ticket window with subject consent for alert check',
        hash: 'SHA256: 77a1...dd90'
      },
      {
        id: 'aud-302',
        timestamp: '2:24:30 PM',
        action: 'Case approved',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10424',
        details: 'Approved for priority transit intercept',
        hash: 'SHA256: 88cc...124e'
      }
    ]
  },
  {
    id: 'FM-10421',
    sightingTime: 'Today, 1:40 PM',
    rawTimestamp: '2026-09-21T13:40:00',
    location: 'Eastside Plaza, Community Health Center Courtyard',
    district: 'Eastside',
    coordinates: { lat: 40.7350, lng: -73.9780 },
    aiConfidence: 64,
    priority: 'Normal',
    status: 'More Info Requested',
    reportedImage: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Maria Santos (Health Volunteer)',
      status: 'Verified',
      channel: 'Web Mobile Portal',
      contactMasked: '+1 (555) •••-1209',
      submittedAt: 'Today, 1:40:44 PM',
      reputationScore: 92
    },
    description: 'Young man in olive hoodie standing near community pantry. Lower half of face obscured by mask.',
    clothingDetails: 'Olive green pullover hoodie, dark grey sweatpants, blue medical mask.',
    physicalAttributes: {
      approxAge: '22–26 years',
      height: '5 ft 11 in (~180 cm)',
      gender: 'Male',
      distinguishingMarks: ['Ear gauge piercing on left ear']
    },
    aiAnalysis: {
      confidenceScore: 64,
      potentialMatchFound: true,
      matchingRecordId: 'MP-43750',
      recordName: 'Leon Chen',
      recordMissingSince: 'Sept 10, 2026 (11 days ago)',
      recordLastKnownLocation: 'East Metro Tech Campus',
      recordImage: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=600&q=80',
      recordAge: 23,
      recordHeight: '6 ft 0 in',
      facialSimilarity: 66,
      imageQuality: 'Moderate',
      imageQualityScore: 68,
      ageSimilarity: 'Estimated 22-26 vs Record 23 (Probable Match)',
      otherAttributes: {
        clothingMatch: 'General height and posture match; mask limits nasal-oral landmarks',
        temporalSpatialPlausibility: '3.4 miles from university dorm',
        biometricLandmarks: 'Upper orbital ridge match: 71.4%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Request More Information',
      reviewerNotes: 'Partial facial occlusion by medical face mask prevents conclusive identification. Requested secondary angle from health center reception camera or follow-up by facility staff.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 1:52 PM',
      reviewTimeTaken: '4m 10s'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '1:40 PM', description: 'Volunteer submission from Eastside Plaza' },
      { title: 'AI Analysis Completed', status: 'completed', time: '1:41 PM', description: 'Moderate confidence score (64%)' },
      { title: 'Human Review Completed', status: 'completed', time: '1:52 PM', description: 'Reviewer requested supplementary imagery' },
      { title: 'Authorities Notified', status: 'pending', description: 'Pending high-confidence corroboration' },
      { title: 'Action in Progress', status: 'pending', description: 'On standby' },
      { title: 'Resolved', status: 'pending', description: 'Awaiting additional feed' }
    ],
    auditTrail: [
      {
        id: 'aud-401',
        timestamp: '1:40:44 PM',
        action: 'Sighting submitted',
        actor: 'Maria Santos',
        actorRole: 'Verified Reporter',
        caseId: 'FM-10421',
        details: 'Photo submitted from mobile browser',
        hash: 'SHA256: eb10...902a'
      },
      {
        id: 'aud-402',
        timestamp: '1:52:15 PM',
        action: 'Reviewer requested more info',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10421',
        details: 'Automated notification pinged back to reporter requesting unmasked or side profile',
        hash: 'SHA256: dd22...887e'
      }
    ]
  },
  {
    id: 'FM-10419',
    sightingTime: 'Today, 12:30 PM',
    rawTimestamp: '2026-09-21T12:30:00',
    location: 'Metro Galleria Mall, 2nd Floor Food Court',
    district: 'Central District',
    coordinates: { lat: 40.7420, lng: -73.9900 },
    aiConfidence: 95,
    priority: 'High',
    status: 'Action in Progress',
    reportedImage: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Officer Kenneth Vance (Mall Security Supervisor)',
      status: 'Trusted Partner',
      channel: 'Enterprise Commercial Security API',
      contactMasked: '+1 (555) •••-7762',
      submittedAt: 'Today, 12:30:19 PM',
      reputationScore: 99
    },
    description: 'Juvenile matching urgent Amber alert spotted by mall security personnel near food court arcade entrance.',
    clothingDetails: 'Pink tie-dye hoodie, light blue jeans with embroidered flowers on pocket, white converse shoes.',
    physicalAttributes: {
      approxAge: '14–16 years',
      height: '5 ft 2 in (~157 cm)',
      gender: 'Female',
      distinguishingMarks: ['Braces on teeth', 'Silver locket necklace']
    },
    aiAnalysis: {
      confidenceScore: 95,
      potentialMatchFound: true,
      matchingRecordId: 'MP-44120',
      recordName: 'Chloe Bennett',
      recordMissingSince: 'Sept 20, 2026 (Yesterday, 18 hours ago)',
      recordLastKnownLocation: 'Oakview Middle School perimeter',
      recordImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
      recordAge: 15,
      recordHeight: '5 ft 2 in',
      facialSimilarity: 96,
      imageQuality: 'High',
      imageQualityScore: 98,
      ageSimilarity: 'Estimated 14-16 vs Record 15 (Exact Match)',
      otherAttributes: {
        clothingMatch: 'Hoodie pattern matches family missing report photo',
        temporalSpatialPlausibility: '2.2 miles from school; accessible via express city bus',
        biometricLandmarks: 'Multi-angle geometric landmark congruence: 96.8%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Confirm Potential Match',
      reviewerNotes: 'Verified 95% AI confidence score with clear facial match, matching tie-dye hoodie, and immediate confirmation by mall security supervisor on site.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 12:35 PM',
      reviewTimeTaken: '1m 58s'
    },
    forwarding: {
      destinationAuthority: 'Metro Police Special Victims & Juvenile Division',
      authorityContact: 'Det. Sarah Morales (Unit J-04)',
      assignedUnit: 'Unit J-04 (Juvenile Response)',
      precinctCode: 'PCT-01-MALL',
      forwardedAt: 'Today, 12:36 PM',
      currentAuthorityStatus: 'Action in Progress',
      dispatchedOfficer: 'Det. S. Morales & Officer J. Wu',
      etaOrLastReport: 'Officers arrived on scene at 12:44 PM. Subject located safely in mall management office.',
      authorityNotes: 'Subject is safe, calm, and waiting for legal guardian arrival. Case resolution pending formal handover paperwork.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '12:30 PM', description: 'Enterprise alert from Mall Security' },
      { title: 'AI Analysis Completed', status: 'completed', time: '12:31 PM', description: 'Critical 95% biometric match triggered priority' },
      { title: 'Human Review Completed', status: 'completed', time: '12:35 PM', description: 'Rapidly verified by Elena Rostova' },
      { title: 'Authorities Notified', status: 'completed', time: '12:36 PM', description: 'Juvenile Response Unit dispatched' },
      { title: 'Action in Progress', status: 'in_progress', time: '12:44 PM', description: 'Officers on scene with subject in security office' },
      { title: 'Resolved', status: 'pending', description: 'Final guardian custody verification underway' }
    ],
    auditTrail: [
      {
        id: 'aud-501',
        timestamp: '12:30:19 PM',
        action: 'Sighting submitted',
        actor: 'Mall Security API',
        actorRole: 'Trusted Partner',
        caseId: 'FM-10419',
        details: 'High-definition 4K camera capture at arcade vestibule',
        hash: 'SHA256: 09ab...11ee'
      },
      {
        id: 'aud-502',
        timestamp: '12:35:10 PM',
        action: 'Case approved',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10419',
        details: 'High priority expedited dispatch authorized',
        hash: 'SHA256: f190...8821'
      },
      {
        id: 'aud-503',
        timestamp: '12:36:02 PM',
        action: 'Local authority notified',
        actor: 'FindMe Dispatch Gateway',
        actorRole: 'System Automation',
        caseId: 'FM-10419',
        details: 'Immediate radio dispatch sent to Unit J-04',
        hash: 'SHA256: cc81...991a'
      }
    ]
  },
  {
    id: 'FM-10418',
    sightingTime: 'Today, 11:10 AM',
    rawTimestamp: '2026-09-21T11:10:00',
    location: 'Oakridge Station, Commuter Rail Platform B',
    district: 'Eastside',
    coordinates: { lat: 40.7050, lng: -73.9600 },
    aiConfidence: 81,
    priority: 'Medium',
    status: 'Resolved',
    reportedImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Gabriel Hunt (Commuter)',
      status: 'Verified',
      channel: 'Mobile App',
      contactMasked: '+1 (555) •••-0911',
      submittedAt: 'Today, 11:10:12 AM',
      reputationScore: 95
    },
    description: 'Man matching missing veteran bulletin resting at platform bench. Conductor informed.',
    clothingDetails: 'Green field jacket, dark knit scarf, brown boots.',
    physicalAttributes: {
      approxAge: '40–45 years',
      height: '6 ft 1 in (~185 cm)',
      gender: 'Male',
      distinguishingMarks: ['Tattoo on neck right side']
    },
    aiAnalysis: {
      confidenceScore: 81,
      potentialMatchFound: true,
      matchingRecordId: 'MP-43612',
      recordName: 'Nathaniel Cross',
      recordMissingSince: 'Sept 14, 2026 (7 days ago)',
      recordLastKnownLocation: 'Oakridge Veterans Clinic',
      recordImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
      recordAge: 42,
      recordHeight: '6 ft 1 in',
      facialSimilarity: 82,
      imageQuality: 'High',
      imageQualityScore: 85,
      ageSimilarity: 'Estimated 40-45 vs Record 42 (Match)',
      otherAttributes: {
        clothingMatch: 'Field jacket and scarf identified in report',
        temporalSpatialPlausibility: '0.9 miles from clinic grounds',
        biometricLandmarks: 'Facial bone structure: 82.5%'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Confirm Potential Match',
      reviewerNotes: 'Strong facial match, confirmed veteran clinic proximity. Forwarded to Oakridge Transit Police.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 11:22 AM',
      reviewTimeTaken: '2m 30s'
    },
    forwarding: {
      destinationAuthority: 'Oakridge Transit Safety & VA Liaison Team',
      authorityContact: 'Officer H. Miller',
      assignedUnit: 'Unit TR-02',
      precinctCode: 'PCT-08-OAK',
      forwardedAt: 'Today, 11:24 AM',
      currentAuthorityStatus: 'Resolved',
      dispatchedOfficer: 'Officer H. Miller & Social Worker T. Evans',
      etaOrLastReport: 'Subject positively identified on site. Transported safely to VA Clinic for checkup.',
      authorityNotes: 'Case concluded successfully. Family notified by VA liaison. Subject in good physical health.'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '11:10 AM', description: 'Citizen alert' },
      { title: 'AI Analysis Completed', status: 'completed', time: '11:11 AM', description: 'AI match 81%' },
      { title: 'Human Review Completed', status: 'completed', time: '11:22 AM', description: 'Approved by Reviewer Rostova' },
      { title: 'Authorities Notified', status: 'completed', time: '11:24 AM', description: 'Transit Safety notified' },
      { title: 'Action in Progress', status: 'completed', time: '11:35 AM', description: 'Liaison team deployed' },
      { title: 'Resolved', status: 'completed', time: '12:15 PM', description: 'Safely escorted to clinic; case closed' }
    ],
    auditTrail: [
      {
        id: 'aud-601',
        timestamp: '11:10:12 AM',
        action: 'Sighting submitted',
        actor: 'Gabriel Hunt',
        actorRole: 'Verified Reporter',
        caseId: 'FM-10418',
        details: 'Uploaded photo with geostamp',
        hash: 'SHA256: 41ab...77cc'
      },
      {
        id: 'aud-602',
        timestamp: '11:24:00 AM',
        action: 'Local authority notified',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10418',
        details: 'Dispatched to VA Liaison',
        hash: 'SHA256: 90aa...5512'
      },
      {
        id: 'aud-603',
        timestamp: '12:15:30 PM',
        action: 'Case resolved',
        actor: 'VA Liaison Team',
        actorRole: 'Authority Partner',
        caseId: 'FM-10418',
        details: 'Confirmed safe return; closed in CAD',
        hash: 'SHA256: b341...100f'
      }
    ]
  },
  {
    id: 'FM-10415',
    sightingTime: 'Today, 9:45 AM',
    rawTimestamp: '2026-09-21T09:45:00',
    location: 'South Market District, 9th St Farmer Market',
    district: 'South Market',
    coordinates: { lat: 40.7020, lng: -74.0150 },
    aiConfidence: 42,
    priority: 'Normal',
    status: 'Rejected',
    reportedImage: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=600&q=80',
    reporter: {
      name: 'Brenda Miller (Vendor)',
      status: 'Verified',
      channel: 'Mobile App',
      contactMasked: '+1 (555) •••-5541',
      submittedAt: 'Today, 9:45:11 AM',
      reputationScore: 84
    },
    description: 'Pedestrian looked somewhat like flyer photo posted on telephone pole yesterday.',
    clothingDetails: 'Gray hoodie, sunglasses, jeans.',
    physicalAttributes: {
      approxAge: '25–30 years',
      height: '5 ft 9 in (~175 cm)',
      gender: 'Male',
      distinguishingMarks: ['None visible']
    },
    aiAnalysis: {
      confidenceScore: 42,
      potentialMatchFound: false,
      matchingRecordId: 'MP-43510',
      recordName: 'Lucas Morales',
      recordMissingSince: 'Sept 01, 2026 (20 days ago)',
      recordLastKnownLocation: 'Midtown Plaza',
      recordImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
      recordAge: 29,
      recordHeight: '5 ft 9 in',
      facialSimilarity: 41,
      imageQuality: 'Low',
      imageQualityScore: 45,
      ageSimilarity: 'Inconclusive due to heavy sunglasses and motion blur',
      otherAttributes: {
        clothingMatch: 'Common generic hoodie; no specific identifying correlations',
        temporalSpatialPlausibility: 'Distant from original notification sector',
        biometricLandmarks: 'Facial landmarks insufficient (< 45% confidence threshold)'
      },
      disclaimer: 'AI-generated results support human review and do not independently confirm identity.'
    },
    humanVerification: {
      decision: 'Reject Match',
      reviewerNotes: 'Confidence score is below operational threshold (42%). Facial features obscured by dark sunglasses, jawline structure does not correspond to MP-43510. Rejecting to prevent false dispatch.',
      reviewedBy: 'Elena Rostova',
      reviewerId: 'REV-8042',
      reviewedAt: 'Today, 10:02 AM',
      reviewTimeTaken: '1m 40s'
    },
    timeline: [
      { title: 'Sighting Submitted', status: 'completed', time: '9:45 AM', description: 'Citizen upload' },
      { title: 'AI Analysis Completed', status: 'completed', time: '9:46 AM', description: 'Low confidence (42%)' },
      { title: 'Human Review Completed', status: 'completed', time: '10:02 AM', description: 'Rejected by Reviewer Rostova: False Positive' },
      { title: 'Authorities Notified', status: 'pending', description: 'Not dispatched' },
      { title: 'Action in Progress', status: 'pending', description: 'N/A' },
      { title: 'Resolved', status: 'pending', description: 'Closed as non-match' }
    ],
    auditTrail: [
      {
        id: 'aud-701',
        timestamp: '9:45:11 AM',
        action: 'Sighting submitted',
        actor: 'Brenda Miller',
        actorRole: 'Verified Reporter',
        caseId: 'FM-10415',
        details: 'Farmer market snapshot',
        hash: 'SHA256: ee31...44a1'
      },
      {
        id: 'aud-702',
        timestamp: '10:02:18 AM',
        action: 'Human verification completed',
        actor: 'Elena Rostova (REV-8042)',
        actorRole: 'Senior Reviewer',
        caseId: 'FM-10415',
        details: 'Rejected: Negative match verification',
        hash: 'SHA256: 01cc...77fa'
      }
    ]
  }
];

export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    caseId: 'FM-10427',
    title: 'High-Confidence Match Flagged',
    message: 'New sighting at Central District (4th & Grand Ave) scored 87% match against MP-44021.',
    timestamp: '5:43 PM',
    read: false,
    type: 'high_confidence'
  },
  {
    id: 'notif-02',
    caseId: 'FM-10428',
    title: 'New Sighting Received',
    message: 'North Bay Pier 39 report submitted by verified partner security guard.',
    timestamp: '4:15 PM',
    read: false,
    type: 'new_sighting'
  },
  {
    id: 'notif-03',
    caseId: 'FM-10425',
    title: 'Authority Acknowledged Case',
    message: 'Riverfront Precinct 6 dispatched Unit 22-A to West Promenade bike path.',
    timestamp: '3:20 PM',
    read: true,
    type: 'authority_ack'
  },
  {
    id: 'notif-04',
    caseId: 'FM-10424',
    title: 'Case Status Changed',
    message: 'Transit Police Unit T-7 arrived at Gate 14 bus concourse for intercept welfare check.',
    timestamp: '2:25 PM',
    read: true,
    type: 'status_changed'
  },
  {
    id: 'notif-05',
    caseId: 'FM-10418',
    title: 'Case Resolved Successfully',
    message: 'Nathaniel Cross safely reunited with family via Oakridge Veterans Clinic liaison.',
    timestamp: '12:15 PM',
    read: true,
    type: 'resolved'
  }
];

export const INITIAL_AUDIT_LOGS: AuditEvent[] = [
  {
    id: 'aud-full-01',
    timestamp: 'Today, 5:48:02 PM',
    action: 'Local authority notified',
    actor: 'FindMe Dispatch Gateway',
    actorRole: 'System Automation',
    caseId: 'FM-10427',
    details: 'Forwarded encrypted evidentiary dossier to Central District Precinct 4 Dispatch',
    hash: 'SHA256: 8a42...901e'
  },
  {
    id: 'aud-full-02',
    timestamp: 'Today, 5:47:19 PM',
    action: 'Case approved',
    actor: 'Elena Rostova (REV-8042)',
    actorRole: 'Senior Reviewer',
    caseId: 'FM-10427',
    details: 'Review decision: Approved & Forwarded with high priority tier',
    hash: 'SHA256: 12de...88fc'
  },
  {
    id: 'aud-full-03',
    timestamp: 'Today, 5:46:10 PM',
    action: 'Human verification completed',
    actor: 'Elena Rostova (REV-8042)',
    actorRole: 'Senior Reviewer',
    caseId: 'FM-10427',
    details: 'Reviewer notes appended; confirmed biometric feature correlation with MP-44021',
    hash: 'SHA256: ee71...4401'
  },
  {
    id: 'aud-full-04',
    timestamp: 'Today, 5:44:00 PM',
    action: 'Reviewer opened case',
    actor: 'Elena Rostova (REV-8042)',
    actorRole: 'Senior Reviewer',
    caseId: 'FM-10427',
    details: 'Review lock acquired on station TERM-04',
    hash: 'SHA256: 9e12...442a'
  },
  {
    id: 'aud-full-05',
    timestamp: 'Today, 5:43:04 PM',
    action: 'AI analysis completed',
    actor: 'FindMe Biometric Vision Engine v5.1',
    actorRole: 'Automated Diagnostic',
    caseId: 'FM-10427',
    details: 'Scored against 42 active missing bulletins; match found with MP-44021 (87%)',
    hash: 'SHA256: 7b31...88fa'
  },
  {
    id: 'aud-full-06',
    timestamp: 'Today, 5:42:18 PM',
    action: 'Sighting submitted',
    actor: 'Julian Vance (CV-9184)',
    actorRole: 'Verified Reporter',
    caseId: 'FM-10427',
    details: 'High-res image uploaded from 4th & Grand Ave transit pavilion',
    hash: 'SHA256: 4f8a...c901'
  },
  {
    id: 'aud-full-07',
    timestamp: 'Today, 3:20:12 PM',
    action: 'Local authority notified',
    actor: 'FindMe Dispatch Gateway',
    actorRole: 'System Automation',
    caseId: 'FM-10425',
    details: 'Dispatched to Riverfront Park Ranger & Precinct 6',
    hash: 'SHA256: de44...09bb'
  },
  {
    id: 'aud-full-08',
    timestamp: 'Today, 2:24:30 PM',
    action: 'Case approved',
    actor: 'Elena Rostova (REV-8042)',
    actorRole: 'Senior Reviewer',
    caseId: 'FM-10424',
    details: 'Approved for priority transit intercept at Gate 14',
    hash: 'SHA256: 88cc...124e'
  },
  {
    id: 'aud-full-09',
    timestamp: 'Today, 12:15:30 PM',
    action: 'Case resolved',
    actor: 'VA Liaison Team',
    actorRole: 'Authority Partner',
    caseId: 'FM-10418',
    details: 'Subject safely returned to clinic; case closed in CAD',
    hash: 'SHA256: b341...100f'
  }
];

export const AUTHORITIES_DIRECTORY = [
  {
    name: 'Metro Emergency Dispatch — Precinct 4',
    jurisdiction: 'Central District & Downtown',
    contact: 'Dispatch Desk (Line 1): +1 (555) 019-4400',
    assignedUnits: ['Unit 14-B (Rapid Patrol)', 'Unit 12-A', 'Sgt. D. Keller']
  },
  {
    name: 'North Bay Regional Transit Police',
    jurisdiction: 'North Bay, Ferry Slips, Transit Terminals',
    contact: 'Harbor Division: +1 (555) 019-8820',
    assignedUnits: ['Unit T-7 (Station Patrol)', 'Boat Patrol 04']
  },
  {
    name: 'Riverfront Precinct 6 & Park Ranger Service',
    jurisdiction: 'Riverfront Promenade & Parks',
    contact: 'Ranger Station: +1 (555) 019-3301',
    assignedUnits: ['Unit 22-A (Bicycle Patrol)', 'Ranger K. Briggs']
  },
  {
    name: 'Juvenile & Family Protective Services Liaison',
    jurisdiction: 'City-wide Schools, Malls, Transit hubs',
    contact: 'Child Protective Hotline: +1 (555) 019-9944',
    assignedUnits: ['Unit J-04 (Juvenile Response)', 'Det. S. Morales']
  }
];
