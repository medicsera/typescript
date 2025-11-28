<template>
    <div class="game">
        <div class="score">HI {{ bestScore }} {{ score }}</div>
        <div class="dino" :style="{ bottom: dinoBottom + 'px' }">
            <img :src="frames[currentFrame]" style="width: 100%; height: 100%" />
        </div>
        <template v-for="ob in obstacles" :key="ob.id">
            <div class="obstacle" :style="{
                left: ob.left + 'px',
                bottom: ob.bottom + 'px',
            }">
                <img src="../assets/cactus.svg" style="width: 100%; height: 100%" />
            </div>
        </template>
        <div v-if="gameOver" class="msg">
            <p>Game Over!</p>
            <button @click="restart" class="restart-btn"><img src="../assets/restart.svg"></img></button>
        </div>
        <div v-if="waitingStart" class="msg">
            <p>Нажми пробел для старта</p>
        </div>
        <div class="ground"></div>
        <div class="grass-blades">
            <div v-for="(blade, i) in grassBlades" :key="i" class="grass-blade" :style="{
                left: blade.left + 'px',
                width: blade.width + 'px',
                height: blade.height + 'px',
                bottom: blade.bottom + 'px'
            }"></div>
        </div>
    </div>
    <button v-if="hasPlayed" class="return-btn">
        <router-link to="/todo"><img src="../assets/exit.svg"></router-link>
    </button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import cat1 from "../assets/cat1-no-bg.png";
import cat2 from "../assets/cat2-no-bg.png";

interface Obstacle {
    id: string;
    left: number;
    bottom: number;
    scored: boolean;
}

interface GrassBlade {
    left: number;
    width: number;
    height: number;
    bottom: number;
}

const dinoBottom = ref<number>(20);
const isJumping = ref<boolean>(false);
const isFalling = ref<boolean>(false);
const jumpPower = ref<number>(0);
const gameOver = ref<boolean>(false);
const score = ref<number>(0);
const obstacles = ref<Obstacle[]>([]);
const speed = ref<number>(5);
const grassBlades = ref<GrassBlade[]>([]);
const waitingStart = ref<boolean>(true);
const currentFrame = ref<number>(0);
const bestScore = ref<number>(
    parseInt(localStorage.getItem("catBestScore") || "0", 10)
);
const hasPlayed = ref<boolean>(false);

const NUM_BLADES = 35;
const dinoX = 50;
const dinoWidth = 40;
const obstacleWidth = 20;
const obstacleHeight = 40;
const safeMargin = 5;
const PACK_GAP = 250;
const FIELD_WIDTH = 600;

const frames = [cat1, cat2];

let obstacleInterval: number | null = null;
let jumpInterval: number | null = null;
let fallInterval: number | null = null;
let jumpTimeout: number | null = null;
let runningInterval: number | null = null;
let canSpawnNextPack = true;

function clearIntervalSafe(id: number | null) {
    if (id !== null) window.clearInterval(id);
}
function clearTimeoutSafe(id: number | null) {
    if (id !== null) window.clearTimeout(id);
}

function spawnObstaclePack(): void {
    const count = Math.floor(Math.random() * 4) + 1;

    const rightmost = obstacles.value.length
        ? Math.max(...obstacles.value.map((o) => o.left))
        : FIELD_WIDTH;

    const start = Math.max(rightmost + PACK_GAP, FIELD_WIDTH);

    for (let i = 0; i < count; i++) {
        obstacles.value.push({
            id: `${Date.now()}-${Math.random()}-${i}`,
            left: start + i * obstacleWidth,
            bottom: 20,
            scored: false,
        });
    }
}

function startRunningAnimation(): void {
    clearIntervalSafe(runningInterval);
    runningInterval = window.setInterval(() => {
        currentFrame.value = (currentFrame.value + 1) % frames.length;
    }, 150);
}

function stopRunningAnimation(): void {
    clearIntervalSafe(runningInterval);
    runningInterval = null;
    currentFrame.value = 0;
}

function startJump(): void {
    if (isJumping.value || isFalling.value || gameOver.value) return;
    isJumping.value = true;
    jumpPower.value = 0;
    clearIntervalSafe(fallInterval);

    jumpInterval = window.setInterval(() => {
        if (dinoBottom.value < 120 && jumpPower.value < 40) {
            dinoBottom.value += 4;
            jumpPower.value += 1;
        }
    }, 15);

    jumpTimeout = window.setTimeout(() => {
        stopJump();
    }, 400);

    stopRunningAnimation();
}

function stopJump(): void {
    if (!isJumping.value) return;
    clearIntervalSafe(jumpInterval);
    clearTimeoutSafe(jumpTimeout);
    isJumping.value = false;
    isFalling.value = true;

    fallInterval = window.setInterval(() => {
        if (dinoBottom.value > 20) {
            dinoBottom.value -= 5;
        } else {
            clearIntervalSafe(fallInterval);
            isFalling.value = false;
            jumpPower.value = 0;
            dinoBottom.value = 20;
        }
    }, 15);

    startRunningAnimation();
}

function moveObstacles(): void {
    if (!obstacles.value.length) spawnObstaclePack();

    clearIntervalSafe(obstacleInterval);
    obstacleInterval = window.setInterval(() => {
        for (const ob of obstacles.value) {
            ob.left -= speed.value;

            const collides =
                ob.left < dinoX + dinoWidth - safeMargin &&
                ob.left + obstacleWidth > dinoX + safeMargin &&
                dinoBottom.value < obstacleHeight;

            if (collides) {
                gameOver.value = true;
                hasPlayed.value = true;
                stopRunningAnimation();

                if (score.value > bestScore.value) {
                    bestScore.value = score.value;
                    localStorage.setItem("catBestScore", String(score.value));
                }

                clearIntervalSafe(obstacleInterval);
                clearIntervalSafe(jumpInterval);
                clearIntervalSafe(fallInterval);
                clearTimeoutSafe(jumpTimeout);
                return;
            }

            if (!ob.scored && ob.left + obstacleWidth < dinoX) {
                score.value++;
                ob.scored = true;
                if (score.value % 10 === 0 && speed.value < 15) {
                    speed.value += 1;
                }
            }
        }

        obstacles.value = obstacles.value.filter(
            (ob) => ob.left >= -obstacleWidth
        );

        const rightmost = obstacles.value.length
            ? Math.max(...obstacles.value.map((o) => o.left))
            : 0;

        if (canSpawnNextPack && rightmost < FIELD_WIDTH - PACK_GAP) {
            spawnObstaclePack();
            canSpawnNextPack = false;
        }

        if (!canSpawnNextPack && rightmost < FIELD_WIDTH - 2 * PACK_GAP) {
            canSpawnNextPack = true;
        }
    }, 20);
}

function restart(): void {
    gameOver.value = false;
    score.value = 0;
    dinoBottom.value = 20;
    isJumping.value = false;
    isFalling.value = false;
    jumpPower.value = 0;
    obstacles.value = [];
    speed.value = 5;
    spawnObstaclePack();
    moveObstacles();
    startRunningAnimation();
}

function randomGrass(): void {
    grassBlades.value = [];
    for (let i = 0; i < NUM_BLADES; i++) {
        grassBlades.value.push({
            left: Math.random() * FIELD_WIDTH,
            width: 1 + Math.random() * 5,
            height: 1,
            bottom: 20 + Math.random() * 10,
        });
    }
}
randomGrass();

function keyDownHandler(e: KeyboardEvent): void {
    if (waitingStart.value && (e.code === "Space" || e.code === "ArrowUp")) {
        waitingStart.value = false;
        gameOver.value = false;
        score.value = 0;
        dinoBottom.value = 20;
        isJumping.value = false;
        isFalling.value = false;
        jumpPower.value = 0;
        obstacles.value = [];
        speed.value = 5;
        spawnObstaclePack();
        moveObstacles();
        startRunningAnimation();
        return;
    }

    if (gameOver.value && e.code === "Space") {
        restart();
        return;
    }

    if (
        !waitingStart.value &&
        !isJumping.value &&
        !isFalling.value &&
        !gameOver.value &&
        (e.code === "Space" || e.code === "ArrowUp")
    ) {
        startJump();
    }
}

function keyUpHandler(e: KeyboardEvent): void {
    if (
        (e.code === "Space" || e.code === "ArrowUp") &&
        isJumping.value
    ) {
        stopJump();
    }
}

onMounted(() => {
    document.body.classList.add("about-bg");
    document.addEventListener("keydown", keyDownHandler);
    document.addEventListener("keyup", keyUpHandler);
});

onUnmounted(() => {
    document.body.classList.remove("about-bg");
    document.removeEventListener("keydown", keyDownHandler);
    document.removeEventListener("keyup", keyUpHandler);
    clearIntervalSafe(obstacleInterval);
    clearIntervalSafe(jumpInterval);
    clearIntervalSafe(fallInterval);
    clearTimeoutSafe(jumpTimeout);
    stopRunningAnimation();
});
</script>
<style lang="scss" scoped>
body {
    background: #202124;
}

.game {
    width: 600px;
    height: 150px;
    overflow: hidden;
    position: relative;
    background: #202124;
    margin: 60px auto;
}

.dino {
    width: 40px;
    height: 40px;
    position: absolute;
    left: 50px;
    border-radius: 8px;
    transition: bottom 0.02s;
    z-index: 1000;
}

.obstacle {
    width: 20px;
    height: 40px;
    position: absolute;
    top: 98px;
    transition: left 0.02s;
    z-index: 1000;
}

.score {
    position: absolute;
    top: 5px;
    right: 10px;
    font-size: 1.1em;
    z-index: 2;
    color: rgb(172, 172, 172);
}

.msg {
    position: absolute;
    left: 0;
    right: 0;
    top: 40%;
    transform: translateY(-50%);
    text-align: center;
    background: #20212400;
    color: rgb(172, 172, 172);
    width: 100%;
    font-size: 1.2em;
}

.restart-btn {
    background: rgb(172, 172, 172);
    border-radius: 5px;
    border: 1px;
}

.ground {
    position: absolute;
    left: 0;
    bottom: 25px;
    width: 100%;
    height: 2px;
    background: #5f6368;
    overflow: hidden;
    z-index: 100;
}

.grass-blades {
    position: absolute;
    left: 0;
    bottom: -10px;
    width: 10%;
    height: 55px;
    pointer-events: none;
    z-index: 1000;
}

.grass-blade {
    position: absolute;
    background: #5f6368;
    opacity: 0.85;
}

.return-btn {
    position: fixed;
    z-index: 100;
    left: 25px;
    bottom: 25px;
    width: 70px;
    height: 70px;
    border-radius: 35px;
    background: #5f6368;
    transition: 0.3s ease;
    &:hover{
        background: #494d53;
    }
}
</style>