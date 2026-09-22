/**
 * Web Audio Sound Effects Synthesizer & Speech Synthesis Narration Engine
 */

class VideoAudioEngine {
  private audioCtx: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 0.85;
  private isSpeechSupported: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private lastPlayedCueId: string | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSpeechSupported = 'speechSynthesis' in window;
      if (this.isSpeechSupported) {
        this.initVoice();
        window.speechSynthesis.onvoiceschanged = () => {
          this.initVoice();
        };
      }
    }
  }

  private initVoice() {
    if (typeof window === 'undefined' || !this.isSpeechSupported) return;
    const voices = window.speechSynthesis.getVoices();
    // Prefer natural English voices
    const preferredVoice = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Karen')) && v.lang.startsWith('en')
    ) || voices.find(v => v.lang.startsWith('en')) || voices[0];

    if (preferredVoice) {
      this.selectedVoice = preferredVoice;
    }
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (muted && this.isSpeechSupported) {
      window.speechSynthesis.cancel();
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
  }

  public speakText(cueId: string, text: string, playbackRate: number = 1.0) {
    if (this.isMuted || !this.isSpeechSupported) return;
    if (this.lastPlayedCueId === cueId) return;

    this.lastPlayedCueId = cueId;

    try {
      window.speechSynthesis.cancel(); // Stop any pending utterance to prevent overlap
      const utterance = new SpeechSynthesisUtterance(text);
      if (this.selectedVoice) {
        utterance.voice = this.selectedVoice;
      }
      utterance.rate = 1.0 * playbackRate; // natural clear speech pace
      utterance.pitch = 1.0;
      utterance.volume = this.volume;

      this.currentUtterance = utterance;
      window.speechSynthesis.speak(utterance);
    } catch {
      // Speech synthesis error handled gracefully
    }
  }

  public pauseNarration() {
    if (this.isSpeechSupported) {
      try {
        window.speechSynthesis.pause();
      } catch {}
    }
  }

  public resumeNarration() {
    if (this.isSpeechSupported) {
      try {
        window.speechSynthesis.resume();
      } catch {}
    }
  }

  public stopNarration() {
    this.lastPlayedCueId = null;
    if (this.isSpeechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  /**
   * Sound effects are completely disabled to ensure 100% clean, unobstructed narration
   */
  public playSoundEffect(_type: 'cad_chime' | 'camera_shutter' | 'radio_squelch' | 'dispatch_alert' | 'success_chime') {
    // Disabled to prevent animation noise from disrupting the voice narration
    return;
  }
}

export const videoAudio = new VideoAudioEngine();
