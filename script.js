// Tap texts
const texts = [
  "গোলাপগঞ্জে উন্নয়ন",
  "বিয়ানীবাজারে উন্নয়ন",
  "স্বাস্থ্যখাতে উন্নয়ন",
  "শিক্ষাব্যবস্থায় উন্নয়ন",
  "দুর্নীতি প্রতিরোধ",
  "কর্মসংস্থান সৃষ্টি",
  "রাস্তা উন্নয়ন",
  "উন্নত চিকিৎসা ব্যবস্থা"
];

let score = 0;
let timeLeft = 15;
let gameOver = false;

const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const msg = document.getElementById("msg");
const bgMusic = document.getElementById("bgMusic");
const runner = document.getElementById("runner");

// Start background music on first interaction
document.body.addEventListener("click", () => {
  if(bgMusic.paused) bgMusic.play().catch(() => {});
}, {once:true});

// Function to create a random coin
function createCoin() {
  if (gameOver) return;

  const coin = document.createElement("div");
  coin.className = "coin";
  coin.innerText = texts[Math.floor(Math.random() * texts.length)];

  const maxTop = game.clientHeight - 30; // coin height
  const maxLeft = game.clientWidth - 100;
  coin.style.top = Math.random() * maxTop + "px";
  coin.style.left = Math.random() * maxLeft + "px";

  game.appendChild(coin);

  setTimeout(() => {
    if (coin.parentElement) coin.remove();
  }, 2500);

  coin.addEventListener("click", () => {
    score++;
    scoreEl.innerText = score;
    coin.remove();
  });
}

// Coins generator
function startCoinGeneration() {
  if (gameOver) return;
  createCoin();
  const randomInterval = 500 + Math.random() * 1000;
  setTimeout(startCoinGeneration, randomInterval);
}

// Runner animation (horizontal movement)
let runnerX = 20;
let runnerDir = 1;
function moveRunner() {
  if(gameOver) return;
  runnerX += runnerDir * 2; // speed
  if(runnerX > game.clientWidth - 50) runnerDir = -1;
  if(runnerX < 0) runnerDir = 1;
  runner.style.left = runnerX + "px";
  requestAnimationFrame(moveRunner);
}

// Timer
function startTimer() {
  const timer = setInterval(() => {
    timeLeft--;
    timeEl.innerText = timeLeft;

    if(timeLeft <= 0) {
      clearInterval(timer);
      gameOver = true;
      msg.innerText = "🎉 সময় শেষ! মোট কয়েন: " + score;
      bgMusic.pause();
    }
  }, 1000);
}

// Start game
startCoinGeneration();
moveRunner();
startTimer();
