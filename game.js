// =========================================================
// APEX ROYALE 3D - ULTRA EDITION (FFA AI & PROCEDURAL RIGS)
// =========================================================

class SoundController {
  constructor() {
    this.ctx = null;
    this.init();
  }

  init() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
    }
  }

  ensureContext() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playAR() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const noise = this.ctx.createBufferSource();
    
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.08);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noise.buffer = buffer;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(170, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(35, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.35, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    noise.connect(gain);
    osc.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start();
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playShotgun() {
    if (!this.ctx) return;
    this.ensureContext();
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.18);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(900, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.18);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.65, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.18);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start();
  }

  playSniper() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(45, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.85, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  playPickaxe() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(130, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHitmarker(crit) {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(crit ? 2900 : 2100, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  playBuild() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(190, this.ctx.currentTime);
    osc.frequency.setValueAtTime(340, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.28, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playChestOpen() {
    if (!this.ctx) return;
    this.ensureContext();
    const freqs = [440, 660, 880, 1320];
    for (let i = 0; i < freqs.length; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freqs[i], this.ctx.currentTime + i * 0.06);
      gain.gain.setValueAtTime(0.15, this.ctx.currentTime + i * 0.06);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.06 + 0.2);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.06);
      osc.stop(this.ctx.currentTime + i * 0.06 + 0.2);
    }
  }

  playShieldDrink() {
    if (!this.ctx) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(750, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  playVictory() {
    if (!this.ctx) return;
    this.ensureContext();
    const notes = [523.25, 659.25, 783.99, 1046.5, 1318.5];
    for (let i = 0; i < notes.length; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(notes[i], this.ctx.currentTime + i * 0.14);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + i * 0.14);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.14 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.14);
      osc.stop(this.ctx.currentTime + i * 0.14 + 0.5);
    }
  }
}

const sounds = new SoundController();

const GameState = {
  isStarted: false,
  isPaused: false,
  isGameOver: false,
  kills: 0,
  damageDealt: 0,
  playersAlive: 11,
  health: 100,
  shield: 100,
  materials: { wood: 300, stone: 150, metal: 50 },
  activeSlot: 2,
  ammo: {
    ar: { clip: 30, maxClip: 30, reserve: 180 },
    shotgun: { clip: 5, maxClip: 5, reserve: 30 },
    sniper: { clip: 1, maxClip: 1, reserve: 10 },
    shields: { count: 3 }
  },
  activeBuild: null,
  storm: {
    radius: 120,
    targetRadius: 120,
    x: 0,
    z: 0,
    targetX: 0,
    targetZ: 0,
    shrinkTimer: 90,
    phase: 1
  }
};

const container = document.getElementById('game-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x7ec0ee);
scene.fog = new THREE.FogExp2(0x7ec0ee, 0.007);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
if (container) container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x334455, 0.45);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfffaed, 1.0);
sunLight.position.set(65, 110, 55);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 2048;
sunLight.shadow.mapSize.height = 2048;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 300;
const d = 120;
sunLight.shadow.camera.left = -d;
sunLight.shadow.camera.right = d;
sunLight.shadow.camera.top = d;
sunLight.shadow.camera.bottom = -d;
scene.add(sunLight);

const environmentObjects = [];
const destructibleObjects = [];
const builtStructures = [];
const enemyBots = [];
const bulletTracers = [];
const particlePool = [];
const lootChests = [];

// --- PROCEDURAL ISLAND TERRAIN ---
function createTerrain() {
  const size = 260;
  const segments = 90;
  const geo = new THREE.PlaneGeometry(size, size, segments, segments);
  geo.rotateX(-Math.PI / 2);

  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const distFromCenter = Math.sqrt(x * x + z * z);
    const falloff = Math.max(0, 1 - Math.pow(distFromCenter / (size * 0.48), 3));
    
    const hillHeight = (Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5 + 
                        Math.sin(x * 0.02 + 1) * Math.cos(z * 0.02) * 8) * falloff;
    const y = Math.max(-2, hillHeight);
    pos.setY(i, y);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshLambertMaterial({ color: 0x4f772d });
  const terrain = new THREE.Mesh(geo, mat);
  terrain.receiveShadow = true;
  scene.add(terrain);

  const waterGeo = new THREE.PlaneGeometry(800, 800);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshLambertMaterial({
    color: 0x1d4ed8,
    transparent: true,
    opacity: 0.82
  });
  const ocean = new THREE.Mesh(waterGeo, waterMat);
  ocean.position.y = -0.8;
  scene.add(ocean);

  return terrain;
}

const terrainMesh = createTerrain();

function getTerrainHeight(x, z) {
  const dist = Math.sqrt(x * x + z * z);
  if (dist > 125) return -2;
  const falloff = Math.max(0, 1 - Math.pow(dist / 125, 3));
  const hill = (Math.sin(x * 0.05) * Math.cos(z * 0.05) * 5 + 
                Math.sin(x * 0.02 + 1) * Math.cos(z * 0.02) * 8) * falloff;
  return Math.max(0, hill);
}

// --- PROCEDURAL OBJECTS (Trees, Rocks, Chests, Outposts) ---
function spawnEnvironment() {
  const treeTrunkMat = new THREE.MeshLambertMaterial({ color: 0x5c4033 });
  const treeLeavesMat = new THREE.MeshLambertMaterial({ color: 0x2d6a4f });
  const rockMat = new THREE.MeshLambertMaterial({ color: 0x64748b });
  const chestMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.5 });

  for (let i = 0; i < 55; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 10 + Math.random() * 95;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = getTerrainHeight(x, z);

    const treeGroup = new THREE.Group();
    const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 3.5, 6), treeTrunkMat);
    trunk.position.y = 1.75;
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    treeGroup.add(trunk);

    const leaves1 = new THREE.Mesh(new THREE.ConeGeometry(2.4, 3, 6), treeLeavesMat);
    leaves1.position.y = 3.8;
    leaves1.castShadow = true;
    treeGroup.add(leaves1);

    const leaves2 = new THREE.Mesh(new THREE.ConeGeometry(1.8, 2.4, 6), treeLeavesMat);
    leaves2.position.y = 5.2;
    leaves2.castShadow = true;
    treeGroup.add(leaves2);

    treeGroup.position.set(x, y, z);
    scene.add(treeGroup);

    const objData = {
      mesh: treeGroup,
      type: 'tree',
      health: 80,
      maxHealth: 80,
      resource: 'wood',
      radius: 1.2,
      x: x, y: y, z: z
    };
    environmentObjects.push(objData);
    destructibleObjects.push(objData);
  }

  for (let i = 0; i < 35; i++) {
    const angle = Math.random() * Math.PI * 2;
    const r = 15 + Math.random() * 90;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = getTerrainHeight(x, z);

    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4 + Math.random() * 0.8, 1), rockMat);
    rock.position.set(x, y + 0.8, z);
    rock.rotation.set(Math.random(), Math.random(), Math.random());
    rock.scale.set(1.2, 0.8, 1);
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);

    const objData = {
      mesh: rock,
      type: 'rock',
      health: 120,
      maxHealth: 120,
      resource: 'stone',
      radius: 1.4,
      x: x, y: y, z: z
    };
    environmentObjects.push(objData);
    destructibleObjects.push(objData);
  }

  for (let i = 0; i < 8; i++) {
    const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.3;
    const r = 25 + Math.random() * 65;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const y = getTerrainHeight(x, z);

    const chestGroup = new THREE.Group();
    const box = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.9, 1.0), chestMat);
    box.position.y = 0.45;
    box.castShadow = true;
    chestGroup.add(box);

    const chestLight = new THREE.PointLight(0xfbbf24, 1.8, 8);
    chestLight.position.y = 1.0;
    chestGroup.add(chestLight);

    chestGroup.position.set(x, y, z);
    scene.add(chestGroup);

    const chestData = {
      group: chestGroup,
      light: chestLight,
      x: x, y: y, z: z,
      opened: false
    };
    lootChests.push(chestData);
    environmentObjects.push(chestData);
  }

  const towerPositions = [
    { x: 30, z: 30 },
    { x: -30, z: -30 },
    { x: 40, z: -40 },
    { x: -40, z: 40 }
  ];
  const woodMat = new THREE.MeshLambertMaterial({ color: 0x8b5a2b });
  towerPositions.forEach(pos => {
    const y = getTerrainHeight(pos.x, pos.z);
    const tower = new THREE.Group();
    const deltas = [-2, 2];
    for (let i = 0; i < deltas.length; i++) {
      for (let j = 0; j < deltas.length; j++) {
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 5), woodMat);
        pillar.position.set(deltas[i], 2.5, deltas[j]);
        pillar.castShadow = true;
        tower.add(pillar);
      }
    }
    const platform = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.3, 5.2), woodMat);
    platform.position.y = 5.1;
    platform.castShadow = true;
    platform.receiveShadow = true;
    tower.add(platform);

    tower.position.set(pos.x, y, pos.z);
    scene.add(tower);
  });
}

spawnEnvironment();

// --- STORM SYSTEM ---
const stormGeo = new THREE.CylinderGeometry(GameState.storm.radius, GameState.storm.radius, 100, 48, 1, true);
const stormMat = new THREE.MeshBasicMaterial({
  color: 0x9333ea,
  transparent: true,
  opacity: 0.35,
  side: THREE.DoubleSide
});
const stormMesh = new THREE.Mesh(stormGeo, stormMat);
stormMesh.position.set(0, 40, 0);
scene.add(stormMesh);

function updateStorm(dt) {
  if (GameState.isGameOver) return;
  GameState.storm.shrinkTimer -= dt;
  if (GameState.storm.shrinkTimer <= 0) {
    GameState.storm.phase++;
    GameState.storm.shrinkTimer = 75;
    if (GameState.storm.phase === 2) GameState.storm.targetRadius = 60;
    else if (GameState.storm.phase === 3) GameState.storm.targetRadius = 25;
    else if (GameState.storm.phase >= 4) GameState.storm.targetRadius = 8;
  }

  if (GameState.storm.radius > GameState.storm.targetRadius) {
    GameState.storm.radius -= dt * 1.5;
    stormMesh.scale.set(GameState.storm.radius / 120, 1, GameState.storm.radius / 120);
  }

  const mins = Math.floor(Math.max(0, GameState.storm.shrinkTimer) / 60);
  const secs = Math.floor(Math.max(0, GameState.storm.shrinkTimer) % 60);
  const timerStr = (mins < 10 ? '0' + mins : mins) + ':' + (secs < 10 ? '0' + secs : secs);
  const stormTimerEl = document.getElementById('storm-timer');
  if (stormTimerEl) stormTimerEl.innerText = timerStr;

  const distFromCenter = Math.sqrt(player.position.x * player.position.x + player.position.z * player.position.z);
  const isOutside = distFromCenter > GameState.storm.radius;
  const overlayEl = document.getElementById('storm-overlay');
  if (overlayEl) overlayEl.classList.toggle('active', isOutside);

  if (isOutside) {
    damagePlayer(dt * 6, 'the Storm');
  }
}

// --- HIGH-QUALITY STYLIZED CHARACTER RIG BUILDER ---
function createCharacterRig(palette) {
  const group = new THREE.Group();
  
  const armorMat = new THREE.MeshLambertMaterial({ color: palette.armor || 0x1e293b });
  const accentMat = new THREE.MeshLambertMaterial({ color: palette.accent || 0x38bdf8, emissive: palette.accent || 0x38bdf8, emissiveIntensity: 0.3 });
  const skinMat = new THREE.MeshLambertMaterial({ color: palette.skin || 0xfbcfe8 });
  const helmetMat = new THREE.MeshLambertMaterial({ color: palette.helmet || 0x0f172a });
  const visorMat = new THREE.MeshBasicMaterial({ color: palette.visor || 0x00f0ff });
  const darkMat = new THREE.MeshLambertMaterial({ color: 0x090d16 });
  const goldMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b });

  // Pelvis / Hips
  const pelvis = new THREE.Group();
  pelvis.position.y = 1.0;
  const hipMesh = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.35, 0.45), armorMat);
  hipMesh.castShadow = true;
  pelvis.add(hipMesh);

  // Utility Belt & Pouches
  const belt = new THREE.Mesh(new THREE.BoxGeometry(0.76, 0.12, 0.5), darkMat);
  pelvis.add(belt);
  const pouchL = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.15), darkMat);
  pouchL.position.set(-0.35, 0, 0.12);
  pelvis.add(pouchL);
  const pouchR = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.18, 0.15), darkMat);
  pouchR.position.set(0.35, 0, 0.12);
  pelvis.add(pouchR);

  // Spine & Torso Group
  const spine = new THREE.Group();
  spine.position.y = 0.2;

  // Sculpted Chest Armor
  const torsoMesh = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.95, 0.52), armorMat);
  torsoMesh.position.y = 0.45;
  torsoMesh.castShadow = true;
  spine.add(torsoMesh);

  // Glowing Cyber Core Reactor
  const coreMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.1, 8), accentMat);
  coreMesh.rotateX(Math.PI / 2);
  coreMesh.position.set(0, 0.55, 0.28);
  spine.add(coreMesh);

  // Shoulder Pads
  const shoulderPadL = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.4), armorMat);
  shoulderPadL.position.set(-0.58, 0.8, 0);
  shoulderPadL.castShadow = true;
  spine.add(shoulderPadL);

  const shoulderPadR = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.22, 0.4), armorMat);
  shoulderPadR.position.set(0.58, 0.8, 0);
  shoulderPadR.castShadow = true;
  spine.add(shoulderPadR);

  // Jump-pack Thrusters (Back)
  const jetpack = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.65, 0.25), darkMat);
  jetpack.position.set(0, 0.5, -0.32);
  spine.add(jetpack);
  const ventL = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.2), accentMat);
  ventL.position.set(-0.16, 0.15, -0.38);
  spine.add(ventL);
  const ventR = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.1, 0.2), accentMat);
  ventR.position.set(0.16, 0.15, -0.38);
  spine.add(ventR);

  // Head & Tactical Helmet
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.15, 0);

  const helmetMesh = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.58, 0.55), helmetMat);
  helmetMesh.castShadow = true;
  headGroup.add(helmetMesh);

  const visorMesh = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.22, 0.12), visorMat);
  visorMesh.position.set(0, 0.05, 0.27);
  headGroup.add(visorMesh);

  // Antenna earpiece
  const antenna = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.3), accentMat);
  antenna.position.set(0.3, 0.25, 0);
  headGroup.add(antenna);

  spine.add(headGroup);

  // Left Arm
  const leftArm = new THREE.Group();
  leftArm.position.set(-0.62, 0.75, 0);
  const lUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.45, 0.24), armorMat);
  lUpperArm.position.y = -0.22;
  lUpperArm.castShadow = true;
  leftArm.add(lUpperArm);
  const lForearm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.45, 0.22), skinMat);
  lForearm.position.y = -0.65;
  lForearm.castShadow = true;
  leftArm.add(lForearm);
  spine.add(leftArm);

  // Right Arm (Weapon Arm)
  const rightArm = new THREE.Group();
  rightArm.position.set(0.62, 0.75, 0);
  const rUpperArm = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.45, 0.24), armorMat);
  rUpperArm.position.y = -0.22;
  rUpperArm.castShadow = true;
  rightArm.add(rUpperArm);
  const rForearm = new THREE.Mesh(new THREE.BoxGeometry(0.22, 0.45, 0.22), skinMat);
  rForearm.position.y = -0.65;
  rForearm.castShadow = true;
  rightArm.add(rForearm);

  // Weapon Holder Model
  const weaponHolder = new THREE.Group();
  const gunReceiver = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.24, 0.8), darkMat);
  gunReceiver.position.set(0, 0, 0.35);
  weaponHolder.add(gunReceiver);
  const gunBarrel = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.65), goldMat);
  gunBarrel.rotateX(Math.PI / 2);
  gunBarrel.position.set(0, 0.05, 0.9);
  weaponHolder.add(gunBarrel);

  weaponHolder.position.set(0, -0.75, 0.2);
  rightArm.add(weaponHolder);
  spine.add(rightArm);

  pelvis.add(spine);

  // Left Leg
  const leftLeg = new THREE.Group();
  leftLeg.position.set(-0.24, -0.15, 0);
  const lThigh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.45, 0.32), armorMat);
  lThigh.position.y = -0.22;
  lThigh.castShadow = true;
  leftLeg.add(lThigh);
  const lKnee = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.15, 0.35), darkMat);
  lKnee.position.set(0, -0.45, 0.02);
  leftLeg.add(lKnee);
  const lShin = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), armorMat);
  lShin.position.y = -0.68;
  lShin.castShadow = true;
  leftLeg.add(lShin);
  const lBoot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.42), darkMat);
  lBoot.position.set(0, -0.92, 0.06);
  lBoot.castShadow = true;
  leftLeg.add(lBoot);
  pelvis.add(leftLeg);

  // Right Leg
  const rightLeg = new THREE.Group();
  rightLeg.position.set(0.24, -0.15, 0);
  const rThigh = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.45, 0.32), armorMat);
  rThigh.position.y = -0.22;
  rThigh.castShadow = true;
  rightLeg.add(rThigh);
  const rKnee = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.15, 0.35), darkMat);
  rKnee.position.set(0, -0.45, 0.02);
  rightLeg.add(rKnee);
  const rShin = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.45, 0.26), armorMat);
  rShin.position.y = -0.68;
  rShin.castShadow = true;
  rightLeg.add(rShin);
  const rBoot = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.18, 0.42), darkMat);
  rBoot.position.set(0, -0.92, 0.06);
  rBoot.castShadow = true;
  rightLeg.add(rBoot);
  pelvis.add(rightLeg);

  group.add(pelvis);

  return {
    root: group,
    pelvis: pelvis,
    spine: spine,
    head: headGroup,
    leftArm: leftArm,
    rightArm: rightArm,
    leftLeg: leftLeg,
    rightLeg: rightLeg,
    weaponHolder: weaponHolder
  };
}

// --- PLAYER CLASS ---
class Player {
  constructor() {
    this.position = new THREE.Vector3(0, 5, 0);
    this.velocity = new THREE.Vector3();
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.isGrounded = false;
    this.speed = 9.5;
    this.sprintMultiplier = 1.45;
    this.jumpForce = 12.5;
    this.gravity = 28;
    this.isAiming = false;
    this.recoilKick = 0;
    this.walkCycle = 0;

    this.rig = createCharacterRig({
      armor: 0x1e293b,
      accent: 0x38bdf8,
      skin: 0xfbcfe8,
      helmet: 0x0f172a,
      visor: 0x00f0ff
    });
    this.mesh = this.rig.root;
    scene.add(this.mesh);
  }

  update(dt, input) {
    if (GameState.isGameOver) return;

    const moveDir = new THREE.Vector3();
    if (input.forward) moveDir.z -= 1;
    if (input.backward) moveDir.z += 1;
    if (input.left) moveDir.x -= 1;
    if (input.right) moveDir.x += 1;

    const isMoving = moveDir.lengthSq() > 0;

    if (isMoving) {
      moveDir.normalize();
      moveDir.applyEuler(new THREE.Euler(0, this.rotation.y, 0));

      const curSpeed = this.speed * (input.sprint ? this.sprintMultiplier : 1) * (this.isAiming ? 0.6 : 1);
      this.velocity.x = moveDir.x * curSpeed;
      this.velocity.z = moveDir.z * curSpeed;

      const cadence = (input.sprint ? 14 : 10) * dt;
      this.walkCycle += cadence;
    } else {
      this.velocity.x *= 0.78;
      this.velocity.z *= 0.78;
      this.walkCycle *= 0.85;
    }

    if (input.jump && this.isGrounded) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
    }

    this.velocity.y -= this.gravity * dt;

    this.position.x += this.velocity.x * dt;
    this.position.y += this.velocity.y * dt;
    this.position.z += this.velocity.z * dt;

    let groundHeight = getTerrainHeight(this.position.x, this.position.z);
    
    for (let i = 0; i < builtStructures.length; i++) {
      const b = builtStructures[i];
      const dx = Math.abs(this.position.x - b.mesh.position.x);
      const dz = Math.abs(this.position.z - b.mesh.position.z);
      if (dx < 2.2 && dz < 2.2) {
        if (b.type === 'floor' && this.position.y >= b.mesh.position.y - 0.2) {
          groundHeight = Math.max(groundHeight, b.mesh.position.y + 0.1);
        } else if (b.type === 'ramp') {
          groundHeight = Math.max(groundHeight, b.mesh.position.y + 0.5);
        }
      }
    }

    if (this.position.y <= groundHeight) {
      this.position.y = groundHeight;
      this.velocity.y = 0;
      this.isGrounded = true;
    }

    this.mesh.position.copy(this.position);
    this.mesh.rotation.y = this.rotation.y;

    // PROCEDURAL ANIMATIONS
    const t = this.walkCycle;
    const legAmp = isMoving ? (input.sprint ? 0.75 : 0.55) : 0;
    
    this.rig.leftLeg.rotation.x = Math.sin(t) * legAmp;
    this.rig.rightLeg.rotation.x = -Math.sin(t) * legAmp;

    // Pelvis vertical bounce
    this.rig.pelvis.position.y = 1.0 + (isMoving ? Math.abs(Math.sin(t * 2)) * 0.08 : 0);

    // Spine forward lean & torsion
    this.rig.spine.rotation.x = isMoving ? (input.sprint ? 0.22 : 0.1) : 0;
    this.rig.spine.rotation.y = isMoving ? Math.sin(t) * 0.08 : 0;
    this.rig.head.rotation.y = -this.rig.spine.rotation.y; // Keep head centered

    // Aim & Recoil
    this.recoilKick = Math.max(0, this.recoilKick - dt * 5.0);
    this.rig.rightArm.rotation.x = -Math.PI / 3 + this.rotation.x * 0.7 - this.recoilKick * 0.3;
    this.rig.leftArm.rotation.x = isMoving && !this.isAiming ? Math.sin(t) * 0.4 : -Math.PI / 4;
    this.rig.weaponHolder.position.z = 0.2 - this.recoilKick * 0.12;

    this.updateCamera();
  }

  updateCamera() {
    const camDist = this.isAiming ? 2.3 : 4.2;
    const camHeight = this.isAiming ? 1.6 : 2.1;
    const camRightOffset = this.isAiming ? 0.65 : 0.9;

    const offset = new THREE.Vector3(camRightOffset, camHeight, camDist);
    offset.applyEuler(new THREE.Euler(this.rotation.x, this.rotation.y, 0, 'YXZ'));

    camera.position.copy(this.position).add(offset);

    const lookTarget = new THREE.Vector3(0, 1.5, -20);
    lookTarget.applyEuler(new THREE.Euler(this.rotation.x, this.rotation.y, 0, 'YXZ'));
    lookTarget.add(this.position);
    camera.lookAt(lookTarget);
  }
}

const player = new Player();

// --- BUILDING PREVIEW & SYSTEM ---
const buildMaterials = {
  preview: new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.55 }),
  woodWall: new THREE.MeshLambertMaterial({ color: 0x8b5a2b }),
  woodRamp: new THREE.MeshLambertMaterial({ color: 0x9c6634 }),
  woodFloor: new THREE.MeshLambertMaterial({ color: 0x7c491e })
};

const buildPreview = new THREE.Mesh(new THREE.BoxGeometry(4, 3.5, 0.25), buildMaterials.preview);
buildPreview.visible = false;
scene.add(buildPreview);

function updateBuildPreview() {
  if (!GameState.activeBuild) {
    buildPreview.visible = false;
    return;
  }

  buildPreview.visible = true;
  const snapDist = 4.0;
  const forward = new THREE.Vector3(0, 0, -snapDist).applyEuler(new THREE.Euler(0, player.rotation.y, 0));
  const targetPos = player.position.clone().add(forward);

  targetPos.x = Math.round(targetPos.x / 4) * 4;
  targetPos.z = Math.round(targetPos.z / 4) * 4;
  targetPos.y = Math.round(targetPos.y / 3) * 3 + (GameState.activeBuild === 'floor' ? 3.0 : 1.75);

  buildPreview.position.copy(targetPos);
  buildPreview.rotation.y = Math.round(player.rotation.y / (Math.PI / 2)) * (Math.PI / 2);

  if (GameState.activeBuild === 'wall') {
    buildPreview.geometry = new THREE.BoxGeometry(4, 3.5, 0.25);
    buildPreview.rotation.x = 0;
  } else if (GameState.activeBuild === 'ramp') {
    buildPreview.geometry = new THREE.BoxGeometry(4, 4.8, 0.25);
    buildPreview.rotation.x = Math.PI / 4;
  } else if (GameState.activeBuild === 'floor') {
    buildPreview.geometry = new THREE.BoxGeometry(4, 0.25, 4);
    buildPreview.rotation.x = 0;
  }
}

function placeBuilding() {
  if (!GameState.activeBuild) return;
  if (GameState.materials.wood < 10) {
    showKillMessage('Not enough Wood to build!');
    return;
  }

  GameState.materials.wood -= 10;
  updateHUDMaterials();
  sounds.playBuild();

  let geo, mat;
  if (GameState.activeBuild === 'wall') {
    geo = new THREE.BoxGeometry(4, 3.5, 0.25);
    mat = buildMaterials.woodWall;
  } else if (GameState.activeBuild === 'ramp') {
    geo = new THREE.BoxGeometry(4, 4.8, 0.25);
    mat = buildMaterials.woodRamp;
  } else {
    geo = new THREE.BoxGeometry(4, 0.25, 4);
    mat = buildMaterials.woodFloor;
  }

  const piece = new THREE.Mesh(geo, mat);
  piece.position.copy(buildPreview.position);
  piece.rotation.copy(buildPreview.rotation);
  piece.castShadow = true;
  piece.receiveShadow = true;
  scene.add(piece);

  const bData = {
    mesh: piece,
    type: GameState.activeBuild,
    health: 150,
    maxHealth: 150
  };
  builtStructures.push(bData);
  destructibleObjects.push(bData);

  spawnSparks(piece.position, 0x8b5a2b, 8);
}

// --- WEAPONS & SHOOTING MECHANICS ---
let lastShotTime = 0;
let isConsumingShield = false;
let consumeStartTime = 0;

function fireActiveWeapon() {
  const now = performance.now();
  const slot = GameState.activeSlot;

  if (slot === 1) {
    sounds.playPickaxe();
    player.recoilKick = 1.0;
    performMeleeHarvest();
    return;
  }

  if (slot === 2) {
    if (GameState.ammo.ar.clip <= 0) return;
    if (now - lastShotTime < 110) return;
    lastShotTime = now;
    GameState.ammo.ar.clip--;
    sounds.playAR();
    player.recoilKick = 0.6;
    performRaycastShoot(32, 1.75, 0.02, 180);
    updateAmmoHUD();
  } else if (slot === 3) {
    if (GameState.ammo.shotgun.clip <= 0) return;
    if (now - lastShotTime < 800) return;
    lastShotTime = now;
    GameState.ammo.shotgun.clip--;
    sounds.playShotgun();
    player.recoilKick = 1.2;
    for (let i = 0; i < 8; i++) {
      performRaycastShoot(12, 1.5, 0.07, 45);
    }
    updateAmmoHUD();
  } else if (slot === 4) {
    if (GameState.ammo.sniper.clip <= 0) return;
    if (now - lastShotTime < 1400) return;
    lastShotTime = now;
    GameState.ammo.sniper.clip--;
    sounds.playSniper();
    player.recoilKick = 1.8;
    performRaycastShoot(125, 2.0, 0.001, 350);
    updateAmmoHUD();
  } else if (slot === 5) {
    startShieldConsumption();
  }
}

function performMeleeHarvest() {
  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(new THREE.Vector2(0, 0), camera);
  const targets = destructibleObjects.map(d => d.mesh);
  const hits = raycaster.intersectObjects(targets, true);

  if (hits.length > 0 && hits[0].distance < 3.8) {
    const hitObj = hits[0].object;
    const targetData = destructibleObjects.find(d => d.mesh === hitObj || (d.mesh.children && d.mesh.children.includes(hitObj)));
    if (targetData) {
      targetData.health -= 25;
      spawnSparks(hits[0].point, 0xf59e0b, 6);

      if (targetData.resource === 'wood') {
        GameState.materials.wood += 15;
        showDamageNumber(15, hits[0].point, 'dmg-shield', '+15 Wood');
      } else if (targetData.resource === 'stone') {
        GameState.materials.stone += 15;
        showDamageNumber(15, hits[0].point, 'dmg-body', '+15 Stone');
      }
      updateHUDMaterials();

      if (targetData.health <= 0) {
        scene.remove(targetData.mesh);
        const idx = destructibleObjects.indexOf(targetData);
        if (idx > -1) destructibleObjects.splice(idx, 1);
      }
    }
  }
}

function performRaycastShoot(baseDmg, headshotMult, spread, range) {
  const raycaster = new THREE.Raycaster();
  const screenSpread = new THREE.Vector2(
    (Math.random() - 0.5) * spread,
    (Math.random() - 0.5) * spread
  );
  raycaster.setFromCamera(screenSpread, camera);

  const botMeshes = enemyBots.map(b => b.mesh);
  const structMeshes = builtStructures.map(s => s.mesh);
  const allTargets = botMeshes.concat(structMeshes);

  const hits = raycaster.intersectObjects(allTargets, true);
  const startPos = player.rig.weaponHolder.getWorldPosition(new THREE.Vector3());
  let endPos = startPos.clone().add(raycaster.ray.direction.clone().multiplyScalar(range));

  if (hits.length > 0) {
    const hit = hits[0];
    endPos = hit.point;

    const hitBot = enemyBots.find(b => b.mesh === hit.object || (b.mesh.children && b.mesh.children.includes(hit.object)));
    if (hitBot) {
      const isHeadshot = (hit.point.y - hitBot.position.y) > 1.8;
      const finalDmg = Math.round(baseDmg * (isHeadshot ? headshotMult : 1));

      damageBot(hitBot, finalDmg, isHeadshot, hit.point, 'Player');
      triggerHitmarker(isHeadshot);
    } else {
      const hitStruct = builtStructures.find(s => s.mesh === hit.object);
      if (hitStruct) {
        hitStruct.health -= baseDmg;
        spawnSparks(hit.point, 0x8b5a2b, 4);
        if (hitStruct.health <= 0) {
          scene.remove(hitStruct.mesh);
          const sIdx = builtStructures.indexOf(hitStruct);
          if (sIdx > -1) builtStructures.splice(sIdx, 1);
        }
      }
    }
    spawnSparks(hit.point, 0xffffff, 4);
  }

  createTracer(startPos, endPos);
}

function createTracer(start, end) {
  const geo = new THREE.BufferGeometry().setFromPoints([start, end]);
  const mat = new THREE.LineBasicMaterial({ color: 0xfde047, transparent: true, opacity: 0.9 });
  const line = new THREE.Line(geo, mat);
  scene.add(line);
  bulletTracers.push({ line: line, createdAt: performance.now() });
}

function startShieldConsumption() {
  if (GameState.ammo.shields.count <= 0 || GameState.shield >= 100 || isConsumingShield) return;
  isConsumingShield = true;
  consumeStartTime = performance.now();
  const barContainer = document.getElementById('action-progress-container');
  if (barContainer) barContainer.classList.add('active');
}

function updateShieldConsumption() {
  if (!isConsumingShield) return;
  const elapsed = (performance.now() - consumeStartTime) / 1000;
  const progress = Math.min(1, elapsed / 2.0);
  const fillEl = document.getElementById('action-bar-fill');
  if (fillEl) fillEl.style.width = (progress * 100) + '%';

  if (progress >= 1) {
    isConsumingShield = false;
    const barContainer = document.getElementById('action-progress-container');
    if (barContainer) barContainer.classList.remove('active');
    GameState.ammo.shields.count--;
    GameState.shield = Math.min(100, GameState.shield + 50);
    sounds.playShieldDrink();
    updateHealthHUD();
    updateAmmoHUD();
  }
}

// --- FREE-FOR-ALL COMBAT BOTS WITH DISTINCT SKINS ---
const botProfiles = [
  { name: 'VortexSniper', armor: 0x0284c7, accent: 0x38bdf8, helmet: 0x0369a1, visor: 0x67e8f9 },
  { name: 'ShadowNinja', armor: 0x18181b, accent: 0xa1a1aa, helmet: 0x09090b, visor: 0xff0055 },
  { name: 'CyberCrimson', armor: 0x991b1b, accent: 0xef4444, helmet: 0x7f1d1d, visor: 0xfde047 },
  { name: 'TitanGold', armor: 0x854d0e, accent: 0xfacc15, helmet: 0x713f12, visor: 0xfef08a },
  { name: 'ToxicPhantom', armor: 0x166534, accent: 0x4ade80, helmet: 0x14532d, visor: 0xa3e635 },
  { name: 'VoidReaper', armor: 0x581c87, accent: 0xc084fc, helmet: 0x3b0764, visor: 0xe879f9 },
  { name: 'FrostBite', armor: 0x1e3a8a, accent: 0x93c5fd, helmet: 0x172554, visor: 0xdbeafe },
  { name: 'SolarFlare', armor: 0xc2410c, accent: 0xfb923c, helmet: 0x9a3412, visor: 0xfef08a },
  { name: 'IronClaw', armor: 0x334155, accent: 0x94a3b8, helmet: 0x1e293b, visor: 0x38bdf8 },
  { name: 'NeonSpectre', armor: 0x065f46, accent: 0x2dd4bf, helmet: 0x044e3b, visor: 0x5eead4 }
];

class Bot {
  constructor(profile, x, z) {
    this.name = profile.name;
    this.position = new THREE.Vector3(x, getTerrainHeight(x, z), z);
    this.velocity = new THREE.Vector3();
    this.health = 100;
    this.shield = 50;
    this.isDead = false;
    this.lastShot = Math.random() * 1000;
    this.currentTarget = null;
    this.walkCycle = Math.random() * 10;

    this.rig = createCharacterRig({
      armor: profile.armor,
      accent: profile.accent,
      skin: 0xfbcfe8,
      helmet: profile.helmet,
      visor: profile.visor
    });
    this.mesh = this.rig.root;
    this.mesh.position.copy(this.position);
    scene.add(this.mesh);
  }

  update(dt) {
    if (this.isDead || GameState.isGameOver) return;

    // TARGET SELECTION: Player OR Closest Other Bot (Free-for-All!)
    let closestTarget = null;
    let closestDist = 45;

    // Check Player
    const distToPlayer = this.position.distanceTo(player.position);
    if (distToPlayer < closestDist) {
      closestDist = distToPlayer;
      closestTarget = { type: 'player', obj: player, pos: player.position };
    }

    // Check Other Bots
    for (let i = 0; i < enemyBots.length; i++) {
      const otherBot = enemyBots[i];
      if (otherBot !== this && !otherBot.isDead) {
        const distToBot = this.position.distanceTo(otherBot.position);
        if (distToBot < closestDist) {
          closestDist = distToBot;
          closestTarget = { type: 'bot', obj: otherBot, pos: otherBot.position };
        }
      }
    }

    this.currentTarget = closestTarget;
    let isMoving = false;

    if (this.currentTarget) {
      const targetPos = this.currentTarget.pos;
      this.mesh.lookAt(targetPos.x, this.position.y + 1.2, targetPos.z);

      // Strafe / Advance
      const strafe = Math.sin(performance.now() * 0.003 + this.walkCycle) * 3.5;
      const fwd = closestDist > 15 ? 3.0 : -1.5;

      const forwardVec = new THREE.Vector3(0, 0, -1).applyQuaternion(this.mesh.quaternion);
      const rightVec = new THREE.Vector3(1, 0, 0).applyQuaternion(this.mesh.quaternion);

      this.position.addScaledVector(rightVec, strafe * dt);
      this.position.addScaledVector(forwardVec, fwd * dt);
      isMoving = true;
      this.walkCycle += 10 * dt;

      // FFA Shoot at target
      if (performance.now() - this.lastShot > (1200 + Math.random() * 600)) {
        this.lastShot = performance.now();
        sounds.playAR();
        const startPos = this.position.clone().add(new THREE.Vector3(0, 1.4, 0));
        createTracer(startPos, targetPos);

        if (this.currentTarget.type === 'player') {
          if (Math.random() < 0.28) {
            damagePlayer(16, this.name);
          }
        } else if (this.currentTarget.type === 'bot') {
          if (Math.random() < 0.45) {
            damageBot(this.currentTarget.obj, 24, false, this.currentTarget.pos, this.name);
          }
        }
      }
    } else {
      // Roam toward center / safe zone
      const dirToCenter = new THREE.Vector3(GameState.storm.x - this.position.x, 0, GameState.storm.z - this.position.z);
      if (dirToCenter.length() > 5) {
        dirToCenter.normalize();
        this.mesh.lookAt(this.position.x + dirToCenter.x, this.position.y, this.position.z + dirToCenter.z);
        this.position.addScaledVector(dirToCenter, 4.0 * dt);
        isMoving = true;
        this.walkCycle += 8 * dt;
      }
    }

    this.position.y = getTerrainHeight(this.position.x, this.position.z);
    this.mesh.position.copy(this.position);

    // PROCEDURAL BOT ANIMATION
    const t = this.walkCycle;
    const legAmp = isMoving ? 0.5 : 0;
    this.rig.leftLeg.rotation.x = Math.sin(t) * legAmp;
    this.rig.rightLeg.rotation.x = -Math.sin(t) * legAmp;
    this.rig.pelvis.position.y = 1.0 + (isMoving ? Math.abs(Math.sin(t * 2)) * 0.06 : 0);
    this.rig.rightArm.rotation.x = -Math.PI / 3;
    this.rig.leftArm.rotation.x = isMoving ? Math.sin(t) * 0.3 : -Math.PI / 4;
  }

  buildDefensiveWall() {
    const wallGeo = new THREE.BoxGeometry(4, 3.5, 0.25);
    const wall = new THREE.Mesh(wallGeo, buildMaterials.woodWall);
    wall.position.copy(this.position).add(new THREE.Vector3(0, 1.75, 0));
    if (this.currentTarget) wall.lookAt(this.currentTarget.pos);
    wall.castShadow = true;
    scene.add(wall);
    builtStructures.push({ mesh: wall, type: 'wall', health: 150 });
  }
}

function spawnBots() {
  for (let i = 0; i < botProfiles.length; i++) {
    const angle = (i / botProfiles.length) * Math.PI * 2 + Math.random() * 0.3;
    const r = 35 + Math.random() * 55;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const bot = new Bot(botProfiles[i], x, z);
    enemyBots.push(bot);
  }
}

spawnBots();

function damageBot(bot, amount, isHeadshot, hitPoint, attackerName) {
  if (bot.isDead) return;

  if (bot.shield > 0) {
    const sDmg = Math.min(bot.shield, amount);
    bot.shield -= sDmg;
    amount -= sDmg;
    showDamageNumber(sDmg, hitPoint, 'dmg-shield');
  }
  if (amount > 0) {
    bot.health -= amount;
    showDamageNumber(amount, hitPoint, isHeadshot ? 'dmg-crit' : 'dmg-body');
  }

  if (attackerName === 'Player') {
    GameState.damageDealt += amount;
  }

  // 40% chance to build protective wall
  if (Math.random() < 0.4 && !bot.isDead) {
    bot.buildDefensiveWall();
  }

  if (bot.health <= 0) {
    bot.isDead = true;
    scene.remove(bot.mesh);
    const idx = enemyBots.indexOf(bot);
    if (idx > -1) enemyBots.splice(idx, 1);

    if (attackerName === 'Player') {
      GameState.kills++;
      const killsEl = document.getElementById('kills-count');
      if (killsEl) killsEl.innerText = GameState.kills;
      showKillMessage('You eliminated ' + bot.name);
      sounds.playVictory();
    } else {
      showKillMessage(attackerName + ' eliminated ' + bot.name);
    }

    GameState.playersAlive = Math.max(1, GameState.playersAlive - 1);
    const aliveEl = document.getElementById('players-alive-count');
    if (aliveEl) aliveEl.innerText = GameState.playersAlive;

    if (GameState.playersAlive === 1) {
      triggerVictory();
    }
  }
}

function damagePlayer(amount, source) {
  if (GameState.isGameOver) return;

  if (GameState.shield > 0) {
    const sDmg = Math.min(GameState.shield, amount);
    GameState.shield -= sDmg;
    amount -= sDmg;
  }
  if (amount > 0) {
    GameState.health -= amount;
  }

  updateHealthHUD();

  if (GameState.health <= 0) {
    triggerGameOver(source);
  }
}

// --- PARTICLES & DAMAGE NUMBERS ---
function spawnSparks(pos, colorHex, count = 6) {
  for (let i = 0; i < count; i++) {
    const pGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const pMat = new THREE.MeshBasicMaterial({ color: colorHex });
    const p = new THREE.Mesh(pGeo, pMat);
    p.position.copy(pos);
    p.velocity = new THREE.Vector3(
      (Math.random() - 0.5) * 6,
      Math.random() * 5 + 2,
      (Math.random() - 0.5) * 6
    );
    p.createdAt = performance.now();
    scene.add(p);
    particlePool.push(p);
  }
}

function showDamageNumber(val, worldPos, typeClass, customText) {
  const layer = document.getElementById('damage-layer');
  if (!layer) return;
  const div = document.createElement('div');
  div.className = 'dmg-number ' + typeClass;
  div.innerText = customText || val;

  const screenPos = worldPos.clone().project(camera);
  const x = (screenPos.x * 0.5 + 0.5) * window.innerWidth;
  const y = (-(screenPos.y * 0.5) + 0.5) * window.innerHeight;

  div.style.left = x + 'px';
  div.style.top = y + 'px';
  layer.appendChild(div);

  setTimeout(() => div.remove(), 750);
}

function triggerHitmarker(crit) {
  const hm = document.getElementById('hitmarker');
  if (hm) {
    hm.classList.add('active');
    sounds.playHitmarker(crit);
    setTimeout(() => hm.classList.remove('active'), 120);
  }
}

function showKillMessage(msg) {
  const feed = document.getElementById('kill-feed');
  if (!feed) return;
  const div = document.createElement('div');
  div.className = 'kill-msg';
  div.innerText = msg;
  feed.appendChild(div);
  setTimeout(() => div.remove(), 4000);
}

// --- MINIMAP RADAR ---
const minimapCanvas = document.getElementById('minimap-canvas');
const minimapCtx = minimapCanvas ? minimapCanvas.getContext('2d') : null;

function drawMinimap() {
  if (!minimapCtx) return;
  const w = minimapCanvas.width;
  const h = minimapCanvas.height;
  minimapCtx.clearRect(0, 0, w, h);

  const cx = w / 2;
  const cy = h / 2;
  const scale = 0.6;

  minimapCtx.fillStyle = '#1e3a29';
  minimapCtx.beginPath();
  minimapCtx.arc(cx, cy, 65, 0, Math.PI * 2);
  minimapCtx.fill();

  minimapCtx.strokeStyle = '#9333ea';
  minimapCtx.lineWidth = 3;
  minimapCtx.beginPath();
  minimapCtx.arc(cx + GameState.storm.x * scale, cy + GameState.storm.z * scale, GameState.storm.radius * scale, 0, Math.PI * 2);
  minimapCtx.stroke();

  minimapCtx.fillStyle = '#fbbf24';
  lootChests.forEach(c => {
    if (!c.opened) {
      minimapCtx.fillRect(cx + c.x * scale - 2, cy + c.z * scale - 2, 4, 4);
    }
  });

  minimapCtx.fillStyle = '#ef4444';
  enemyBots.forEach(b => {
    minimapCtx.beginPath();
    minimapCtx.arc(cx + b.position.x * scale, cy + b.position.z * scale, 3, 0, Math.PI * 2);
    minimapCtx.fill();
  });

  minimapCtx.save();
  minimapCtx.translate(cx + player.position.x * scale, cy + player.position.z * scale);
  minimapCtx.rotate(-player.rotation.y);
  minimapCtx.fillStyle = '#38bdf8';
  minimapCtx.beginPath();
  minimapCtx.moveTo(0, -6);
  minimapCtx.lineTo(4, 5);
  minimapCtx.lineTo(-4, 5);
  minimapCtx.closePath();
  minimapCtx.fill();
  minimapCtx.restore();
}

// --- HUD UPDATES ---
function updateHealthHUD() {
  const hFill = document.getElementById('health-bar-fill');
  const hText = document.getElementById('health-text');
  if (hFill) hFill.style.width = GameState.health + '%';
  if (hText) hText.innerText = Math.round(GameState.health) + ' / 100';

  const sFill = document.getElementById('shield-bar-fill');
  const sText = document.getElementById('shield-text');
  if (sFill) sFill.style.width = GameState.shield + '%';
  if (sText) sText.innerText = Math.round(GameState.shield) + ' / 100';
}

function updateHUDMaterials() {
  const w = document.getElementById('mat-wood-val');
  const s = document.getElementById('mat-stone-val');
  const m = document.getElementById('mat-metal-val');
  if (w) w.innerText = GameState.materials.wood;
  if (s) s.innerText = GameState.materials.stone;
  if (m) m.innerText = GameState.materials.metal;
}

function updateAmmoHUD() {
  const slot = GameState.activeSlot;
  const clipEl = document.getElementById('current-clip');
  const resEl = document.getElementById('reserve-ammo');
  if (!clipEl || !resEl) return;

  if (slot === 2) {
    clipEl.innerText = GameState.ammo.ar.clip;
    resEl.innerText = GameState.ammo.ar.reserve;
  } else if (slot === 3) {
    clipEl.innerText = GameState.ammo.shotgun.clip;
    resEl.innerText = GameState.ammo.shotgun.reserve;
  } else if (slot === 4) {
    clipEl.innerText = GameState.ammo.sniper.clip;
    resEl.innerText = GameState.ammo.sniper.reserve;
  } else if (slot === 5) {
    clipEl.innerText = GameState.ammo.shields.count;
    resEl.innerText = 'Mini';
  } else {
    clipEl.innerText = '∞';
    resEl.innerText = 'Mine';
  }
}

function setActiveSlot(slotNum) {
  GameState.activeSlot = slotNum;
  GameState.activeBuild = null;
  document.querySelectorAll('.build-slot').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.inv-slot').forEach(s => s.classList.remove('active'));
  const slotEl = document.getElementById('slot-' + slotNum);
  if (slotEl) slotEl.classList.add('active');
  updateAmmoHUD();
}

function toggleBuild(type) {
  if (GameState.activeBuild === type) {
    GameState.activeBuild = null;
  } else {
    GameState.activeBuild = type;
  }
  document.querySelectorAll('.build-slot').forEach(b => b.classList.remove('active'));
  if (GameState.activeBuild) {
    const bEl = document.getElementById('build-' + type);
    if (bEl) bEl.classList.add('active');
  }
}

// --- INTERACTION CHECKS (Chests) ---
function checkChestInteraction() {
  let nearestChest = null;
  let minDist = 3.5;
  lootChests.forEach(c => {
    if (!c.opened) {
      const dist = player.position.distanceTo(new THREE.Vector3(c.x, c.y, c.z));
      if (dist < minDist) {
        minDist = dist;
        nearestChest = c;
      }
    }
  });

  const prompt = document.getElementById('interaction-prompt');
  if (prompt) {
    if (nearestChest) {
      prompt.classList.add('active');
      prompt.currentChest = nearestChest;
    } else {
      prompt.classList.remove('active');
      prompt.currentChest = null;
    }
  }
}

function openChest(chest) {
  if (!chest || chest.opened) return;
  chest.opened = true;
  sounds.playChestOpen();

  chest.group.position.y += 0.4;
  chest.group.rotation.x = -0.4;
  chest.light.intensity = 3.0;

  GameState.materials.wood += 80;
  GameState.materials.stone += 40;
  GameState.ammo.shields.count = Math.min(6, GameState.ammo.shields.count + 2);
  GameState.ammo.ar.reserve += 60;
  GameState.ammo.shotgun.reserve += 15;

  updateHUDMaterials();
  updateAmmoHUD();
  showDamageNumber(80, new THREE.Vector3(chest.x, chest.y + 1, chest.z), 'dmg-crit', '✨ Legendary Loot!');
}

// --- VICTORY & GAME OVER FLOWS ---
function triggerVictory() {
  GameState.isGameOver = true;
  if (document.exitPointerLock) document.exitPointerLock();
  sounds.playVictory();
  const vk = document.getElementById('victory-kills');
  const vd = document.getElementById('victory-dmg');
  const vs = document.getElementById('victory-screen');
  if (vk) vk.innerText = GameState.kills;
  if (vd) vd.innerText = GameState.damageDealt;
  if (vs) vs.classList.add('active');
}

function triggerGameOver(killer) {
  GameState.isGameOver = true;
  if (document.exitPointerLock) document.exitPointerLock();
  const eb = document.getElementById('elim-by-text');
  const ep = document.getElementById('elim-placement');
  const ek = document.getElementById('elim-kills');
  const es = document.getElementById('eliminated-screen');
  if (eb) eb.innerText = 'Eliminated by ' + killer;
  if (ep) ep.innerText = '#' + GameState.playersAlive;
  if (ek) ek.innerText = GameState.kills;
  if (es) es.classList.add('active');
}

// --- CONTROLS & EVENT LISTENERS ---
const input = {
  forward: false,
  backward: false,
  left: false,
  right: false,
  sprint: false,
  jump: false
};

window.addEventListener('keydown', (e) => {
  if (!GameState.isStarted || GameState.isGameOver) return;
  const key = e.key.toLowerCase();

  if (key === 'w') input.forward = true;
  if (key === 's') input.backward = true;
  if (key === 'a') input.left = true;
  if (key === 'd') input.right = true;
  if (e.shiftKey) input.sprint = true;
  if (e.code === 'Space') input.jump = true;

  if (key === '1') setActiveSlot(1);
  if (key === '2') setActiveSlot(2);
  if (key === '3') setActiveSlot(3);
  if (key === '4') setActiveSlot(4);
  if (key === '5') setActiveSlot(5);

  if (key === 'q') toggleBuild('wall');
  if (key === 'e') toggleBuild('ramp');
  if (key === 'c') toggleBuild('floor');

  if (key === 'f') {
    const prompt = document.getElementById('interaction-prompt');
    if (prompt && prompt.currentChest) {
      openChest(prompt.currentChest);
    } else if (GameState.activeSlot === 5) {
      startShieldConsumption();
    }
  }

  if (key === 'r') {
    const slot = GameState.activeSlot;
    if (slot === 2) GameState.ammo.ar.clip = 30;
    if (slot === 3) GameState.ammo.shotgun.clip = 5;
    if (slot === 4) GameState.ammo.sniper.clip = 1;
    updateAmmoHUD();
  }
});

window.addEventListener('keyup', (e) => {
  const key = e.key.toLowerCase();
  if (key === 'w') input.forward = false;
  if (key === 's') input.backward = false;
  if (key === 'a') input.left = false;
  if (key === 'd') input.right = false;
  if (!e.shiftKey) input.sprint = false;
  if (e.code === 'Space') input.jump = false;
});

window.addEventListener('mousedown', (e) => {
  if (!GameState.isStarted || GameState.isGameOver) return;
  if (document.pointerLockElement !== document.body) {
    document.body.requestPointerLock();
    return;
  }

  if (e.button === 0) {
    if (GameState.activeBuild) {
      placeBuilding();
    } else {
      fireActiveWeapon();
    }
  } else if (e.button === 2) {
    player.isAiming = true;
    if (GameState.activeSlot === 4) {
      const scope = document.getElementById('sniper-scope');
      if (scope) scope.classList.add('active');
    }
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.button === 2) {
    player.isAiming = false;
    const scope = document.getElementById('sniper-scope');
    if (scope) scope.classList.remove('active');
  }
});

window.addEventListener('contextmenu', (e) => e.preventDefault());

window.addEventListener('mousemove', (e) => {
  if (document.pointerLockElement === document.body && !GameState.isGameOver) {
    const sensitivity = player.isAiming ? 0.0012 : 0.0022;
    player.rotation.y -= e.movementX * sensitivity;
    player.rotation.x -= e.movementY * sensitivity;
    player.rotation.x = Math.max(-Math.PI / 2.3, Math.min(Math.PI / 2.3, player.rotation.x));
  }
});

// START BUTTON
const startBtn = document.getElementById('start-btn');
if (startBtn) {
  startBtn.addEventListener('click', () => {
    GameState.isStarted = true;
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuOverlay) menuOverlay.classList.remove('active');
    document.body.requestPointerLock();
    sounds.ensureContext();
  });
}

const victoryBtn = document.getElementById('play-again-victory-btn');
if (victoryBtn) victoryBtn.addEventListener('click', () => location.reload());

const elimBtn = document.getElementById('play-again-elim-btn');
if (elimBtn) elimBtn.addEventListener('click', () => location.reload());

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- MAIN GAME ANIMATION LOOP ---
let lastFrameTime = performance.now();

function animate() {
  requestAnimationFrame(animate);
  const now = performance.now();
  const dt = Math.min(0.05, (now - lastFrameTime) / 1000);
  lastFrameTime = now;

  if (GameState.isStarted && !GameState.isGameOver) {
    player.update(dt, input);
    updateBuildPreview();
    updateStorm(dt);
    updateShieldConsumption();
    checkChestInteraction();

    enemyBots.forEach(bot => bot.update(dt));

    for (let i = particlePool.length - 1; i >= 0; i--) {
      const p = particlePool[i];
      p.position.addScaledVector(p.velocity, dt);
      p.velocity.y -= 15 * dt;
      if (now - p.createdAt > 600) {
        scene.remove(p);
        particlePool.splice(i, 1);
      }
    }

    for (let i = bulletTracers.length - 1; i >= 0; i--) {
      const t = bulletTracers[i];
      if (now - t.createdAt > 60) {
        scene.remove(t.line);
        bulletTracers.splice(i, 1);
      }
    }

    drawMinimap();
  }

  renderer.render(scene, camera);
}

updateHealthHUD();
updateHUDMaterials();
updateAmmoHUD();
animate();
