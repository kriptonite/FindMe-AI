import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Music, 
  Subtitles, 
  Download, 
  Smartphone, 
  Monitor, 
  Car,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2
} from 'lucide-react';
import { FILM_SCENES, FILM_CUES, TOTAL_FILM_DURATION } from './filmScript';
import { cinematicAudio } from './cinematicMusicEngine';
import { CinematicSceneVisual } from './CinematicSceneVisual';
import { exportCinematicFilmMP4 } from './videoExportService';

interface FindMeCinematicFilmProps {
  onSwitchToCitizen?: () => void;
  onSwitchToConsole?: () => void;
  onSwitchToField?: () => void;
}

export const FindMeCinematicFilm: React.FC<FindMeCinematicFilmProps> = ({
  onSwitchToCitizen,
  onSwitchToConsole,
  onSwitchToField
}) => {
  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [isMusicEnabled, setIsMusicEnabled] = useState(true);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [exportStageText, setExportStageText] = useState('');

  // References
  const filmPlayerContainerRef = useRef<HTMLDivElement>(null);
  const playbackTimerRef = useRef<number | null>(null);
  const lastCueIdRef = useRef<string | null>(null);
  const lastSceneIdRef = useRef<string | null>(null);

  // Derived active scene & cue
  const activeScene = useMemo(() => {
    return FILM_SCENES.find(s => currentTime >= s.startTime && currentTime < s.endTime) || FILM_SCENES[FILM_SCENES.length - 1];
  }, [currentTime]);

  const activeCue = useMemo(() => {
    return FILM_CUES.find(c => currentTime >= c.startTime && currentTime < c.endTime) || null;
  }, [currentTime]);

  // Master clock animation loop
  useEffect(() => {
    if (isPlaying) {
      cinematicAudio.startCinematicScore();

      playbackTimerRef.current = window.setInterval(() => {
        setCurrentTime(prev => {
          const next = prev + 0.1 * playbackRate;
          if (next >= TOTAL_FILM_DURATION) {
            setIsPlaying(false);
            cinematicAudio.stop();
            return TOTAL_FILM_DURATION;
          }
          return next;
        });
      }, 100);
    } else {
      cinematicAudio.pause();
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    }

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, [isPlaying, playbackRate]);

  // Play transition chime when scene transitions to bridge audio seamlessly
  useEffect(() => {
    if (!isPlaying) return;
    if (activeScene && activeScene.id !== lastSceneIdRef.current) {
      if (lastSceneIdRef.current !== null) {
        cinematicAudio.playTransitionChime();
      }
      lastSceneIdRef.current = activeScene.id;
    }
  }, [activeScene, isPlaying]);

  // Synchronize voice narration with playhead
  useEffect(() => {
    if (!isPlaying || isMuted) return;

    if (activeCue && activeCue.id !== lastCueIdRef.current) {
      lastCueIdRef.current = activeCue.id;
      cinematicAudio.speakNarration(activeCue.id, activeCue.text, playbackRate);
    }
  }, [activeCue, isPlaying, isMuted, playbackRate]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (currentTime >= TOTAL_FILM_DURATION) {
      setCurrentTime(0);
      lastCueIdRef.current = null;
      cinematicAudio.cancelNarration();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Restart
  const handleRestart = () => {
    setCurrentTime(0);
    lastCueIdRef.current = null;
    cinematicAudio.cancelNarration();
    setIsPlaying(true);
  };

  // Handle Seek / Scrub
  const handleSeek = (newTime: number) => {
    setCurrentTime(newTime);
    lastCueIdRef.current = null;
    cinematicAudio.cancelNarration();
  };

  // Handle Mute
  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      cinematicAudio.setMuted(next);
      return next;
    });
  };

  // Handle Music Toggle
  const toggleMusic = () => {
    setIsMusicEnabled(prev => {
      const next = !prev;
      cinematicAudio.setMusicMuted(!next);
      return next;
    });
  };

  // Toggle Fullscreen
  const toggleFullscreen = () => {
    if (!filmPlayerContainerRef.current) return;

    if (!document.fullscreenElement) {
      filmPlayerContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // Trigger MP4 Export
  const handleExportMP4 = async () => {
    if (isExporting) return;
    setIsExporting(true);
    setExportProgress(5);
    setExportStageText('Initializing MP4 Video Export Engine...');
    try {
      await exportCinematicFilmMP4((p) => {
        setExportProgress(p.percent);
        setExportStageText(p.stageText);
      });
      setTimeout(() => {
        setIsExporting(false);
      }, 1200);
    } catch (err) {
      console.error('Export error:', err);
      setIsExporting(false);
    }
  };

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div 
      ref={filmPlayerContainerRef}
      className="flex-1 flex flex-col bg-slate-950 text-slate-100 overflow-y-auto relative select-none font-sans"
    >
      {/* Top Film Branding Bar */}
      <header className="px-4 sm:px-8 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between z-30 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm sm:text-base tracking-wide text-white">
                FindMe AI — Cinematic Product Film
              </span>
              <span className="text-[11px] font-mono font-bold bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2 py-0.5 rounded-full">
                16:9 WIDESCREEN • {formatTime(TOTAL_FILM_DURATION)}
              </span>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">
              "See. Report. Connect. Find." • Photorealistic Narrative Journey
            </span>
          </div>
        </div>

        {/* Live Interactive App Jumpers & MP4 Download */}
        <div className="flex items-center gap-2">
          {/* Download MP4 Button */}
          <button
            onClick={handleExportMP4}
            disabled={isExporting}
            className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20 transition-all cursor-pointer disabled:opacity-50"
            title="Download complete cinematic video as MP4 file"
          >
            {isExporting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span>{isExporting ? `Exporting (${exportProgress}%)` : `Download MP4 (${formatTime(TOTAL_FILM_DURATION)})`}</span>
          </button>

          {onSwitchToCitizen && (
            <button
              onClick={onSwitchToCitizen}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Jump to live Citizen Mobile App"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden md:inline">Citizen App</span>
            </button>
          )}

          {onSwitchToConsole && (
            <button
              onClick={onSwitchToConsole}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Jump to live CAD Review Console"
            >
              <Monitor className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden md:inline">CAD Console</span>
            </button>
          )}

          {onSwitchToField && (
            <button
              onClick={onSwitchToField}
              className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer"
              title="Jump to live Field Response App"
            >
              <Car className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden md:inline">Field Response</span>
            </button>
          )}
        </div>
      </header>

      {/* Main 16:9 Cinema Viewing Theater */}
      <div className="flex-1 flex flex-col items-center justify-center p-2 sm:p-6 min-h-[460px]">
        {/* 16:9 Aspect Ratio Constrained Screen */}
        <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] border border-slate-800/80 relative flex flex-col justify-between">
          
          {/* Active Visual Scene */}
          <div className="absolute inset-0 w-full h-full">
            <CinematicSceneVisual 
              scene={activeScene} 
              currentTime={currentTime} 
              onSwitchToConsole={onSwitchToConsole}
              onSwitchToCitizen={onSwitchToCitizen}
              onSwitchToField={onSwitchToField}
            />
          </div>

          {/* Top Status HUD in Theater */}
          <div className="relative z-30 p-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white">
                <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-red-500 animate-pulse' : 'bg-slate-500'}`} />
                {isPlaying ? 'PLAYING 16:9 CINEMATIC' : 'PAUSED'}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-blue-300 hidden sm:inline">
                {activeScene.stage} STAGE
              </span>
            </div>

            <div className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-mono text-slate-300">
              {formatTime(currentTime)} / {formatTime(TOTAL_FILM_DURATION)}
            </div>
          </div>

          {/* Subtitle Teleprompter Banner */}
          {showSubtitles && activeCue && (
            <div className="relative z-30 mb-6 mx-auto max-w-2xl px-4 pointer-events-none">
              <div className="bg-black/85 backdrop-blur-md border border-slate-700/60 rounded-xl py-2 px-4 text-center shadow-2xl animate-in fade-in duration-200">
                <p className="text-xs sm:text-sm font-medium text-slate-100 leading-relaxed">
                  "{activeCue.text}"
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Cinematic Scrub Bar & Scene Ticks */}
        <div className="w-full max-w-5xl mt-3 px-2">
          {/* Progress Timeline Bar */}
          <div 
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const pos = (e.clientX - rect.left) / rect.width;
              handleSeek(pos * TOTAL_FILM_DURATION);
            }}
            className="w-full h-3 bg-slate-800 hover:h-4 rounded-full cursor-pointer relative overflow-hidden transition-all group"
          >
            {/* Played Fill */}
            <div 
              className="h-full bg-gradient-to-r from-blue-600 via-blue-400 to-amber-400 rounded-full transition-all"
              style={{ width: `${(currentTime / TOTAL_FILM_DURATION) * 100}%` }}
            />

            {/* Scene Markers */}
            {FILM_SCENES.map((sc) => (
              <div
                key={sc.id}
                className="absolute top-0 bottom-0 w-0.5 bg-slate-950/80 z-10 pointer-events-none"
                style={{ left: `${(sc.startTime / TOTAL_FILM_DURATION) * 100}%` }}
                title={sc.title}
              />
            ))}
          </div>

          {/* Scene Chapter Buttons Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1.5 mt-2">
            {FILM_SCENES.map((sc) => {
              const isCurrent = activeScene.id === sc.id;
              return (
                <button
                  key={sc.id}
                  onClick={() => handleSeek(sc.startTime)}
                  className={`p-1.5 rounded-lg text-left transition-all cursor-pointer border ${
                    isCurrent 
                      ? 'bg-blue-600/20 border-blue-500 text-white' 
                      : 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-slate-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="font-bold truncate">{sc.stage}</span>
                    <span className="opacity-70">{formatTime(sc.startTime)}</span>
                  </div>
                  <div className="text-[11px] font-medium truncate mt-0.5">
                    {sc.title.split('—')[1]?.trim() || sc.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Master Playback Controls Strip */}
        <div className="w-full max-w-5xl mt-3 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs">
          {/* Left: Play/Pause/Restart */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold flex items-center gap-1.5 shadow-lg shadow-blue-500/20 transition-all cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              <span>{isPlaying ? 'Pause Film' : 'Play Film'}</span>
            </button>

            <button
              onClick={handleRestart}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title="Restart from beginning"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <div className="h-5 w-px bg-slate-800 mx-1" />

            {/* Speed Selector */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 font-mono">
              {[1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPlaybackRate(rate)}
                  className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                    playbackRate === rate ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>

          {/* Center: Stage Indicator */}
          <div className="hidden lg:flex items-center gap-2 text-slate-300 font-mono text-[11px]">
            <span className="text-amber-400 font-bold">ACTIVE:</span>
            <span className="text-white font-semibold">{activeScene.title}</span>
          </div>

          {/* Right: Audio, Subtitles, Fullscreen, Export */}
          <div className="flex items-center gap-2">
            {/* Music On/Off Toggle */}
            <button
              onClick={toggleMusic}
              className={`p-2 rounded-xl border transition-all cursor-pointer flex items-center gap-1 text-xs font-semibold ${
                isMusicEnabled 
                  ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' 
                  : 'bg-slate-800 border-slate-700 text-slate-500'
              }`}
              title={isMusicEnabled ? 'Mute Background Music' : 'Enable Background Music'}
            >
              <Music className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Score</span>
            </button>

            {/* Voice Mute Toggle */}
            <button
              onClick={toggleMute}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={`p-2 rounded-xl transition-all cursor-pointer ${
                showSubtitles ? 'bg-blue-600/20 text-blue-400 border border-blue-500/40' : 'bg-slate-800 text-slate-500'
              }`}
              title="Toggle Subtitles"
            >
              <Subtitles className="w-4 h-4" />
            </button>

            {/* Quick Download Button in player toolbar */}
            <button
              onClick={handleExportMP4}
              disabled={isExporting}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all cursor-pointer disabled:opacity-50"
              title="Download MP4 Video"
            >
              {isExporting ? <Loader2 className="w-4 h-4 animate-spin text-blue-400" /> : <Download className="w-4 h-4 text-blue-400" />}
            </button>

            {/* Fullscreen Toggle */}
            <button
              onClick={toggleFullscreen}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* MP4 Video Export Progress Modal */}
      {isExporting && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-blue-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400">
              <Download className="w-8 h-8 animate-bounce" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Rendering MP4 Video</h3>
              <p className="text-xs text-slate-400 mt-1">
                Compiling 1m 58s photorealistic widescreen film with full audio and visual workflows...
              </p>
            </div>
            
            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 rounded-full transition-all duration-200"
                  style={{ width: `${exportProgress}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span className="truncate max-w-[280px]">{exportStageText || 'Rendering frames...'}</span>
                <span className="font-bold text-white">{exportProgress}%</span>
              </div>
            </div>
            
            <p className="text-[11px] text-slate-500 leading-normal">
              Your browser will automatically download <span className="text-slate-300 font-mono font-semibold">FindMe_AI_Cinematic_Film_1m58s.mp4</span> when processing completes.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
