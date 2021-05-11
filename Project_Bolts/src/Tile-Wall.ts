import AssetManager from "./AssetManager";
import Tile from "./Tile";


export default class Tile_Wall extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_WALL;
        this._sprite = assetManager.getSprite("placeholder-assets", "wall");
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods
    // detectCollisions()?

    //-------------------------------------------------------------------- accessors

}