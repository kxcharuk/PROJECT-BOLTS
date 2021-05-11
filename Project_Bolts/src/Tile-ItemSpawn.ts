import AssetManager from "./AssetManager";
import Tile from "./Tile";


export default class Tile_ItemSpawn extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_ITEM_SPAWN;
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods
    private getNewItem():void{
        //this._itemID = randomMe(0, 3);
        // for(let item of this.items){
        //     if(item.id == this._itemID){
        //         item.positionMe(this._sprite.x, this._sprite.y);
        //         item.addMe();
        //         break;
        //     }
        // }
    }
    //-------------------------------------------------------------------- accessors

}