<template>
  <div class="nickname-screen">
    <h1 class="game-title">КОСМИЧЕСКИЙ КОРАБЛЬ</h1>
    <div class="input-container">
      <h2>ВВЕДИТЕ ПОЗЫВНОЙ:</h2>
      <input 
        type="text" 
        v-model="nickname" 
        class="nickname-input"
        maxlength="15"
        placeholder="ПОЗЫВНОЙ"
        @keyup.enter="submitNickname"
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
        this.$emit('nickname-selected', this.nickname.trim())
      }
    }
  }
}
</script>

<style scoped>
.nickname-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('../assets/stars.png');
}

.game-title {
  color: #0ff;
  font-size: 36px;
  margin-bottom: 50px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 0 10px #0ff;
}

.input-container {
  background: rgba(0, 255, 0, 0.1);
  border: 2px solid #0f0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.input-container h2 {
  color: #0f0;
  font-family: 'Press Start 2P', cursive;
  font-size: 18px;
  text-align: center;
}

.nickname-input {
  background: transparent;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 10px;
  font-family: 'Press Start 2P', cursive;
  font-size: 14px;
  text-align: center;
  width: 200px;
}

.nickname-input:focus {
  outline: none;
  box-shadow: 0 0 10px #0f0;
}

.continue-button {
  background: transparent;
  border: 2px solid #0f0;
  color: #0f0;
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.continue-button:not(:disabled):hover {
  background: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

.continue-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 768px) {
  .game-title {
    font-size: 24px;
    margin-bottom: 30px;
  }

  .input-container {
    width: 90%;
    padding: 20px;
  }

  .input-container h2 {
    font-size: 14px;
  }

  .nickname-input {
    width: 80%;
  }
}
</style>