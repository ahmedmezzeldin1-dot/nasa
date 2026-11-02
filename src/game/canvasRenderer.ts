import { GameStage, Language, Particle, RobotInfo } from './types';

export interface PlayerState {
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  isWalking: boolean;
  jumpHeld: boolean;
}

export interface KidFollower {
  id: 'farida' | 'nour' | 'mentor';
  nameEn: string;
  nameAr: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  isGrounded: boolean;
  facing: 'left' | 'right';
  targetDistance: number;
  color: string;
  bounceOffset: number;
}

export class GameEngine {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public stage: GameStage = 'MOON_SURFACE';
  public lang: Language = 'en';

  // Images
  private moonBgImg: HTMLImageElement | null = null;
  private playerImg: HTMLImageElement | null = null;
  private playerCanvas: HTMLCanvasElement | null = null; // Background-removed transparent sprite
  public imagesLoaded: boolean = false;

  public player: PlayerState = {
    x: 240,
    y: 0,
    vx: 0,
    vy: 0,
    isGrounded: true,
    facing: 'right',
    isWalking: false,
    jumpHeld: false,
  };

  // Companions following the young astronaut player
  public companions: KidFollower[] = [
    {
      id: 'mentor',
      nameEn: 'Commander Tarek',
      nameAr: 'القائد طارق',
      x: 180,
      y: 0,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facing: 'right',
      targetDistance: 60,
      color: '#38BDF8',
      bounceOffset: 0,
    },
    {
      id: 'farida',
      nameEn: 'Farida',
      nameAr: 'فريدة',
      x: 125,
      y: 0,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facing: 'right',
      targetDistance: 110,
      color: '#F43F5E',
      bounceOffset: 1,
    },
    {
      id: 'nour',
      nameEn: 'Nour',
      nameAr: 'نور',
      x: 75,
      y: 0,
      vx: 0,
      vy: 0,
      isGrounded: true,
      facing: 'right',
      targetDistance: 155,
      color: '#818CF8',
      bounceOffset: 2,
    },
  ];

  public cameraX = 0;
  public worldWidth = 3400;
  public groundY = 0;
  public particles: Particle[] = [];
  public stars: { x: number; y: number; size: number; alpha: number; speed: number }[] = [];

  public nearbyRobot: RobotInfo | null = null;
  public shipNearby = false;

  public onInteractRobot?: (robot: RobotInfo) => void;
  public onBoardShip?: () => void;
  public onJumpSound?: (isMoon: boolean) => void;
  public onLandSound?: () => void;

  private walkCycle = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
    this.initStars();
    this.loadAssets();
  }

  private loadAssets() {
    // 1. Load realistic moon background
    const moonImg = new Image();
    moonImg.src = '/moon_bg.png';
    moonImg.onload = () => {
      this.moonBgImg = moonImg;
      this.imagesLoaded = true;
    };

    // 2. Load astronaut player sprite and process transparent chroma
    const pImg = new Image();
    pImg.src = '/player.png';
    pImg.onload = () => {
      this.playerImg = pImg;
      this.playerCanvas = this.createTransparentSprite(pImg);
      this.imagesLoaded = true;
    };
  }

  // Chroma key helper to isolate the astronaut on dark lunar terrain
  private createTransparentSprite(img: HTMLImageElement): HTMLCanvasElement {
    const c = document.createElement('canvas');
    const w = img.naturalWidth || img.width || 400;
    const h = img.naturalHeight || img.height || 600;
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d')!;
    ctx.drawImage(img, 0, 0);

    try {
      const imgData = ctx.getImageData(0, 0, w, h);
      const d = imgData.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        // If near-white background from source render
        if (r > 242 && g > 242 && b > 242) {
          d[i + 3] = 0;
        } else if (r > 215 && g > 215 && b > 215) {
          // Smooth edge feathering
          const avg = (r + g + b) / 3;
          d[i + 3] = Math.max(0, Math.min(255, (255 - avg) * 6));
        }
      }
      ctx.putImageData(imgData, 0, 0);
    } catch {
      // In case of any cross-origin restriction, fallback to raw image
    }
    return c;
  }

  public initStars() {
    this.stars = [];
    for (let i = 0; i < 160; i++) {
      this.stars.push({
        x: Math.random() * 4000,
        y: Math.random() * 450,
        size: Math.random() * 2 + 0.8,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.05 + 0.01,
      });
    }
  }

  public resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.groundY = height - 110;
    if (this.player.isGrounded) {
      this.player.y = this.groundY;
      this.companions.forEach((k) => (k.y = this.groundY));
    }
  }

  public setStage(stage: GameStage) {
    this.stage = stage;
    if (stage === 'MOON_SURFACE') {
      this.worldWidth = 2600;
      this.player.x = 240;
    } else if (stage === 'MARS_SURFACE') {
      this.worldWidth = 3500;
      this.player.x = 240;
    }
    this.cameraX = 0;
    this.player.vx = 0;
    this.player.vy = 0;
    this.companions.forEach((k, i) => {
      k.x = this.player.x - (i + 1) * 50;
      k.y = this.groundY;
      k.vx = 0;
      k.vy = 0;
    });
  }

  // Exact lunar physics vs Martian physics
  public getGravity(): number {
    return this.stage === 'MOON_SURFACE' ? 380 : 720; // 1/6g Moon (floaty) vs 3/8g Mars
  }

  public getJumpPower(): number {
    return this.stage === 'MOON_SURFACE' ? -390 : -420;
  }

  public jump() {
    if (this.player.isGrounded) {
      this.player.vy = this.getJumpPower();
      this.player.isGrounded = false;
      this.spawnDust(this.player.x, this.groundY, 8);
      if (this.onJumpSound) {
        this.onJumpSound(this.stage === 'MOON_SURFACE');
      }
    }
  }

  public spawnDust(x: number, y: number, count = 5) {
    const isMoon = this.stage === 'MOON_SURFACE';
    const color = isMoon ? '#E2E8F0' : '#F97316';
    for (let i = 0; i < count; i++) {
      this.particles.push({
        x: x + (Math.random() * 16 - 8),
        y: y + Math.random() * 4,
        vx: (Math.random() - 0.5) * (isMoon ? 50 : 35),
        vy: -Math.random() * (isMoon ? 65 : 45),
        size: Math.random() * 3 + 1.5,
        color,
        alpha: 0.8,
        life: 0,
        maxLife: isMoon ? 1.3 : 0.8,
      });
    }
  }

  public update(dt: number, input: { left: boolean; right: boolean; jump: boolean }, robots: RobotInfo[]) {
    const clampedDt = Math.min(dt, 0.05);
    const speed = 190;
    const gravity = this.getGravity();

    // Player Horizontal Movement
    if (input.left) {
      this.player.vx = -speed;
      this.player.facing = 'left';
      this.player.isWalking = true;
    } else if (input.right) {
      this.player.vx = speed;
      this.player.facing = 'right';
      this.player.isWalking = true;
    } else {
      this.player.vx = 0;
      this.player.isWalking = false;
    }

    if (input.jump && this.player.isGrounded) {
      this.jump();
    }

    // Apply Player Physics
    this.player.vy += gravity * clampedDt;
    this.player.x += this.player.vx * clampedDt;
    this.player.y += this.player.vy * clampedDt;

    // Boundaries
    if (this.player.x < 80) this.player.x = 80;
    if (this.player.x > this.worldWidth - 100) this.player.x = this.worldWidth - 100;

    // Ground collision
    if (this.player.y >= this.groundY) {
      if (!this.player.isGrounded) {
        if (this.player.vy > 80 && this.onLandSound) {
          this.onLandSound();
        }
        this.spawnDust(this.player.x, this.groundY, 5);
      }
      this.player.y = this.groundY;
      this.player.vy = 0;
      this.player.isGrounded = true;
    }

    if (this.player.isWalking && this.player.isGrounded) {
      this.walkCycle += clampedDt * 8;
      if (Math.random() < 0.25) {
        this.spawnDust(this.player.x, this.groundY, 1);
      }
    }

    // Update Companions (Mentor + Kids)
    let leadX = this.player.x;
    let leadGrounded = this.player.isGrounded;

    this.companions.forEach((comp) => {
      const desiredX = leadX + (this.player.facing === 'right' ? -comp.targetDistance : comp.targetDistance);
      const dx = desiredX - comp.x;

      if (Math.abs(dx) > 12) {
        comp.vx = Math.sign(dx) * Math.min(Math.abs(dx) * 4.5, speed * 1.05);
        comp.facing = dx > 0 ? 'right' : 'left';
      } else {
        comp.vx = 0;
      }

      if (!leadGrounded && comp.isGrounded && Math.random() < 0.3) {
        comp.vy = this.getJumpPower() * 0.9;
        comp.isGrounded = false;
        this.spawnDust(comp.x, this.groundY, 3);
      }

      comp.vy += gravity * clampedDt;
      comp.x += comp.vx * clampedDt;
      comp.y += comp.vy * clampedDt;

      if (comp.y >= this.groundY) {
        comp.y = this.groundY;
        comp.vy = 0;
        comp.isGrounded = true;
      }

      leadX = comp.x;
      leadGrounded = comp.isGrounded;
    });

    // Camera smoothing
    const targetCamX = this.player.x - this.canvas.width * 0.45;
    const maxCamX = Math.max(0, this.worldWidth - this.canvas.width);
    const clampedCamX = Math.max(0, Math.min(targetCamX, maxCamX));
    this.cameraX += (clampedCamX - this.cameraX) * 0.1;

    // Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += clampedDt;
      p.x += p.vx * clampedDt;
      p.y += p.vy * clampedDt;
      p.vy += gravity * 0.4 * clampedDt;
      p.alpha = Math.max(0, 1 - p.life / p.maxLife);
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }

    // Check Robot Proximity
    this.nearbyRobot = null;
    const currentRobots = robots.filter(
      (r) => (this.stage === 'MOON_SURFACE' && r.stage === 'moon') || (this.stage === 'MARS_SURFACE' && r.stage === 'mars')
    );

    for (const robot of currentRobots) {
      const dist = Math.abs(this.player.x - robot.x);
      if (dist < 90) {
        this.nearbyRobot = robot;
        break;
      }
    }

    // Check Ship Proximity
    const shipDist = Math.abs(this.player.x - 180);
    this.shipNearby = shipDist < 120;
  }

  public render(robots: RobotInfo[], allStageRobotsCompleted: boolean) {
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;
    const isMoon = this.stage === 'MOON_SURFACE';

    ctx.clearRect(0, 0, width, height);

    // 1. Realistic Scrolling Moon Background or Martian Terrain
    if (isMoon && this.moonBgImg && this.moonBgImg.complete) {
      this.drawRealisticMoonBackground(ctx, width, height);
    } else {
      this.drawProceduralSkyAndTerrain(ctx, width, height, isMoon);
    }

    // 2. Spaceship Horus-Artemis
    this.drawSpacecraft(ctx, 180 - this.cameraX, this.groundY, allStageRobotsCompleted);

    // 3. NASA Robots on surface
    const stageRobots = robots.filter(
      (r) => (isMoon && r.stage === 'moon') || (!isMoon && r.stage === 'mars')
    );

    for (const robot of stageRobots) {
      this.drawRobot(ctx, robot, robot.x - this.cameraX, this.groundY);
    }

    // 4. Companions (Mentor Commander Tarek, Farida, Nour)
    for (let i = this.companions.length - 1; i >= 0; i--) {
      this.drawCompanion(ctx, this.companions[i]);
    }

    // 5. Astronaut Player Sprite ('player.png')
    this.drawAstronautPlayer(ctx, this.player.x - this.cameraX, this.player.y);

    // 6. Particles
    this.drawParticles(ctx);

    // 7. Interactive Prompts
    this.drawInteractionPrompts(ctx, stageRobots, allStageRobotsCompleted);
  }

  // --- REALISTIC MOON BACKGROUND RENDERING ---
  private drawRealisticMoonBackground(ctx: CanvasRenderingContext2D, width: number, height: number) {
    const img = this.moonBgImg!;
    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;

    // Scale image so that the height covers the viewport properly
    const scale = height / imgH;
    const scaledW = imgW * scale;

    // Parallax scrolling offset (parallax factor 0.6)
    const parallaxOffset = (this.cameraX * 0.6) % scaledW;
    const startX = -parallaxOffset;

    // Tile across screen
    for (let x = startX - scaledW; x < width + scaledW; x += scaledW) {
      ctx.drawImage(img, x, 0, scaledW, height);
    }

    // Subtle atmospheric starlight blend
    ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
    ctx.fillRect(0, 0, width, height);
  }

  private drawProceduralSkyAndTerrain(ctx: CanvasRenderingContext2D, width: number, height: number, isMoon: boolean) {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#1C0B08');
    skyGrad.addColorStop(0.6, '#451A03');
    skyGrad.addColorStop(0.9, '#7C2D12');
    skyGrad.addColorStop(1, '#9A3412');
    ctx.fillStyle = skyGrad;
    ctx.fillRect(0, 0, width, height);

    // Martian ground
    const groundGrad = ctx.createLinearGradient(0, this.groundY, 0, height);
    groundGrad.addColorStop(0, '#C2410C');
    groundGrad.addColorStop(0.2, '#9A3412');
    groundGrad.addColorStop(1, '#431407');
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, this.groundY, width, height - this.groundY);
  }

  // --- DRAWING ASTRONAUT PLAYER SPRITE ('player.png') ---
  private drawAstronautPlayer(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();

    // 1. Contact Ground Shadow on lunar regolith
    const jumpHeight = Math.max(0, this.groundY - y);
    const shadowScale = Math.max(0.3, 1 - jumpHeight / 300);
    const shadowAlpha = Math.max(0.1, 0.6 - jumpHeight / 400);

    ctx.save();
    ctx.fillStyle = `rgba(0, 0, 0, ${shadowAlpha})`;
    ctx.beginPath();
    ctx.ellipse(x, this.groundY - 2, 22 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    ctx.translate(x, y);

    const facingRight = this.player.facing === 'right';
    if (!facingRight) {
      ctx.scale(-1, 1);
    }

    const walkBob = this.player.isWalking ? Math.sin(this.walkCycle) * 3 : 0;
    const jumpTilt = !this.player.isGrounded ? (this.player.vy < 0 ? -0.08 : 0.08) : 0;
    ctx.rotate(jumpTilt);

    // Render transparent player sprite if loaded
    const sprite = this.playerCanvas || this.playerImg;
    if (sprite && sprite.width > 0) {
      const spriteW = 75;
      const spriteH = 115;
      // Draw centered above ground point
      ctx.drawImage(sprite, -spriteW / 2, -spriteH + walkBob, spriteW, spriteH);
    } else {
      // Fallback vector boy astronaut
      this.drawFallbackPlayer(ctx, walkBob);
    }

    // Name tag & Status
    const isAr = this.lang === 'ar';
    ctx.fillStyle = '#34D399';
    ctx.font = 'bold 9px "Plus Jakarta Sans", "Cairo", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isAr ? 'عمر (الرائد)' : 'Omar (Explorer)', 0, -125 + walkBob);

    ctx.restore();
  }

  private drawFallbackPlayer(ctx: CanvasRenderingContext2D, walkBob: number) {
    ctx.fillStyle = '#FFFFFF';
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-14, -68 + walkBob, 28, 45, 6);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#EAB308';
    ctx.beginPath();
    ctx.arc(4, -80 + walkBob, 12, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- DRAWING COMPANIONS ---
  private drawCompanion(ctx: CanvasRenderingContext2D, comp: KidFollower) {
    ctx.save();
    const x = comp.x - this.cameraX;
    const y = comp.y;

    // Shadow
    const jumpH = Math.max(0, this.groundY - y);
    const shadowScale = Math.max(0.3, 1 - jumpH / 300);
    ctx.fillStyle = `rgba(0, 0, 0, ${Math.max(0.1, 0.5 - jumpH / 400)})`;
    ctx.beginPath();
    ctx.ellipse(x, this.groundY - 2, 18 * shadowScale, 6 * shadowScale, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.translate(x, y);
    if (comp.facing === 'left') {
      ctx.scale(-1, 1);
    }

    const walkBob = Math.sin(this.walkCycle + comp.bounceOffset) * 2;
    const isMentor = comp.id === 'mentor';

    // Suit
    const h = isMentor ? 52 : 36;
    const w = isMentor ? 28 : 20;

    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-w / 2, -h + walkBob, w, h * 0.75, 5);
    ctx.fill();
    ctx.stroke();

    // Helmet
    const headR = isMentor ? 15 : 12;
    const headY = -h - headR * 0.5 + walkBob;
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(0, headY, headR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Visor
    ctx.fillStyle = isMentor ? '#EAB308' : comp.color;
    ctx.beginPath();
    ctx.arc(3, headY, headR * 0.75, -0.4 * Math.PI, 0.4 * Math.PI);
    ctx.fill();

    // Name tag
    const isAr = this.lang === 'ar';
    ctx.fillStyle = comp.color;
    ctx.font = 'bold 8px "Plus Jakarta Sans", "Cairo", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(isAr ? comp.nameAr : comp.nameEn, 0, headY - headR - 6);

    ctx.restore();
  }

  // --- DRAWING SPACECRAFT HORUS-ARTEMIS ---
  private drawSpacecraft(ctx: CanvasRenderingContext2D, x: number, y: number, isReadyToBoard: boolean) {
    ctx.save();
    ctx.translate(x, y);

    // Landing legs
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-45, -20);
    ctx.lineTo(-75, 0);
    ctx.lineTo(-90, 0);
    ctx.moveTo(45, -20);
    ctx.lineTo(75, 0);
    ctx.lineTo(90, 0);
    ctx.stroke();

    // Footpads
    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(-95, -4, 20, 4);
    ctx.fillRect(75, -4, 20, 4);

    // Spaceship Hull
    const hullGrad = ctx.createLinearGradient(-50, -180, 50, -20);
    hullGrad.addColorStop(0, '#FFFFFF');
    hullGrad.addColorStop(0.5, '#E2E8F0');
    hullGrad.addColorStop(1, '#94A3B8');
    ctx.fillStyle = hullGrad;
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2.5;

    ctx.beginPath();
    ctx.moveTo(0, -180);
    ctx.bezierCurveTo(45, -160, 55, -40, 50, -20);
    ctx.lineTo(-50, -20);
    ctx.bezierCurveTo(-55, -40, -45, -160, 0, -180);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Cockpit Window
    ctx.fillStyle = '#0284C7';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -145);
    ctx.lineTo(18, -135);
    ctx.lineTo(14, -120);
    ctx.lineTo(-14, -120);
    ctx.lineTo(-18, -135);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Airlock Door
    ctx.fillStyle = isReadyToBoard ? '#059669' : '#334155';
    ctx.strokeStyle = isReadyToBoard ? '#34D399' : '#64748B';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-16, -65, 32, 45, 6);
    ctx.fill();
    ctx.stroke();

    // Emblems
    this.drawMiniEgyptianFlag(ctx, -24, -105, 20, 12);
    this.drawMiniNasaLogo(ctx, 6, -105, 18);

    ctx.restore();
  }

  // --- DRAWING DETAILED NASA ROBOTS ---
  private drawRobot(ctx: CanvasRenderingContext2D, robot: RobotInfo, x: number, y: number) {
    ctx.save();
    ctx.translate(x, y);

    const isNearby = this.nearbyRobot?.id === robot.id;

    if (isNearby) {
      const glowGrad = ctx.createRadialGradient(0, -35, 15, 0, -35, 65);
      glowGrad.addColorStop(0, 'rgba(56, 189, 248, 0.4)');
      glowGrad.addColorStop(1, 'rgba(56, 189, 248, 0)');
      ctx.fillStyle = glowGrad;
      ctx.beginPath();
      ctx.arc(0, -35, 65, 0, Math.PI * 2);
      ctx.fill();
    }

    switch (robot.id) {
      case 'surveyor_3':
        this.drawSurveyor3(ctx);
        break;
      case 'apollo_lrv':
        this.drawApolloLRV(ctx);
        break;
      case 'viper_prospector':
        this.drawViperRover(ctx);
        break;
      case 'sojourner':
        this.drawSojourner(ctx);
        break;
      case 'opportunity':
        this.drawOpportunity(ctx);
        break;
      case 'curiosity':
        this.drawCuriosity(ctx);
        break;
      case 'perseverance_ingenuity':
        this.drawPerseveranceAndIngenuity(ctx);
        break;
    }

    ctx.restore();
  }

  private drawSurveyor3(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, -35); ctx.lineTo(-32, 0);
    ctx.moveTo(0, -35); ctx.lineTo(32, 0);
    ctx.moveTo(0, -35); ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.fillStyle = '#CBD5E1';
    ctx.fillRect(-37, -3, 10, 3);
    ctx.fillRect(27, -3, 10, 3);

    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, -65); ctx.lineTo(14, -35); ctx.lineTo(-14, -35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#1E3A8A';
    ctx.fillRect(-15, -82, 30, 16);
    ctx.strokeStyle = '#38BDF8';
    ctx.strokeRect(-15, -82, 30, 16);

    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-10, -40); ctx.lineTo(-26, -30); ctx.lineTo(-38, -6);
    ctx.stroke();
    ctx.fillStyle = '#475569';
    ctx.fillRect(-44, -8, 8, 8);
  }

  private drawApolloLRV(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2.5;
    ctx.fillStyle = '#1E293B';
    ctx.beginPath();
    ctx.arc(-34, -13, 13, 0, Math.PI * 2);
    ctx.arc(34, -13, 13, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#E2E8F0';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.fillRect(-38, -20, 76, 7);
    ctx.strokeRect(-38, -20, 76, 7);

    ctx.fillStyle = '#475569';
    ctx.fillRect(-15, -34, 12, 14);
    ctx.fillRect(2, -34, 12, 14);

    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(25, -20); ctx.lineTo(28, -50);
    ctx.stroke();
    ctx.fillStyle = '#F8FAFC';
    ctx.beginPath();
    ctx.arc(35, -55, 14, 0.8 * Math.PI, 1.8 * Math.PI);
    ctx.stroke();
    ctx.fill();
  }

  private drawViperRover(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#334155';
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(-26, -14, 14, 0, Math.PI * 2);
    ctx.arc(26, -14, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#F1F5F9';
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2;
    ctx.fillRect(-30, -48, 60, 32);
    ctx.strokeRect(-30, -48, 60, 32);

    ctx.fillStyle = '#FEF08A';
    ctx.fillRect(26, -42, 6, 8);

    ctx.fillStyle = '#475569';
    ctx.fillRect(-18, -75, 8, 30);
    ctx.fillStyle = '#DC2626';
    ctx.fillRect(-16, -16, 4, 16);
  }

  private drawSojourner(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#E2E8F0';
    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-50, 0); ctx.lineTo(-30, -28); ctx.lineTo(-10, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#475569';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(8 + i * 14, -6, 6, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#1E3A8A';
    ctx.strokeStyle = '#38BDF8';
    ctx.lineWidth = 1.5;
    ctx.fillRect(8, -24, 30, 8);
    ctx.strokeRect(8, -24, 30, 8);
  }

  private drawOpportunity(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#334155';
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(-24 + i * 24, -9, 9, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#1E3A8A';
    ctx.strokeStyle = '#60A5FA';
    ctx.lineWidth = 1.5;
    ctx.fillRect(-35, -28, 70, 8);
    ctx.strokeRect(-35, -28, 70, 8);

    ctx.strokeStyle = '#CBD5E1';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(12, -28); ctx.lineTo(14, -62);
    ctx.stroke();

    ctx.fillStyle = '#E2E8F0';
    ctx.fillRect(6, -68, 16, 8);
  }

  private drawCuriosity(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(-30 + i * 30, -13, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = '#E2E8F0';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.fillRect(-32, -45, 64, 28);
    ctx.strokeRect(-32, -45, 64, 28);

    ctx.strokeStyle = '#64748B';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(18, -45); ctx.lineTo(20, -82);
    ctx.stroke();
    ctx.fillStyle = '#EF4444';
    ctx.beginPath();
    ctx.arc(26, -86, 3.5, 0, Math.PI * 2);
    ctx.fill();
  }

  private drawPerseveranceAndIngenuity(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#1E293B';
    ctx.strokeStyle = '#94A3B8';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      ctx.beginPath();
      ctx.arc(-30 + i * 30, -13, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    }

    ctx.fillStyle = '#F8FAFC';
    ctx.strokeStyle = '#334155';
    ctx.lineWidth = 2;
    ctx.fillRect(-32, -46, 64, 30);
    ctx.strokeRect(-32, -46, 64, 30);

    // Ingenuity helicopter
    ctx.save();
    ctx.translate(65, 0);
    ctx.fillStyle = '#EAB308';
    ctx.fillRect(-6, -26, 12, 10);
    ctx.strokeStyle = '#0F172A';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-22, -34); ctx.lineTo(22, -34);
    ctx.moveTo(-22, -40); ctx.lineTo(22, -40);
    ctx.stroke();
    ctx.restore();
  }

  private drawMiniEgyptianFlag(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
    ctx.save();
    const stripeH = h / 3;
    ctx.fillStyle = '#DC2626'; ctx.fillRect(x, y, w, stripeH);
    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(x, y + stripeH, w, stripeH);
    ctx.fillStyle = '#0F172A'; ctx.fillRect(x, y + stripeH * 2, w, stripeH);
    ctx.fillStyle = '#CA8A04';
    ctx.beginPath();
    ctx.arc(x + w / 2, y + stripeH * 1.5, stripeH * 0.4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawMiniNasaLogo(ctx: CanvasRenderingContext2D, x: number, y: number, r: number) {
    ctx.save();
    ctx.fillStyle = '#1D4ED8';
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  private drawParticles(ctx: CanvasRenderingContext2D) {
    ctx.save();
    for (const p of this.particles) {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x - this.cameraX, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private drawInteractionPrompts(ctx: CanvasRenderingContext2D, robots: RobotInfo[], allStageRobotsCompleted: boolean) {
    ctx.save();
    const isAr = this.lang === 'ar';

    for (const robot of robots) {
      const screenX = robot.x - this.cameraX;
      const isNearby = this.nearbyRobot?.id === robot.id;

      if (isNearby) {
        const cardY = this.groundY - 110;
        const promptText = isAr ? 'انقر أو اضغط [E] للفحص' : 'Click or Press [E] to Inspect';

        ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
        ctx.strokeStyle = '#38BDF8';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.roundRect(screenX - 75, cardY, 150, 26, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#38BDF8';
        ctx.font = 'bold 11px "Plus Jakarta Sans", "Cairo", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(promptText, screenX, cardY + 17);
      }
    }

    if (allStageRobotsCompleted) {
      const shipScreenX = 180 - this.cameraX;
      const cardY = this.groundY - 195 + Math.sin(Date.now() * 0.006) * 4;
      const boardText = isAr ? 'صعود المركبة [E]' : 'Board Ship [E]';

      ctx.fillStyle = 'rgba(5, 150, 105, 0.95)';
      ctx.strokeStyle = '#34D399';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(shipScreenX - 70, cardY, 140, 28, 6);
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px "Plus Jakarta Sans", "Cairo", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(boardText, shipScreenX, cardY + 18);
    }

    ctx.restore();
  }

  public handleClick(canvasX: number, canvasY: number, robots: RobotInfo[], allStageRobotsCompleted: boolean) {
    const worldX = canvasX + this.cameraX;
    const isMoon = this.stage === 'MOON_SURFACE';
    const stageRobots = robots.filter(
      (r) => (isMoon && r.stage === 'moon') || (!isMoon && r.stage === 'mars')
    );

    for (const robot of stageRobots) {
      const dx = Math.abs(worldX - robot.x);
      const dy = Math.abs(canvasY - (this.groundY - 45));
      if (dx < 50 && dy < 55) {
        if (this.onInteractRobot) {
          this.onInteractRobot(robot);
        }
        return;
      }
    }

    if (allStageRobotsCompleted) {
      const dx = Math.abs(worldX - 180);
      const dy = Math.abs(canvasY - (this.groundY - 90));
      if (dx < 70 && dy < 90) {
        if (this.onBoardShip) {
          this.onBoardShip();
        }
      }
    }
  }
}
