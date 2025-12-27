import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
//import { mod } from 'three/src/nodes/TSL.js'

/**
 * Base
 */
// Debug
const gui = new dat.GUI()

// --------------------------
// MENU OVERLAY
// --------------------------
const menuOverlay = document.getElementById('menu-overlay')
const startBtn = document.getElementById('start-btn')
const menuWave = document.getElementById('menu-wave')
const menuHighscore = document.getElementById('menu-highscore')

let highscore = 0

function updateMenuWave(waveNumber) {
  menuWave.textContent = `Wave ${waveNumber}: Easy`
}

function updateMenuHighscore(score) {
  highscore = Math.max(highscore, score)
  menuHighscore.textContent = `Highscore: ${highscore}`
}

startBtn.addEventListener('click', () => {
  menuOverlay.style.display = 'none'
  // Start the first wave
  startWave(1)
})

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0xFFE0B2)
// Fog for depth + softness
scene.fog = new THREE.Fog(0xFFE0B2, 20, 80)

const textureLoader = new THREE.TextureLoader()

// --------------------------
// PASTEL-ORANGE SKY
// --------------------------
const skyTexture = textureLoader.load('/textures/Onyx002_1K-JPG/Onyx002_1K-JPG_Color.jpg')
const skyGeo = new THREE.SphereGeometry(200, 32, 32)
const skyMat = new THREE.MeshBasicMaterial({
    map: skyTexture,
    side: THREE.BackSide, 
})
const sky = new THREE.Mesh(skyGeo, skyMat)
scene.add(sky)

//LIGHTS

// Ambient light
const ambientLight = new THREE.AmbientLight('#0xffffff', 0.4)
scene.add(ambientLight)
// Directional light
const directionalLight = new THREE.DirectionalLight('#ffffff', 0.7)
directionalLight.position.set(1, 2, 3)
scene.add(directionalLight)

// Enhanced shadow casting light
const shadowLight = new THREE.DirectionalLight(0xffffff, 1)
shadowLight.position.set(5, 10, 5)
shadowLight.castShadow = true
scene.add(shadowLight)

// Rim lights for depth and character
const rimLight1 = new THREE.DirectionalLight(0xFFB347, 0.3)
rimLight1.position.set(-5, 5, 5)
scene.add(rimLight1)

const rimLight2 = new THREE.DirectionalLight(0xFFB347, 0.3)
rimLight2.position.set(5, 5, -5)
scene.add(rimLight2)

// --------------------------
// FLOOR
// --------------------------
const floorTexture = textureLoader.load('/textures/Grass001_1K-JPG/Grass001_1K-JPG_Color.jpg') 
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping
floorTexture.repeat.set(10, 10) // repeat for tiling effect

const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    roughness: 0.8,
    metalness: 0.1,
})

const floorGeometry = new THREE.CircleGeometry(80, 64) // circular floor with radius 80 to cover spawn area
const floor = new THREE.Mesh(floorGeometry, floorMaterial)
floor.rotation.x = -Math.PI / 2
floor.position.y = 0
floor.receiveShadow = true
scene.add(floor)

// Cylindrical wall for visual boundary
const wall = new THREE.Mesh(
  new THREE.CylinderGeometry(60, 60, 6, 64, 1, true),
  new THREE.MeshStandardMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide
  })
)
wall.position.y = 3
scene.add(wall)

/**
 * Objects
 */
const object1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object1.position.x = - 2

const object2 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)

const object3 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
object3.position.x = 2

//scene.add(object1, object2, object3)

//RAYCASTER
const raycaster = new THREE.Raycaster()
// const rayOrigin = new THREE.Vector3(-3, 0, 0)
// const rayDirection = new THREE.Vector3(10, 0, 0)
// rayDirection.normalize()

// raycaster.set(rayOrigin, rayDirection)

// const intersect = raycaster.intersectObject(object2)
// console.log(intersect)

// const intersects = raycaster.intersectObjects([object1, object2, object3])
// console.log(intersects)

//DUCK MODEL 

const gltfLoader = new GLTFLoader()

let model = null
gltfLoader.load('./models/Duck/glTF-Binary/Duck.glb', (gltf) =>{
    model = gltf.scene
    // gltf.scene.position.y = -1.2
    model.rotation.y += Math.PI
    scene.add(model)

     //HELPERS
    //Box Helper 
    // const boxHelper = new THREE.BoxHelper(model, 0x00ff00)
    // scene.add(boxHelper)

    // //Axes Helper 
    // const axesHelper = new THREE.AxesHelper(2)
    // model.add(axesHelper)
    }
)
/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{   
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//MOUSE
const mouse = new THREE.Vector2()
window.addEventListener('mousemove', (event) => {
    //Mouse Listener
    mouse.x = event.clientX / sizes.width * 2 -1
    mouse.y = -(event.clientY / sizes.height) * 2 + 1
    console.log(mouse)
})

//CLICK
window.addEventListener('click', () => {
    if(currentIntersect){
        switch(currentIntersect.object){
            case object1: 
                console.log('click on object 1')
                break

            case object2: 
                console.log('click on object 2')
                break

            case object3: 
                console.log('click on object 3')
                break
        }
    }

    if(model){
        raycaster.setFromCamera(mouse, camera)
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const targetPoint = new THREE.Vector3()
        raycaster.ray.intersectPlane(plane, targetPoint)

        const projectile = new THREE.Mesh(projectileGeometry, projectileMaterial.clone())

        const forward = new THREE.Vector3(1, 0, 0) // X-axis
        forward.applyQuaternion(model.quaternion)  // rotate  with duck's facing
        projectile.position.copy(model.position).add(forward.multiplyScalar(1)).add(new THREE.Vector3(0, 1, 0))
        scene.add(projectile)

        const direction = new THREE.Vector3().subVectors(targetPoint, projectile.position).normalize()

        projectiles.push({
            mesh: projectile,
            velocity: direction.multiplyScalar(projectilesSpeed)
        })

        //play quack on click
        if(quackSound.isPlaying) quackSound.stop()
        quackSound.play()
    }
})

//PROJECTILES 
const projectiles = []
const projectilesSpeed = 0.5
const projectileGeometry = new THREE.SphereGeometry(0.3, 10, 15, 0,6.283185307179586, 0,  3.141592653589793)
const projectileMaterial = new THREE.MeshStandardMaterial({color: 0xffd79a})

// HEALTH PICKUPS
const healthPickups = []

function spawnHealthPickup() {
    const angle = Math.random() * Math.PI * 2
    const distance = 20 + Math.random() * 20
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance

    // Create a green glowing health pickup using a simple sphere
    const pickupGeom = new THREE.SphereGeometry(0.4, 16, 16)
    const pickupMat = new THREE.MeshStandardMaterial({
        color: 0x00ff00,
        emissive: 0x00aa00,
        emissiveIntensity: 0.8,
        metalness: 0.3,
        roughness: 0.4
    })
    const pickup = new THREE.Mesh(pickupGeom, pickupMat)
    pickup.position.set(x, 0.5, z)
    scene.add(pickup)

    pickup.userData = { 
        floatOffset: Math.random() * Math.PI * 2,
        health: 1 // Can be destroyed by projectiles
    }
    
    // Despawn after 5 seconds if not hit
    const despawnTimer = setTimeout(() => {
        if(scene.children.includes(pickup)) {
            scene.remove(pickup)
        }
        const index = healthPickups.indexOf(pickup)
        if(index > -1) healthPickups.splice(index, 1)
    }, 5000)
    
    pickup.userData.despawnTimer = despawnTimer
    healthPickups.push(pickup)
}

// ========================================
// GAME STATE CONSTANTS
// ========================================
const GAME_STATES = {
    WAITING_FOR_WAVE: 'waiting',
    IN_WAVE: 'in_wave',
    GAME_OVER: 'game_over'
}

// ========================================
// WAVE SYSTEM STATE
// ========================================
let gameState = GAME_STATES.WAITING_FOR_WAVE
let currentWave = 0
let baseEnemyCount = 3
let enemyCountMultiplier = 2
let enemiesRemainingToSpawn = 0
let activeEnemies = 0
let waveSpawnInterval = null
let waveDelayTimeout = null

function showWaveBanner(waveNumber) {
    const banner = document.getElementById('wave-banner')
    if (!banner) return
    banner.textContent = `Wave ${waveNumber}`
    banner.classList.remove('wave-show')
    // force reflow to restart animation
    void banner.offsetWidth
    banner.classList.add('wave-show')
    console.log(`Starting Wave ${waveNumber}`)
}

// ============================
// THEMES
// ============================
const themes = [
    { wave: 1, name: 'pastel', floorColor: 0xffd3a5, bgColor: 0x8fd3ff, bannerColor: '#333', shadowColor: 'rgba(0,0,0,0.3)' },
    { wave: 10, name: 'snow', floorColor: 0xdbefff, bgColor: 0xb0e0ff, bannerColor: '#004d99', shadowColor: 'rgba(0,50,150,0.4)' },
    { wave: 20, name: 'jungle', floorColor: 0x2b7a0b, bgColor: 0x88c070, bannerColor: '#fff', shadowColor: 'rgba(0,100,0,0.5)' },
    { wave: 30, name: 'space', floorColor: 0x111111, bgColor: 0x000011, bannerColor: '#00ff88', shadowColor: 'rgba(0,255,136,0.3)' },
]

function updateTheme(currentWave){
    let theme = themes[0]
    for(const t of themes){
        if(currentWave >= t.wave) theme = t
    }
    floor.material.color.set(theme.floorColor)
    scene.background = new THREE.Color(theme.bgColor)
    updateWaveBannerTheme(theme.bannerColor, theme.shadowColor)
}

function updateWaveBannerTheme(bannerColor, shadowColor){
    const banner = document.getElementById('wave-banner')
    if(!banner) return
    banner.style.color = bannerColor
    banner.style.textShadow = `3px 3px 6px ${shadowColor}`
}

// ============================
// ACHIEVEMENTS
// ============================
const achievementsUnlocked = new Set()

function unlockAchievement(name){
    if(achievementsUnlocked.has(name)) return
    achievementsUnlocked.add(name)

    const container = document.createElement('div')
    container.className = 'achievement-popup'
    container.textContent = `🏆 ${name}`
    container.style.position = 'fixed'
    container.style.top = '20px'
    container.style.left = '50%'
    container.style.transform = 'translateX(-50%)'
    container.style.padding = '10px 20px'
    container.style.background = 'rgba(255,255,255,0.9)'
    container.style.borderRadius = '10px'
    container.style.fontSize = '1.2rem'
    container.style.zIndex = 9999
    container.style.opacity = '0'
    container.style.transition = 'opacity 0.3s ease, transform 0.3s ease'
    document.body.appendChild(container)

    requestAnimationFrame(() => {
        container.style.opacity = '1'
        container.style.transform = 'translateX(-50%) translateY(0)'
    })

    setTimeout(() => {
        container.style.opacity = '0'
        container.style.transform = 'translateX(-50%) translateY(-50px)'
        setTimeout(() => container.remove(), 300)
    }, 2500)
}

// ============================
// MINI-BOSS
// ============================
function spawnMiniBoss() {
    const bossNumber = Math.floor(currentWave / 5)
    const bossHealth = 5 + (bossNumber * 3) // Scales: 5, 8, 11, 14, etc.
    const bossSpeed = 0.02 + (bossNumber * 0.005) // Gets faster each boss
    
    const boss = new THREE.Mesh(
        new THREE.SphereGeometry(2.5, 32, 32),
        new THREE.MeshStandardMaterial({ 
            color: 0xff0000,
            emissive: 0xff0000,
            emissiveIntensity: 0.5
        })
    )
    const angle = Math.random() * Math.PI * 2
    const distance = 30
    boss.position.set(Math.cos(angle)*distance, 2, Math.sin(angle)*distance)
    scene.add(boss)
    
    enemies.push({ 
        mesh: boss, 
        radius: 2.5, 
        speed: bossSpeed, 
        health: bossHealth, 
        maxHealth: bossHealth,
        isBoss: true 
    })
}

// ============================
// DUCK CUSTOMIZATION
// ============================
function customizeDuck(wave){
    if(!model) return
    
    // Add hat at wave 5+
    if(wave >= 5 && !model.userData.hasHat){
        const hat = new THREE.Mesh(
            new THREE.ConeGeometry(0.5, 1, 16),
            new THREE.MeshStandardMaterial({color: 0xff6600})
        )
        hat.position.set(0, 1.2, 0)
        model.add(hat)
        model.userData.hasHat = true
        unlockAchievement('First Hat!')
    }
    
    // Change to blue at wave 10+
    if(wave >= 10 && !model.userData.isBlue){
        model.traverse(child => { 
            if(child.isMesh && child !== model.getObjectByProperty('userData', { hasHat: true })) {
                child.material.color.set(0x0088ff)
            }
        })
        model.userData.isBlue = true
        unlockAchievement('Blue Duck!')
    }
    
    // Add glasses at wave 20+
    if(wave >= 20 && !model.userData.hasGlasses){
        const glasses = new THREE.Mesh(
            new THREE.BoxGeometry(0.8, 0.2, 0.1),
            new THREE.MeshStandardMaterial({color: 0x000000})
        )
        glasses.position.set(0, 0.8, 0.3)
        model.add(glasses)
        model.userData.hasGlasses = true
        unlockAchievement('Cool Duck!')
    }
}

/**
 * Start a new wave: set state to IN_WAVE, compute enemy count, begin spawning
 */
function startWave(waveNumber) {
    if (gameState === GAME_STATES.GAME_OVER) return
    
    currentWave = waveNumber
    gameState = GAME_STATES.IN_WAVE

    updateTheme(currentWave)      // change theme
    customizeDuck(currentWave)    // check duck upgrades

    if(currentWave % 5 === 0){   // spawn mini-boss every 5 waves
        spawnMiniBoss()
        unlockAchievement(`Mini-Boss Wave ${currentWave}!`)
    }

    // Spawn health pickups (1-3 based on wave difficulty)
    const numHealthPickups = Math.min(1 + Math.floor(currentWave / 10), 3)
    for(let i = 0; i < numHealthPickups; i++) {
        spawnHealthPickup()
    }

    // Enemy count scales per wave: totalEnemies = 4 + currentWave * 2
    const totalToSpawn = 4 + currentWave * 2
    enemiesRemainingToSpawn = totalToSpawn
    
    showWaveBanner(currentWave)
    
    // Clear any previous spawn interval
    if (waveSpawnInterval) clearInterval(waveSpawnInterval)
    
    // Enemy spawn interval scales per wave: max(350, 900 - currentWave * 80)
    const spawnInterval = Math.max(350, 900 - currentWave * 80)
    
    // Spawn enemies over time while state is IN_WAVE
    waveSpawnInterval = setInterval(() => {
        // Check if we should still be spawning
        if (gameState !== GAME_STATES.IN_WAVE) {
            if (waveSpawnInterval) clearInterval(waveSpawnInterval)
            return
        }
        
        if (enemiesRemainingToSpawn > 0) {
            spawnEnemy()
            enemiesRemainingToSpawn--
            activeEnemies++
        } else {
            // Done spawning - don't check for completion here
            // Wave completion is only triggered by onEnemyDefeated()
            if (waveSpawnInterval) clearInterval(waveSpawnInterval)
        }
    }, spawnInterval)
}

/**
 * Called when an enemy is defeated (hit by projectile or reached duck)
 */
function onEnemyDefeated() {
    // Ensure onEnemyDefeated() only runs while gameState === IN_WAVE
    if (gameState !== GAME_STATES.IN_WAVE) return
    
    activeEnemies = Math.max(0, activeEnemies - 1)
    maybeEndWave()
}

/**
 * Check if the wave should end (all enemies spawned and all defeated)
 */
function maybeEndWave() {
    // Prevent wave completion from triggering during pauses or game over
    if (gameState !== GAME_STATES.IN_WAVE) return
    
    if (enemiesRemainingToSpawn === 0 && activeEnemies === 0) {
        endWave()
    }
}

/**
 * End the current wave and transition to WAITING_FOR_WAVE with a delay
 */
function endWave() {
    if (gameState !== GAME_STATES.IN_WAVE) return
    
    gameState = GAME_STATES.WAITING_FOR_WAVE
    if (waveSpawnInterval) clearInterval(waveSpawnInterval)
    
    // Clear all remaining enemies from this wave
    enemies.forEach(e => scene.remove(e.mesh))
    enemies.length = 0
    activeEnemies = 0
    
    console.log(`Wave ${currentWave} Complete`)
    
    // Inter-wave pause: 3000 ms (use 5000 ms every 5th wave)
    const pauseDuration = (currentWave % 5 === 0) ? 5000 : 3000
    
    // Schedule the next wave after the pause
    if (waveDelayTimeout) clearTimeout(waveDelayTimeout)
    waveDelayTimeout = setTimeout(() => {
        startWave(currentWave + 1)
    }, pauseDuration)
}

/**
 * Called when the player is defeated (duck health <= 0)
 */
function onPlayerDefeated() {
    if (gameState === GAME_STATES.GAME_OVER) return
    
    gameState = GAME_STATES.GAME_OVER
    enemiesRemainingToSpawn = 0
    activeEnemies = 0
    
    // Clear all timers
    if (waveSpawnInterval) clearInterval(waveSpawnInterval)
    if (waveDelayTimeout) clearTimeout(waveDelayTimeout)
    
    console.log('Game Over - Waves stopped')
    
    // Trigger existing game over UI/sounds
    onGameOver()
    if (gameOverSoundReady && flashbangSoundReady) {
        gameOverSound.play()
        flashbangSound.play()
    }
}

//ENEMIES
const enemyColor = textureLoader.load('/textures/ChristmasTreeOrnament015_1K-JPG/ChristmasTreeOrnament015_1K-JPG_Color.jpg')
const enemyDisp = textureLoader.load('/textures/ChristmasTreeOrnament015_1K-JPG/ChristmasTreeOrnament015_1K-JPG_Displacement.jpg')
const enemyMetalness = textureLoader.load('/textures/ChristmasTreeOrnament015_1K-JPG/ChristmasTreeOrnament015_1K-JPG_Metalness.jpg')
const enemyNormalGL = textureLoader.load('/textures/ChristmasTreeOrnament015_1K-JPG/ChristmasTreeOrnament015_1K-JPG_NormalGL.jpg')
const enemyRoughness = textureLoader.load('/textures/ChristmasTreeOrnament015_1K-JPG/ChristmasTreeOrnament015_1K-JPG_Roughness.jpg')

const enemies = []

const enemyGeometry = new THREE.SphereGeometry(0.6, 16, 16)
const enemyMaterial = new THREE.MeshStandardMaterial({ 
    map: enemyColor,
    displacementMap: enemyDisp,
    metalnessMap: enemyMetalness,
    normalMap: enemyNormalGL,
    roughnessMap: enemyRoughness
})
enemyMaterial.displacementScale = 0.01

function spawnEnemy () {
    // Only spawn enemies while the wave is active
    if (gameState !== GAME_STATES.IN_WAVE) return
    
    //spawn enemies at random
    const angle = Math.random() * Math.PI * 2
    const distance = 30 + Math.random() * 20
    const x = Math.cos(angle) * distance
    const z = Math.sin(angle) * distance

    const enemy = new THREE.Mesh(enemyGeometry, enemyMaterial.clone())
    enemy.position.set(x, 0.6, z)
    scene.add(enemy)

    // Enemy speed scales gently with wave: speed = 0.025 + currentWave * 0.002 + random variance
    const baseSpeed = 0.025 + currentWave * 0.002
    const speedVariance = Math.random() * 0.02
    const speed = baseSpeed + speedVariance

    enemies.push({
        mesh: enemy,
        radius: 0.6,
        speed: speed
    })
}



//CAMERA
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.y = 15
scene.add(camera)

//AUDIO
const listener = new THREE.AudioListener()
camera.add(listener)


// QUACK SOUND 
const quackSound = new THREE.Audio(listener)
const audioLoader = new THREE.AudioLoader()

audioLoader.load('./sounds/quack.mp3', (buffer) =>{
    quackSound.setBuffer(buffer)
    quackSound.setLoop(false)
    quackSound.setVolume(0.5)
})

//HIT SOUND
let hitSoundReady = false
const hitSound = new THREE.Audio(listener)
audioLoader.load('./sounds/egg_cracking.mp3', (buffer) =>{
    hitSound.setBuffer(buffer)
    hitSound.setLoop(false)
    hitSound.setVolume(0.8)
    hitSoundReady = true
})
//GAME OVER SOUND
let gameOverSoundReady = false
const gameOverSound = new THREE.Audio(listener)

audioLoader.load('./sounds/ash-baby-explode.mp3', (buffer) => {
  gameOverSound.setBuffer(buffer)
  gameOverSound.setLoop(false)
  gameOverSound.setVolume(0.8)
  gameOverSoundReady = true
})
//flashbang 
let flashbangSoundReady = false
const flashbangSound = new THREE.Audio(listener)

audioLoader.load('./sounds/flashbang-meme-sound.mp3', (buffer) => {
  flashbangSound.setBuffer(buffer)
  flashbangSound.setLoop(false)
  flashbangSound.setVolume(0.8)
  flashbangSoundReady = true
})

//BACKGROUND MUSIC
const bgMusic = new THREE.Audio(listener)
audioLoader.load('./sounds/The-Builder(chosic.com).mp3', (buffer) =>
{
    bgMusic.setBuffer(buffer)
    bgMusic.setLoop(true)
    bgMusic.setVolume(0.5)
    bgMusic.play()
})

//  Background Music Control
const musicFolder = gui.addFolder('Background Music');

const musicControls = {
    Play: () => {
        if(!bgMusic.isPlaying) bgMusic.play();
    },
    Pause: () => {
        if(bgMusic.isPlaying) bgMusic.pause();
    },
    Stop: () => {
        if(bgMusic.isPlaying) bgMusic.stop();

   
}
};

musicFolder.add(musicControls, 'Play');
musicFolder.add(musicControls, 'Pause');
musicFolder.add(musicControls, 'Stop');
musicFolder.open();


// DUCK HEALTHHEALTH SYSTEM
let duckHealth = 5
let maxHealth = 5
let isGameOver = false

const duckHealthContainer = document.getElementById('duck-health')
const duckHealthFrame = document.getElementById('duck-health-frame')
const damageFlash = document.getElementById('damage-flash')

const duckIconPath = './images/duck-health.png'

function updateDuckIcons() {
  duckHealthContainer.innerHTML = ''
  for (let i = 0; i < maxHealth; i++) {
    const img = document.createElement('img')
    img.src = duckIconPath
    if (i >= duckHealth) img.classList.add('lost')
    duckHealthContainer.appendChild(img)
  }
}

updateDuckIcons()

//SCORE SYSTEM
// === SCORE SYSTEM ===
let score = 0
const scoreValue = document.getElementById('score-value')

function updateScore(points = 1) {
  score += points
  scoreValue.textContent = score
}

const whiteFlash = document.getElementById('white-flash')
function onGameOver() {

  // Stop background music
  if (bgMusic.isPlaying) bgMusic.stop()

  // Flash white screen first
  whiteFlash.classList.add('active')

  // After 300ms, fade the flash out and show the overlay
//   setTimeout(() => {
//     whiteFlash.classList.remove('active')

    // Now display the overlay with slight fade-in
    setTimeout(() => {
      whiteFlash.classList.remove('active')
      const overlay = document.createElement('div')
      overlay.id = 'game-over-overlay'
      overlay.style.position = 'fixed'
      overlay.style.top = 0
      overlay.style.left = 0
      overlay.style.width = '100%'
      overlay.style.height = '100%'
      overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.9)'
      overlay.style.display = 'flex'
      overlay.style.flexDirection = 'column'
      overlay.style.justifyContent = 'center'
      overlay.style.alignItems = 'center'
      overlay.style.fontSize = '3rem'
      overlay.style.fontFamily = 'Arial, sans-serif'
      overlay.style.color = '#ff3333'
      overlay.style.opacity = '0'
      overlay.style.transition = 'opacity 1s ease'
      overlay.style.zIndex = 9999
      overlay.innerHTML = `
        <img src="./images/ash-baby.jpg" alt="Game Over" style="
          width: 300px;
          height: auto;
          margin-bottom: 20px;
          animation: fadeIn 4s ease-out;
        ">

        <span style="color:white; font-size:3rem; text-shadow:2px 2px 4px black;">
          GAME OVER
        </span>

        <div style="font-size:1.5rem; color:white; margin-top:15px;">
          Final Score: ${score}
        </div>

        <button id="retryBtn" style="
          margin-top:25px;
          padding:10px 25px;
          font-size:1.2rem;
          border:none;
          border-radius:10px;
          background:#ff3333;
          color:white;
          cursor:pointer;
          transition:0.2s;
        ">Retry</button>
      `

      document.body.appendChild(overlay)

      // Fade in overlay smoothly
      requestAnimationFrame(() => {
        overlay.style.opacity = '1'
      })

      // Retry button handler
      const retryBtn = document.getElementById('retryBtn')
      retryBtn.addEventListener('click', resetGame)
    }, 600) // Delay overlay after the flash
//   }, 600 ) // Flash duration
}


//RESET GAME
function resetGame() {
  // Remove all enemies, projectiles, and health pickups
  enemies.forEach(e => scene.remove(e.mesh))
  projectiles.forEach(p => scene.remove(p.mesh))
  healthPickups.forEach(h => scene.remove(h))
  enemies.length = 0
  projectiles.length = 0
  healthPickups.length = 0

  // Reset duck health and score
  duckHealth = maxHealth
  score = 0
  scoreValue.textContent = score
  updateDuckIcons()

  // Remove Game Over overlay
    const overlay = document.getElementById('game-over-overlay')
    if (overlay) overlay.remove()

  // Restart music
  if (!bgMusic.isPlaying) bgMusic.play()

  // Reset wave system
  if (waveSpawnInterval) clearInterval(waveSpawnInterval)
  if (waveDelayTimeout) clearTimeout(waveDelayTimeout)
  currentWave = 0
  activeEnemies = 0
  enemiesRemainingToSpawn = 0
  gameState = GAME_STATES.WAITING_FOR_WAVE
  // Reset duck color and scale
  if (model) {
    model.traverse((child) => {
      if (child.isMesh) child.material.color.set(0xffffff)
    })
    model.scale.set(1, 1, 1)
  }

  isGameOver = false
}



// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
//Activity 3.6  Raycaster and Mouse Events
/**
 * Animate
 */
const clock = new THREE.Clock()

let currentIntersect = null
const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Duck bounce (personality!)
    if(model){
        model.position.y = Math.sin(elapsedTime * 4) * 0.1
    }

    // Camera orbit around duck
    if(model){
        const cameraDistance = 20; // distance from duck
        const orbitSpeed = 0.2; // radians per second
        const angle = elapsedTime * orbitSpeed
        camera.position.x = model.position.x + Math.cos(angle) * cameraDistance
        camera.position.z = model.position.z + Math.sin(angle) * cameraDistance
        camera.position.y = model.position.y + 12 // height above duck
        camera.lookAt(model.position)
    }

    // Update controls damping if needed
    controls.update()

    // CAST RAY for mouse hover over objects
    raycaster.setFromCamera(mouse, camera)
    const objectsToTest = [object1, object2, object3]
    const intersects = raycaster.intersectObjects(objectsToTest)

    if(intersects.length){
        if(!currentIntersect){
            console.log('mouse enter')
        }
        currentIntersect = intersects[0]
    }else{
        if(currentIntersect){
            console.log('mouse leave')
        }
        currentIntersect = null
    }

    for(const intersect of intersects){
        intersect.object.material.color.set('#0000ff')
    }
    for(const object of objectsToTest){
        if(!intersects.find(intersect => intersect.object === object)){
            object.material.color.set('#ff0000')
        }
    }

    // DUCK rotation to face mouse (shooting aim)
    if(model){
        const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0)
        const intersectionPoint = new THREE.Vector3()
        raycaster.ray.intersectPlane(plane, intersectionPoint)
        model.lookAt(intersectionPoint)
        model.rotateY(-Math.PI/2)
    }

    // UPDATE PROJECTILES
    for(let i = 0; i < projectiles.length; i++){
        const p = projectiles[i]
        p.mesh.position.add(p.velocity)

        if(p.mesh.position.length() > 100){
            scene.remove(p.mesh)
            projectiles.splice(i, 1)
            i--
        }
    }

    // UPDATE HEALTH PICKUPS
    healthPickups.forEach((pickup, i) => {
        const time = clock.getElapsedTime()
        pickup.position.y = 0.5 + Math.sin(time * 2 + pickup.userData.floatOffset) * 0.2
        pickup.rotation.y += 0.02
    })

    // HEALTH PICKUP COLLECTION
    if(model){
        for(let i = 0; i < healthPickups.length; i++){
            const pickup = healthPickups[i]
            if(pickup.position.distanceTo(model.position) < 1.2){
                duckHealth = Math.min(duckHealth + 1, maxHealth)
                updateDuckIcons()

                // Optional pickup sound
                const pickupSound = new THREE.Audio(listener)
                audioLoader.load('./sounds/health_pickup.mp3', (buffer) => {
                    pickupSound.setBuffer(buffer)
                    pickupSound.setVolume(0.6)
                    pickupSound.play()
                }, undefined, (error) => {
                    console.log('Health pickup sound not found, skipping')
                })

                scene.remove(pickup)
                healthPickups.splice(i, 1)
                i--
            }
        }
    }

    // UPDATE ENEMIES
    if(model){
        for(let i = 0; i < enemies.length; i++){
            const e = enemies[i]
            const dir = new THREE.Vector3().subVectors(model.position, e.mesh.position).normalize()
            e.mesh.position.add(dir.multiplyScalar(e.speed))

            // Enemy bob animation
            e.mesh.position.y = 0.6 + Math.sin(elapsedTime * 6 + i) * 0.15
            // Enemy rotation animation
            e.mesh.rotation.x += 0.03
            e.mesh.rotation.z += 0.02
            e.mesh.lookAt(model.position)

            // Enemy hits duck
            if(e.mesh.position.distanceTo(model.position) < 1.5){
                if(e.isBoss) {
                    // Boss takes damage
                    e.health--
                    if(e.health > 0) {
                        // Flash boss red on hit
                        const originalColor = e.mesh.material.color.getHex()
                        e.mesh.material.color.set(0xffff00) // Yellow flash
                        setTimeout(() => {
                            e.mesh.material.color.setHex(originalColor)
                        }, 100)
                        duckHealth -= 1
                        updateDuckIcons()
                    } else {
                        // Boss defeated
                        scene.remove(e.mesh)
                        enemies.splice(i, 1)
                        i--
                        duckHealth -= 1
                        updateDuckIcons()
                        onEnemyDefeated()
                        unlockAchievement(`Boss Wave ${currentWave} Defeated!`)
                        updateScore(10)
                    }
                } else {
                    // Normal enemy
                    scene.remove(e.mesh)
                    enemies.splice(i, 1)
                    i--
                    duckHealth -= 1
                    updateDuckIcons()
                    onEnemyDefeated()
                }

                if(duckHealth <= 0 && !isGameOver){
                    onPlayerDefeated()
                }

                // Flash health bar
                duckHealthFrame.classList.add('hit')
                setTimeout(() => duckHealthFrame.classList.remove('hit'), 400)
                // Flash red overlay
                damageFlash.classList.add('active')
                setTimeout(() => damageFlash.classList.remove('active'), 200)
                // Duck flash red
                model.traverse((child)=>{
                    if(child.isMesh) child.material.color.set(0xff0000)
                })
                setTimeout(()=>{
                    model.traverse((child)=>{
                        if(child.isMesh) child.material.color.set(0xffffff)
                    })
                }, 200)
            }
        }
    }

    // PROJECTILE-ENEMY COLLISIONS
    for(let i = 0; i < projectiles.length; i++){
        const p = projectiles[i]
        const pPos = p.mesh.position
        const pRadius = 0.3

        // Check collision with health pickups
        let hitPickup = false
        for(let k = 0; k < healthPickups.length; k++){
            const pickup = healthPickups[k]
            const pickupRadius = 0.4
            const minDist = pRadius + pickupRadius
            
            if(pPos.distanceTo(pickup.position) < minDist){
                // Health pickup hit - gain 1 health and despawn
                duckHealth = Math.min(duckHealth + 1, maxHealth)
                updateDuckIcons()
                
                // Flash white on hit
                pickup.material.color.set(0xffffff)
                setTimeout(() => {
                    if(scene.children.includes(pickup)) {
                        scene.remove(pickup)
                    }
                }, 100)
                
                // Clear despawn timer
                if(pickup.userData.despawnTimer) {
                    clearTimeout(pickup.userData.despawnTimer)
                }
                
                healthPickups.splice(k, 1)
                scene.remove(p.mesh)
                projectiles.splice(i, 1)
                updateScore(1)
                i--
                hitPickup = true
                break
            }
        }
        
        if(hitPickup) continue

        for(let j = 0; j < enemies.length; j++){
            const e = enemies[j]
            const ePos = e.mesh.position
            const minDist = pRadius + e.radius

            if(pPos.distanceTo(ePos) < minDist){
                if(hitSoundReady){
                    const hitAudio = new THREE.Audio(listener)
                    hitAudio.setBuffer(hitSound.buffer)
                    hitAudio.setVolume(0.5)
                    hitAudio.play()
                }

                camera.position.x += (Math.random()-0.5)*0.2
                camera.position.y += (Math.random()-0.5)*0.2

                scene.remove(p.mesh)
                projectiles.splice(i,1)
                
                if(e.isBoss) {
                    // Boss takes damage
                    e.health--
                    if(e.health > 0) {
                        // Flash yellow on hit
                        const originalColor = e.mesh.material.color.getHex()
                        e.mesh.material.color.set(0xffff00)
                        setTimeout(() => {
                            e.mesh.material.color.setHex(originalColor)
                        }, 100)
                        updateScore(2)
                    } else {
                        // Boss defeated
                        scene.remove(e.mesh)
                        enemies.splice(j, 1)
                        updateScore(10)
                        onEnemyDefeated()
                        unlockAchievement(`Boss Wave ${currentWave} Defeated!`)
                        j--
                    }
                } else {
                    // Normal enemy defeated
                    scene.remove(e.mesh)
                    enemies.splice(j, 1)
                    updateScore(1)
                    onEnemyDefeated()
                    j--
                }
                i--
                break
            }
        }
    }

    // Render
    renderer.render(scene, camera)

    // Next frame
    window.requestAnimationFrame(tick)
}

tick()

// Start the first wave once the scene initializes
startWave(1)