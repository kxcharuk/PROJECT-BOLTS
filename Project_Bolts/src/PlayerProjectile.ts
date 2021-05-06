import AssetManager from "./AssetManager";
import { PLAYER_PROJECTILE_SPEED } from "./Constants";
import Enemy from "./Enemy";
import Projectile from "./Projectile";
import Tile from "./Tile";
import { radiusHit } from "./Toolkit";


export default class PlayerProjectile extends Projectile{

    // cached refs
    private enemy:Enemy;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, enemy:Enemy){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("placeholder-assets", "projectile");
        this._speed = PLAYER_PROJECTILE_SPEED;
        this.enemy = enemy;
    }

    // ----------------------------------------------------------------------------- public methods

    public update(tiles:Tile[]):void{
        super.update(tiles);
        this.detectCollisions();
    }
    // ----------------------------------------------------------------------------- private methods
    protected detectCollisions():void{
        if(radiusHit(this._sprite, 16, this.enemy.sprite, 16)){
            this.enemy.killMe();
            this.removeMe();
        }
    }
}