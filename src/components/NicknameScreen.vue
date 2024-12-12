<template>
  <div class="nickname-screen">
    <div class="title-container">
      <h1 class="game-title">КОСМИЧЕСКИЙ КОРАБЛЬ</h1>
    </div>
    <div class="input-container">
      <h2>ВВЕДИТЕ ПОЗЫВНОЙ:</h2>
      <input 
        type="text" 
        v-model="nickname" 
        class="nickname-input"
        maxlength="15"
        placeholder="ПОЗЫВНОЙ"
      />
      <button 
        class="continue-button" 
        @click="submitNickname" 
        :disabled="!nickname.trim()"
      >
        ПРОДОЛЖИТЬ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NicknameScreen',
  data() {
    return {
      nickname: ''
    }
  },
  methods: {
    submitNickname() {
      if (this.nickname.trim()) {
        this.$emit('nickname-submitted', this.nickname.trim())
      }
    }
  }
}
</script>

<style scoped>
.nickname-screen {
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

.game-title {
  font-size: 36px;
  color: #0ff;
  text-shadow: 0 0 10px #0ff;
  margin-bottom: 40px;
  letter-spacing: 4px;
  text-align: center;
}

.input-container {
  background: rgba(0, 255, 0, 0.1);
  padding: 30px;
  border: 2px solid #0f0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

.nickname-input {
  background: transparent;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  text-align: center;
  width: 100%;
  max-width: 300px;
}

.nickname-input::placeholder {
  color: rgba(0, 255, 0, 0.3);
}

.continue-button {
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background-color: transparent;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.continue-button:hover:not(:disabled) {
  background-color: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

.continue-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .nickname-screen {
    padding: 15px;
  }

  .game-title {
    font-size: 24px;
    margin-bottom: 30px;
    letter-spacing: 2px;
  }

  .input-container {
    padding: 20px;
    gap: 15px;
    width: 90%;
  }

  .nickname-input {
    font-size: 14px;
    padding: 12px;
    width: 90%;
  }

  .continue-button {
    width: 90%;
    padding: 15px;
    font-size: 14px;
  }
}

/* Версия для маленьких экранов */
@media (max-height: 500px) {
  .game-title {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .input-container {
    padding: 15px;
  }

  .continue-button {
    padding: 10px;
  }
}

/* Улучшения для тач-устройств */
@media (hover: none) {
  .continue-button:active {
    background-color: #0f0;
    color: #000;
    box-shadow: 0 0 20px #0f0;
  }

  .nickname-input {
    -webkit-appearance: none;
    border-radius: 0;
  }
}

/* Фикс для виртуальной клавиатуры */
@media (max-height: 400px) {
  .nickname-screen {
    justify-content: flex-start;
    padding-top: 20px;
  }
}
</style>