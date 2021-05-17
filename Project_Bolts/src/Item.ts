import AssetManager from "./AssetManager";
import GameObject from "./GameObject";
import Player from "./Player";
import { radiusHit } from "./Toolkit";

export default class Item extends GameObject{

    // custom event
    private eventTimePickUp:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this.eventTimePickUp = new createjs.Event("timePickUp", true, false);
        this._sprite = assetManager.getSprite("placeholder-assets", "item");
    }

    // -------------------------------------------------------------- public methods
    public update(player:Player):void{
        this.detectCollisions(player);
    }

    public addMe():void{
        super.addMe();
        this.stage.addChildAt(this._sprite, 2);
    }

    // -------------------------------------------------------------- private methods
    private detectCollisions(player:Player):void{
        if(radiusHit(this._sprite, 10, player.sprite, 13)){
            this.removeMe();
            this.stage.dispatchEvent(this.eventTimePickUp);
        }
    }
}