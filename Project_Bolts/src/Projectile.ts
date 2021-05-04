import AssetManager from "./AssetManager";
import GameObject from "./GameObject";
import { toRadians } from "./Toolkit";


export default class Projectile extends GameObject{

    // properties
    private _speed:number;

    private xDisplacement:number;
    private yDisplacement:number;
    private playerRotation:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);

        this._speed = 8; // remember to move to constants
    }

    // ----------------------------------------------------------------------------- public methods

    public update():void{
        if(!this._isActive) {return;}
        this.move();
    }

    public addMe():void{
        this.getDirection();
        super.addMe();
    }

    public rotate(degrees:number):void{
        this._sprite.rotation = degrees;
        // debug
        this.playerRotation = degrees - 90;
    }

    // ----------------------------------------------------------------------------- private methods
    private move():void{
        this._sprite.x += this.xDisplacement;
        this._sprite.y += this.yDisplacement;
    }

    private getDirection():void{
        let radians:number = toRadians(this.playerRotation);

        this.xDisplacement = Math.cos(radians) * this._speed;
        this.yDisplacement = Math.sin(radians) * this._speed;
    }


    // ----------------------------------------------------------------------------- accessors
    public get speed():number{
        return this._speed;
    }
}