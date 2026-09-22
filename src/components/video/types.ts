export interface VideoChapter {
  id: string;
  title: string;
  shortTitle: string;
  appName: string;
  appBadge: string;
  badgeColor: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
}

export interface NarrationCue {
  id: string;
  startTime: number;
  endTime: number;
  speaker: string;
  text: string;
  highlightWords?: string[];
  soundEffect?: 'cad_chime' | 'camera_shutter' | 'radio_squelch' | 'dispatch_alert' | 'success_chime';
}

export interface VideoAnnotation {
  id: string;
  startTime: number;
  endTime: number;
  title: string;
  description: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center-top';
  type: 'ai' | 'security' | 'field' | 'speed';
}
