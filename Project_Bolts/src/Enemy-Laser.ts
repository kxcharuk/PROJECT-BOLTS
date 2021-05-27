import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import EnemyProjectile from "./EnemyProjectile";
import Player from "./Player";
import Tile from "./Tile";
import { randomMe } from "./Toolkit";


export default class Enemy_Laser extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event, projectilePool:EnemyProjectile[]){
        super(stage, assetManager, eventPlayerKilled, projectilePool);
        this._sprite = assetManager.getSprite("character-sprites","antlion-outline/alive");
        this._id = Enemy.ID_LASER;
        this._ammoType = EnemyProjectile.TYPE_LASER;

        let random = randomMe(0,1);
        // move this into addMe function
        if(random == 1){
            this._movementAngle = 0;
        }
        else{
            this._movementAngle = 90;
            this._sprite.rotation = 90;
        }
    }

    // ---------------------------------------------------------------------------------------- public methods
    public update(tiles:Tile[], player:Player):void{
        super.update(tiles, player);
        this.detectCollisions(tiles, player, 180);
    }

    public killMe():void{
        super.killMe();
        this._sprite.gotoAndPlay("antlion/death");
        this._sprite.on("animationend", ()=> { this.removeMe();});
    }

    // ---------------------------------------------------------------------------------------- private methods
    protected shoot():void{
        if(this._state != Enemy.STATE_ALIVE){return;}
        let count:number = 0;
        for(let projectile of this.enemyProjPool){
            if(count > 1) {break;}
            if(!projectile.isActive && projectile.type == this._ammoType){
                if(count == 0){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation + 90);
                }
                else if(count == 1){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation + 270);
                }
                count++;
            }
        }
    }
    // ---------------------------------------------------------------------------------------- accessors
}