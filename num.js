// 獲取元素
const counterElement = document.getElementById('counter');
const increaseButton = document.getElementById('increaseBtn');
const decreaseButton = document.getElementById('decreaseBtn');
const resetButton = document.getElementById('resetBtn');

// 初始化計數器
let count = 0;
counterElement.textContent = count;

// 點擊事件處理器
increaseButton.addEventListener('click', function() {
  count++;
  counterElement.textContent = count;
});

decreaseButton.addEventListener('click', function() {
  count--;
  counterElement.textContent = count;
});

resetButton.addEventListener('click', function() {
  count = 0;
  counterElement.textContent = count;
});
