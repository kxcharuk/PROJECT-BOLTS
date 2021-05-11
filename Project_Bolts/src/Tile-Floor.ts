import AssetManager from "./AssetManager";
import Tile from "./Tile";


export default class Tile_Floor extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_FLOOR;
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}