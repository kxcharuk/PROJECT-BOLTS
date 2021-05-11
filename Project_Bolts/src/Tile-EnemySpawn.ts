import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Tile from "./Tile";
import { randomMe } from "./Toolkit";


export default class Tile_EnemySpawn extends Tile{

    // need an enemy var
    private _enemyID:number;
    // need an enemy pool
    private enemies:Enemy[];
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._id = Tile.ID_ENEMY_SPAWN;
    }

    //-------------------------------------------------------------------- public methods

    //-------------------------------------------------------------------- private methods
    private getNewEnemy():void{
        this._enemyID = randomMe(0, 3);
        for(let enemy of this.enemies){
            if(enemy.id == this._enemyID){
                enemy.positionMe(this._sprite.x, this._sprite.y);
                // enemy.addMe();
                break;
            }
        }
    }

    //-------------------------------------------------------------------- accessors

}