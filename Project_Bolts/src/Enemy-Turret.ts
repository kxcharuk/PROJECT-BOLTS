import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import EnemyProjectile from "./EnemyProjectile";
import Player from "./Player";
import { radiusHit, randomMe } from "./Toolkit";


export default class Enemy_Turret extends Enemy{

    private player:Player;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event, projectilePool:EnemyProjectile[], player:Player){
        super(stage, assetManager, eventPlayerKilled, projectilePool);
        this._sprite = assetManager.getSprite("character-sprites","enemy-turret");
        this._id = Enemy.ID_TURRET;

        this._ammoType = EnemyProjectile.TYPE_TURRET;
        this.player = player;
    }

    // ----------------------------------------------------------------------------------- public methods
    public update():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        this.spin();
        this.detectCollisions();
    }

    // ----------------------------------------------------------------------------------- private methods
    private spin():void{
        this._sprite.rotation += this._speed;
    }
    
    protected shoot():void{
        if(this._state != Enemy.STATE_ALIVE){return;}
        let count:number = 0;
        for(let projectile of this.enemyProjPool){
            if(count > 3) { break;}
            if(!projectile.isActive && projectile.type == this._ammoType){
                if(count == 0){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation - 45);
                }
                else if(count == 1){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation + 45);
                }
                else if(count == 2){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation + 135);
                }
                else if(count == 3){
                    projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation + 225);
                }
                count++;
            }
        }
    }

    protected detectCollisions():void{
        if(radiusHit(this._sprite, 15, this.player.sprite, 13)){
            this.stage.dispatchEvent(this.eventPlayerKilled);
        }
    }
    // ----------------------------------------------------------------------------------- accessors
}