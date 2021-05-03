import AssetManager from "./AssetManager";
import GameObject from "./GameObject";
import { toRadians } from "./Toolkit";


export default class Player extends GameObject{
    // class constants
    public static STATE_ALIVE:number = 1;
    public static STATE_TAKING_DAMAGE:number = 2;
    public static STATE_DYING:number = 3;
    public static STATE_DEAD:number = 4;

    // properties
    private _speed:number;

    private xDisplacement:number;
    private yDisplacement:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage,assetManager);
        this._speed = 4; // change to constant in Constants
        this._sprite = assetManager.getSprite("placeholder-assets", "player");
    }

    // -------------------------------------------------------------------- public methods
    public update():void{

    }

    public move(degree:number):void{
        this.xDisplacement = Math.cos(toRadians(degree));
        this.yDisplacement = Math.sin(toRadians(degree));
        
        this._sprite.x += this.xDisplacement * this._speed;
        this._sprite.y += this.yDisplacement * this._speed;
    }
    // -------------------------------------------------------------------- private methods

    // -------------------------------------------------------------------- accessors
}