<template>
  <div class="game-field">
    <button class="menu-btn" @click="returnToMenu">МЕНЮ</button>
    <div class="game-area">
      <div class="spaceship" :style="spaceshipStyle" v-if="!isExploded">
        <div class="ship-body">
          <div class="ship-window"></div>
          <div class="ship-body-main"></div>
          <div class="ship-wings"></div>
        </div>
        <div v-if="isThrusting" class="thrust">
          <div class="thrust-flame"></div>
        </div>
      </div>
      <div class="explosion" :style="spaceshipStyle" v-if="isExploded">
        <div class="explosion-particle" v-for="i in 15" :key="i"></div>
      </div>
      <div class="surface">
        <div class="landing-pad"></div>
      </div>
    </div>
    
    <div class="control-panel">
      <div class="parameters">
        <div class="param">
          СКОРОСТЬ: {{ currentSpeed.toFixed(1) }} м/с
          <div class="speed-indicator">
            <div class="speed-bar" :style="speedBarStyle"></div>
            <div class="safe-speed-marker"></div>
          </div>
        </div>
        <div class="param">
          ВЫСОТА: {{ currentHeight.toFixed(1) }} м
          <div class="height-indicator">
            <div class="height-bar" :style="heightBarStyle"></div>
            <div class="landing-height-marker"></div>
          </div>
        </div>
        <div class="param">ТОПЛИВО: {{ Math.round(fuel) }}</div>
        <div class="param">ВРЕМЯ: {{ time.toFixed(1) }} с</div>
      </div>
      
      <div class="controls">
        <button 
          class="thrust-btn" 
          @mousedown="startThrust" 
          @mouseup="stopThrust"
          @mouseleave="stopThrust"
          :disabled="fuel <= 0 || isGameOver"
        >
          ДВИГАТЕЛИ
        </button>
        <button 
          class="pause-btn" 
          @click="togglePause"
          :disabled="isGameOver"
        >
          {{ isPaused ? 'ПРОДОЛЖИТЬ' : 'ПАУЗА' }}
        </button>
        <button 
          class="restart-btn" 
          @click="restartGame"
        >
          РЕСТАРТ
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GameField',
  props: {
    playerNickname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      currentSpeed: 0,
      currentHeight: 500,
      maxHeight: 500,
      gameAreaHeight: 0,
      fuel: 500,
      time: 0,
      isThrusting: false,
      isPaused: false,
      gameLoop: null,
      gravity: 1.4,
      thrustPower: 4.0,
      isGameOver: false,
      isExploded: false
    }
  },
  computed: {
    spaceshipStyle() {
      const bottomPosition = (this.currentHeight / this.maxHeight) * (this.gameAreaHeight - 40);
      return {
        bottom: `${bottomPosition}px`
      }
    },
    heightBarStyle() {
      const percentage = (this.currentHeight / this.maxHeight) * 100;
      return {
        width: `${percentage}%`,
        backgroundColor: this.currentHeight < 60 ? '#0f0' : 
                        this.currentHeight < 100 ? '#ff0' : '#0ff'
      }
    },
    speedBarStyle() {
      const maxSpeed = 20;
      const percentage = (Math.min(Math.abs(this.currentSpeed), maxSpeed) / maxSpeed) * 100;
      const color = this.currentSpeed < 5 ? '#0f0' : 
                   this.currentSpeed < 10 ? '#ff0' : '#f00';
      return {
        width: `${percentage}%`,
        backgroundColor: color
      }
    }
  },
  methods: {
    startThrust() {
      if (this.fuel > 0) {
        this.isThrusting = true;
      }
    },
    stopThrust() {
      this.isThrusting = false;
    },
    togglePause() {
      this.isPaused = !this.isPaused;
      if (this.isPaused) {
        clearInterval(this.gameLoop);
      } else {
        this.startGameLoop();
      }
    },
    updateGame() {
      if (this.isPaused || this.isGameOver) return;

      const deltaTime = 0.016;
      this.time += deltaTime;
      
      if (this.isThrusting && this.fuel > 0) {
        this.currentSpeed -= this.thrustPower * deltaTime;
        this.fuel = Math.max(0, this.fuel - 0.3);
      }
      
      this.currentSpeed += this.gravity * deltaTime;
      this.currentHeight -= this.currentSpeed * deltaTime;

      if (this.currentHeight >= 700) {
        this.isGameOver = true;
        clearInterval(this.gameLoop);
        setTimeout(() => {
          alert('ПОЗДРАВЛЯЕМ, ВЫ ЧИТЕР!\nВМЕСТО ЛУННОЙ МИССИИ ВЫ РЕШИЛИ ПОКИНУТЬ СОЛНЕЧНУЮ СИСТЕМУ!');
        }, 100);
        return;
      }

      if (this.currentHeight <= 40) {
        this.currentHeight = 40;
        this.isGameOver = true;
        this.gameOver();
      }
    },
    gameOver() {
      clearInterval(this.gameLoop);
      this.isGameOver = true;
      
      const success = this.currentSpeed < 5;
      if (success) {
        setTimeout(() => {
          alert('УСПЕШНАЯ ПОСАДКА!');
          this.$emit('game-completed', {
            time: this.time,
            fuel: this.fuel,
            speed: this.currentSpeed,
            success: true
          });
        }, 100);
      } else {
        this.isExploded = true;
        setTimeout(() => {
          alert('КРУШЕНИЕ! СКОРОСТЬ СЛИШКОМ ВЫСОКАЯ!');
          this.restartGame();
        }, 1500);
      }
    },
    startGameLoop() {
      this.gameLoop = setInterval(this.updateGame, 16);
    },
    restartGame() {
      this.currentSpeed = 0;
      this.currentHeight = this.maxHeight;
      this.fuel = 500;
      this.time = 0;
      this.isThrusting = false;
      this.isPaused = false;
      this.isGameOver = false;
      this.isExploded = false;
      clearInterval(this.gameLoop);
      this.startGameLoop();
    },
    returnToMenu() {
      this.$emit('back-to-menu');
    },
    handleKeyDown(e) {
      if (e.code === 'Space') {
        this.startThrust();
      }
      if (e.key === 'p' || e.key === 'P') {
        this.togglePause();
      }
      if (e.key === 'Enter' && this.isGameOver) {
        this.restartGame();
      }
    },
    handleKeyUp(e) {
      if (e.code === 'Space') {
        this.stopThrust();
      }
    }
  },
  mounted() {
    const gameArea = document.querySelector('.game-area');
    this.gameAreaHeight = gameArea.clientHeight;
    this.startGameLoop();
    
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
  },
  beforeUnmount() {
    clearInterval(this.gameLoop);
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }
}
</script>

<style scoped>
.game-field {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: #000;
}

.game-area {
  flex: 1;
  position: relative;
  background: url('../assets/stars.png');
  background-size: cover;
  overflow: hidden;
}

.spaceship {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 20px;
  height: 30px;
  z-index: 10;
}

.ship-body {
  width: 100%;
  height: 100%;
  position: relative;
}

.ship-body-main {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #0ff;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}

.ship-window {
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
  background: #000;
  border-radius: 50%;
  z-index: 2;
}

.thrust {
  position: absolute;
  bottom: -15px;
  left: 50%;
  transform: translateX(-50%);
  width: 10px;
  height: 15px;
}

.thrust-flame {
  width: 100%;
  height: 100%;
  background: #f00;
  clip-path: polygon(50% 100%, 0% 0%, 100% 0%);
  animation: flicker 0.1s infinite;
}

.surface {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 40px;
  background: #333;
  border-top: 2px solid #0f0;
}

.landing-pad {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: #0f0;
  box-shadow: 0 0 10px #0f0;
}

.control-panel {
  height: 120px;
  background: #000;
  border-top: 2px solid #0f0;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.parameters {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.param {
  color: #0f0;
  font-size: 12px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.speed-indicator,
.height-indicator {
  width: 100px;
  height: 8px;
  background: #222;
  margin-top: 5px;
  border: 1px solid #0f0;
  position: relative;
}

.speed-bar,
.height-bar {
  height: 100%;
  transition: all 0.1s linear;
}

.safe-speed-marker,
.landing-height-marker {
  position: absolute;
  top: -2px;
  height: 12px;
  width: 3px;
  background: #fff;
  box-shadow: 0 0 4px #fff;
  opacity: 0.8;
}

.safe-speed-marker {
  left: 25%;
}

.landing-height-marker {
  left: 8%;
}

.controls {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 10px;
}

.controls button {
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  padding: 10px 20px;
  background: transparent;
  border: 2px solid;
  cursor: pointer;
  min-width: 120px;
}

.thrust-btn {
  border-color: #f00;
  color: #f00;
}

.pause-btn {
  border-color: #0f0;
  color: #0f0;
}

.restart-btn {
  border-color: #0ff;
  color: #0ff;
}

.thrust-btn:hover:not(:disabled) {
  background: #f00;
  color: #000;
}

.pause-btn:hover:not(:disabled) {
  background: #0f0;
  color: #000;
}

.restart-btn:hover:not(:disabled) {
  background: #0ff;
  color: #000;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.explosion {
  position: absolute;
  left: 50%;
  bottom: 40px;
  transform: translateX(-50%);
  width: 100px;
  height: 100px;
  z-index: 1000;
}

.explosion-particle {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: explode 1.5s ease-out forwards;
  left: 50%;
  top: 50%;
}

.explosion-particle:nth-child(3n) {
  background: #f00;
  width: 10px;
  height: 10px;
}

.explosion-particle:nth-child(3n+1) {
  background: #ff0;
  width: 8px;
  height: 8px;
}

.explosion-particle:nth-child(3n+2) {
  background: #f90;
  width: 6px;
  height: 6px;
}

.explosion-particle:nth-child(1) { --x: -50px; --y: -50px; }
.explosion-particle:nth-child(2) { --x: 50px; --y: -50px; }
.explosion-particle:nth-child(3) { --x: 0; --y: -60px; }
.explosion-particle:nth-child(4) { --x: -60px; --y: 0; }
.explosion-particle:nth-child(5) { --x: 60px; --y: 0; }
.explosion-particle:nth-child(6) { --x: -50px; --y: 50px; }
.explosion-particle:nth-child(7) { --x: 50px; --y: 50px; }
.explosion-particle:nth-child(8) { --x: 0; --y: 60px; }
.explosion-particle:nth-child(9) { --x: -30px; --y: -30px; }
.explosion-particle:nth-child(10) { --x: 30px; --y: -30px; }
.explosion-particle:nth-child(11) { --x: -30px; --y: 30px; }
.explosion-particle:nth-child(12) { --x: 30px; --y: 30px; }
.explosion-particle:nth-child(13) { --x: -20px; --y: 0; }
.explosion-particle:nth-child(14) { --x: 20px; --y: 0; }
.explosion-particle:nth-child(15) { --x: 0; --y: -20px; }

@keyframes flicker {
  0% { opacity: 0.8; }
  50% { opacity: 1; }
  100% { opacity: 0.8; }
}

@keyframes explode {
  0% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
  100% {
    transform: translate(var(--x, 0), var(--y, 0)) scale(0);
    opacity: 0;
  }
}

.menu-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  font-family: 'Press Start 2P', cursive;
  font-size: 12px;
  padding: 10px 20px;
  background: transparent;
  border: 2px solid #ff0;
  color: #ff0;
  cursor: pointer;
  z-index: 100;
  min-width: 120px;
}

.menu-btn:hover {
  background: #ff0;
  color: #000;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .control-panel {
    height: auto;
    padding: 10px;
  }

  .parameters {
    flex-wrap: wrap;
    gap: 10px;
  }

  .param {
    font-size: 10px;
    flex: 1 1 40%;
  }

  .controls {
    flex-direction: column;
    gap: 10px;
  }

  .controls button {
    width: 100%;
    padding: 15px;
    font-size: 14px;
  }

  /* Перемещаем кнопку меню под игровое поле */
  .menu-btn {
    position: static;
    width: 100%;
    margin-top: 10px;
    padding: 15px;
    font-size: 14px;
  }

  /* Уменьшаем индикаторы */
  .speed-indicator,
  .height-indicator {
    width: 80px;
    height: 6px;
  }
}

/* Корректировка размеров для планшетов */
@media (min-width: 769px) and (max-height: 600px) {
  .control-panel {
    height: auto;
    min-height: 100px;
  }

  .controls {
    gap: 10px;
  }

  .controls button {
    padding: 8px 15px;
    font-size: 12px;
    min-width: 100px;
  }
}
</style>