import AssetManager from "./AssetManager";
import Enemy from "./Enemy";
import EnemyProjectile from "./EnemyProjectile";


export default class Enemy_Laser extends Enemy{

    constructor(stage:createjs.StageGL, assetManager:AssetManager, eventPlayerKilled:createjs.Event, projectilePool:EnemyProjectile[]){
        super(stage, assetManager, eventPlayerKilled, projectilePool);
        
    }
}