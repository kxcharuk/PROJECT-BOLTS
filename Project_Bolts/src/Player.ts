import AssetManager from "./AssetManager";
import { PLAYER_SHOT_DELAY, PLAYER_SPEED } from "./Constants";
import GameObject from "./GameObject";
import Tile from "./Tile";
import { boxHit, radiusHit, radiusHitExt, radiusToBoxHit, radiusToBoxHitExt, toDegrees, toRadians } from "./Toolkit";


export default class Player extends GameObject{
    // class constants
    public static STATE_IDLE:number = 0;
    public static STATE_ALIVE:number = 1;
    public static STATE_DYING:number = 2;
    public static STATE_DEAD:number = 3;

    // properties
    private _speed:number;
    private _state:number;
    private _canShoot:boolean;
    private _shotDelay:number;
    private _ticksExpired:number;
    private _movementAngle:number;
    private _canMoveHorizontal:boolean;
    private _canMoveVertical:boolean;
    private _isMoving:boolean;

    private xDisplacement:number;
    private yDisplacement:number;

    // custom events
    private eventPlayerDied:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event){
        super(stage,assetManager);
        this._state = Player.STATE_IDLE;
        this._speed = PLAYER_SPEED;
        this._sprite = assetManager.getSprite("character-sprites", "player");
        this._canShoot = false;
        this._shotDelay = PLAYER_SHOT_DELAY;
        this._ticksExpired = 0;
        this.eventPlayerDied = eventPlayerKilled;
        this._canMoveHorizontal = true;
        this._canMoveVertical = true;
        this._isMoving = false;
    }

    // -------------------------------------------------------------------- public methods
    public update(tiles:Tile[]):void{
        if(this._state != Player.STATE_ALIVE) {return;}
        if(!this._canShoot){
            this.checkShootDelay();
        }
        this.detectCollisions(tiles);
        if(this._isMoving){
            if(this._canMoveHorizontal){
                this._sprite.x += this.xDisplacement * this._speed;
            }
            if(this._canMoveVertical){
                this._sprite.y += this.yDisplacement * this._speed;
            }
        }
        this._canMoveHorizontal = true;
        this._canMoveVertical = true;
        this.rotateTowards();
    }

    public move(degree:number):void{
        if(this._state != Player.STATE_ALIVE) {return;}
        this._movementAngle = degree;
        this.xDisplacement = Math.cos(toRadians(degree));
        this.yDisplacement = Math.sin(toRadians(degree));

        // this._sprite.x += this.xDisplacement * this._speed;
        // this._sprite.y += this.yDisplacement * this._speed;
    }

    public rotateTowards():void{
        let adj:number = this.stage.mouseX - this._sprite.x;
        let opp:number = this.stage.mouseY - this._sprite.y;

        let radians:number = Math.atan2(opp,adj);

        this._sprite.rotation = toDegrees(radians);
    }

    public killMe():void{
        if(this._state != Player.STATE_ALIVE) { return; }
        this._state = Player.STATE_DEAD; // this needs to be changed to STATE_DYING and using animationend to change to STATE_DEAD
        this._isActive = false;
        this.removeMe();
        //this._sprite.dispatchEvent(this.eventPlayerDied);
    }

    public startMe():void{
        this._state = Player.STATE_ALIVE;
        this._canShoot = true;
    }

    public stopMe():void{
        this._state = Player.STATE_IDLE;
    }

    // -------------------------------------------------------------------- private methods
    private detectCollisions(tiles:Tile[]):void{
        for(let tile of tiles){
            if(tile.id == Tile.ID_WALL || tile.id == Tile.ID_OBSTACLE){
                if(tile.isActive){
                    // if(radiusHit(this._sprite, 13, tile.sprite, 13)){
                    //     // halting the sprite if trying to pass through a wall
                    //     this._sprite.x -= this.xDisplacement * this._speed;
                    //     this._sprite.y -= this.yDisplacement * this._speed;
                    //     // this._sprite.y += this.yDisplacement * this._speed;
                        

                    //     // maybe should move this into the tile script as now they have access to the player
                    //     // also need to make this collision better/more seamless, very clunky right now
                    //     // idea could be to take in the angle(and possibly the location) of the collision...
                    //     // and adjust the players movement trajectory based on that to create a sliding motion
                    //     // when colliding/riding along the walls (as of now it stops you dead in your tracks)
                    // }
                    let tempX = this._sprite.x + (this.xDisplacement * this._speed);
                    let tempY = this._sprite.y + (this.yDisplacement * this._speed);
                    if(radiusToBoxHitExt(tempX, this._sprite.y, 13, tile.sprite) && !radiusToBoxHitExt(this._sprite.x, tempY, 13, tile.sprite)){
                        this._canMoveHorizontal = false;
                    }
                    // checking y
                    if(radiusToBoxHitExt(this._sprite.x, tempY, 13, tile.sprite) && !radiusToBoxHitExt(tempX, this._sprite.y, 13, tile.sprite)){
                        this._canMoveVertical = false;
                    }
                    if(radiusToBoxHit(this._sprite, 13, tile.sprite)){
                        //check x
                        if(radiusToBoxHitExt((this._sprite.x + this._speed), this._sprite.y, 13, tile.sprite)){
                            this._sprite.x -= this._speed;
                            // this._sprite.x -= 1;
                        }
                        if(radiusToBoxHitExt((this._sprite.x - this._speed), this._sprite.y, 13, tile.sprite)){
                            this._sprite.x += this._speed;
                            // this._sprite.x += 1;
                        }
                        // checking y
                        if(radiusToBoxHitExt(this._sprite.x, (this._sprite.y + this._speed), 13, tile.sprite)){
                            this._sprite.y -= this._speed;
                            // this._sprite.y -= 1;
                        }
                        if(radiusToBoxHitExt(this._sprite.x, (this._sprite.y - this._speed), 13, tile.sprite)){
                            this._sprite.y += this._speed;
                            // this._sprite.y += 1;
                        }
                    }
                }
            }
        }
    }

    private checkShootDelay():void{
        this._ticksExpired++;
        if(this._ticksExpired >= this._shotDelay){
            this._canShoot = true;
            this._ticksExpired = 0;
        }
    }

    // -------------------------------------------------------------------- accessors
    public get canShoot():boolean{
        return this._canShoot;
    }

    public set canShoot(value:boolean){
        this._canShoot = value;
    }

    public get state():number{
        return this._state;
    }

    public set movementAngle(value:number){
        this._movementAngle = value;
    }

    public set isMoving(value:boolean){
        this._isMoving = value;
    }
}