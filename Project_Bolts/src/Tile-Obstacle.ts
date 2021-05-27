import AssetManager from "./AssetManager";
import Player from "./Player";
import Tile from "./Tile";


export default class Tile_Obstacle extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        super(stage, assetManager, player);
        this._id = Tile.ID_OBSTACLE;
        this._sprite = assetManager.getSprite("environment-sprites", "obstacle"); // temporary
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}