import React, { useEffect, useRef, useState, useCallback } from 'react';
import { GameStage, Language, RobotInfo } from './game/types';
import { ROBOTS_DATA } from './game/robotsData';
import {
  INTRO_MALFUNCTION_DIALOGUES,
  MOON_ARRIVAL_DIALOGUES,
  MOON_DEPARTURE_DIALOGUES,
  MARS_ARRIVAL_DIALOGUES,
  MISSION_COMPLETE_DIALOGUES,
} from './game/dialogues';
import { GameEngine } from './game/canvasRenderer';
import { soundManager } from './game/audio';
import { speechManager } from './game/speech';
import { TitleScreen } from './components/TitleScreen';
import { HUD } from './components/HUD';
import { DialogueBox } from './components/DialogueBox';
import { RobotInspectModal } from './components/RobotInspectModal';
import { MiniTaskModal } from './components/MiniTaskModal';
import { CodexModal } from './components/CodexModal';
import { InterplanetaryCutscene } from './components/InterplanetaryCutscene';

export default function App() {
  const [stage, setStage] = useState<GameStage>('TITLE');
  const [lang, setLang] = useState<Language>('en');
  const [robots, setRobots] = useState<RobotInfo[]>(ROBOTS_DATA);

  // Dialogue System
  const [activeDialogues, setActiveDialogues] = useState<typeof MOON_ARRIVAL_DIALOGUES | null>(null);
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const onDialogueCompleteRef = useRef<(() => void) | null>(null);

  // Modal Overlays
  const [inspectingRobot, setInspectingRobot] = useState<RobotInfo | null>(null);
  const [miniTaskRobot, setMiniTaskRobot] = useState<RobotInfo | null>(null);
  const [isCodexOpen, setIsCodexOpen] = useState(false);

  // Proximity states for HUD
  const [nearbyRobot, setNearbyRobot] = useState<RobotInfo | null>(null);
  const [shipNearby, setShipNearby] = useState(false);

  // Canvas & Engine References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const engineRef = useRef<GameEngine | null>(null);
  const inputRef = useRef({ left: false, right: false, jump: false });
  const robotsRef = useRef(robots);
  robotsRef.current = robots;

  const isMoon = stage === 'MOON_SURFACE';
  const stageRobots = robots.filter((r) =>
    isMoon ? r.stage === 'moon' : r.stage === 'mars'
  );
  const allStageRobotsCompleted =
    stageRobots.length > 0 && stageRobots.every((r) => r.inspected && r.taskCompleted);

  // --- START GAME FLOW ---
  const handleStartGame = useCallback(() => {
    speechManager.cancel();
    setStage('MALFUNCTION_CUTSCENE');
    // Start with malfunction alert dialog
    setActiveDialogues(INTRO_MALFUNCTION_DIALOGUES);
    setDialogueIndex(0);
    onDialogueCompleteRef.current = () => {
      // After malfunction dialog, enter Moon surface
      setStage('MOON_SURFACE');
      if (engineRef.current) {
        engineRef.current.setStage('MOON_SURFACE');
      }
      // Start Moon arrival dialogues
      setTimeout(() => {
        setActiveDialogues(MOON_ARRIVAL_DIALOGUES);
        setDialogueIndex(0);
        onDialogueCompleteRef.current = null;
      }, 400);
    };
  }, []);

  // Boarding ship on Moon to head to Mars
  const handleBoardShip = useCallback(() => {
    if (stage === 'MOON_SURFACE' && allStageRobotsCompleted) {
      speechManager.cancel();
      soundManager.playThruster();
      setActiveDialogues(MOON_DEPARTURE_DIALOGUES);
      setDialogueIndex(0);
      onDialogueCompleteRef.current = () => {
        setStage('LAUNCH_TO_MARS');
      };
    }
  }, [stage, allStageRobotsCompleted]);

  // Arriving on Mars after interplanetary transit
  const handleTouchdownMars = useCallback(() => {
    speechManager.cancel();
    setStage('MARS_SURFACE');
    if (engineRef.current) {
      engineRef.current.setStage('MARS_SURFACE');
    }
    setTimeout(() => {
      setActiveDialogues(MARS_ARRIVAL_DIALOGUES);
      setDialogueIndex(0);
      onDialogueCompleteRef.current = null;
    }, 400);
  }, []);

  // Inspecting a Robot
  const handleInspectRobot = useCallback((robot: RobotInfo) => {
    speechManager.cancel();
    soundManager.playScan();
    // Mark robot as inspected
    setRobots((prev) =>
      prev.map((r) => (r.id === robot.id ? { ...r, inspected: true } : r))
    );
    setInspectingRobot(robot);
  }, []);

  // Completing a Mini-Task
  const handleCompleteMiniTask = useCallback((robotId: string) => {
    setRobots((prev) => {
      const updated = prev.map((r) =>
        r.id === robotId ? { ...r, inspected: true, taskCompleted: true } : r
      );

      // Check if this completes all Mars robots -> Victory!
      const currentStage = engineRef.current?.stage;
      if (currentStage === 'MARS_SURFACE') {
        const marsRemaining = updated.filter(
          (r) => r.stage === 'mars' && (!r.inspected || !r.taskCompleted)
        );
        if (marsRemaining.length === 0) {
          setTimeout(() => {
            setActiveDialogues(MISSION_COMPLETE_DIALOGUES);
            setDialogueIndex(0);
            onDialogueCompleteRef.current = () => {
              setIsCodexOpen(true);
            };
          }, 800);
        }
      }

      return updated;
    });
  }, []);

  // Toggle Language
  const handleToggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === 'en' ? 'ar' : 'en';
      if (engineRef.current) {
        engineRef.current.lang = next;
      }
      return next;
    });
  }, []);

  // Dialogue Advance
  const handleNextDialogue = useCallback(() => {
    if (!activeDialogues) return;
    if (dialogueIndex < activeDialogues.length - 1) {
      setDialogueIndex((prev) => prev + 1);
    } else {
      setActiveDialogues(null);
      if (onDialogueCompleteRef.current) {
        onDialogueCompleteRef.current();
        onDialogueCompleteRef.current = null;
      }
    }
  }, [activeDialogues, dialogueIndex]);

  // Handle Context Action Key (e.g. Press 'E' or Click Context Action)
  const handleContextAction = useCallback(() => {
    if (nearbyRobot) {
      handleInspectRobot(nearbyRobot);
    } else if (shipNearby && allStageRobotsCompleted) {
      handleBoardShip();
    }
  }, [nearbyRobot, shipNearby, allStageRobotsCompleted, handleInspectRobot, handleBoardShip]);

  // Virtual input handlers for touch/mouse HUD buttons
  const handleInputStart = useCallback((action: 'left' | 'right' | 'jump') => {
    if (action === 'left') inputRef.current.left = true;
    if (action === 'right') inputRef.current.right = true;
    if (action === 'jump') {
      inputRef.current.jump = true;
      if (engineRef.current) engineRef.current.jump();
    }
  }, []);

  const handleInputEnd = useCallback((action: 'left' | 'right' | 'jump') => {
    if (action === 'left') inputRef.current.left = false;
    if (action === 'right') inputRef.current.right = false;
    if (action === 'jump') inputRef.current.jump = false;
  }, []);

  // --- INITIALIZE CANVAS & 60FPS GAME LOOP ---
  useEffect(() => {
    if (!canvasRef.current) return;
    const canvas = canvasRef.current;
    const engine = new GameEngine(canvas);
    engine.lang = lang;
    engineRef.current = engine;

    engine.onInteractRobot = (robot) => handleInspectRobot(robot);
    engine.onBoardShip = () => handleBoardShip();
    engine.onJumpSound = (isM) => soundManager.playJump(isM);
    engine.onLandSound = () => soundManager.playLand();

    const handleResize = () => {
      engine.resize(window.innerWidth, window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Keyboard controls
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') inputRef.current.left = true;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') inputRef.current.right = true;
      if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') {
        inputRef.current.jump = true;
        engine.jump();
      }
      if (e.code === 'KeyE') {
        handleContextAction();
      }
      if (e.code === 'KeyJ') {
        setIsCodexOpen((prev) => !prev);
      }
      if (e.code === 'Enter' && activeDialogues) {
        handleNextDialogue();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'KeyA' || e.code === 'ArrowLeft') inputRef.current.left = false;
      if (e.code === 'KeyD' || e.code === 'ArrowRight') inputRef.current.right = false;
      if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') inputRef.current.jump = false;
    };

    const handleBlur = () => {
      inputRef.current.left = false;
      inputRef.current.right = false;
      inputRef.current.jump = false;
    };

    const handleCanvasClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      engine.handleClick(x, y, robotsRef.current, allStageRobotsCompleted);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', handleBlur);
    canvas.addEventListener('click', handleCanvasClick);

    // 60FPS Fixed-step Animation Loop
    let animId: number;
    let lastTime = performance.now();

    const loop = (now: number) => {
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Update physics & camera
      engine.update(dt, inputRef.current, robotsRef.current);

      // Render frame
      engine.render(robotsRef.current, allStageRobotsCompleted);

      // Sync proximity flags to React state for HUD
      setNearbyRobot(engine.nearbyRobot);
      setShipNearby(engine.shipNearby);

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', handleBlur);
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [lang, allStageRobotsCompleted, handleInspectRobot, handleBoardShip, handleContextAction, handleNextDialogue, activeDialogues]);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-950 font-sans select-none">
      {/* 2D Canvas Viewport (Runs independently at 60fps) */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full cursor-crosshair transition-opacity duration-500 ${
          stage === 'TITLE' ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* 1. Title Screen Shell */}
      {stage === 'TITLE' && (
        <TitleScreen
          lang={lang}
          onToggleLang={handleToggleLang}
          onStartGame={handleStartGame}
        />
      )}

      {/* 2. Interplanetary Cutscenes */}
      {stage === 'MALFUNCTION_CUTSCENE' && (
        <InterplanetaryCutscene
          stage="MALFUNCTION_CUTSCENE"
          lang={lang}
          onFinish={() => {
            setStage('MOON_SURFACE');
            if (engineRef.current) engineRef.current.setStage('MOON_SURFACE');
          }}
        />
      )}

      {stage === 'LAUNCH_TO_MARS' && (
        <InterplanetaryCutscene
          stage="LAUNCH_TO_MARS"
          lang={lang}
          onFinish={handleTouchdownMars}
        />
      )}

      {/* 3. In-Game Low-Occlusion HUD */}
      {(stage === 'MOON_SURFACE' || stage === 'MARS_SURFACE') && (
        <HUD
          stage={stage}
          lang={lang}
          onToggleLang={handleToggleLang}
          onOpenCodex={() => setIsCodexOpen(true)}
          robots={robots}
          allCompleted={allStageRobotsCompleted}
          onActionClick={handleContextAction}
          nearbyRobot={nearbyRobot}
          shipNearby={shipNearby}
          onInputStart={handleInputStart}
          onInputEnd={handleInputEnd}
        />
      )}

      {/* 4. Interactive Dialogue Box */}
      {activeDialogues && (
        <DialogueBox
          dialogues={activeDialogues}
          currentIndex={dialogueIndex}
          onNext={handleNextDialogue}
          lang={lang}
        />
      )}

      {/* 5. Robot Inspect Modal (4 Curriculum Pillars) */}
      {inspectingRobot && (
        <RobotInspectModal
          robot={inspectingRobot}
          lang={lang}
          onClose={() => setInspectingRobot(null)}
          onStartMiniTask={() => {
            setMiniTaskRobot(inspectingRobot);
            setInspectingRobot(null);
          }}
        />
      )}

      {/* 6. Scientific Hands-on Mini-Task Modal */}
      {miniTaskRobot && (
        <MiniTaskModal
          robot={miniTaskRobot}
          lang={lang}
          onClose={() => setMiniTaskRobot(null)}
          onComplete={() => {
            handleCompleteMiniTask(miniTaskRobot.id);
          }}
        />
      )}

      {/* 7. Field Journal & Science Codex Modal */}
      {isCodexOpen && (
        <CodexModal
          robots={robots}
          lang={lang}
          onClose={() => setIsCodexOpen(false)}
          onSelectRobot={(robot) => {
            setIsCodexOpen(false);
            setInspectingRobot(robot);
          }}
        />
      )}
    </div>
  );
}
