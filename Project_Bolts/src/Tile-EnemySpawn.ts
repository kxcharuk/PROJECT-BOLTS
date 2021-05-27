import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import Player from "./Player";
import Tile from "./Tile";
import { randomMe } from "./Toolkit";


export default class Tile_EnemySpawn extends Tile{

    // need an enemy var
    private _enemyID:number;
    // need an enemy pool
    private enemies:Enemy[];
    
    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, enemyPool:Enemy[]){
        super(stage, assetManager, player);
        this._id = Tile.ID_ENEMY_SPAWN;
        this._sprite = assetManager.getSprite("environment-sprites", "floor");
        this.enemies = enemyPool;
    }

    //-------------------------------------------------------------------- public methods
    public addMe():void{
        super.addMe();
        this.getEnemy();
    }
    //-------------------------------------------------------------------- private methods
    private getEnemy():void{
        this._enemyID = randomMe(0, 2);
        for(let enemy of this.enemies){
            if(!enemy.isActive){
                if(enemy.id == this._enemyID){
                    enemy.positionMe(this._sprite.x, this._sprite.y);
                    enemy.addMe();
                    break;
                }
            }
        }
    }

    //-------------------------------------------------------------------- accessors

}