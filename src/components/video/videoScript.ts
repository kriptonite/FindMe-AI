import { VideoChapter, NarrationCue, VideoAnnotation } from './types';

export const VIDEO_TOTAL_DURATION = 72; // in seconds (Strictly under 80s)

export const VIDEO_CHAPTERS: VideoChapter[] = [
  {
    id: 'intro',
    title: 'Ecosystem Architecture Overview',
    shortTitle: 'Intro',
    appName: 'FindMe AI Platform',
    appBadge: 'Overview',
    badgeColor: 'bg-blue-600',
    startTime: 0,
    endTime: 4
  },
  {
    id: 'app1',
    title: 'App 1: Citizen Mobile Sighting App',
    shortTitle: '1. Citizen App',
    appName: 'FindMe Citizen',
    appBadge: 'App 1 of 3',
    badgeColor: 'bg-blue-500',
    startTime: 4,
    endTime: 24
  },
  {
    id: 'app2',
    title: 'App 2: Emergency CAD Review Console',
    shortTitle: '2. CAD Console',
    appName: 'Human Review Console',
    appBadge: 'App 2 of 3',
    badgeColor: 'bg-indigo-600',
    startTime: 24,
    endTime: 48
  },
  {
    id: 'app3',
    title: 'App 3: Field Response Mobile Terminal',
    shortTitle: '3. Field App',
    appName: 'Field Response (Unit 4)',
    appBadge: 'App 3 of 3',
    badgeColor: 'bg-emerald-600',
    startTime: 48,
    endTime: 68
  },
  {
    id: 'outro',
    title: 'Full Closed-Loop Recovery Completed',
    shortTitle: 'Summary',
    appName: 'Community Safety Impact',
    appBadge: 'Resolution',
    badgeColor: 'bg-emerald-500',
    startTime: 68,
    endTime: 72
  }
];

export const NARRATION_CUES: NarrationCue[] = [
  {
    id: 'cue-1',
    startTime: 0.5,
    endTime: 4.0,
    speaker: 'Dispatcher Narrator',
    text: 'Welcome to FindMe AI: the secure, three-part emergency recovery platform connecting citizens, dispatch, and field responders.',
    highlightWords: ['FindMe AI', 'three-part', 'emergency recovery']
  },
  {
    id: 'cue-2',
    startTime: 4.0,
    endTime: 10.5,
    speaker: 'Dispatcher Narrator',
    text: 'First, the Citizen Mobile App. A vigilant bystander recognizes a missing person bulletin on their phone and immediately taps Report Sighting.',
    highlightWords: ['Citizen Mobile App', 'Report Sighting']
  },
  {
    id: 'cue-3',
    startTime: 10.5,
    endTime: 17.0,
    speaker: 'Dispatcher Narrator',
    text: 'With the built-in smart camera, the citizen captures the individual. Automated on-device AI tags clothing colors, physical landmarks, and estimated age.',
    highlightWords: ['smart camera', 'automated on-device AI', 'clothing colors']
  },
  {
    id: 'cue-4',
    startTime: 17.0,
    endTime: 24.0,
    speaker: 'Dispatcher Narrator',
    text: 'The user pins the exact transit plaza location and submits. Within seconds, the encrypted sighting is ingested directly into the emergency dispatch queue.',
    highlightWords: ['transit plaza location', 'encrypted sighting', 'emergency dispatch queue']
  },
  {
    id: 'cue-5',
    startTime: 24.0,
    endTime: 31.0,
    speaker: 'Dispatcher Narrator',
    text: 'Second, central operations: the Human Review Console. Emergency dispatchers receive the real-time alert with an eighty-nine percent AI confidence match.',
    highlightWords: ['Human Review Console', 'eighty-nine percent', 'confidence match']
  },
  {
    id: 'cue-6',
    startTime: 31.0,
    endTime: 39.5,
    speaker: 'Dispatcher Narrator',
    text: 'Using split-screen visual analysis, the reviewer compares reported photos against the reference dossier, verifying facial landmarks and apparel.',
    highlightWords: ['split-screen visual analysis', 'facial landmarks', 'verifying']
  },
  {
    id: 'cue-7',
    startTime: 39.5,
    endTime: 48.0,
    speaker: 'Dispatcher Narrator',
    text: 'Human authority remains paramount: the reviewer signs off on the identification and initiates a single-click priority dispatch to the nearest patrol unit.',
    highlightWords: ['Human authority remains paramount', 'single-click priority dispatch']
  },
  {
    id: 'cue-8',
    startTime: 48.0,
    endTime: 54.5,
    speaker: 'Dispatcher Narrator',
    text: 'Third, the Field Response App. Unit Four receives the priority assignment, complete with vital dossier details and turn-by-turn tactical navigation.',
    highlightWords: ['Field Response App', 'Unit Four', 'tactical navigation']
  },
  {
    id: 'cue-9',
    startTime: 54.5,
    endTime: 61.5,
    speaker: 'Dispatcher Narrator',
    text: 'Upon reaching the transit concourse, the officer confirms on-scene arrival and completes the five-point safeguarding checklist to ensure subject safety.',
    highlightWords: ['on-scene arrival', 'five-point safeguarding checklist', 'subject safety']
  },
  {
    id: 'cue-10',
    startTime: 61.5,
    endTime: 68.0,
    speaker: 'Dispatcher Narrator',
    text: 'With the individual confirmed safe, the officer logs the Person Located resolution, instantly synchronizing CAD records across the entire agency.',
    highlightWords: ['Person Located', 'synchronizing CAD records']
  },
  {
    id: 'cue-11',
    startTime: 68.0,
    endTime: 72.0,
    speaker: 'Dispatcher Narrator',
    text: 'From citizen alert to verified safe recovery in under twenty-eight minutes. FindMe AI: faster response, verified by humans.',
    highlightWords: ['under twenty-eight minutes', 'verified by humans']
  }
];

export const VIDEO_ANNOTATIONS: VideoAnnotation[] = [
  {
    id: 'ann-1',
    startTime: 1.0,
    endTime: 4.0,
    title: 'Closed-Loop Incident Lifecycle',
    description: 'Connecting Citizen Ingestion, CAD Console, and Field Units.',
    position: 'top-right',
    type: 'speed'
  },
  {
    id: 'ann-2',
    startTime: 6.0,
    endTime: 12.0,
    title: 'Encrypted Citizen Submission',
    description: 'Privacy-first location masking & secure image transit.',
    position: 'top-left',
    type: 'security'
  },
  {
    id: 'ann-3',
    startTime: 12.0,
    endTime: 18.0,
    title: 'AI Attribute Extraction',
    description: 'Yellow hoodie, dark jeans, spatial orientation.',
    position: 'bottom-right',
    type: 'ai'
  },
  {
    id: 'ann-4',
    startTime: 25.0,
    endTime: 33.0,
    title: '89% High Confidence Match',
    description: 'Weighted multi-modal vision comparison score.',
    position: 'top-right',
    type: 'ai'
  },
  {
    id: 'ann-5',
    startTime: 34.0,
    endTime: 42.0,
    title: 'Mandatory Human Review',
    description: 'AI assists; certified dispatchers approve.',
    position: 'bottom-left',
    type: 'security'
  },
  {
    id: 'ann-6',
    startTime: 43.0,
    endTime: 47.5,
    title: 'Instant Radio CAD Dispatch',
    description: 'Automated geofenced unit assignment (Unit 4).',
    position: 'top-right',
    type: 'field'
  },
  {
    id: 'ann-7',
    startTime: 50.0,
    endTime: 56.0,
    title: 'Tactical Route & Geofence',
    description: 'Live ETA 4 min • 1.2 km transit concourse.',
    position: 'top-left',
    type: 'field'
  },
  {
    id: 'ann-8',
    startTime: 58.0,
    endTime: 65.0,
    title: 'Human Safeguarding Protocol',
    description: 'Physical identity & medical verification checklist.',
    position: 'top-right',
    type: 'security'
  },
  {
    id: 'ann-9',
    startTime: 66.0,
    endTime: 71.5,
    title: 'Resolved in 28 Minutes',
    description: 'Zero manual transcription delay across teams.',
    position: 'bottom-right',
    type: 'speed'
  }
];
