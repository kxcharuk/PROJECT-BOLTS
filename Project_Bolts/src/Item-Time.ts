import AssetManager from "./AssetManager";
import Item from "./Item";
import Player from "./Player";

export default class Item_Time extends Item{

    // custom event
    private eventTimePickUp:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("items-sprites", "time/active");
        this.eventTimePickUp = new createjs.Event("timePickUp", true, false);
        this._id = Item.ID_TIME;
    }

    // ------------------------------------------------------------------------------- public methods
    public update(player:Player):void{
        this.detectCollisions(player, this.eventTimePickUp);
    }
}