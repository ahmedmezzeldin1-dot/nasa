# Implementation Plan: Realistic Lunar Exploration & Web Speech API Voice Narration

Integration of user-provided high-fidelity visual assets (`moon_bg.png` realistic lunar surface background and `player.png` Egyptian astronaut boy sprite) into the 2D educational narrative game, augmented with realistic low-gravity physics and automated browser Web Speech API voice narration in both Arabic (`ar-EG`) and English (`en-US`).

---

> [!IMPORTANT]
> **Confirmed Design Choices (from Phase 1 Clarification):**
> 1. **Automated Voice Narration**: When educational dialogues appear, the Web Speech API automatically speaks the text aloud in the active language (`ar-EG` for Egyptian Arabic, `en-US` for English), accompanied by an instant voice replay button (`🔊 Replay Voice`) and a voice mute toggle.
> 2. **Character & Comms Dynamic**: The player directly controls the young Egyptian astronaut sprite (`player.png`), while Commander Tarek provides scientific mentorship and mission control instructions over the helmet radio link.
> 3. **Realistic Scrolling Lunar Background**: Seamless horizontal tile and parallax scrolling of the high-resolution lunar photo (`moon_bg.png`) with realistic crater terrain and distant Earth view.

---

## 1. Overview & Core Concept

- **Visual Fidelity**: Replace procedural lunar ground and player vectors with the authentic photographic lunar background (`moon_bg.png`) and the high-resolution illustrated Egyptian boy astronaut sprite (`player.png`), styled with clean canvas composition, landing shadows, and regolith dust kicks.
- **Realistic Lunar Physics**:
  - Exact lunar gravity ($g = 1.62\,\text{m/s}^2$, approximately $1/6\text{th}$ of Earth's $9.81\,\text{m/s}^2$).
  - Floaty high jumps with acceleration damping, input buffering, and smooth horizontal inertia.
- **Bilingual Web Speech API**:
  - Real-time text-to-speech synthesis using the browser's native `window.speechSynthesis`.
  - Intelligently filters and selects Arabic voices (`ar-EG`, `ar-SA`, `ar`) and English voices (`en-US`, `en-GB`).
  - Voice replay button on every dialogue card, speech rate tuning for clear educational delivery, and automatic speech cancellation on dialogue skip or stage transitions.

---

## 2. Asset Pipeline & Visual Design

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Viewport Game Canvas                            │
├────────────────────────────────────────────────────────────────────────┤
│ Layer 1: Parallax Deep Space & Distant Earth                           │
│ Layer 2: Scrolling Realistic Moon Surface ('moon_bg.png')              │
│ Layer 3: Interactive NASA Lunar Robots & Spaceship                     │
│ Layer 4: Player Astronaut Sprite ('player.png') + Physics & Shadow     │
│ Layer 5: Dust Particle Effects & Proximity HUD                         │
└────────────────────────────────────────────────────────────────────────┘
```

- **Asset Mapping**:
  - `moon_bg.png`: `/public/assets/aistudio/Gemini_Generated_Image_8s4t568s4t568s4t_47dbba6d.jpg` (also linked to `/moon_bg.png`).
  - `player.png`: `/public/assets/aistudio/lucid-origin_full-body_head-to-toe_camera_view_of_a_10-year-old_Egyptian_boy_astronaut_showin-0_e2ab0252.jpg` (also linked to `/player.png`).
- **Sprite Rendering & Shadow**:
  - The astronaut sprite is dynamically rendered on canvas with aspect ratio preservation, directional flip (`facing: left | right`), subtle breathing/bobbing animations during idle, and low-gravity leap tilts.
  - An elliptical soft drop-shadow scales and fades with jump height to give strong grounded spatial depth against the lunar regolith.

---

## 3. Web Speech API Voice Architecture

```
┌──────────────────────────┐       ┌────────────────────────┐
│  Dialogue Box Appears    │ ────> │ Auto-Trigger Speech    │
│  (English or Arabic text)│       │ (window.speechSynthesis│
└────────────┬─────────────┘       └───────────┬────────────┘
             │                                 │
             ▼                                 ▼
┌──────────────────────────┐       ┌────────────────────────┐
│  '🔊 Replay Voice' Button│       │ Voice Selection Engine:│
│  User can re-listen      │       │ - 'ar-EG' for Arabic   │
└──────────────────────────┘       │ - 'en-US' for English  │
                                   └────────────────────────┘
```

- **Speech Synthesis Manager (`src/game/speech.ts`)**:
  - Handles browser voice discovery (`speechSynthesis.onvoiceschanged`).
  - Automatically selects high-quality Arabic voices (e.g. "Tarik", "Maged", "Laila", or any available `ar-EG` / `ar` voice) and English voices (e.g. "Google US English", "Samantha", or any `en-US`).
  - Provides `speak(text, lang, onStart, onEnd)` and `stop()`.
  - Exposes `isSpeaking` state to render an animated audio wave indicator next to the dialogue text.
  - Safe fallback: If speech synthesis is restricted or voices are still loading, fallback to procedural audio bleeps so no dialogue is ever blocked.

---

## 4. Technical Architecture & File Updates

1. **Asset Symlinking / Copy**:
   - Ensure `/public/moon_bg.png` and `/public/player.png` map directly to the user attachments.
2. **`src/game/speech.ts`**:
   - Robust Web Speech API wrapper with `speak()`, `replay()`, `cancel()`, voice loading listeners, and language switching (`ar-EG` / `en-US`).
3. **`src/game/canvasRenderer.ts`**:
   - Pre-load and cache `moon_bg.png` and `player.png` image elements.
   - Implement seamless background tiling and horizontal camera parallax.
   - Update player drawing method to render the astronaut sprite with directional flipping and grounded contact shadow.
   - Refine lunar gravity constant ($1.62\,\text{m/s}^2$ scale) and jump dynamics.
4. **`src/components/DialogueBox.tsx`**:
   - Add a dedicated `🔊 Replay Voice / إعادة الصوت` button on each dialogue box.
   - Add voice animation indicator (animated soundbars) when narration is actively speaking.
   - Integrate speech trigger on dialogue change and speech cancel on dialogue advance/close.
5. **Verification**:
   - Build and verify with `compile_applet` and `lint_applet`.
   - Test smooth 60fps scrolling, low-gravity jumping, and crisp speech playback.
