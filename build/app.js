"use strict";
// todo: continue tutorial on: https://youtu.be/GFO_txvwK_c?t=2668
Object.defineProperty(exports, "__esModule", { value: true });
console.log("Running the app");
let testElement = document.getElementById("test");
testElement.innerText = `${new Date()}`; // to test if script is loaded
// start process here...
let playerState = 'idle';
let dropDown = document.getElementById("animations");
dropDown.addEventListener('change', (evt) => {
    playerState = evt.target.value;
    // console.log(`${(evt.target! as HTMLInputElement).value}. ${playerState}`)
});
let canvas = document.getElementById("canvas1");
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;
let ctx = canvas.getContext("2d");
const playerImage = new Image();
playerImage.src = "./img/shadow_dog.png";
const SPRITE_WIDTH = 575;
const SPRITE_HEIGHT = 523;
let gameFrame = 0;
const staggerFrames = 5; // speed of change per frame
let spriteObjects = populateSpriteTypes();
// populate the x and y coordinate for each sprite animation
spriteObjects.forEach((spriteObj, index) => {
    let coordinate = [];
    for (let j = 0; j < spriteObj.frames; j++) {
        let positionX = j * SPRITE_WIDTH;
        let positionY = index * SPRITE_HEIGHT;
        coordinate.push({ x: positionX, y: positionY });
        spriteObj.loc = coordinate;
    }
});
// console.log(spriteObjects);
function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let spriteObj = getSpriteObjByName(playerState);
    let position = Math.floor(gameFrame / staggerFrames) % spriteObj.frames;
    let frameX = SPRITE_WIDTH * position;
    let frameY = spriteObj.loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, SPRITE_WIDTH, SPRITE_HEIGHT, // frame in sheet
    0, 0, SPRITE_WIDTH, SPRITE_HEIGHT // frame in canvas
    );
    gameFrame++;
    requestAnimationFrame(animate);
}
function populateSpriteTypes() {
    return [
        {
            name: 'idle',
            frames: 7
        },
        {
            name: 'jump',
            frames: 7
        },
        {
            name: 'fall',
            frames: 7
        },
        {
            name: 'run',
            frames: 9
        },
        {
            name: 'dizzy',
            frames: 11
        },
        {
            name: 'sit',
            frames: 5
        },
        {
            name: 'roll',
            frames: 7
        },
        {
            name: 'bite',
            frames: 7
        },
        {
            name: 'ko',
            frames: 12
        },
        {
            name: 'getHit',
            frames: 4
        },
    ];
}
function getSpriteObjByName(name = 'idle') {
    return spriteObjects.find((value, index, array) => {
        if (name == value.name)
            return value;
        return null;
    });
}
animate();
