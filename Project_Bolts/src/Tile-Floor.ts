import AssetManager from "./AssetManager";
import Tile from "./Tile";


export default class Tile_Floor extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_FLOOR;
        this._sprite = assetManager.getSprite("placeholder-assets", "floor-tile");
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}