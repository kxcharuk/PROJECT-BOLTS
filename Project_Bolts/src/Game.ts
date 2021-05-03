// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import AssetManager from "./AssetManager";
import Player from "./Player";

// game objects
let background:createjs.Sprite;
let player:Player;

let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// key boolean
let upKey:boolean = false;
let downKey:boolean = false;
let rightKey:boolean = false;
let leftKey:boolean = false;


// --------------------------------------------------- private methods
function monitorKeys():void{
    if(leftKey && upKey){
        player.move(-135);
    }
    else if(leftKey && downKey){
        player.move(135);
    }
    else if(rightKey && upKey){
        player.move(-45);
    }
    else if(rightKey && downKey){
        player.move(45);
    }
    else if(leftKey){
        player.move(180);
    }
    else if(rightKey){
        player.move(0);
    }
    else if(upKey){
        player.move(-90);
    }
    else if(downKey){
        player.move(90);
    }
}

// --------------------------------------------------- event handlers
function onKeyDown(e:KeyboardEvent):void{
    if(e.key == "w" || e.key == "ArrowUp"){
        upKey = true;
    }
    else if(e.key == "s" || e.key == "ArrowDown"){
        downKey = true;
    }
    else if(e.key == "d" || e.key == "ArrowRight"){
        rightKey = true;
    }
    else if(e.key == "a" || e.key == "ArrowLeft"){
        leftKey = true;
    }
}

function onKeyUp(e:KeyboardEvent):void{
    if(e.key == "w" || e.key == "ArrowUp"){
        upKey = false;
    }
    else if(e.key == "s" || e.key == "ArrowDown"){
        downKey = false;
    }
    else if(e.key == "d" || e.key == "ArrowRight"){
        rightKey = false;
    }
    else if(e.key == "a" || e.key == "ArrowLeft"){
        leftKey = false;
    }
}

// --------------------------------------------------- event manager
function onGameEvent(e:createjs.Event):void{
    switch (e.type){
        case "gameStart":

        break;

        case "gameOver":
            
        break;

        case "gameReset": 
            
        break;  
    }
}

// --------------------------------------------------- onReady + onTick event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game object
    background = assetManager.getSprite("placeholder-assets","background");
    stage.addChild(background);

    player = new Player(stage, assetManager);
    player.sprite.x = 240;
    player.sprite.y = 240;
    stage.addChild(player.sprite);


    // listen for game events
    stage.on("gameOver", onGameEvent);
    stage.on("gameStart", onGameEvent);
    stage.on("gameReset", onGameEvent);

    // set up keyboard listeners
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    
    // object updates
    monitorKeys();
    
    // update the stage!
    stage.update();
}

// --------------------------------------------------- main method
function main():void {
    console.log(">> initializing");

    // get reference to canvas
    canvas = <HTMLCanvasElement> document.getElementById("game-canvas");
    // set the stage size
    canvas.width = STAGE_WIDTH;
    canvas.height = STAGE_HEIGHT;

    // create stage object
    stage = new createjs.StageGL(canvas, { antialias: true });

    // construct AssetManager object to load spritesheet and sound assets
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();