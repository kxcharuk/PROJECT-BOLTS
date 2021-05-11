import AssetManager from "./AssetManager";
import Tile from "./Tile";


export default class Tile_Obstacle extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_OBSTACLE;
        this._sprite = assetManager.getSprite("placeholder-assets", "wall"); // temporary
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}