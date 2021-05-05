import AssetManager from "./AssetManager";
import { PLAYER_PROJECTILE_SPEED } from "./Constants";
import Projectile from "./Projectile";
import { radiusHit } from "./Toolkit";


export default class PlayerProjectile extends Projectile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("placeholder-assets", "projectile");
        this._speed = PLAYER_PROJECTILE_SPEED;
    }

    // ----------------------------------------------------------------------------- public methods

    public update(){
        super.update();
        this.detectCollisions();
    }

    // ----------------------------------------------------------------------------- private methods

    private detectCollisions():void{
        
    }
}