<template>
  <div class="welcome-screen">
    <div class="title-container">
      <h1 class="game-title">КОСМИЧЕСКИЙ КОРАБЛЬ</h1>
    </div>

    <div v-if="!nickname" class="input-container">
      <h2>ВВЕДИТЕ ПОЗЫВНОЙ:</h2>
      <input 
        type="text" 
        v-model="inputNickname"
        maxlength="15"
        placeholder="ПОЗЫВНОЙ"
        class="nickname-input"
      />
      <button 
        class="continue-button" 
        @click="submitNickname"
        :disabled="!inputNickname.trim()"
      >
        ПРОДОЛЖИТЬ
      </button>
    </div>

    <div v-else>
      <div class="instructions">
        <h2>ИНСТРУКЦИЯ:</h2>
        <ul>
          <li>ЦЕЛЬ: ПОСАДИТЬ КОРАБЛЬ НА ПЛАТФОРМУ</li>
          <li>УПРАВЛЕНИЕ: ПРОБЕЛ ИЛИ КНОПКА "ДВИГАТЕЛИ"</li>
          <li>БЕЗОПАСНАЯ СКОРОСТЬ ПОСАДКИ: &lt; 5 М/С</li>
          <li>НАЖМИТЕ [P] ДЛЯ ПАУЗЫ</li>
        </ul>
      </div>
      <div class="button-container">
        <button class="start-button" @click="startGame">НАЧАТЬ МИССИЮ</button>
        <button class="leaderboard-button" @click="showLeaderboard">ТАБЛИЦА ЛИДЕРОВ</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen',
  props: {
    nickname: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      inputNickname: ''
    }
  },
  methods: {
    submitNickname() {
      if (this.inputNickname.trim()) {
        this.$emit('update:nickname', this.inputNickname.trim());
      }
    },
    startGame() {
      this.$emit('start-game');
    },
    showLeaderboard() {
      this.$emit('show-leaderboard');
    }
  }
}
</script>

<style scoped>
.welcome-screen {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #0f0;
  padding: 20px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('../assets/stars.png');
  background-size: cover;
  text-shadow: 0 0 5px #0f0;
}

.title-container {
  text-align: center;
  margin-bottom: 40px;
  width: 100%;
}

.game-title {
  font-size: 36px;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
  margin-bottom: 20px;
  letter-spacing: 4px;
}

.instructions {
  background: rgba(0, 255, 0, 0.1);
  padding: 20px;
  border: 2px solid #0f0;
  margin-bottom: 30px;
  max-width: 600px;
  width: 100%;
}

h2 {
  color: #0ff;
  margin-bottom: 15px;
  font-size: 16px;
}

ul {
  list-style: none;
}

li {
  margin-bottom: 15px;
  font-size: 12px;
  position: relative;
  padding-left: 20px;
}

li:before {
  content: '>';
  position: absolute;
  left: 0;
  color: #0f0;
}

.start-button {
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background-color: transparent;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.start-button:hover {
  background-color: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}

.nickname-form {
  background: rgba(0, 255, 0, 0.1);
  padding: 20px;
  border: 2px solid #0f0;
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 300px;
}

.nickname-input {
  background: transparent;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  text-align: center;
}

.nickname-input:focus {
  outline: none;
  box-shadow: 0 0 10px #0f0;
}

.submit-button {
  padding: 10px 20px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  background-color: transparent;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-button:hover {
  background-color: #0f0;
  color: #000;
}

.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  max-width: 600px;
}

.leaderboard-button {
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background-color: transparent;
  color: #0ff;
  border: 2px solid #0ff;
  cursor: pointer;
  transition: all 0.3s;
}

.leaderboard-button:hover {
  background-color: #0ff;
  color: #000;
  box-shadow: 0 0 20px #0ff;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .welcome-screen {
    padding: 15px;
    justify-content: flex-start;
    padding-top: 40px;
  }

  .game-title {
    font-size: 24px;
    letter-spacing: 2px;
    margin-bottom: 15px;
  }

  .instructions {
    padding: 15px;
    margin-bottom: 20px;
  }

  h2 {
    font-size: 14px;
    margin-bottom: 10px;
  }

  ul {
    padding-left: 0;
  }

  li {
    font-size: 11px;
    margin-bottom: 10px;
    line-height: 1.4;
  }

  .button-container {
    flex-direction: column;
    gap: 15px;
    padding: 0 15px;
  }

  .start-button,
  .leaderboard-button {
    width: 100%;
    padding: 15px;
    font-size: 14px;
  }
}

/* Версия для маленьких экранов */
@media (max-height: 500px) {
  .welcome-screen {
    padding-top: 20px;
  }

  .game-title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .instructions {
    padding: 10px;
    margin-bottom: 15px;
  }

  li {
    margin-bottom: 8px;
  }

  .start-button,
  .leaderboard-button {
    padding: 10px;
  }
}

/* Улучшения для тач-устройств */
@media (hover: none) {
  .start-button:active,
  .leaderboard-button:active {
    transform: scale(0.98);
    transition: transform 0.1s;
  }

  .start-button:active {
    background-color: #0f0;
    color: #000;
  }

  .leaderboard-button:active {
    background-color: #0ff;
    color: #000;
  }
}

/* Оптимизация для ландшафтной ориентации */
@media (max-width: 768px) and (orientation: landscape) {
  .welcome-screen {
    padding: 10px;
  }

  .instructions {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
  }

  .button-container {
    flex-direction: row;
  }

  .start-button,
  .leaderboard-button {
    flex: 1;
  }
}
</style> 