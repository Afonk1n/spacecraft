<template>
  <div class="welcome-screen">
    <h1 class="game-title">КОСМИЧЕСКИЙ КОРАБЛЬ</h1>
    <div class="instructions">
      <p>УПРАВЛЕНИЕ:</p>
      <p>УДЕРЖИВАЙТЕ "ДВИГАТЕЛИ" ДЛЯ ТОРМОЖЕНИЯ</p>
      <p>СКОРОСТЬ ПОСАДКИ ДОЛЖНА БЫТЬ МЕНЬШЕ 5 М/С</p>
    </div>
    <div class="button-container">
      <button class="start-button" @click="$emit('start-game')">
        НАЧАТЬ ИГРУ
      </button>
      <button class="leaderboard-button" @click="$emit('show-leaderboard')">
        ТАБЛИЦА ЛИДЕРОВ
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'WelcomeScreen'
}
</script>

<style scoped>
.welcome-screen {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('../assets/stars.png');
  padding: 20px;
}

.game-title {
  color: #0ff;
  font-size: 36px;
  margin-bottom: 50px;
  text-align: center;
  font-family: 'Press Start 2P', cursive;
  text-shadow: 0 0 10px #0ff;
}

.instructions {
  color: #0f0;
  font-family: 'Press Start 2P', cursive;
  text-align: center;
  margin-bottom: 50px;
  line-height: 2;
}

.button-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.start-button, .leaderboard-button {
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background-color: transparent;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.start-button {
  color: #0f0;
}

.leaderboard-button {
  color: #0ff;
  border-color: #0ff;
}

.start-button:hover {
  background-color: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

.leaderboard-button:hover {
  background-color: #0ff;
  color: #000;
  box-shadow: 0 0 20px #0ff;
}

@media (max-width: 768px) {
  .game-title {
    font-size: 24px;
  }

  .instructions {
    font-size: 12px;
  }

  .start-button, .leaderboard-button {
    width: 100%;
    font-size: 14px;
  }
}
</style> 