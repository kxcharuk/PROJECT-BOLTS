import AssetManager from "./AssetManager";
import { ENEMY_SPEED } from "./Constants";
import GameObject from "./GameObject";
import Tile from "./Tile";
import { boxHit, toRadians } from "./Toolkit";


export default class Enemy extends GameObject{

    // class const
    public static STATE_ALIVE = 1;
    public static STATE_DYING = 2;
    public static STATE_DEAD = 3;

    // properties
    protected _speed:number;
    protected _state:number;
    protected _movementAngle:number; // may need to store the angle at which we are moving so we can easily change it

    protected xDisplacement:number;
    protected yDisplacement:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._speed = ENEMY_SPEED;
        this._state = Enemy.STATE_ALIVE;
        this._isActive = false;
        this._movementAngle = 0;
    }

    // ---------------------------------------------------------------- public methods
    public update(tiles:Tile[]):void{
        this.move();
        this.detectCollisions(tiles);
    }

    public killMe():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        this._state = Enemy.STATE_DEAD; // change to DYING and create onanimationend event listener => handler
        this.removeMe();
    }

    // ---------------------------------------------------------------- private methods
    private move():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}

        this.xDisplacement = Math.cos(toRadians(this._movementAngle)) * this._speed;
        this.yDisplacement = Math.sin(toRadians(this._movementAngle)) * this._speed;
        
        this._sprite.x += this.xDisplacement;
        this._sprite.y += this.yDisplacement;
    }

    private detectCollisions(tiles:Tile[]):void{
        // collision with tiles
        for(let tile of tiles){
            if(tile.isActive){
                if(boxHit(this._sprite, tile.sprite)){
                    console.log("Collision");
                }
            }
        }
        // collision with player projectiles?

    }

    // ---------------------------------------------------------------- accessors

}