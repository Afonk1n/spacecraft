<template>
  <div class="app">
    <NicknameScreen 
      v-if="currentScreen === 'nickname'"
      @nickname-submitted="setNickname"
    />
    <WelcomeScreen 
      v-else-if="currentScreen === 'menu'"
      :nickname="playerNickname"
      @start-game="startGame"
      @show-leaderboard="showLeaderboard"
    />
    <GameField 
      v-else-if="currentScreen === 'game'"
      :playerNickname="playerNickname"
      @game-completed="handleGameOver"
      @back-to-menu="currentScreen = 'menu'"
    />
    <LeaderBoard 
      v-else-if="currentScreen === 'leaderboard'"
      @back-to-menu="currentScreen = 'menu'"
    />
  </div>
</template>

<script>
import WelcomeScreen from './components/WelcomeScreen.vue'
import GameField from './components/GameField.vue'
import LeaderBoard from './components/LeaderBoard.vue'
import NicknameScreen from './components/NicknameScreen.vue'

export default {
  name: 'App',
  components: {
    WelcomeScreen,
    GameField,
    LeaderBoard,
    NicknameScreen
  },
  data() {
    return {
      currentScreen: 'nickname',
      playerNickname: ''
    }
  },
  methods: {
    setNickname(nickname) {
      this.playerNickname = nickname;
      this.currentScreen = 'menu';
    },
    startGame() {
      this.currentScreen = 'game';
    },
    showLeaderboard() {
      this.currentScreen = 'leaderboard';
    },
    async handleGameOver(gameData) {
      try {
        const response = await fetch('http://localhost:3000/api/scores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nickname: this.playerNickname,
            time: gameData.time,
            fuel: gameData.fuel,
            speed: gameData.speed,
            success: gameData.success
          })
        });
        
        if (response.ok) {
          this.currentScreen = 'leaderboard';
        }
      } catch (error) {
        console.error('Ошибка сохранения результата:', error);
      }
    }
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-height: -webkit-fill-available;
  background-color: #000;
  font-family: 'Press Start 2P', cursive;
  image-rendering: pixelated;
}

.app {
  width: 960px;
  height: 600px;
  margin: 0 auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #000;
  overflow: hidden;
  border: 4px solid #444;
  box-shadow: 0 0 20px rgba(0, 255, 255, 0.2);
}

@media (max-width: 768px) {
  .app {
    width: 100vw;
    height: 100vh;
    max-width: 100%;
    border: none;
    transform: none;
    top: 0;
    left: 0;
  }
}

/* Добавим медиа-запрос для планшетов в альбомной ориентации */
@media (min-width: 769px) and (max-height: 600px) {
  .app {
    width: auto;
    height: 90vh;
    aspect-ratio: 16/10;
  }
}

/* Фикс для мобильных Safari */
html {
  height: -webkit-fill-available;
}
</style>