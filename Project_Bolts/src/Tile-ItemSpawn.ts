import AssetManager from "./AssetManager";
import Item from "./Item";
import Player from "./Player";
import Tile from "./Tile";
import { randomMe } from "./Toolkit";


export default class Tile_ItemSpawn extends Tile{

    private items:Item[];
    private _itemID:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, items:Item[]){
        super(stage, assetManager, player);
        this._id = Tile.ID_ITEM_SPAWN;
        this._sprite = assetManager.getSprite("placeholder-assets", "Item-Spawn");
        this.items = items;
    }

    //-------------------------------------------------------------------- public methods

    public addMe():void{
        super.addMe();
        this.getItem();
    }
    //-------------------------------------------------------------------- private methods
    private getItem():void{
        this._itemID = randomMe(0, 2);
        for(let item of this.items){
            if(item.id == this._itemID){
                if(!item.isActive){
                    item.positionMe(this._sprite.x, this._sprite.y);
                    item.addMe();
                    break;
                }
            }
        }
    }
    //-------------------------------------------------------------------- accessors

}