/**
 * Subtle, Emotional, Restrained Procedural Cinematic Music Engine
 * Uses Web Audio API to produce a gentle acoustic piano & warm orchestral pad atmosphere.
 * Designed specifically to remain restrained, elegant, and completely non-intrusive
 * under the clear voice narration.
 */

class CinematicMusicEngine {
  private audioCtx: AudioContext | null = null;
  private isMusicPlaying: boolean = false;
  private musicIntervalId: number | null = null;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private isMuted: boolean = false;
  private isMusicMuted: boolean = false;
  private isVoiceMuted: boolean = false;
  private volume: number = 0.85;

  // Speech synthesis
  private isSpeechSupported: boolean = false;
  private selectedVoice: SpeechSynthesisVoice | null = null;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private isSpeaking: boolean = false;
  private queuedUtterance: (() => void) | null = null;
  private lastPlayedCueId: string | null = null;

  private speechWatchdogId: number | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.isSpeechSupported = 'speechSynthesis' in window;
      if (this.isSpeechSupported) {
        this.initVoice();
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
          window.speechSynthesis.onvoiceschanged = () => this.initVoice();
        }
      }
    }
  }

  private initVoice() {
    if (!this.isSpeechSupported) return;
    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural sounding english voices
    const preferred = voices.find(v => 
      (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha') || v.name.includes('Daniel') || v.name.includes('Premium')) &&
      v.lang.startsWith('en')
    );
    this.selectedVoice = preferred || voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  private getAudioContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.audioCtx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtxClass) {
        this.audioCtx = new AudioCtxClass();
        this.masterGain = this.audioCtx.createGain();
        this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
        this.masterGain.connect(this.audioCtx.destination);

        this.musicGain = this.audioCtx.createGain();
        // Keep music at a restrained, background level (8% gain) so voice remains 100% distinct
        this.musicGain.gain.setValueAtTime(0.08, this.audioCtx.currentTime);
        this.musicGain.connect(this.masterGain);
      }
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume().catch(() => {});
    }
    return this.audioCtx;
  }

  /**
   * Play an elegant acoustic harmonic chime at scene transitions
   * Bridges audio smoothly across cuts so there is never missing audio
   */
  public playTransitionChime() {
    if (this.isMuted) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.masterGain) return;

    try {
      const now = ctx.currentTime;
      // Dual resonant frequencies (E5 659.25Hz and B5 987.77Hz) for subtle public safety clarity
      const freqs = [523.25, 659.25];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        const filter = ctx.createBiquadFilter();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1400, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.linearRampToValueAtTime(0.02, now + 0.05 + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.1);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.masterGain!);

        osc.start(now + idx * 0.05);
        osc.stop(now + 1.4);
      });
    } catch {
      // Audio fallback handled safely
    }
  }

  /**
   * Start subtle, emotional cinematic ambient music loop
   * Chords progression: Fmaj9 -> Am9 -> Dm9 -> Bbmaj7
   */
  public startCinematicScore() {
    if (this.isMusicPlaying) return;
    const ctx = this.getAudioContext();
    if (!ctx || !this.musicGain) return;

    this.isMusicPlaying = true;

    // Chord progressions with frequencies in Hz
    const chords: number[][] = [
      [174.61, 220.00, 261.63, 329.63, 392.00], // Fmaj9
      [220.00, 261.63, 329.63, 392.00, 493.88], // Am9
      [146.83, 220.00, 261.63, 349.23, 440.00], // Dm9
      [116.54, 174.61, 233.08, 293.66, 349.23]  // Bbmaj7
    ];

    let chordIdx = 0;

    const playAtmosphericChord = () => {
      if (!this.isMusicPlaying || !this.audioCtx || !this.musicGain) return;
      const now = this.audioCtx.currentTime;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Play soft warm string pad for the chord
      currentChord.forEach((freq, noteIdx) => {
        if (!this.audioCtx || !this.musicGain) return;

        // Subtly staggered soft sine & triangle oscillators
        const osc = this.audioCtx.createOscillator();
        const noteGain = this.audioCtx.createGain();
        const filter = this.audioCtx.createBiquadFilter();

        osc.type = noteIdx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, now);

        // Low-pass warm filter to remove any harshness
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(650, now);
        filter.frequency.exponentialRampToValueAtTime(850, now + 2.5);
        filter.frequency.exponentialRampToValueAtTime(600, now + 5.5);

        // Gentle swell attack (1.2s) and slow warm release (6s)
        const peakGain = 0.015 / (noteIdx + 1);
        noteGain.gain.setValueAtTime(0.0001, now);
        noteGain.gain.linearRampToValueAtTime(peakGain, now + 1.2 + noteIdx * 0.1);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, now + 5.8);

        osc.connect(filter);
        filter.connect(noteGain);
        noteGain.connect(this.musicGain);

        osc.start(now);
        osc.stop(now + 6.0);
      });
    };

    // Play immediately then loop every 5.5 seconds smoothly
    playAtmosphericChord();
    this.musicIntervalId = window.setInterval(playAtmosphericChord, 5500);
  }

  public stopCinematicScore() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  /**
   * Speak narration line clearly without any competing sound effects
   * Resilient to browser speech dropouts, garbage collection, and pause bugs.
   * If speech is actively running, queues the next cue gracefully rather than cutting off mid-syllable.
   */
  public speakNarration(cueId: string, text: string, playbackRate: number = 1.0) {
    if (this.isMuted || this.isVoiceMuted || !this.isSpeechSupported) return;
    if (this.lastPlayedCueId === cueId) return;

    this.lastPlayedCueId = cueId;

    const executeSpeak = () => {
      if (!this.isSpeechSupported) return;

      try {
        const utterance = new SpeechSynthesisUtterance(text);
        if (this.selectedVoice) {
          utterance.voice = this.selectedVoice;
        }
        utterance.rate = 1.02 * playbackRate; // crisp natural pacing
        utterance.pitch = 1.0;
        utterance.volume = this.volume;

        this.currentUtterance = utterance;
        this.isSpeaking = true;
        if (typeof window !== 'undefined') {
          (window as unknown as { __findme_active_utterance: SpeechSynthesisUtterance }).__findme_active_utterance = utterance;
        }

        utterance.onend = () => {
          this.isSpeaking = false;
          this.stopSpeechWatchdog();
          if (this.queuedUtterance) {
            const next = this.queuedUtterance;
            this.queuedUtterance = null;
            window.setTimeout(next, 50);
          }
        };

        utterance.onerror = () => {
          this.isSpeaking = false;
          this.stopSpeechWatchdog();
          if (this.queuedUtterance) {
            const next = this.queuedUtterance;
            this.queuedUtterance = null;
            window.setTimeout(next, 50);
          }
        };

        this.startSpeechWatchdog();
        window.speechSynthesis.speak(utterance);
      } catch {
        this.isSpeaking = false;
      }
    };

    try {
      // If currently speaking a sentence, queue smoothly instead of clipping mid-word
      if (typeof window !== 'undefined' && window.speechSynthesis.speaking && this.isSpeaking) {
        this.queuedUtterance = executeSpeak;
        // Safety timeout so queue never stalls if onend fails to fire
        window.setTimeout(() => {
          if (this.queuedUtterance === executeSpeak) {
            this.queuedUtterance = null;
            try {
              window.speechSynthesis.cancel();
              executeSpeak();
            } catch {}
          }
        }, 3200);
      } else {
        this.queuedUtterance = null;
        window.speechSynthesis.cancel();
        window.setTimeout(executeSpeak, 40);
      }
    } catch {
      // Graceful fallback
    }
  }

  /**
   * Immediately cancel any running or queued voice narration
   * Used on seeking, scrubbing, or restarting
   */
  public cancelNarration() {
    this.queuedUtterance = null;
    this.isSpeaking = false;
    this.lastPlayedCueId = null;
    this.stopSpeechWatchdog();
    if (this.isSpeechSupported && typeof window !== 'undefined') {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  private startSpeechWatchdog() {
    this.stopSpeechWatchdog();
    if (typeof window === 'undefined' || !this.isSpeechSupported) return;

    // Periodic watchdog to unpause Chromium SpeechSynthesis if paused silently
    this.speechWatchdogId = window.setInterval(() => {
      try {
        if (window.speechSynthesis.speaking) {
          window.speechSynthesis.resume();
        } else {
          this.stopSpeechWatchdog();
        }
      } catch {
        this.stopSpeechWatchdog();
      }
    }, 1500);
  }

  private stopSpeechWatchdog() {
    if (this.speechWatchdogId) {
      clearInterval(this.speechWatchdogId);
      this.speechWatchdogId = null;
    }
  }

  public pause() {
    this.stopCinematicScore();
    this.stopSpeechWatchdog();
    this.queuedUtterance = null;
    if (this.isSpeechSupported) {
      try {
        window.speechSynthesis.pause();
      } catch {}
    }
  }

  public resume(cueId?: string, text?: string) {
    this.startCinematicScore();
    if (this.isSpeechSupported) {
      try {
        window.speechSynthesis.resume();
      } catch {}
    }
  }

  public stop() {
    this.stopCinematicScore();
    this.cancelNarration();
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.audioCtx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : this.volume, this.audioCtx.currentTime);
    }
    if (muted && this.isSpeechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  public setMusicMuted(muted: boolean) {
    this.isMusicMuted = muted;
    if (this.musicGain && this.audioCtx) {
      this.musicGain.gain.setValueAtTime(muted ? 0 : 0.08, this.audioCtx.currentTime);
    }
  }

  public setVoiceMuted(muted: boolean) {
    this.isVoiceMuted = muted;
    if (muted && this.isSpeechSupported) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.audioCtx && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.audioCtx.currentTime);
    }
  }
}

export const cinematicAudio = new CinematicMusicEngine();
