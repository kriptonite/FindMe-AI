export interface FilmScene {
  id: string;
  stage: 'DATA' | 'INSIGHT' | 'VISUAL' | 'NARRATIVE' | 'ACTION' | 'CLOSE_LOOP';
  title: string;
  subtitle: string;
  startTime: number;
  endTime: number;
  imageSrc?: string;
  cameraMovement: string;
  visualDescription: string;
  screenTransition?: 'push_in' | 'zoom_out' | 'screen_fill' | 'cross_dissolve';
  onScreenText?: string[];
  voiceText: string;
}

export interface FilmNarrationCue {
  id: string;
  startTime: number;
  endTime: number;
  sceneId: string;
  text: string;
  subtitles: string;
}
