#!/usr/bin/env python3
import os
import subprocess
import json

def run_cmd(cmd):
    print(f">> Running: {cmd}")
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Error output:\n{res.stderr}")
        raise RuntimeError(f"Command failed: {cmd}\n{res.stderr}")
    return res.stdout

def main():
    os.makedirs("public/videos", exist_ok=True)
    os.makedirs("/tmp/film_build", exist_ok=True)
    
    font_bold = "/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf"
    font_reg = "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf"
    if not os.path.exists(font_reg):
        font_reg = font_bold

    cues = [
        {
            "id": "cue_0a",
            "start": 0.5,
            "end": 9.0,
            "text": "Every year, thousands of people are reported missing. The critical challenge is turning a potential sighting into timely, coordinated action."
        },
        {
            "id": "cue_0b",
            "start": 9.5,
            "end": 17.5,
            "text": "FindMe AI bridges this gap, connecting citizens, human reviewers and field response teams through one intelligent workflow."
        },
        {
            "id": "cue_1",
            "start": 18.5,
            "end": 43.0,
            "text": "A concerned citizen spots an unaccompanied child near a transit concourse. Opening the FindMe mobile app, she captures a clear photo. On-device vision validates image clarity and immediately packages the report with high-precision GPS coordinates."
        },
        {
            "id": "cue_2",
            "start": 44.5,
            "end": 70.0,
            "text": "At the Computer-Aided Dispatch center, human reviewers supervise an AI-prioritized queue. In milliseconds, the matching engine correlates facial biometric vectors, returning an active Amber Alert profile with ninety-eight point four percent confidence."
        },
        {
            "id": "cue_3",
            "start": 72.5,
            "end": 92.5,
            "text": "With human supervisor authorization, an encrypted dispatch alert routes directly to the nearest mobile patrol unit. The in-vehicle terminal renders turn-by-turn routing and real-time situational notes."
        },
        {
            "id": "cue_4",
            "start": 94.5,
            "end": 104.0,
            "text": "Officers arrive on scene within minutes. Following non-intrusive child safeguarding protocols, the team approaches calmly and confirms the child's identity."
        },
        {
            "id": "cue_5",
            "start": 106.0,
            "end": 117.0,
            "text": "The loop is closed. The citizen receives confirmation of safe resolution. FindMe AI: See. Report. Connect. Find."
        }
    ]

    # Generate subtitles files (.srt & .vtt)
    srt_lines = []
    vtt_lines = ["WEBVTT\n"]
    for i, cue in enumerate(cues, start=1):
        s_m, s_s = divmod(cue["start"], 60)
        s_h, s_m = divmod(s_m, 60)
        e_m, e_s = divmod(cue["end"], 60)
        e_h, e_m = divmod(e_m, 60)

        s_ms = int((s_s - int(s_s)) * 1000)
        e_ms = int((e_s - int(e_s)) * 1000)

        srt_start = f"{int(s_h):02d}:{int(s_m):02d}:{int(s_s):02d},{s_ms:03d}"
        srt_end = f"{int(e_h):02d}:{int(e_m):02d}:{int(e_s):02d},{e_ms:03d}"

        vtt_start = f"{int(s_h):02d}:{int(s_m):02d}:{int(s_s):02d}.{s_ms:03d}"
        vtt_end = f"{int(e_h):02d}:{int(e_m):02d}:{int(e_s):02d}.{e_ms:03d}"

        srt_lines.append(f"{i}\n{srt_start} --> {srt_end}\n{cue['text']}\n")
        vtt_lines.append(f"{i}\n{vtt_start} --> {vtt_end}\n{cue['text']}\n")

    with open("public/videos/FindMe_AI_Cinematic_Film_1m58s.srt", "w") as f:
        f.write("\n".join(srt_lines))
    with open("public/videos/FindMe_AI_Cinematic_Film_1m58s.vtt", "w") as f:
        f.write("\n".join(vtt_lines))
    print(">> Generated Subtitle Files (.srt and .vtt)")

    # 1. Synthesize audio cues
    cue_audio_files = []
    for cue in cues:
        wav_path = f"/tmp/film_build/{cue['id']}.wav"
        escaped_text = cue['text'].replace("'", "").replace('"', '').replace(":", " ")
        # Render audio using flite
        cmd = f"ffmpeg -y -f lavfi -i \"flite=text='{escaped_text}':voice=slt\" -af \"volume=1.8\" -ar 44100 -ac 2 {wav_path}"
        run_cmd(cmd)
        cue_audio_files.append((wav_path, cue['start']))
    
    print(">> Synthesized all voice cues.")

    # 2. Build full audio track (ambient music bed + voice cues with delays)
    # Music bed: C2 drone (65.4 Hz) + G2 fifth (98 Hz) with soft lowpass and slow modulation
    music_cmd = (
        "ffmpeg -y -f lavfi -i \"sine=frequency=65.4:duration=118\" "
        "-f lavfi -i \"sine=frequency=98.0:duration=118\" "
        "-filter_complex \"[0:a]volume=0.10[a0];[1:a]volume=0.06[a1];"
        "[a0][a1]amix=inputs=2:duration=first,lowpass=f=350,highpass=f=40[music]\" "
        "-map \"[music]\" -ar 44100 -ac 2 /tmp/film_build/music_bed.wav"
    )
    run_cmd(music_cmd)
    print(">> Generated ambient music bed.")

    # Mix voice cues into full 118s audio track
    # We delay each voice cue by its start time in ms
    mix_inputs = ["-i /tmp/film_build/music_bed.wav"]
    filter_delays = ["[0:a]volume=0.85[a_music]"]
    mix_ins_labels = ["[a_music]"]

    for idx, (wav_path, start_sec) in enumerate(cue_audio_files, start=1):
        mix_inputs.append(f"-i {wav_path}")
        delay_ms = int(start_sec * 1000)
        filter_delays.append(f"[{idx}:a]adelay={delay_ms}|{delay_ms},volume=2.2[v{idx}]")
        mix_ins_labels.append(f"[v{idx}]")

    all_inputs_str = " ".join(mix_inputs)
    filter_graph = ";".join(filter_delays) + f";{''.join(mix_ins_labels)}amix=inputs={len(mix_ins_labels)}:duration=first:dropout_transition=2[outa]"

    full_audio_cmd = f"ffmpeg -y {all_inputs_str} -filter_complex \"{filter_graph}\" -map \"[outa]\" -ar 44100 -ac 2 /tmp/film_build/full_soundtrack.wav"
    run_cmd(full_audio_cmd)
    print(">> Mixed full soundtrack.")

    # 3. Create video segments for each scene with slow motion zoom/pan, letterbox, and titles
    scenes = [
        {
            "id": "prologue",
            "img": "src/assets/images/scene1_woman_street_1790022912459.jpg",
            "dur": 18,
            "title": "PROLOGUE — THE PROBLEM & THE SOLUTION",
            "sub": "Global Crisis: 48,800+ Children Untraced • The Need for Instant Sighting Coordination"
        },
        {
            "id": "scene_1",
            "img": "src/assets/images/scene1_woman_street_1790022912459.jpg",
            "dur": 26,
            "title": "SCENE 1 — CITIZEN APP | DATA INGESTION",
            "sub": "Unaccompanied Minor Sighted • Mobile Upload with Instant Metadata & GPS"
        },
        {
            "id": "scene_2",
            "img": "src/assets/images/scene3_reviewer_cad_1790022926076.jpg",
            "dur": 28,
            "title": "SCENE 2 — CAD CONSOLE | PRE-SCREENING",
            "sub": "AI Biometric Correlation • Active Amber Alert Identified (98.4% Confidence)"
        },
        {
            "id": "scene_3",
            "img": "src/assets/images/scene4_field_unit_1790022937378.jpg",
            "dur": 22,
            "title": "SCENE 3 — FIELD RESPONSE | ESCALATION",
            "sub": "Human Dispatch Authorization • Real-Time Tactical Terminal & GPS Routing"
        },
        {
            "id": "scene_4",
            "img": "src/assets/images/scene5_child_safe_1790022952940.jpg",
            "dur": 11,
            "title": "SCENE 4 — SAFEKEEPING PROTOCOL | ACTION",
            "sub": "Calm Eye-Level Safeguarding Approach • Rapid Identity & Safety Verification"
        },
        {
            "id": "scene_5",
            "img": "src/assets/images/scene6_woman_relief_1790022963526.jpg",
            "dur": 13,
            "title": "SCENE 5 — CLOSING THE LOOP & OUTCOME",
            "sub": "Citizen Confirmation • Safe Family Reunification • See. Report. Connect. Find."
        }
    ]

    segment_files = []
    for s_idx, sc in enumerate(scenes):
        seg_out = f"/tmp/film_build/seg_{s_idx}.mp4"
        frames = sc["dur"] * 24
        title_esc = sc["title"].replace(":", "\\:").replace("'", "")
        sub_esc = sc["sub"].replace(":", "\\:").replace("'", "")

        # Visual pipeline:
        # Scale to 1280x720, add slow zoom, letterbox bars (44px black bars top/bottom),
        # header bar with app branding, and bottom title card.
        vf = (
            f"scale=1376:768,zoompan=z='min(zoom+0.0004,1.10)':d={frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1280x720:fps=24,"
            # Top letterbox bar
            "drawbox=x=0:y=0:w=1280:h=46:color=black:t=fill,"
            # Bottom letterbox bar
            "drawbox=x=0:y=674:w=1280:h=46:color=black:t=fill,"
            # Top header branding
            f"drawtext=fontfile={font_bold}:text='FINDME AI — SEE. REPORT. CONNECT. FIND.':fontcolor=0x38bdf8:fontsize=15:x=40:y=16,"
            f"drawtext=fontfile={font_bold}:text='16\\:9 WIDESCREEN • MASTER CUT':fontcolor=0x94a3b8:fontsize=12:x=1020:y=16,"
            # Lower third container box
            "drawbox=x=40:y=560:w=1200:h=96:color=0x090d16@0.85:t=fill,"
            "drawbox=x=40:y=560:w=1200:h=96:color=0x2563eb@0.80:t=2,"
            # Lower third stage title
            f"drawtext=fontfile={font_bold}:text='{title_esc}':fontcolor=0x60a5fa:fontsize=15:x=60:y=578,"
            # Lower third subtitle
            f"drawtext=fontfile={font_reg}:text='{sub_esc}':fontcolor=0xffffff:fontsize=14:x=60:y=612,"
            # Pin icon graphic indicator
            "drawbox=x=1200:y=580:w=18:h=18:color=0x38bdf8:t=fill,"
            # Fade in/out
            f"fade=t=in:st=0:d=0.5,fade=t=out:st={sc['dur'] - 0.5}:d=0.5"
        )

        seg_cmd = (
            f"ffmpeg -y -loop 1 -i {sc['img']} -t {sc['dur']} "
            f"-vf \"{vf}\" -c:v libx264 -preset fast -pix_fmt yuv420p -r 24 {seg_out}"
        )
        run_cmd(seg_cmd)
        segment_files.append(seg_out)
        print(f">> Rendered scene segment {s_idx + 1}/{len(scenes)}: {sc['id']}")

    # 4. Concatenate all 6 scene segments
    concat_list_file = "/tmp/film_build/concat_list.txt"
    with open(concat_list_file, "w") as f:
        for sf in segment_files:
            f.write(f"file '{sf}'\n")

    concat_video = "/tmp/film_build/video_concat.mp4"
    run_cmd(f"ffmpeg -y -f concat -safe 0 -i {concat_list_file} -c copy {concat_video}")
    print(">> Concatenated all video segments.")

    # 5. Mux video with soundtrack into final downloadable MP4 file
    out_mp4 = "public/videos/FindMe_AI_Cinematic_Film_1m58s.mp4"
    mux_cmd = (
        f"ffmpeg -y -i {concat_video} -i /tmp/film_build/full_soundtrack.wav "
        f"-c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart {out_mp4}"
    )
    run_cmd(mux_cmd)
    print(f">> Master MP4 video successfully created at: {out_mp4}")

    # Verify file
    fsize = os.path.getsize(out_mp4)
    print(f">> File size: {fsize / (1024*1024):.2f} MB")

if __name__ == "__main__":
    main()
