import AssetManager from "./AssetManager";
import Projectile from "./Projectile";


export default class PlayerProjectile extends Projectile{

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("placeholder-assets", "projectile");
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