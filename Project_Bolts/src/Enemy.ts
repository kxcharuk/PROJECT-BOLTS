import AssetManager from "./AssetManager";
import { ENEMY_SPEED } from "./Constants";
import EnemyProjectile from "./EnemyProjectile";
import GameObject from "./GameObject";
import Player from "./Player";
import PlayerProjectile from "./PlayerProjectile";
import Tile from "./Tile";
import { boxHit, radiusHit, randomMe, toDegrees, toRadians } from "./Toolkit";


export default class Enemy extends GameObject{

    // class const
    public static STATE_IDLE:number = 0;
    public static STATE_ALIVE:number = 1;
    public static STATE_DYING:number = 2;
    public static STATE_DEAD:number = 3;

    public static ID_SENTINEL:number = 0;
    public static ID_LASER:number = 1;
    public static ID_TURRET:number = 2;


    // properties
    protected _speed:number;
    protected _shotDelay:number;
    protected _state:number;
    protected _movementAngle:number; // may need to store the angle at which we are moving so we can easily change it
    protected _id:number;
    protected _ammoType:number;
    protected _defaultAnim:string;
    
    protected timer:number;
    protected xDisplacement:number;
    protected yDisplacement:number;
    protected eventPlayerKilled:createjs.Event;
    protected eventEnemyKilled:createjs.Event;

    protected enemyProjPool:EnemyProjectile[];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event, enemyProjPool:EnemyProjectile[]){
        super(stage, assetManager);
        this._state = Enemy.STATE_IDLE;
        this._speed = ENEMY_SPEED;
        //this._state = Enemy.STATE_ALIVE;
        this._isActive = false;
        this.enemyProjPool = enemyProjPool;
        //this.eventPlayerKilled = eventPlayerKilled;
        this.eventEnemyKilled = new createjs.Event("enemyKilled", true, false);

        this._shotDelay = randomMe(1500, 3000);
    }

    // ---------------------------------------------------------------- public methods
    public update(tiles:Tile[], player:Player):void{
        if(this._state != Enemy.STATE_ALIVE || !this._isActive) {return;}
        this.move();
    }

    public killMe():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        this._state = Enemy.STATE_DEAD; // change to DYING and create onanimationend event listener => handler
        this.stopMe();
        createjs.Sound.play("enemy_explosion");
        //this.removeMe();
        this.stage.dispatchEvent(this.eventEnemyKilled);
    }

    public startMe():void{
        this._state = Enemy.STATE_ALIVE;
        this._sprite.play();
        this.timer = window.setInterval(()=>{
            createjs.Sound.play("enemy_shooting");
            this.shoot();
        }, this._shotDelay);
    }

    public stopMe():void{
        this._state = Enemy.STATE_IDLE;
        this._sprite.gotoAndStop(this._defaultAnim);
        window.clearInterval(this.timer);
    }

    public addMe():void{
        super.addMe();
        this.stage.addChildAt(this._sprite, this.stage.numChildren);
        console.log("adding enemy");
    }

    // ---------------------------------------------------------------- private methods
    protected move():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}

        this.xDisplacement = Math.cos(toRadians(this._movementAngle)) * this._speed;
        this.yDisplacement = Math.sin(toRadians(this._movementAngle)) * this._speed;
        
        this._sprite.x += this.xDisplacement;
        this._sprite.y += this.yDisplacement;
    }

    protected detectCollisions(tiles:Tile[], player:Player, bounceAngle:number):void{
        // collision with tiles
        for(let tile of tiles){
            if(tile.id == Tile.ID_WALL || tile.id == Tile.ID_OBSTACLE){
                if(tile.isActive){
                    if(radiusHit(this._sprite, 13,tile.sprite, 13)){
                        // using radius is easier but doesnt have the clean edge detect for the square tiles
                        this._movementAngle += bounceAngle;
                        //this._movementAngle = 180 - this._movementAngle;
                        // debug start
                        if(this._movementAngle >= 360){
                            this._movementAngle -= 360;
                        }
                        // debug end
                        this.move();
                    }
                }
            }
        }
        if(radiusHit(this._sprite, 12, player.sprite, 12)){
            if(!player.isActive || player.state != Player.STATE_ALIVE) { return; }
            console.log("enemy collision kill");
            this.killMe();
            player.killMe();
        }
    }

    protected shoot():void{
        if(this._state != Enemy.STATE_ALIVE){return;}
        for(let projectile of this.enemyProjPool){
            if(!projectile.isActive && projectile.type == this._ammoType){
                projectile.shoot(this._sprite.x, this._sprite.y, this._sprite.rotation);
                break;
            }
        }
    }

    protected lookAtPlayer(player:Player):void{
        let adj:number = player.sprite.x - this._sprite.x; 
        let opp:number = player.sprite.y - this._sprite.y;
        let radians:number = Math.atan2(opp,adj);

        this._sprite.rotation = toDegrees(radians);
    }

    // ---------------------------------------------------------------- accessors
    public get id():number{
        return this._id;
    }

    public get state():number{
        return this._state;
    }
}