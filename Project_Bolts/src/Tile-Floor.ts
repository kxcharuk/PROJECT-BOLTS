import AssetManager from "./AssetManager";
import Player from "./Player";
import Tile from "./Tile";


export default class Tile_Floor extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        super(stage, assetManager, player);
        this._id = Tile.ID_FLOOR;
        this._sprite = assetManager.getSprite("environment-sprites", "floor");
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}