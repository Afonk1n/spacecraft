<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <button class="close-button" @click="$emit('close')">×</button>
      <div class="leaderboard">
        <h2 class="leaderboard-title">Таблица лидеров</h2>
        <div class="scores-container">
          <table class="scores-table">
            <thead>
              <tr>
                <th>МЕСТО</th>
                <th>ПОЗЫВНОЙ</th>
                <th>ВРЕМЯ</th>
                <th>ТОПЛИВО</th>
                <th>СКОРОСТЬ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(score, index) in scores" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ score.nickname }}</td>
                <td>{{ formatTime(score.time) }}</td>
                <td>{{ Math.round(score.fuel) }}</td>
                <td>{{ score.speed.toFixed(1) }} м/с</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LeaderBoard',
  data() {
    return {
      scores: []
    }
  },
  methods: {
    async loadScores() {
      try {
        const response = await fetch('http://localhost:3000/api/scores');
        const data = await response.json();
        this.scores = data;
      } catch (error) {
        console.error('Ошибка при загрузке результатов:', error);
      }
    },
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = (seconds % 60).toFixed(1);
      return `${minutes}:${remainingSeconds.padStart(4, '0')}`;
    }
  },
  mounted() {
    this.loadScores();
  }
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  position: relative;
  width: 80%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)),
              url('../assets/stars.png');
  border: 2px solid #0f0;
  padding: 20px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 30px;
  height: 30px;
  border: 2px solid #0f0;
  background: transparent;
  color: #0f0;
  font-size: 24px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
}

.close-button:hover {
  background: #0f0;
  color: #000;
}

.leaderboard {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  background: linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
              url('../assets/stars.png');
  color: #0f0;
}

.leaderboard-title {
  font-size: 36px;
  margin-bottom: 30px;
  text-align: center;
}

.scores-container {
  width: 100%;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.scores-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  min-width: 600px;
}

.scores-table th,
.scores-table td {
  padding: 10px;
  text-align: center;
  border: 1px solid #0f0;
}

.scores-table th {
  background: rgba(0, 255, 0, 0.2);
}

.back-button {
  margin-top: 30px;
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background-color: transparent;
  color: #0f0;
  border: 2px solid #0f0;
  cursor: pointer;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

/* Мобильная версия */
@media (max-width: 768px) {
  .leaderboard {
    padding: 20px 10px;
  }

  .leaderboard-title {
    font-size: 24px;
    margin-bottom: 20px;
  }

  .scores-table th,
  .scores-table td {
    padding: 8px 5px;
    font-size: 12px;
  }

  .back-button {
    margin-top: 20px;
    width: 100%;
    max-width: 300px;
    padding: 12px;
    font-size: 14px;
  }

  /* Добавляем индикатор прокрутки */
  .scores-container::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, 
      transparent 0%, 
      rgba(0, 255, 0, 0.5) 50%, 
      transparent 100%);
    animation: scroll-hint 2s infinite;
    opacity: 0.8;
  }
}

/* Анимация индикатора прокрутки */
@keyframes scroll-hint {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

/* Планшетная версия */
@media (min-width: 769px) and (max-height: 600px) {
  .leaderboard {
    padding: 20px;
  }

  .leaderboard-title {
    font-size: 28px;
    margin-bottom: 15px;
  }

  .scores-table th,
  .scores-table td {
    padding: 10px;
    font-size: 14px;
  }
}
</style> 