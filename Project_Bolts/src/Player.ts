import AssetManager from "./AssetManager";
import { PLAYER_SHOT_DELAY, PLAYER_SPEED } from "./Constants";
import GameObject from "./GameObject";
import Tile from "./Tile";
import { boxHit, toDegrees, toRadians } from "./Toolkit";


export default class Player extends GameObject{
    // class constants
    public static STATE_ALIVE:number = 1;
    public static STATE_DYING:number = 2;
    public static STATE_DEAD:number = 3;

    // properties
    private _speed:number;
    private _state:number;
    private _canShoot:boolean;
    private _shotDelay:number;
    private _ticksExpired:number;

    private xDisplacement:number;
    private yDisplacement:number;

    // custom events
    private eventPlayerDied:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage,assetManager);
        this._speed = PLAYER_SPEED;
        this._sprite = assetManager.getSprite("placeholder-assets", "player");
        this._canShoot = true;
        this._shotDelay = PLAYER_SHOT_DELAY;
        this._ticksExpired = 0;
        this.eventPlayerDied = new createjs.Event("playerdied", true, false);
    }

    // -------------------------------------------------------------------- public methods
    public update(tiles:Tile[]):void{
        if(!this._canShoot){
            this.checkShootDelay();
        }
        this.detectCollisions(tiles);
    }

    public move(degree:number):void{
        this.xDisplacement = Math.cos(toRadians(degree));
        this.yDisplacement = Math.sin(toRadians(degree));
        
        this._sprite.x += this.xDisplacement * this._speed;
        this._sprite.y += this.yDisplacement * this._speed;
    }

    public rotateTowards():void{
        let adj:number = this.stage.mouseX - this._sprite.x; // works but need to make the x and y not central to the player sprite but the page instead (or maybe the canvas)
        let opp:number = this.stage.mouseY - this._sprite.y;
        let radians:number = Math.atan2(opp,adj);

        this._sprite.rotation = toDegrees(radians);
    }
    // -------------------------------------------------------------------- private methods
    private detectCollisions(tiles:Tile[]):void{
        for(let tile of tiles){
            if(tile.isActive){
                if(boxHit(this._sprite, tile.sprite)){
                    // halting the sprite if trying to pass through a wall
                    this._sprite.x -= this.xDisplacement * this._speed;
                    this._sprite.y -= this.yDisplacement * this._speed;
                }
            }
        }
    }

    private killMe():void{
        if(this._state != Player.STATE_ALIVE) { return; }
        this._state = Player.STATE_DEAD; // this needs to be changed to STATE_DYING and using animationend to change to STATE_DEAD
        this._isActive = false;
        this.removeMe();
        this._sprite.dispatchEvent(this.eventPlayerDied);
    }

    private checkShootDelay():void{
        this._ticksExpired++;
        if(this._ticksExpired >= this._shotDelay){
            this._canShoot = true;
            this._ticksExpired = 0;
        }
    }

    // -------------------------------------------------------------------- accessors
    public get CanShoot():boolean{
        return this._canShoot;
    }

    public set CanShoot(value:boolean){
        this._canShoot = value;
    }
}