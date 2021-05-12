import AssetManager from "./AssetManager";
import Player from "./Player";
import Tile from "./Tile";


export default class Tile_PlayerSpawn extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_PLAYER_SPAWN;
        this._sprite = assetManager.getSprite("placeholder-assets", "player-spawn");
    }

    //-------------------------------------------------------------------- public methods
    public movePlayerHere(player:Player):void{
        player.positionMe(this._sprite.x, this._sprite.y);
    }

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}