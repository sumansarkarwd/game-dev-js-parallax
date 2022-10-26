const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

const CANVAS_HEIGHT = (canvas.height = 700);
const CANVAS_WIDTH = (canvas.width = 800);

const bg1 = new Image();
bg1.src = "./assets/layer-1.png";
const bg2 = new Image();
bg2.src = "./assets/layer-2.png";
const bg3 = new Image();
bg3.src = "./assets/layer-3.png";
const bg4 = new Image();
bg4.src = "./assets/layer-4.png";
const bg5 = new Image();
bg5.src = "./assets/layer-5.png";

let gameSpeed = 5;
// let gameFrame = 0;

window.addEventListener("load", () => {
  const slider = document.getElementById("slider");
  slider.value = gameSpeed;
  const showGameSpeed = document.getElementById("show-game-speed");
  showGameSpeed.innerHTML = gameSpeed;
  slider.addEventListener("change", (e) => {
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = gameSpeed;
  });

  class Layer {
    constructor(image, speedModifier) {
      this.x = 0;
      this.y = 0;
      this.width = 2400;
      this.height = 700;
      this.image = image;
      this.speedModifier = speedModifier;
      this.speed = gameSpeed * this.speedModifier;
    }

    update() {
      this.speed = gameSpeed * this.speedModifier;
      if (this.x <= -this.width) {
        this.x = 0;
      }
      this.x = Math.floor(this.x - this.speed);
      // this.x = (gameFrame * this.speed) % this.width;
    }

    draw() {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width,
        this.y,
        this.width,
        this.height
      );
    }
  }

  const layer1 = new Layer(bg1, 0.2);
  const layer2 = new Layer(bg2, 0.4);
  const layer3 = new Layer(bg3, 0.6);
  const layer4 = new Layer(bg4, 0.8);
  const layer5 = new Layer(bg5, 1);

  const gameObjects = [layer1, layer2, layer3, layer4, layer5];

  function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach((obj) => {
      obj.update();
      obj.draw();
    });
    // gameFrame--;
    requestAnimationFrame(animate);
  }

  animate();
});
