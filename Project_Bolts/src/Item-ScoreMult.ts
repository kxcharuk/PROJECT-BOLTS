import AssetManager from "./AssetManager";
import Item from "./Item";
import Player from "./Player";

export default class Item_ScoreMult extends Item{

    // custom event
    private eventScoreMultPickUp:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("items-sprites", "scoremult/active");
        this.eventScoreMultPickUp = new createjs.Event("scorePickUp", true, false);
        this._id = Item.ID_SCOREMULT;
    }

    // ------------------------------------------------------------------------------- public methods
    public update(player:Player):void{
        this.detectCollisions(player, this.eventScoreMultPickUp);
    }
}