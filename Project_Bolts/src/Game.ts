// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST } from "./Constants";
import AssetManager from "./AssetManager";

// game objects
let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;

// --------------------------------------------------- event handlers
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

    // listen for game events
    stage.on("gameOver", onGameEvent);
    stage.on("gameStart", onGameEvent);
    stage.on("gameReset", onGameEvent);

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

// --------------------------------------------------- private methods
function monitorKeys():void{
    
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