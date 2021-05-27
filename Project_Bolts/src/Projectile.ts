import AssetManager from "./AssetManager";
import GameObject from "./GameObject";
import Tile from "./Tile";
import { boxHit, radiusHit, toRadians } from "./Toolkit";


export default class Projectile extends GameObject{

    // class constants

    // properties
    protected _speed:number;
    protected _state:number;

    private xDisplacement:number;
    private yDisplacement:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._isActive = false;
        this._speed = 8; // remember to move to constants
    }

    // ----------------------------------------------------------------------------- public methods

    public update(tiles:Tile[]):void{
        if(!this._isActive) {return;}
        this.move();
        //this.detectCollisions(tiles);
    }

    public addMe():void{
        this.getDirection();
        super.addMe();
    }

    public rotate(degrees:number):void{
        this._sprite.rotation = degrees;
    }

    public shoot(x:number, y:number, degrees:number):void{
        this.positionMe(x,y);
        this.rotate(degrees);
        this.addMe();
    }

    // ----------------------------------------------------------------------------- private methods
    private move():void{
        this._sprite.x += this.xDisplacement;
        this._sprite.y += this.yDisplacement;
    }

    private getDirection():void{
        let radians:number = toRadians(this._sprite.rotation);

        this.xDisplacement = Math.cos(radians) * this._speed;
        this.yDisplacement = Math.sin(radians) * this._speed;
    }

    protected detectCollisions(tiles:Tile[]):void{
        for(let tile of tiles){
            if(tile.id == Tile.ID_WALL || tile.id == Tile.ID_OBSTACLE){
                if(tile.isActive){
                    if(radiusHit(this._sprite, 12, tile.sprite, 12)){
                        this.removeMe();
                        console.log("removing me");
                    }
                }
            }
        }
    }


    // ----------------------------------------------------------------------------- accessors
    public get speed():number{
        return this._speed;
    }
}