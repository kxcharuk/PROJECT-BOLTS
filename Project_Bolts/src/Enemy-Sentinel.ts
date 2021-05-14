import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import EnemyProjectile from "./EnemyProjectile";
import Player from "./Player";
import Tile from "./Tile";
import { randomMe } from "./Toolkit";


export default class Enemy_Sentinel extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event, projectilePool:EnemyProjectile[]){
        super(stage, assetManager, eventPlayerKilled, projectilePool);
        let random = randomMe(0,3);
        if(random == 0){
            this._movementAngle = 45;
        }
        else if(random == 1){
            this._movementAngle = 135;
        }
        else if(random == 2){
            this._movementAngle = 225;
        }
        else{
            this._movementAngle = 315;
        }

        this._sprite = assetManager.getSprite("character-sprites","enemy1");
        this._id = Enemy.ID_SENTINEL;

        this._shotDelay = randomMe(500, 2000);
        this.timer = window.setInterval(()=>{
            this.shoot();
        }, this._shotDelay);
    }

    // ---------------------------------------------------------------------------- public methods
    public update(tiles:Tile[], player:Player):void{
        super.update(tiles, player);
        this.detectCollisions(tiles, player, 90);
        this.lookAtPlayer(player);
    }
    // ---------------------------------------------------------------------------- private methods

    // ---------------------------------------------------------------------------- accessors



}