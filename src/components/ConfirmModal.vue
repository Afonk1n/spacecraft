<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content">
      <h2 class="modal-title">ВНИМАНИЕ</h2>
      <p class="modal-text">ВЕРНУТЬСЯ В МЕНЮ? ТЕКУЩИЙ ПРОГРЕСС БУДЕТ ПОТЕРЯН.</p>
      <div class="button-container">
        <button class="confirm-button" @click="$emit('confirm')">ДА</button>
        <button class="cancel-button" @click="$emit('close')">НЕТ</button>
      </div>
    </div>
  </div>
</template>

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
  background: linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9));
  border: 2px solid #0f0;
  padding: 30px;
  text-align: center;
  max-width: 500px;
  width: 90%;
}

.modal-title {
  color: #0f0;
  font-size: 24px;
  margin-bottom: 20px;
}

.modal-text {
  color: #0f0;
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 30px;
}

.button-container {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.confirm-button, .cancel-button {
  padding: 15px 30px;
  font-family: 'Press Start 2P', cursive;
  font-size: 16px;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s;
}

.confirm-button {
  border: 2px solid #0f0;
  color: #0f0;
}

.cancel-button {
  border: 2px solid #f00;
  color: #f00;
}

.confirm-button:hover {
  background: #0f0;
  color: #000;
  box-shadow: 0 0 20px #0f0;
}

.cancel-button:hover {
  background: #f00;
  color: #000;
  box-shadow: 0 0 20px #f00;
}
</style> 