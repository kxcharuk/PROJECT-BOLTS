import AssetManager from "./AssetManager";
import Player from "./Player";
import Tile from "./Tile";


export default class Tile_Wall extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        super(stage, assetManager, player);
        this._id = Tile.ID_WALL;
        this._sprite = assetManager.getSprite("placeholder-assets", "wall");
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods
    // detectCollisions()?

    //-------------------------------------------------------------------- accessors

}