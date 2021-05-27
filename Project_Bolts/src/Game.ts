// createjs typescript definition for TypeScript
/// <reference path="./../node_modules/@types/createjs/index.d.ts" />

// importing createjs framework
import "createjs";
// importing game constants
import { STAGE_WIDTH, STAGE_HEIGHT, FRAME_RATE, ASSET_MANIFEST, PLAYER_PROJECTILE_MAX, ENEMY_SPAWN_MAX, MIN_TIMER_AMOUNT } from "./Constants";
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
import Item from "./Item";
import ScreenManager from "./ScreenManager";
import UIManager from "./UIManager";
import Item_ScoreMult from "./Item-ScoreMult";
import Item_Life from "./Item-Life";
import Item_Time from "./Item-Time";

// game objects
let transitionTimer:number;
let roundStartTimer:Timer;
let roundTimer:Timer;
let player:Player;
let levelManager:LevelManager;
let screenManager:ScreenManager;
let uiManager:UIManager;
// obj pools
let enemies:Enemy[] = [];
let playerProjPool:PlayerProjectile[] = [];
let enemyProjPool:EnemyProjectile[] = [];
let tiles:Tile[] = [];
let items:Item[] = [];

let stage:createjs.StageGL;
let canvas:HTMLCanvasElement;
let assetManager:AssetManager;
// event obj
let eventPlayerKilled:createjs.Event;
let eventRoundStart:createjs.Event;
let eventRoundTimerExpired:createjs.Event;
let eventRoundReset:createjs.Event;
let eventRoundOver:createjs.Event;
let eventGameOver:createjs.Event;
/// game vars
let playerLives:number;
let score:number;
let scoreMult:number;
let enemiesInLevel:number;
let round:number;
let roundSeconds:number;
let scoreMultTimer:number;

// key boolean
let upKey:boolean = false;
let downKey:boolean = false;
let rightKey:boolean = false;
let leftKey:boolean = false;

// --------------------------------------------------- private methods
function monitorKeys():void{
    if(leftKey && upKey){
        player.isMoving = true;
        player.move(-135);
    }
    else if(leftKey && downKey){
        player.isMoving = true;
        player.move(135);
    }
    else if(rightKey && upKey){
        player.isMoving = true;
        player.move(-45);
    }
    else if(rightKey && downKey){
        player.isMoving = true;
        player.move(45);
    }
    else if(leftKey){
        player.isMoving = true;
        player.move(180);
    }
    else if(rightKey){
        player.isMoving = true;
        player.move(0);
    }
    else if(upKey){
        player.isMoving = true;
        player.move(-90);
    }
    else if(downKey){
        player.isMoving = true;
        player.move(90);
    }
    else{
        player.isMoving = false;
    }
}

function reset():void{
    console.log("reset function");
    levelManager.clearLevel(); // removes all tiles
    player.stopMe();
    player.removeMe();
    for(let enemy of enemies){
       // if(enemy.isActive){
            enemy.stopMe(); // switch these to local resets that handles all of this
            enemy.removeMe();
       // }
    }
    for(let projectile of playerProjPool){
        if(projectile.isActive){
            projectile.removeMe();
        }
    }
    for(let projectile of enemyProjPool){
        if(projectile.isActive){
            projectile.removeMe();
        }
    }
    for(let item of items){
        if(item.isActive){
            item.removeMe();
        }
    }
    enemiesInLevel = 0;
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
    if(player.state != Player.STATE_ALIVE) {return;}
    for(let projectile of playerProjPool){
        if(projectile.isActive == false && player.canShoot){
            projectile.shoot(player.sprite.x, player.sprite.y, player.sprite.rotation);
            createjs.Sound.play("player_shoot");
            player.canShoot = false;
            break;
        }
    }
}

// --------------------------------------------------- game event manager
function onGameEvent(e:createjs.Event):void{
    switch (e.type){
        case "gameStart":
            console.log("gameStart");
            createjs.Sound.play("song", {loop: -1});
            round = 1;
            levelManager.loadNewLevel();
            roundStartTimer.startTimer(3, true);
            screenManager.showGame();
            uiManager.showUI();
        break;

        case "gameOver":
            console.log("gameOver");
            roundTimer.stopTimer();
            uiManager.hideUI();
            reset();
            screenManager.showGameOver();
        break;

        case "gameReset": 
            // logic for game reset
            console.log("gameReset");
            roundTimer.stopTimer();
            playerLives = 3;
            score = 0;
            round = 1;
            roundSeconds = 30;
            screenManager.showLoading();
            levelManager.loadNewLevel();
            // roundStartTimer.startTimer(3, true);
            // screenManager.showGame();
            // uiManager.showUI();
            break;
            
            
        case "roundStart":
            console.log("roundStart");
            createjs.Sound.play("start");
            roundTimer.startTimer(roundSeconds, false);
            enemiesInLevel = 0;
            //player.addMe();
            player.startMe();
            for(let enemy of enemies){
                if(enemy.isActive){
                    enemy.startMe();
                    enemiesInLevel++;
                }
            }
            uiManager.showUI();
        break;

        case "roundOver":
            // reconfigure the level
            // start the round start timer again\
            // reset everything(players, enemies, projectiles, etc.)
            console.log("Player state: " + player.state);
            console.log("roundOver");
            roundTimer.stopTimer();
            round++;
            if(levelManager.numEnSpawn < ENEMY_SPAWN_MAX){
                levelManager.numEnSpawn = levelManager.numEnSpawn + 1;
            }
            if(roundSeconds > MIN_TIMER_AMOUNT){
                roundSeconds--;
            }

            transitionTimer = window.setInterval(()=> {
                reset();
                levelManager.loadNewLevel();
                roundStartTimer.startTimer(3, true);
                window.clearInterval(transitionTimer);
            }, 3000);

        break;

        case "roundReset":
            console.log("roundReset");
            reset();
            screenManager.showLoading();
            roundTimer.stopTimer();
            levelManager.loadLevel();
            //player.addMe();
            //roundStartTimer.startTimer(3, true);
            uiManager.hideUI();
        break;

        case "timerExpired":
            //roundTimer.stopTimer();
            console.log("timerExpired");
            playerLives--;
            createjs.Sound.play("fail");
            transitionTimer = window.setInterval(()=> {
                if(playerLives <= 0){
                    // dispatch game over event
                    stage.dispatchEvent(eventGameOver);
                }
                else{
                    stage.dispatchEvent(eventRoundReset);
                }
                window.clearInterval(transitionTimer);
            }, 3000);
        break;

        case "playerKilled":
            // if(player.state != Player.STATE_DEAD) {return;}
            console.log("playerKilled");
            roundTimer.stopTimer();
            //player.killMe();// consider moving this into the collision detect and dispatching event from player.killMe()
            //player.stopMe();
            playerLives--;
            createjs.Sound.play("fail");
            transitionTimer = window.setInterval(()=> {
                if(playerLives <= 0){
                    // dispatch game over event
                    console.log("timer dispatch game over");
                    stage.dispatchEvent(eventGameOver);
                }
                else{
                    console.log("timer dispatch round reset");
                    stage.dispatchEvent(eventRoundReset);
                }
                window.clearInterval(transitionTimer);
            }, 3000);
        break;

        case "enemyKilled":
            // increase store, decrease enemies on stage
            console.log("enemyKilled");
            score+= 50*scoreMult; // alter to be a more meaningful increment
            enemiesInLevel--;
            if(enemiesInLevel <= 0){
                // dispatch round over event
                stage.dispatchEvent(eventRoundOver);
            }
        break;

        case "timePickUp":
            roundTimer.addTime(10);
        break;
        
        case "lifePickUp":
            playerLives++;
        break;

        case "scorePickUp":
            scoreMult = scoreMult*2;
            scoreMultTimer = window.setInterval(()=> { scoreMult = (scoreMult/2); window.clearInterval(scoreMultTimer);}, 5000);
        break;

        case "levelLoaded":
            console.log("level loaded");
            screenManager.showGame();
            roundStartTimer.startTimer(3, true);
        break;
    }
}

// --------------------------------------------------- onReady + onTick event handlers
function onReady(e:createjs.Event):void {
    console.log(">> adding sprites to game");

    
    // construct event obj
    eventPlayerKilled = new createjs.Event("playerKilled", true, false);
    eventRoundStart = new createjs.Event("roundStart", true, false);
    eventRoundTimerExpired = new createjs.Event("timerExpired", true, false);
    eventRoundReset = new createjs.Event("roundReset", true, false);
    eventRoundOver = new createjs.Event("roundOver", true, false);
    eventGameOver = new createjs.Event("gameOver", true, false);
    
    // construct game object
    // let background:createjs.Sprite = assetManager.getSprite("screens-sprites","placeholder-start");
    // stage.addChildAt(background, 0);
    
    player = new Player(stage, assetManager, eventPlayerKilled);
    
    screenManager = new ScreenManager(stage, assetManager, player);
    screenManager.showStart();

    uiManager = new UIManager(stage, assetManager);

    playerLives = 1;
    score = 0;
    scoreMult = 1;
    enemiesInLevel = 0;
    round = 1;
    roundSeconds = 30;

    
    roundStartTimer = new Timer(stage, assetManager, eventRoundStart, 3);
    roundStartTimer.positionText(215,215, 3);
    roundTimer = new Timer(stage, assetManager, eventRoundTimerExpired, 30);
    // roundTimer.positionText(,,1);
  
    for(let i:number = 0; i < 100; i++){
        enemyProjPool.push(new EnemyProjectile(stage, assetManager, player, eventPlayerKilled, EnemyProjectile.TYPE_BULLET));
        enemyProjPool.push(new EnemyProjectile(stage, assetManager, player, eventPlayerKilled, EnemyProjectile.TYPE_LASER));
        enemyProjPool.push(new EnemyProjectile(stage, assetManager, player, eventPlayerKilled, EnemyProjectile.TYPE_TURRET));
    }
    
    // construct enemy object pool
    for(let i:number = 0; i < 20; i++){
        enemies.push(new Enemy_Sentinel(stage, assetManager, eventPlayerKilled, enemyProjPool));
    }
    for(let i:number = 0; i < 20; i++){
        enemies.push(new Enemy_Laser(stage, assetManager, eventPlayerKilled, enemyProjPool));
    }
    for(let i:number = 0; i < 20; i++){
        enemies.push(new Enemy_Turret(stage, assetManager, eventPlayerKilled, enemyProjPool, player));
    }

    for(let i:number = 0; i < PLAYER_PROJECTILE_MAX; i++){
        playerProjPool.push(new PlayerProjectile(stage, assetManager, enemies));
    }

    for(let i:number = 0; i < 20; i++){
        items.push(new Item_Life(stage, assetManager));
    }
    for(let i:number = 0; i < 20; i++){
        items.push(new Item_ScoreMult(stage, assetManager));
    }
    for(let i:number = 0; i < 20; i++){
        items.push(new Item_Time(stage, assetManager));
    }

    // constructing tiles
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
        tiles.push(new Tile_ItemSpawn(stage, assetManager, player, items));
    }
    for(let i:number = 0; i < 200; i++){
        tiles.push(new Tile_Floor(stage, assetManager, player));
    }
    tiles.push(new Tile_PlayerSpawn(stage,assetManager, player));
    console.log("tiles.length = " + tiles.length);
    
    levelManager = new LevelManager(stage, tiles);

    // listen for game events
    stage.on("gameOver", onGameEvent);
    stage.on("gameStart", onGameEvent);
    stage.on("gameReset", onGameEvent);
    stage.on("roundStart", onGameEvent);
    stage.on("roundOver", onGameEvent);
    stage.on("roundReset", onGameEvent);
    stage.on("playerKilled", onGameEvent);
    stage.on("timerExpired", onGameEvent);
    stage.on("enemyKilled", onGameEvent);
    stage.on("timePickUp", onGameEvent);
    stage.on("lifePickUp", onGameEvent);
    stage.on("scorePickUp", onGameEvent);
    stage.on("levelLoaded", onGameEvent);

    // set up keyboard listeners
    document.onkeydown = onKeyDown;
    document.onkeyup = onKeyUp;
    document.onmousedown = onMouseDown;

    // startup the ticker
    createjs.Ticker.framerate = FRAME_RATE;
    createjs.Ticker.on("tick", onTick);        
    console.log(">> game ready");
}

function onTick(e:createjs.Event):void {
    // TESTING FPS
    document.getElementById("fps").innerHTML = String(createjs.Ticker.getMeasuredFPS());
    
    // object updates
    player.update(tiles);
    monitorKeys();
    
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
    for(let item of items){
        if(item.isActive){
            item.update(player);
        }
    }

    uiManager.update(score, roundTimer.seconds, playerLives, round);
    
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