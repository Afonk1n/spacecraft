<template>
  <div class="app">
    <NicknameScreen 
      v-if="currentScreen === 'nickname'"
      @nickname-selected="setNickname"
    />
    <WelcomeScreen 
      v-if="currentScreen === 'menu'"
      @start-game="startGame"
      @show-leaderboard="showLeaderboard"
    />
    <GameField 
      v-if="currentScreen === 'game'"
      @game-completed="handleGameOver"
      @return-to-menu="returnToMenu"
    />
    <LeaderBoard 
      v-if="showLeaderboardModal"
      @close="closeLeaderboard"
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
      playerNickname: '',
      showLeaderboardModal: false
    }
  },
  methods: {
    setNickname(nickname) {
      this.playerNickname = nickname;
      this.currentScreen = 'menu';
    },
    startGame() {
      this.currentScreen = 'game';
      this.showLeaderboardModal = false;
    },
    showLeaderboard() {
      this.showLeaderboardModal = true;
    },
    closeLeaderboard() {
      this.showLeaderboardModal = false;
    },
    async handleGameOver(gameData) {
      try {
        await fetch('http://localhost:3000/api/scores', {
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
        
        this.showLeaderboardModal = true;
        
      } catch (error) {
        console.error('Ошибка сохранения результата:', error);
      }
    },
    returnToMenu() {
      this.currentScreen = 'menu';
      this.showLeaderboardModal = false;
    }
  }
}
</script>

<style>
.app {
  height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Press Start 2P', cursive;
  -webkit-font-smoothing: none;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>