import { FilmScene, FilmNarrationCue } from './types';

// Image assets generated for the cinematic film
export const FILM_ASSETS = {
  scene1_woman_street: '/src/assets/images/scene1_woman_street_1790022912459.jpg',
  scene3_reviewer_cad: '/src/assets/images/scene3_reviewer_cad_1790022926076.jpg',
  scene4_field_unit: '/src/assets/images/scene4_field_unit_1790022937378.jpg',
  scene5_child_safe: '/src/assets/images/scene5_child_safe_1790022952940.jpg',
  scene6_woman_relief: '/src/assets/images/scene6_woman_relief_1790022963526.jpg',
};

// Total film duration: Exactly 1 minute 58 seconds (118 seconds) - never exceeds 119 seconds
export const TOTAL_FILM_DURATION = 118;

export const FILM_SCENES: FilmScene[] = [
  {
    id: 'prologue',
    stage: 'DATA',
    title: 'THE PROBLEM & THE SOLUTION',
    subtitle: 'Global missing persons crisis • Verified statistics • Introducing FindMe AI',
    startTime: 0,
    endTime: 18,
    imageSrc: FILM_ASSETS.scene1_woman_street,
    cameraMovement: 'Cinematic wide of busy modern city street with pedestrians and traffic. Cuts to 8-year-old child sitting alone near transit sidewalk. Dynamic statistical data cards appear sequentially highlighting verified figures from India, the United States, and the United Kingdom, leading into the core challenge and official FindMe AI solution.',
    visualDescription: 'Busy city street with an unaccompanied 8-year-old child. Visual data displays highlight verified global statistics: India (91,296 children reported missing, 48,800 untraced in 2023), United States (498,038 records in FBI NCIC, 21,487 child cases in 2025), and United Kingdom (304,674 missing incidents, 196,645 child incidents in 2023–24). Transitions to the central challenge: turning sightings into timely, coordinated action, followed by FindMe AI and its three connected pillars.',
    screenTransition: 'cross_dissolve',
    onScreenText: [
      'The challenge of missing persons is global',
      'India (NCRB 2023): 91,296 children reported missing • 48,800 untraced',
      'United States (FBI 2025): 498,038 NCIC missing records • 21,487 child cases',
      'United Kingdom (2023–24): 304,674 police missing incidents • 196,645 child cases',
      'The challenge: turning a potential sighting into timely, coordinated action',
      'FindMe AI: Citizens • Human Reviewers • Field Response'
    ],
    voiceText: 'Every year, thousands of people are reported missing. The critical challenge is turning a potential sighting into timely, coordinated action. FindMe AI bridges this gap, connecting citizens, human reviewers and field response teams through one intelligent workflow.'
  },
  {
    id: 'scene-1',
    stage: 'DATA',
    title: 'SCENE 1 — CITIZEN APP | DATA',
    subtitle: 'Woman notices child • Sequential navigation of the Citizen App',
    startTime: 18,
    endTime: 44,
    imageSrc: FILM_ASSETS.scene1_woman_street,
    cameraMovement: 'Camera physically zooms into the smartphone in woman’s hand, transitioning seamlessly into the ACTUAL CITIZEN APP interface. Visible finger taps trigger each sequential screen. Camera zooms back into the real-world street.',
    visualDescription: 'Woman notices the lost child and takes out her smartphone. Camera pushes into phone screen entering the ACTUAL CITIZEN APP. Real sequential navigation: Login → OTP Verification → Home → Report a Sighting → Smart Camera Viewfinder → Capture Photo → Location Automatically Tagged → Details Added → Review Report → Submit Sighting. Displays "Sighting Submitted — FM-10427". Camera zooms back out to street.',
    screenTransition: 'push_in',
    onScreenText: [
      'SCENE 1 — CITIZEN APP',
      'Secure Authentication & Auto-Location',
      'Capture Photo • Add Details • Review Report',
      'Sighting Submitted to CAD'
    ],
    voiceText: 'The Citizen App allows a verified citizen to securely report a sighting. The user authenticates, captures a photograph, automatically shares the location and time, adds relevant details and submits the report.'
  },
  {
    id: 'scene-2',
    stage: 'INSIGHT',
    title: 'SCENE 2 — CAD CONSOLE | INSIGHT',
    subtitle: 'Reviewer workstation • Sequential navigation of the CAD Console',
    startTime: 44,
    endTime: 72,
    imageSrc: FILM_ASSETS.scene3_reviewer_cad,
    cameraMovement: 'Cut to human reviewer workstation. Camera pushes into monitor and transitions into THE ACTUAL CAD CONSOLE interface. Cursor navigates through triage workflow, reviews evidence, verifies match, and clicks Approve & Forward. Displays Local Authority Notified. Camera pulls back to workstation.',
    visualDescription: 'Reviewer at public safety workstation. Camera enters monitor showing THE ACTUAL CAD CONSOLE. Real sequential navigation: Dashboard → New Sightings → Open Report → AI Analysis → Potential Match (clearly displaying "87% Potential Match" and "Human Verification Required") → Evidence Review (Citizen Sighting vs Official Missing Record) → Human Verification Note → Approve & Forward to Authorities. Camera pulls back to workstation.',
    screenTransition: 'screen_fill',
    onScreenText: [
      'SCENE 2 — CAD CONSOLE',
      'Centralized View of New Sightings',
      'Potential Match',
      'Human Verification Required',
      'Approve & Forward to Authorities'
    ],
    voiceText: 'The CAD Console gives authorized human reviewers a centralized view of new sightings. AI analyzes the submitted image against authorized records and surfaces potential matches for human verification. The reviewer examines the evidence and, when appropriate, approves the sighting and forwards it to the relevant authority.'
  },
  {
    id: 'scene-3',
    stage: 'NARRATIVE',
    title: 'SCENE 3 — FIELD RESPONSE | NARRATIVE',
    subtitle: 'Mobile responder terminal • Sequential navigation of Field Response',
    startTime: 72,
    endTime: 94,
    imageSrc: FILM_ASSETS.scene4_field_unit,
    cameraMovement: 'Responder receives dispatch alert. Camera pushes into rugged smartphone terminal entering ACTUAL FIELD RESPONSE application. Sequential workflow advances. Tactical GPS navigation activates. Camera pulls out into response vehicle.',
    visualDescription: 'Field responders in patrol vehicle receive priority dispatch. Camera pushes into terminal entering the ACTUAL FIELD RESPONSE app. Real sequential navigation: New Assignment → Case Details → Location → Accept Case → Start Navigation → Action in Progress → Arrived on Scene → Person Located → Resolution. Camera pulls back to response vehicle accelerating toward the scene.',
    screenTransition: 'zoom_out',
    onScreenText: [
      'SCENE 3 — FIELD RESPONSE',
      'New Assignment → Case Details → Location',
      'Accept Case → Start Navigation',
      'Action in Progress → Real-Time Updates'
    ],
    voiceText: 'The Field Response application puts the approved case directly in the hands of the response team. They can view the location, accept the assignment, navigate to the sighting and update the response status in real time.'
  },
  {
    id: 'scene-4',
    stage: 'ACTION',
    title: 'SCENE 4 — ACTION | RESPONSE',
    subtitle: 'Response team safely reaching location • Finding & reassuring child',
    startTime: 94,
    endTime: 105,
    imageSrc: FILM_ASSETS.scene5_child_safe,
    cameraMovement: 'Tracking shot of vehicle arriving at transit plaza. Steady camera approaches child safely at eye level on sidewalk. Responders calmly reassure child and initiate safeguarding protocols.',
    visualDescription: 'Responders arrive at the transit plaza, safely and calmly approaching the child at eye level. Kneeling down, they speak gently, provide a warm jacket, and initiate safeguarding and identity verification protocols. The child feels safe and protected.',
    screenTransition: 'cross_dissolve',
    onScreenText: [
      'SCENE 4 — ACTION & REASSURANCE',
      'Responders Safely on Scene',
      'Approaching at Eye-Level • Safeguarding Active',
      'Connected Response in Action'
    ],
    voiceText: 'From a citizen\'s first observation to human verification and coordinated field response, FindMe AI turns a single sighting into a connected response.'
  },
  {
    id: 'scene-5',
    stage: 'CLOSE_LOOP',
    title: 'SCENE 5 — CLOSE THE LOOP & BRAND FINALE',
    subtitle: 'Citizen kept informed as response progresses • Official brand outro',
    startTime: 105,
    endTime: 118,
    imageSrc: FILM_ASSETS.scene6_woman_relief,
    cameraMovement: 'Camera returns to woman on street. Pushes into smartphone showing actual Citizen App notification center with live status updates. Pulls back to woman’s relieved expression. Fades to cinematic brand outro with official FindMe AI logo.',
    visualDescription: 'Return to the observant woman on the street. Her smartphone updates in real time: "Authorities Have Been Notified" → "Response in Progress" → "Person Located — Safe & Reunited". A deep sense of relief washes over her. Fades to the official FindMe AI logo with the signature tagline: "See. Report. Connect. Find."',
    screenTransition: 'screen_fill',
    onScreenText: [
      'SCENE 5 — CLOSE THE LOOP',
      'Citizen Kept Informed in Real Time',
      'Person Located — Safe & Reunited',
      'FindMe AI — See. Report. Connect. Find.'
    ],
    voiceText: 'And the citizen is kept informed as the response progresses. FindMe AI — See. Report. Connect. Find.'
  }
];

export const FILM_CUES: FilmNarrationCue[] = [
  {
    id: 'cue-0a',
    startTime: 0.5,
    endTime: 9.0,
    sceneId: 'prologue',
    text: 'Every year, thousands of people are reported missing. The critical challenge is turning a potential sighting into timely, coordinated action.',
    subtitles: 'Every year, thousands of people are reported missing. The critical challenge is turning a potential sighting into timely, coordinated action.'
  },
  {
    id: 'cue-0b',
    startTime: 9.5,
    endTime: 17.5,
    sceneId: 'prologue',
    text: 'FindMe AI bridges this gap, connecting citizens, human reviewers and field response teams through one intelligent workflow.',
    subtitles: 'FindMe AI bridges this gap, connecting citizens, human reviewers and field response teams through one intelligent workflow.'
  },
  {
    id: 'cue-1',
    startTime: 18.5,
    endTime: 38.0,
    sceneId: 'scene-1',
    text: 'The Citizen App allows a verified citizen to securely report a sighting. The user authenticates, captures a photograph, automatically shares the location and time, adds relevant details and submits the report.',
    subtitles: 'The Citizen App allows a verified citizen to securely report a sighting. The user authenticates, captures a photograph, automatically shares the location and time, adds relevant details and submits the report.'
  },
  {
    id: 'cue-2',
    startTime: 44.5,
    endTime: 67.5,
    sceneId: 'scene-2',
    text: 'The CAD Console gives authorized human reviewers a centralized view of new sightings. AI analyzes the submitted image against authorized records and surfaces potential matches for human verification. The reviewer examines the evidence and, when appropriate, approves the sighting and forwards it to the relevant authority.',
    subtitles: 'The CAD Console gives authorized human reviewers a centralized view of new sightings. AI analyzes the submitted image against authorized records and surfaces potential matches for human verification. The reviewer examines the evidence and, when appropriate, approves the sighting and forwards it to the relevant authority.'
  },
  {
    id: 'cue-3',
    startTime: 72.5,
    endTime: 89.5,
    sceneId: 'scene-3',
    text: 'The Field Response application puts the approved case directly in the hands of the response team. They can view the location, accept the assignment, navigate to the sighting and update the response status in real time.',
    subtitles: 'The Field Response application puts the approved case directly in the hands of the response team. They can view the location, accept the assignment, navigate to the sighting and update the response status in real time.'
  },
  {
    id: 'cue-4',
    startTime: 94.5,
    endTime: 104.5,
    sceneId: 'scene-4',
    text: 'From a citizen\'s first observation to human verification and coordinated field response, FindMe AI turns a single sighting into a connected response.',
    subtitles: 'From a citizen\'s first observation to human verification and coordinated field response, FindMe AI turns a single sighting into a connected response.'
  },
  {
    id: 'cue-5a',
    startTime: 105.5,
    endTime: 111.5,
    sceneId: 'scene-5',
    text: 'And the citizen is kept informed as the response progresses.',
    subtitles: 'And the citizen is kept informed as the response progresses.'
  },
  {
    id: 'cue-5b',
    startTime: 112.0,
    endTime: 118.0,
    sceneId: 'scene-5',
    text: 'FindMe AI — See. Report. Connect. Find.',
    subtitles: 'FindMe AI — See. Report. Connect. Find.'
  }
];

