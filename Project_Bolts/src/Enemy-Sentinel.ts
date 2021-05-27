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

        this._ammoType = EnemyProjectile.TYPE_BULLET;

        this._sprite = assetManager.getSprite("character-sprites","sentinel-outline/idle");
        this._defaultAnim = "sentinel-outline/idle";
        this._id = Enemy.ID_SENTINEL;
    }

    // ---------------------------------------------------------------------------- public methods
    public update(tiles:Tile[], player:Player):void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        super.update(tiles, player);
        this.detectCollisions(tiles, player, 90);
        this.lookAtPlayer(player);
    }

    public removeMe():void{
        super.removeMe();
        window.clearInterval(this.timer);
        console.log("removing enemy");
    }

    public killMe():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        super.killMe();
        this._sprite.gotoAndPlay("sentinel/death");
        this._sprite.on("animationend", ()=> { this._sprite.gotoAndPlay("explosion"); this._sprite.on("animationend", ()=> { this.removeMe(); this.stopMe(); }); });
    }

    // ---------------------------------------------------------------------------- private methods
    protected shoot():void{
        super.shoot();
        this._sprite.gotoAndPlay("sentinel-outline/shoot");
        this._sprite.on("animationend", ()=> { this._sprite.gotoAndPlay("sentinel-outline/idle"); });
    }

    // ---------------------------------------------------------------------------- accessors

}