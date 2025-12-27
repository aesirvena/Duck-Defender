# Duck Defender - A 3D Tower Defense Adventure

## Project Story

Duck Defender is a whimsical 3D tower defense game where you protect a brave duck from waves of mischievous enemies. As waves progress, the environment transforms through four distinct themes—from a peaceful pastel world to a snowy wonderland, a lush jungle, and finally an otherworldly space realm. Customize your duck with unlockable cosmetics as you achieve milestones, face increasingly challenging mini-bosses, and rack up the highest score.

## Game Concept

**Gameplay Overview:**
- **Objective:** Defend your duck by eliminating incoming waves of enemies using raycasting and mouse clicks
- **Progression:** Waves get progressively harder with more enemies, faster movement, and higher spawn rates
- **Themes:** Environment automatically shifts at wave milestones (10, 20, 30) with new colors and visual aesthetics
- **Achievements:** Unlock special abilities and cosmetics as you reach wave milestones
- **Mini-bosses:** Every 5 waves, a stronger red boss appears with scaling health (starts at 5, increases +3 each boss)
- **Health Pickups:** Green glowing spheres spawn each wave (1-3 based on difficulty) that grant +1 health when shot
- **Duck Customization:** Earn cosmetics—hat at wave 5+, blue color at wave 10+, glasses at wave 20+ (cumulative)

**Core Mechanics:**
- Click on enemies to deal damage and defeat them
- Waves only advance when all enemies are eliminated
- Health bar tracks your duck's remaining lives
- Real-time score tracking and highscore persistence
- Smooth camera orbit for cinematic gameplay views

**Theme Progression:**
| Wave Range | Theme | Colors | Environment |
|------------|-------|--------|-------------|
| 1-9 | Pastel | Soft orange (#ffd3a5) | Warm, welcoming |
| 10-19 | Snow | Icy blue (#dbefff) | Frozen landscape |
| 20-29 | Jungle | Deep green (#2b7a0b) | Lush vegetation |
| 30+ | Space | Dark purple (#111111) | Cosmic void |

## Development Stack

**Frontend Framework:**
- **Three.js** (v0.148.0) – 3D graphics engine with WebGL rendering
- **Vite** (v4.0.4) – Lightning-fast build tool and development server
- **Lil-GUI** (v0.17.0) – Debug menu and parameter controls

**Key Libraries:**
- **OrbitControls** – Camera orbital movement around the duck
- **GLTFLoader** – Load 3D model assets (duck, Draco compression)
- **WebGL** – GPU-accelerated graphics processing

**Development Tools:**
- **Node.js** – JavaScript runtime and package management
- **npm** – Dependency management
- **ES6 JavaScript** – Modern language features

**Asset Pipeline:**
- **GLTF Models** – Duck character model with Draco compression
- **PBR Textures** – Physically-based rendering for floor materials
- **Web Audio API** – Sound effects and background music
- **HTML5 Canvas** – Core rendering surface

## Installation & Setup

### Prerequisites
- [Node.js](https://nodejs.org/en/download/) (v14 or higher)
- npm (comes with Node.js)
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Quick Start

1. **Clone or download the project**
```bash
cd "Activity 3.6  Raycaster and Mouse Events"
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```
The game will open at `http://localhost:5173/`

4. **Build for production**
```bash
npm run build
```
Output will be in the `dist/` directory

### Project Structure
```
Activity 3.6  Raycaster and Mouse Events/
├── src/
│   ├── index.html       # Game HTML structure
│   ├── script.js        # Complete game logic (974 lines)
│   └── style.css        # HUD and UI styling
├── static/
│   ├── models/Duck/     # 3D duck model assets
│   ├── textures/        # PBR material textures
│   ├── draco/           # Compression libraries
│   └── sounds/          # Audio effects
├── package.json         # Dependencies and scripts
├── vite.config.js       # Build configuration
└── readme.md           # This file
```

## How to Play

1. **Start the Game:** Click "Start Game" on the menu
2. **Attack Enemies:** Click on red sphere enemies to defeat them
3. **Clear Waves:** Eliminate all enemies in a wave to proceed to the next
4. **Survive:** Protect your duck's health bar (3 hits max per wave)
5. **Progress:** Reach wave milestones to unlock achievements and cosmetics
6. **Score:** Maximize points by defeating enemies and bosses

**Controls:**
- **Left Click** – Attack targeted enemy or health pickup
- **Mouse Drag** – Orbit camera around duck
- **Scroll** – Adjust camera zoom (optional)

**Special Items:**
- **Green Health Spheres** – Shoot to gain +1 health; despawn after 5 seconds if not hit

## Achievements & Unlocks

**Milestone Achievements:**
- 🏆 **Wave 5:** Unlock duck hat cosmetic (orange cone)
- 🏆 **Wave 10:** Unlock blue color cosmetic (duck turns blue)
- 🏆 **Wave 20:** Unlock glasses cosmetic (black glasses)
- 🏆 **Mini-Boss Defeated:** Special notification for each boss wave
- 🏆 **New Highscore:** Permanent achievement tracking

**Health Pickups:**
- Green spheres spawn at the start of each wave
- Wave 1-9: 1 health pickup per wave
- Wave 10-19: 2 health pickups per wave
- Wave 20+: 3 health pickups per wave
- Each pickup grants +1 health when destroyed by projectile
- Pickups auto-despawn after 5 seconds if unhit

## Team Roles

**Development Team:**
- **Game Designer & Developer** – Created core game loop, wave system, and progression mechanics
- **3D Graphics Specialist** – Implemented Three.js rendering, camera controls, and visual effects
- **Audio Designer** – Integrated sound effects and background music
- **UI/UX Designer** – Designed menu system, HUD layout, and achievement popups
- **Quality Assurance** – Tested gameplay mechanics, wave progression, and theme transitions

## Asset Credits & Attribution

**Audio:**
- **Duck Quack Sound FX:** https://youtu.be/aqCxlxclyzo
- **Egg Cracking Sound:** freesound_community via [Pixabay](https://pixabay.com/)
- **Background Music:** "The Builder" by Kevin MacLeod - [Incompetech](https://incompetech.com/) (CC BY 3.0)
- **Baby Sound:** MyInstants (https://www.myinstants.com/)
- **Flashbang Effect:** https://youtu.be/t9mXSEFhiYs

**Graphics & Design:**
- **Duck Icons:** Designed by Freepik (www.freepik.com)
- **Floor Textures:** PBR materials (Grass001, Onyx002, ChristmasTreeOrnament)
- **3D Models:** Duck GLTF model with Draco compression

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Edge 90+
- ✅ Safari 15+

WebGL 2.0 support required

## Game Statistics

- **Starting Enemies per Wave:** 4 + (wave × 2)
- **Enemy Base Speed:** 0.025 + (wave × 0.002) units/tick
- **Spawn Interval:** max(350ms, 900 - wave×80)ms
- **Mini-Boss Health:** 5 + (bossNumber × 3) hits (scales with progression)
- **Mini-Boss Speed:** 0.02 + (bossNumber × 0.005) units/tick
- **Health Pickup Despawn Time:** 5 seconds if unhit
- **Duck Base Health:** 5 (with pickups for restoration)
- **Projectile Score:** 1 point per enemy, 2 per boss hit, 10 for boss defeat, 1 per health pickup
- **Total Themes:** 4 (Pastel, Snow, Jungle, Space)
- **Game Code:** Single script.js file with modular game systems
