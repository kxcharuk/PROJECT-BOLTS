import AssetManager from "./AssetManager";
import Player from "./Player";
import Tile from "./Tile";


export default class Tile_PlayerSpawn extends Tile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        super(stage, assetManager, player);
        this._id = Tile.ID_PLAYER_SPAWN;
        this._sprite = assetManager.getSprite("placeholder-assets", "player-spawn");
    }

    //-------------------------------------------------------------------- public methods
    public movePlayerHere():void{
        this.player.positionMe(this._sprite.x, this._sprite.y);
        this.player.addMe();
    }

    public addMe():void{
        super.addMe();
        this.movePlayerHere();
    }

    //-------------------------------------------------------------------- private methods

    //-------------------------------------------------------------------- accessors

}