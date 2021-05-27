import AssetManager from "./AssetManager";
import GameObject from "./GameObject";
import Player from "./Player";
import { radiusHit } from "./Toolkit";

export default class Item extends GameObject{

    // class const
    public static ID_TIME:number = 0;
    public static ID_SCOREMULT:number = 1;
    public static ID_LIFE:number = 2;
    // properties
    protected _id:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        // this.eventTimePickUp = new createjs.Event("timePickUp", true, false);
        this._sprite = assetManager.getSprite("placeholder-assets", "item");
    }

    // -------------------------------------------------------------- public methods
    public update(player:Player):void{
        // this.detectCollisions(player);
    }

    public addMe():void{
        super.addMe();
        this.stage.addChildAt(this._sprite, 2); 
    }

    // -------------------------------------------------------------- private methods
    protected detectCollisions(player:Player, event:createjs.Event):void{
        if(radiusHit(this._sprite, 10, player.sprite, 13)){
            this.removeMe();
            this.stage.dispatchEvent(event);
        }
    }

    // ------------------------------------------------------------------ accessors
    public get id():number{
        return this._id;
    }
}