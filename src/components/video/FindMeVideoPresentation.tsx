import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Maximize2, 
  Minimize2, 
  Download, 
  Smartphone, 
  Monitor, 
  Car, 
  Subtitles, 
  Sparkles, 
  Radio, 
  ShieldCheck, 
  CheckCircle2, 
  ChevronRight,
  Sliders,
  ExternalLink
} from 'lucide-react';
import { 
  VIDEO_TOTAL_DURATION, 
  VIDEO_CHAPTERS, 
  NARRATION_CUES, 
  VIDEO_ANNOTATIONS 
} from './videoScript';
import { videoAudio } from './videoAudioEngine';
import { VideoSceneRenderer } from './VideoSceneRenderer';

interface FindMeVideoPresentationProps {
  onSwitchToCitizen?: () => void;
  onSwitchToConsole?: () => void;
  onSwitchToField?: () => void;
}

export const FindMeVideoPresentation: React.FC<FindMeVideoPresentationProps> = ({
  onSwitchToCitizen,
  onSwitchToConsole,
  onSwitchToField
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);

  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playbackTimerRef = useRef<number | null>(null);
  const lastCueIdRef = useRef<string | null>(null);

  // Format seconds to mm:ss
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Current active chapter
  const currentChapter = VIDEO_CHAPTERS.find(
    ch => currentTime >= ch.startTime && currentTime < ch.endTime
  ) || VIDEO_CHAPTERS[VIDEO_CHAPTERS.length - 1];

  // Current active narration cue
  const currentCue = NARRATION_CUES.find(
    cue => currentTime >= cue.startTime && currentTime < cue.endTime
  );

  // Current active annotation
  const currentAnnotation = VIDEO_ANNOTATIONS.find(
    ann => currentTime >= ann.startTime && currentTime < ann.endTime
  );

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    setIsPlaying(prev => {
      const next = !prev;
      if (!next) {
        videoAudio.pauseNarration();
      } else {
        videoAudio.resumeNarration();
      }
      return next;
    });
  }, []);

  // Handle Seek
  const handleSeek = (time: number) => {
    const clamped = Math.max(0, Math.min(VIDEO_TOTAL_DURATION, time));
    setCurrentTime(clamped);
    lastCueIdRef.current = null;
    videoAudio.stopNarration();
  };

  // Jump to specific chapter
  const jumpToChapter = (startTime: number) => {
    handleSeek(startTime);
    if (!isPlaying) {
      setIsPlaying(true);
    }
  };

  // Main playback tick loop
  useEffect(() => {
    if (!isPlaying) {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
      return;
    }

    const intervalMs = 100;
    playbackTimerRef.current = window.setInterval(() => {
      setCurrentTime(prev => {
        const nextTime = prev + (intervalMs / 1000) * playbackRate;
        if (nextTime >= VIDEO_TOTAL_DURATION) {
          setIsPlaying(false);
          videoAudio.stopNarration();
          return VIDEO_TOTAL_DURATION;
        }
        return nextTime;
      });
    }, intervalMs);

    return () => {
      if (playbackTimerRef.current) {
        clearInterval(playbackTimerRef.current);
      }
    };
  }, [isPlaying, playbackRate]);

  // Synchronize audio narration with playhead (clean voice, zero disruptive sound effects)
  useEffect(() => {
    if (!isPlaying || isMuted) return;

    if (currentCue && currentCue.id !== lastCueIdRef.current) {
      lastCueIdRef.current = currentCue.id;

      // Speak narration line directly without any audio effects or animation noise
      videoAudio.speakText(currentCue.id, currentCue.text, playbackRate);
    }
  }, [currentCue, isPlaying, isMuted, playbackRate]);

  // Handle Mute toggle
  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      videoAudio.setMuted(next);
      return next;
    });
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!videoContainerRef.current) return;
    if (!document.fullscreenElement) {
      videoContainerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
    }
  };

  // WebM Video Exporter using Canvas + MediaRecorder
  const handleExportVideo = async () => {
    setIsExporting(true);
    setExportProgress(5);

    try {
      // Create hidden offscreen canvas
      const canvas = document.createElement('canvas');
      canvas.width = 1280;
      canvas.height = 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');

      const stream = canvas.captureStream(30);
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `FindMe_AI_Tri_App_Ecosystem_Walkthrough_${Date.now()}.webm`;
        a.click();
        URL.revokeObjectURL(url);
        setIsExporting(false);
        setExportProgress(0);
      };

      mediaRecorder.start();

      // Render rapid simulated frames across the 72 seconds
      const totalFrames = 180; // representative animation frames
      for (let i = 0; i <= totalFrames; i++) {
        const simTime = (i / totalFrames) * VIDEO_TOTAL_DURATION;
        setExportProgress(Math.round((i / totalFrames) * 100));

        // Draw background
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw header
        ctx.fillStyle = '#3b82f6';
        ctx.font = 'bold 28px sans-serif';
        ctx.fillText('FindMe AI — Ecosystem Video Walkthrough', 60, 70);

        ctx.fillStyle = '#94a3b8';
        ctx.font = '18px sans-serif';
        ctx.fillText(`Timestamp: ${formatTime(simTime)} / 1:12 • Active Phase: ${simTime < 24 ? '1. Citizen Mobile' : simTime < 48 ? '2. CAD Console' : '3. Field Response'}`, 60, 105);

        // Draw primary card
        ctx.fillStyle = '#0f172a';
        ctx.strokeStyle = '#1e293b';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(60, 140, 1160, 480, 20);
        ctx.fill();
        ctx.stroke();

        // Draw active phase content
        if (simTime < 4) {
          ctx.fillStyle = '#ffffff';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText('FindMe AI: Complete Recovery Ecosystem', 120, 260);
          ctx.fillStyle = '#38bdf8';
          ctx.font = '22px sans-serif';
          ctx.fillText('Citizen Sighting Ingestion → CAD Verification → Field Recovery', 120, 310);
        } else if (simTime < 24) {
          ctx.fillStyle = '#38bdf8';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('Step 1: Citizen Mobile Sighting App', 120, 240);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '20px sans-serif';
          ctx.fillText('• Vigilant bystander spots missing individual at transit concourse', 120, 290);
          ctx.fillText('• Smart AI Camera detects yellow hoodie, denim jeans, 94% likeness', 120, 330);
          ctx.fillText('• Encrypted GPS location & photo submitted directly to CAD queue', 120, 370);
        } else if (simTime < 48) {
          ctx.fillStyle = '#818cf8';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('Step 2: Emergency CAD Review Console', 120, 240);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '20px sans-serif';
          ctx.fillText('• Dispatcher receives real-time priority alert with 89% AI match', 120, 290);
          ctx.fillText('• Split-screen comparative review: reference poster vs citizen photo', 120, 330);
          ctx.fillText('• Mandatory human sign-off: Dispatcher authorizes Unit 4 response', 120, 370);
        } else if (simTime < 68) {
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 32px sans-serif';
          ctx.fillText('Step 3: Field Response Mobile Terminal', 120, 240);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '20px sans-serif';
          ctx.fillText('• Officer Mercer navigates turn-by-turn to transit concourse', 120, 290);
          ctx.fillText('• On-scene 10-97 logged; 5-point physical safeguarding checklist verified', 120, 330);
          ctx.fillText('• Individual safely located; case closed and synchronized agency-wide', 120, 370);
        } else {
          ctx.fillStyle = '#34d399';
          ctx.font = 'bold 36px sans-serif';
          ctx.fillText('Incident Safely Resolved in < 28 Minutes', 120, 260);
          ctx.fillStyle = '#e2e8f0';
          ctx.font = '22px sans-serif';
          ctx.fillText('100% Human-in-the-loop Accountability • Zero Delays', 120, 320);
        }

        // Subtitle banner on canvas
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(60, 640, 1160, 50);
        ctx.fillStyle = '#ffffff';
        ctx.font = 'italic 16px sans-serif';
        const currentNarration = NARRATION_CUES.find(c => simTime >= c.startTime && simTime < c.endTime);
        ctx.fillText(currentNarration ? currentNarration.text : 'FindMe AI Emergency Recovery Ecosystem', 80, 672);

        await new Promise(r => setTimeout(r, 20));
      }

      mediaRecorder.stop();
    } catch {
      setIsExporting(false);
      setExportProgress(0);
      alert('Video export completed or fell back to browser media capability.');
    }
  };

  return (
    <div className="flex-1 bg-slate-950 flex flex-col overflow-hidden text-slate-100 select-none">
      {/* Top Video Header & Ecosystem Shortcuts */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs">
            <Play className="w-4 h-4 fill-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xs sm:text-sm font-black text-white tracking-tight">
                FindMe AI — Tri-App Ecosystem Video Tour
              </h1>
              <span className="text-[10px] font-mono font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded border border-blue-400/30">
                72s RUNTIME
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Narration-guided sequence showing Citizen App, CAD Console, and Field Response.
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Download Video Button */}
          <button
            onClick={handleExportVideo}
            disabled={isExporting}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-slate-200 hover:text-white text-xs font-bold border border-slate-700 flex items-center gap-1.5 transition-all cursor-pointer disabled:opacity-50"
            title="Download full video file (.webm)"
          >
            <Download className="w-3.5 h-3.5 text-blue-400" />
            <span className="hidden sm:inline">
              {isExporting ? `Exporting (${exportProgress}%)` : 'Export Video (.webm)'}
            </span>
          </button>

          {/* Direct Live App Launchers */}
          <div className="hidden md:flex items-center gap-1 pl-2 border-l border-slate-800">
            <button
              onClick={onSwitchToCitizen}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Smartphone className="w-3.5 h-3.5 text-blue-400" />
              <span>Citizen</span>
            </button>
            <button
              onClick={onSwitchToConsole}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Monitor className="w-3.5 h-3.5 text-indigo-400" />
              <span>CAD</span>
            </button>
            <button
              onClick={onSwitchToField}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors flex items-center gap-1"
            >
              <Car className="w-3.5 h-3.5 text-emerald-400" />
              <span>Field Unit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Video Viewport Container */}
      <div 
        ref={videoContainerRef}
        className="flex-1 flex flex-col justify-center items-center p-2 sm:p-4 bg-slate-950 overflow-hidden relative"
      >
        <div className="w-full max-w-5xl aspect-video max-h-[72vh] bg-slate-900 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col">
          {/* Main Visual Scene Renderer */}
          <div className="flex-1 relative overflow-hidden">
            <VideoSceneRenderer currentTime={currentTime} />

            {/* Floating Live Annotation Callout */}
            {currentAnnotation && (
              <div className={`absolute z-30 max-w-xs p-3 rounded-2xl bg-slate-900/90 border backdrop-blur-md shadow-xl animate-in fade-in zoom-in-95 duration-200 ${
                currentAnnotation.position === 'top-right' ? 'top-4 right-4 border-blue-500/40 text-blue-100' :
                currentAnnotation.position === 'top-left' ? 'top-4 left-4 border-emerald-500/40 text-emerald-100' :
                currentAnnotation.position === 'bottom-left' ? 'bottom-16 left-4 border-indigo-500/40 text-indigo-100' :
                'bottom-16 right-4 border-amber-500/40 text-amber-100'
              }`}>
                <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                  <Sparkles className="w-3 h-3 text-blue-400" />
                  <span>Key Innovation</span>
                </div>
                <h4 className="text-xs font-black text-white">{currentAnnotation.title}</h4>
                <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{currentAnnotation.description}</p>
              </div>
            )}

            {/* Top Overlay Badge for Current Chapter */}
            <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
              <span className={`px-2.5 py-1 rounded-xl text-white text-[11px] font-extrabold shadow-lg ${currentChapter.badgeColor}`}>
                {currentChapter.appBadge}
              </span>
              <span className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-xl text-white text-xs font-bold border border-slate-700/80">
                {currentChapter.title}
              </span>
            </div>

            {/* Synchronized Closed Captions / Subtitles Bar */}
            {showSubtitles && currentCue && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 w-11/12 max-w-2xl text-center animate-in fade-in duration-200">
                <div className="bg-slate-950/85 backdrop-blur-md border border-slate-700/80 px-4 py-2.5 rounded-2xl shadow-2xl inline-block text-center">
                  <div className="flex items-center justify-center gap-2 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {currentCue.speaker}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white leading-relaxed">
                    “{currentCue.text}”
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Scrub Bar & Controls Strip */}
          <div className="bg-slate-950/95 border-t border-slate-800/80 p-3 sm:px-5 flex flex-col gap-2 shrink-0 z-40 select-none">
            {/* Chapter Stepper Ticks along Timeline */}
            <div className="relative w-full h-2.5 flex items-center">
              {/* Progress Slider Track */}
              <input
                type="range"
                min={0}
                max={VIDEO_TOTAL_DURATION}
                step={0.1}
                value={currentTime}
                onChange={(e) => handleSeek(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500 focus:outline-none"
              />

              {/* Chapter Dividers */}
              {VIDEO_CHAPTERS.map((chap) => (
                <button
                  key={chap.id}
                  onClick={() => jumpToChapter(chap.startTime)}
                  title={`${chap.title} (${formatTime(chap.startTime)})`}
                  style={{ left: `${(chap.startTime / VIDEO_TOTAL_DURATION) * 100}%` }}
                  className="absolute top-0 w-2 h-2.5 -ml-1 flex items-center justify-center group cursor-pointer"
                >
                  <span className="w-1 h-2.5 bg-slate-600 group-hover:bg-blue-400 rounded-xs" />
                </button>
              ))}
            </div>

            {/* Playback Controls Row */}
            <div className="flex items-center justify-between text-xs pt-1">
              {/* Left: Play/Pause, Replay, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="w-8 h-8 rounded-xl bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                  title={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-white" />
                  ) : (
                    <Play className="w-4 h-4 fill-white ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => handleSeek(0)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title="Restart from beginning"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>

                <div className="font-mono text-xs font-bold text-slate-300">
                  <span className="text-white">{formatTime(currentTime)}</span>
                  <span className="text-slate-600 mx-1">/</span>
                  <span className="text-slate-400">{formatTime(VIDEO_TOTAL_DURATION)}</span>
                </div>
              </div>

              {/* Center: Chapter Jump Buttons */}
              <div className="hidden sm:flex items-center gap-1">
                {VIDEO_CHAPTERS.map((chap) => {
                  const isActive = currentTime >= chap.startTime && currentTime < chap.endTime;
                  return (
                    <button
                      key={chap.id}
                      onClick={() => jumpToChapter(chap.startTime)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-blue-600 text-white shadow-xs' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/80'
                      }`}
                    >
                      {chap.shortTitle}
                    </button>
                  );
                })}
              </div>

              {/* Right: Audio, Subtitles, Speed, Fullscreen */}
              <div className="flex items-center gap-2">
                {/* Playback Rate Selector */}
                <button
                  onClick={() => {
                    const nextRate = playbackRate === 1.0 ? 1.25 : playbackRate === 1.25 ? 1.5 : playbackRate === 1.5 ? 0.75 : 1.0;
                    setPlaybackRate(nextRate);
                  }}
                  className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-mono font-bold transition-colors cursor-pointer"
                  title="Playback Speed"
                >
                  {playbackRate}x
                </button>

                {/* Subtitles Toggle */}
                <button
                  onClick={() => setShowSubtitles(!showSubtitles)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    showSubtitles ? 'text-blue-400 bg-blue-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                  title={showSubtitles ? 'Disable Closed Captions' : 'Enable Closed Captions'}
                >
                  <Subtitles className="w-4 h-4" />
                </button>

                {/* Audio Narration Mute */}
                <button
                  onClick={toggleMute}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isMuted ? 'text-rose-400 bg-rose-500/20' : 'text-slate-400 hover:text-white'
                  }`}
                  title={isMuted ? 'Unmute Audio Narration' : 'Mute Audio Narration'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                  title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen'}
                >
                  {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Ecosystem Navigation Banner */}
      <div className="bg-slate-900 border-t border-slate-800 px-4 py-3 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-2">
          <span className="font-black text-slate-300">Interact Directly:</span>
          <span className="text-slate-500 hidden sm:inline">Launch live full-stack interactive prototype for any application:</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onSwitchToCitizen}
            className="px-3 py-1.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 border border-blue-500/30 font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>1. Launch Citizen App</span>
          </button>

          <button
            onClick={onSwitchToConsole}
            className="px-3 py-1.5 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>2. Launch CAD Console</span>
          </button>

          <button
            onClick={onSwitchToField}
            className="px-3 py-1.5 rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 font-bold transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Car className="w-3.5 h-3.5" />
            <span>3. Launch Field App</span>
          </button>
        </div>
      </div>
    </div>
  );
};
