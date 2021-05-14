// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, PLAYER_PROJECTILE_MAX } from "./Constants";
import AssetManager from "./AssetManager";
import Player from "./Player";
import PlayerProjectile from "./PlayerProjectile";
import Tile from "./Tile";
import Enemy from "./Enemy";
import LevelManager from "./LevelManager";
import Tile_Wall from "./Tile-Wall";
import Tile_EnemySpawn from "./Tile-EnemySpawn";
import Tile_Obstacle from "./Tile-Obstacle";
import Tile_PlayerSpawn from "./Tile-PlayerSpawn";
import Tile_Floor from "./Tile-Floor";
import Tile_ItemSpawn from "./Tile-ItemSpawn";
import EnemyProjectile from "./EnemyProjectile";
import Enemy_Sentinel from "./Enemy-Sentinel";
import Enemy_Turret from "./Enemy-Turret";
import Enemy_Laser from "./Enemy-Laser";
import Timer from "./Timer";
import GameObject from "./GameObject";

// game objects
let roundStartTimer:Timer;
let roundTimer:Timer;
let player:Player;
let enemies:Enemy[] = [];
let playerProjPool:PlayerProjectile[] = [];
let enemyProjPool:EnemyProjectile[] = [];
let tiles:Tile[] = [];
let levelManager:LevelManager;

let eventPlayerKilled:createjs.Event;
let eventRoundStart:createjs.Event;
let eventRoundTimerExpired:createjs.Event;

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

function onMouseDown(e:MouseEvent):void{
    if(!player.CanShoot) {return;}
    console.log("click");
    for(let projectile of playerProjPool){
        if(projectile.isActive == false){
            projectile.shoot(player.sprite.x, player.sprite.y, player.sprite.rotation);
            player.CanShoot = false;
            break;
        }
    }
}

// --------------------------------------------------- game event manager
function onGameEvent(e:createjs.Event):void{
    switch (e.type){
        case "gameStart":

        break;

        case "gameOver":
            
        break;

        case "gameReset": 
            
        break;

        case "roundStart":
            roundTimer.startTimer(10);
            for(let enemy of enemies){
                if(enemy.isActive){
                    player.startMe();
                    enemy.startMe();
                }
            }
            console.log("start round!!");
        break;

        case "roundOver":

        break;

        case "roundReset":
        
        break;

        case "timerExpired":
            player.stopMe();
            for(let enemy of enemies){
                if(enemy.isActive){
                    player.stopMe();
                    enemy.stopMe();
                }
            }
            // loop through proj and stop them as well
            console.log("timer expired!!");
        break;

        case "playerKilled":
            player.killMe();
            console.log("player killed!!");
        break;
    }
}

// --------------------------------------------------- onReady + onTick event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    // construct game object
    //background = assetManager.getSprite("placeholder-assets","background");
    //stage.addChild(background);

    eventPlayerKilled = new createjs.Event("playerKilled", true, false);
    eventRoundStart = new createjs.Event("roundStart", true, false);
    eventRoundTimerExpired = new createjs.Event("timerExpired", true, false);

    player = new Player(stage, assetManager, eventPlayerKilled);
    player.sprite.x = 240;
    player.sprite.y = 340;
    player.addMe();

    roundStartTimer = new Timer(stage, assetManager, eventRoundStart);
    roundStartTimer.positionText(215,215, 3);
    roundTimer = new Timer(stage, assetManager, eventRoundTimerExpired);
    roundTimer.positionText(8,8,1);
  
    for(let i:number = 0; i < 200; i++){
        enemyProjPool.push(new EnemyProjectile(stage, assetManager, player, eventPlayerKilled));
    }

    // contruct enemy object pool
    for(let i:number = 0; i < 5; i++){
        enemies.push(new Enemy_Sentinel(stage, assetManager, eventPlayerKilled, enemyProjPool));
    }
    for(let i:number = 0; i < 5; i++){
        enemies.push(new Enemy_Laser(stage, assetManager, eventPlayerKilled, enemyProjPool));
    }
    for(let i:number = 0; i < 5; i++){
        enemies.push(new Enemy_Turret(stage, assetManager, eventPlayerKilled, enemyProjPool, player));
    }

    for(let i:number = 0; i < PLAYER_PROJECTILE_MAX; i++){
        playerProjPool.push(new PlayerProjectile(stage, assetManager, enemies));
    }

    // contructing tiles
    for(let i:number = 0; i < 56; i++){
        tiles.push(new Tile_Wall(stage, assetManager, player));
    }
    for(let i:number = 0; i < 25; i++){
        tiles.push(new Tile_Obstacle(stage, assetManager, player));
    }
    for(let i:number = 0; i < 25; i++){
        tiles.push(new Tile_EnemySpawn(stage, assetManager, player, enemies));
    }
    for(let i:number = 0; i < 25; i++){
        tiles.push(new Tile_ItemSpawn(stage, assetManager, player));
    }
    for(let i:number = 0; i < 200; i++){
        tiles.push(new Tile_Floor(stage, assetManager, player));
    }
    tiles.push(new Tile_PlayerSpawn(stage,assetManager, player));
    console.log("tiles.length = " + tiles.length);
    levelManager = new LevelManager(stage, tiles);
    levelManager.randomizeLevel();
    levelManager.loadLevel();

    // listen for game events
    stage.on("gameOver", onGameEvent);
    stage.on("gameStart", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("playerKilled", onGameEvent);
    stage.on("roundStart", onGameEvent);
    stage.on("timerExpired", onGameEvent);

    // set up keyboard listeners
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
    document.onmousedown = onMouseDown;

    // start round start timer
    roundStartTimer.startTimer(5);
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
    player.update(tiles);
    for(let projectile of playerProjPool){
        if(projectile.isActive){
            projectile.update(tiles);
        }
    }
    for(let enemy of enemies){
        if(enemy.isActive){
            enemy.update(tiles, player);
        }
    }
    for(let projectile of enemyProjPool){
        if(projectile.isActive){
            projectile.update(tiles);
        }
    }
    
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
    stage.mouseMoveOutside = true;
    stage.enableMouseOver(20); // make constant

    //stage.cursor = "none";
    // construct AssetManager object to load spritesheet and sound assets
    assetManager = new AssetManager(stage);
    stage.on("allAssetsLoaded", onReady, null, true);
    // load the assets
    assetManager.loadAssets(ASSET_MANIFEST);
}

main();