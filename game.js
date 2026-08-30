// ==========================================
// APEX ROYALE 3D - BATTLE ROYALE & BUILDING
// ==========================================

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
    osc.frequency.setValueAtTime(160, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.3, this.ctx.currentTime);
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
    filter.frequency.setValueAtTime(800, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.18);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.6, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.35);

    gain.gain.setValueAtTime(0.8, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(450, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(crit ? 2800 : 2000, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
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
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.setValueAtTime(320, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.25, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playChestOpen() {
    if (!this.ctx) return;
    this.ensureContext();
    const freqs = [400, 600, 800, 1200];
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
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(700, this.ctx.currentTime + 0.3);
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
    const notes = [523.25, 659.25, 783.99, 1046.5];
    for (let i = 0; i < notes.length; i++) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(notes[i], this.ctx.currentTime + i * 0.15);
      gain.gain.setValueAtTime(0.3, this.ctx.currentTime + i * 0.15);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + i * 0.15 + 0.5);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(this.ctx.currentTime + i * 0.15);
      osc.stop(this.ctx.currentTime + i * 0.15 + 0.5);
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
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
if (container) container.appendChild(renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444455, 0.4);
scene.add(hemiLight);

const sunLight = new THREE.DirectionalLight(0xfffaed, 0.9);
sunLight.position.set(60, 100, 50);
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

  const mat = new THREE.MeshLambertMaterial({ color: 0x567d46 });
  const terrain = new THREE.Mesh(geo, mat);
  terrain.receiveShadow = true;
  scene.add(terrain);

  const waterGeo = new THREE.PlaneGeometry(800, 800);
  waterGeo.rotateX(-Math.PI / 2);
  const waterMat = new THREE.MeshLambertMaterial({
    color: 0x1d4ed8,
    transparent: true,
    opacity: 0.8
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
  const treeLeavesMat = new THREE.MeshLambertMaterial({ color: 0x2e6f40 });
  const rockMat = new THREE.MeshLambertMaterial({ color: 0x708090 });
  const chestMat = new THREE.MeshLambertMaterial({ color: 0xf59e0b, emissive: 0xb45309, emissiveIntensity: 0.4 });

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

    const chestLight = new THREE.PointLight(0xfbbf24, 1.5, 6);
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

// --- PLAYER CONTROLLER & 3D MESH ---
class Player {
  constructor() {
    this.position = new THREE.Vector3(0, 5, 0);
    this.velocity = new THREE.Vector3();
    this.rotation = new THREE.Euler(0, 0, 0, 'YXZ');
    this.isGrounded = false;
    this.speed = 9;
    this.sprintMultiplier = 1.45;
    this.jumpForce = 12;
    this.gravity = 28;
    this.isAiming = false;
    this.isCrouched = false;

    this.mesh = this.createPlayerMesh();
    scene.add(this.mesh);
  }

  createPlayerMesh() {
    const group = new THREE.Group();
    const armorMat = new THREE.MeshLambertMaterial({ color: 0x1e293b });
    const skinMat = new THREE.MeshLambertMaterial({ color: 0xfbcfe8 });
    const accentMat = new THREE.MeshLambertMaterial({ color: 0x38bdf8 });

    const torso = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.5), armorMat);
    torso.position.y = 1.4;
    torso.castShadow = true;
    group.add(torso);

    const plate = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.8, 0.15), accentMat);
    plate.position.set(0, 1.45, 0.22);
    group.add(plate);

    const head = new THREE.Mesh(new THREE.BoxGeometry(0.55, 0.55, 0.55), armorMat);
    head.position.y = 2.3;
    head.castShadow = true;
    group.add(head);

    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.2, 0.1), accentMat);
    visor.position.set(0, 2.35, 0.28);
    group.add(visor);

    this.leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.9, 0.28), skinMat);
    this.leftArm.position.set(-0.6, 1.3, 0);
    this.leftArm.castShadow = true;
    group.add(this.leftArm);

    this.rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.28, 0.9, 0.28), skinMat);
    this.rightArm.position.set(0.6, 1.3, 0);
    this.rightArm.castShadow = true;
    group.add(this.rightArm);

    this.leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), armorMat);
    this.leftLeg.position.set(-0.25, 0.45, 0);
    this.leftLeg.castShadow = true;
    group.add(this.leftLeg);

    this.rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.9, 0.35), armorMat);
    this.rightLeg.position.set(0.25, 0.45, 0);
    this.rightLeg.castShadow = true;
    group.add(this.rightLeg);

    this.weaponMesh = new THREE.Group();
    const gunBody = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.25, 0.9), new THREE.MeshLambertMaterial({ color: 0x111827 }));
    gunBody.position.set(0, 0, 0.3);
    this.weaponMesh.add(gunBody);
    const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.6), new THREE.MeshLambertMaterial({ color: 0xf59e0b }));
    barrel.rotateX(Math.PI / 2);
    barrel.position.set(0, 0.05, 0.85);
    this.weaponMesh.add(barrel);

    this.weaponMesh.position.set(0.45, 1.2, 0.4);
    group.add(this.weaponMesh);

    return group;
  }

  update(dt, input) {
    if (GameState.isGameOver) return;

    const moveDir = new THREE.Vector3();
    if (input.forward) moveDir.z -= 1;
    if (input.backward) moveDir.z += 1;
    if (input.left) moveDir.x -= 1;
    if (input.right) moveDir.x += 1;

    if (moveDir.lengthSq() > 0) {
      moveDir.normalize();
      moveDir.applyEuler(new THREE.Euler(0, this.rotation.y, 0));

      const curSpeed = this.speed * (input.sprint ? this.sprintMultiplier : 1) * (this.isAiming ? 0.6 : 1);
      this.velocity.x = moveDir.x * curSpeed;
      this.velocity.z = moveDir.z * curSpeed;

      const time = performance.now() * 0.01;
      this.leftLeg.rotation.x = Math.sin(time) * 0.6;
      this.rightLeg.rotation.x = -Math.sin(time) * 0.6;
      this.leftArm.rotation.x = -Math.sin(time) * 0.5;
      this.rightArm.rotation.x = Math.sin(time) * 0.5;
    } else {
      this.velocity.x *= 0.8;
      this.velocity.z *= 0.8;
      this.leftLeg.rotation.x = 0;
      this.rightLeg.rotation.x = 0;
      this.leftArm.rotation.x = 0;
      this.rightArm.rotation.x = 0;
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
    this.weaponMesh.rotation.x = this.rotation.x * 0.8;

    this.updateCamera();
  }

  updateCamera() {
    const camDist = this.isAiming ? 2.5 : 4.5;
    const camHeight = this.isAiming ? 1.6 : 2.1;
    const camRightOffset = this.isAiming ? 0.7 : 0.9;

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
    performMeleeHarvest();
    return;
  }

  if (slot === 2) {
    if (GameState.ammo.ar.clip <= 0) return;
    if (now - lastShotTime < 110) return;
    lastShotTime = now;
    GameState.ammo.ar.clip--;
    sounds.playAR();
    performRaycastShoot(32, 1.75, 0.02, 180);
    updateAmmoHUD();
  } else if (slot === 3) {
    if (GameState.ammo.shotgun.clip <= 0) return;
    if (now - lastShotTime < 800) return;
    lastShotTime = now;
    GameState.ammo.shotgun.clip--;
    sounds.playShotgun();
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
  const startPos = player.weaponMesh.getWorldPosition(new THREE.Vector3());
  let endPos = startPos.clone().add(raycaster.ray.direction.clone().multiplyScalar(range));

  if (hits.length > 0) {
    const hit = hits[0];
    endPos = hit.point;

    const hitBot = enemyBots.find(b => b.mesh === hit.object || (b.mesh.children && b.mesh.children.includes(hit.object)));
    if (hitBot) {
      const isHeadshot = (hit.point.y - hitBot.position.y) > 1.8;
      const finalDmg = Math.round(baseDmg * (isHeadshot ? headshotMult : 1));

      damageBot(hitBot, finalDmg, isHeadshot, hit.point);
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

// --- AI COMBAT BOTS ---
const botNames = ['ShadowNinja', 'GhostReaper', 'VortexSniper', 'TitanStorm', 'PixelKing', 'CyberRaptor', 'FrostBite', 'EchoRecon', 'NovaPulse', 'IronClaw'];

class Bot {
  constructor(name, x, z) {
    this.name = name;
    this.position = new THREE.Vector3(x, getTerrainHeight(x, z), z);
    this.velocity = new THREE.Vector3();
    this.health = 100;
    this.shield = 50;
    this.isDead = false;
    this.lastShot = 0;
    this.target = player;
    this.mesh = this.createBotMesh();
    scene.add(this.mesh);
  }

  createBotMesh() {
    const group = new THREE.Group();
    const mat = new THREE.MeshLambertMaterial({ color: 0xd97706 });
    const head = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.6, 0.6), mat);
    head.position.y = 2.2;
    head.castShadow = true;
    group.add(head);

    const body = new THREE.Mesh(new THREE.BoxGeometry(0.9, 1.2, 0.5), mat);
    body.position.y = 1.3;
    body.castShadow = true;
    group.add(body);

    group.position.copy(this.position);
    return group;
  }

  update(dt) {
    if (this.isDead || GameState.isGameOver) return;

    const distToPlayer = this.position.distanceTo(player.position);
    if (distToPlayer < 45) {
      this.mesh.lookAt(player.position.x, this.position.y + 1.3, player.position.z);

      const strafe = Math.sin(performance.now() * 0.003) * 3;
      this.position.x += strafe * dt;

      if (performance.now() - this.lastShot > 1400) {
        this.lastShot = performance.now();
        sounds.playAR();
        createTracer(this.position.clone().add(new THREE.Vector3(0, 1.3, 0)), player.position);
        if (Math.random() < 0.35) {
          damagePlayer(18, this.name);
        }
      }
    } else {
      const dirToCenter = new THREE.Vector3(GameState.storm.x - this.position.x, 0, GameState.storm.z - this.position.z).normalize();
      this.position.x += dirToCenter.x * dt * 4;
      this.position.z += dirToCenter.z * dt * 4;
    }

    this.position.y = getTerrainHeight(this.position.x, this.position.z);
    this.mesh.position.copy(this.position);
  }

  buildDefensiveWall() {
    const wallGeo = new THREE.BoxGeometry(4, 3.5, 0.25);
    const wall = new THREE.Mesh(wallGeo, buildMaterials.woodWall);
    wall.position.copy(this.position).add(new THREE.Vector3(0, 1.75, 0));
    wall.lookAt(player.position);
    wall.castShadow = true;
    scene.add(wall);
    builtStructures.push({ mesh: wall, type: 'wall', health: 150 });
  }
}

function spawnBots() {
  for (let i = 0; i < 10; i++) {
    const angle = (i / 10) * Math.PI * 2 + Math.random() * 0.4;
    const r = 35 + Math.random() * 60;
    const x = Math.cos(angle) * r;
    const z = Math.sin(angle) * r;
    const bot = new Bot(botNames[i], x, z);
    enemyBots.push(bot);
  }
}

spawnBots();

function damageBot(bot, amount, isHeadshot, hitPoint) {
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

  GameState.damageDealt += amount;

  if (Math.random() < 0.5 && !bot.isDead) {
    bot.buildDefensiveWall();
  }

  if (bot.health <= 0) {
    bot.isDead = true;
    scene.remove(bot.mesh);
    const idx = enemyBots.indexOf(bot);
    if (idx > -1) enemyBots.splice(idx, 1);

    GameState.kills++;
    GameState.playersAlive = Math.max(1, GameState.playersAlive - 1);
    const killsEl = document.getElementById('kills-count');
    if (killsEl) killsEl.innerText = GameState.kills;
    const aliveEl = document.getElementById('players-alive-count');
    if (aliveEl) aliveEl.innerText = GameState.playersAlive;

    showKillMessage('You eliminated ' + bot.name);
    sounds.playVictory();

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
