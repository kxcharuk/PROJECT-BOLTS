import AssetManager from "./AssetManager";
import Player from "./Player";
import Projectile from "./Projectile";
import Tile from "./Tile";
import { radiusHit } from "./Toolkit";


export default class EnemyProjectile extends Projectile{


    // properties
    private player:Player;

    private eventPlayerKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, eventPlayerKilled:createjs.Event){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("projectile-sprites","bullet/active");
        this._speed = 2;
        this.player = player;
        this.eventPlayerKilled = eventPlayerKilled;
    }

    // --------------------------------------------------------------------- public methods

    public update(tiles:Tile[]):void{
       super.update(tiles);
       this.detectCollisions(tiles);
    }

    public addMe():void{
        super.addMe();
        this.stage.addChildAt(this._sprite, this.stage.getChildIndex(this.player.sprite));
    }
    // --------------------------------------------------------------------- private methods
    protected detectCollisions(tiles:Tile[]):void{
        super.detectCollisions(tiles);
        if(radiusHit(this._sprite, 16, this.player.sprite, 16)){
            if(!this.player.isActive) {return;}
            this.stage.dispatchEvent(this.eventPlayerKilled);
        }
    }

}