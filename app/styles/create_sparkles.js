const fs = require('fs');

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
let css = '';
for (let i = 1; i <= 50; i++) {
  const translateX = randomNumber(-2, 2);
  const translateY = randomNumber(14, 20);
  const rotate = randomNumber(20, 359);
  const duration = Math.random() * 5 + 1;

  css += `
    .sparkle.s${i} {
      animation: sparkle${i} ${duration}s cubic-bezier(0.2, 0.8, 0.1, 1) forwards;
    }
    @keyframes sparkle${i} {
      0% {
        opacity: 1;
        transform: scale(0) translate(0, 0) rotate(0);
      }
      50% {
        opacity: 1;
      }
      99% {
        opacity: 0;
      }
      100% {
        opacity: 0;
        transform: scale(1) translate(${translateX}vw, ${translateY}vh) rotate(${rotate}deg);
      }
    }
  `;
}

fs.writeFileSync('sparkles.css', css);
