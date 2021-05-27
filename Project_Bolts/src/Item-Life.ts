import AssetManager from "./AssetManager";
import Item from "./Item";
import Player from "./Player";

export default class Item_Life extends Item{

    // custom event
    private eventLifePickUp:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("items-sprites", "lives/active2");
        this.eventLifePickUp = new createjs.Event("lifePickUp", true, false);
        this._id = Item.ID_LIFE;
    }

    // ------------------------------------------------------------------------------- public methods
    public update(player:Player):void{
        this.detectCollisions(player, this.eventLifePickUp, "lives/collected", "pickup_life");
    }
}