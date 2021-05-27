import AssetManager from "./AssetManager";
import { PLAYER_PROJECTILE_SPEED } from "./Constants";
import Enemy from "./Enemy";
import Projectile from "./Projectile";
import Tile from "./Tile";
import { radiusHit } from "./Toolkit";


export default class PlayerProjectile extends Projectile{

    // cached refs
    private enemies:Enemy[];

    constructor(stage:createjs.StageGL, assetManager:AssetManager, enemies:Enemy[]){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("projectile-vfx-sprites", "rocket/active");
        this._speed = PLAYER_PROJECTILE_SPEED;
        this.enemies = enemies; // to be enemy pool
    }

    // ----------------------------------------------------------------------------- public methods

    public update(tiles:Tile[]):void{
        super.update(tiles);
        this.detectCollisions(tiles);
    }
    // ----------------------------------------------------------------------------- private methods
    protected detectCollisions(tiles:Tile[]):void{
        super.detectCollisions(tiles);
        for(let enemy of this.enemies){
            if(radiusHit(this._sprite, 16, enemy.sprite, 16)){
                if(!enemy.isActive) {return;}
                enemy.killMe(); // to be changed to enemy.killMe();
                this.removeMe();
            }
        }
    }
}