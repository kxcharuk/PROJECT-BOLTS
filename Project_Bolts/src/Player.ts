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
    private _state:number;

    private xDisplacement:number;
    private yDisplacement:number;

    // custom events
    private eventPlayerDied:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage,assetManager);
        this._speed = 4; // change to constant in Constants
        this._sprite = assetManager.getSprite("placeholder-assets", "player");

        this.eventPlayerDied = new createjs.Event("playerdied", true, false);
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
    private killMe():void{
        if(this._state != Player.STATE_ALIVE) { return; }
        this._state = Player.STATE_DEAD; // this needs to be changed to STATE_DYING and using animationend to change to STATE_DEAD
        this._isActive = false;
        this.removeMe();
        this._sprite.dispatchEvent(this.eventPlayerDied);
    }


    // -------------------------------------------------------------------- accessors
}