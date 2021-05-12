import AssetManager from "./AssetManager";
import { ENEMY_SPEED } from "./Constants";
import GameObject from "./GameObject";
import Player from "./Player";
import Tile from "./Tile";
import { boxHit, toDegrees, toRadians } from "./Toolkit";


export default class Enemy extends GameObject{

    // class const
    public static STATE_IDLE:number = 0;
    public static STATE_ALIVE:number = 1;
    public static STATE_DYING:number = 2;
    public static STATE_DEAD:number = 3;

    public static ID_LINEAR:number = 0;
    public static ID_ANGLE:number = 1;
    public static ID_SPINNER:number = 3;

    // properties
    protected _speed:number;
    protected _state:number;
    protected _movementAngle:number; // may need to store the angle at which we are moving so we can easily change it
    protected _looksAtPlayer:boolean;
    protected _movesPerp:boolean;
    protected _id:number;
    

    protected xDisplacement:number;
    protected yDisplacement:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._speed = ENEMY_SPEED;
        //this._state = Enemy.STATE_ALIVE;
        this._isActive = false;
        this._movementAngle = 0;
        if(this._movementAngle % 90 == 0){this._movesPerp = true;}
        else {this._movesPerp = false;}
        this._sprite = assetManager.getSprite("placeholder-assets", "enemy2");
    }

    // ---------------------------------------------------------------- public methods
    public update(tiles:Tile[], player:Player):void{
        // if(this._state != Enemy.STATE_ALIVE) {return;}
        this.move();
        this.detectCollisions(tiles);
        if(this._looksAtPlayer){
            this.lookAtPlayer(player);
        }
    }

    public killMe():void{
        if(this._state != Enemy.STATE_ALIVE) {return;}
        this._state = Enemy.STATE_DEAD; // change to DYING and create onanimationend event listener => handler
        this.removeMe();
    }

    // ---------------------------------------------------------------- private methods
    private move():void{
        //if(this._state != Enemy.STATE_ALIVE) {return;}

        this.xDisplacement = Math.cos(toRadians(this._movementAngle)) * this._speed;
        this.yDisplacement = Math.sin(toRadians(this._movementAngle)) * this._speed;
        
        this._sprite.x += this.xDisplacement;
        this._sprite.y += this.yDisplacement;
    }

    private detectCollisions(tiles:Tile[]):void{
        // collision with tiles
        for(let tile of tiles){
            if(tile.id == Tile.ID_WALL || tile.id == Tile.ID_OBSTACLE){
                if(tile.isActive){
                    if(boxHit(this._sprite, tile.sprite)){
                        if(this._movesPerp){
                            this._movementAngle += 180;
                            // debug start
                            if(this._movementAngle >= 360){
                                this._movementAngle -= 360;
                            }
                            // debug end
                            this.move();
                        }
                        else{
                            this._movementAngle += 90;
                            //debug start
                            if(this._movementAngle >= 360){
                                this._movementAngle -= 360;
                            }
                            // debug end
                            this.move();
                        }
                    }
                }
            }

        }
        /* we could make detecting collisions more optimal by sectioning the stage coordinates into
        quadrants and only run collision checks for objects in the same quadrant as you.
        alternatively we could also create a large radius or box around objects and only detect collisions of
        things within that radius (is this almost like detecting collisions twice??) ** ponder **
        even if it is running another check it will extremely limit the amount of checks made per frame'
        after projectiles of both types are added there will be a lot of collision checks per frame...
        */
        // collision with player projectiles?
    }

    private lookAtPlayer(player:Player):void{
        let adj:number = player.sprite.x - this._sprite.x; 
        let opp:number = player.sprite.y - this._sprite.y;
        let radians:number = Math.atan2(opp,adj);

        this._sprite.rotation = toDegrees(radians);
    }

    // ---------------------------------------------------------------- accessors
    public get looksAtPlayer():boolean{
        return this._looksAtPlayer;
    }

    public set looksAtPlayer(value:boolean){
        this._looksAtPlayer = value;
    }

    public get id():number{
        return this._id;
    }
}