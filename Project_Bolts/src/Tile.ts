import AssetManager from "./AssetManager";
import GameObject from "./GameObject";


export default class Tile extends GameObject{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("placeholder-assets", "wall");

    }

    // -------------------------------------------------------------- public methods
    // -------------------------------------------------------------- private methods
    // -------------------------------------------------------------- accessors
}