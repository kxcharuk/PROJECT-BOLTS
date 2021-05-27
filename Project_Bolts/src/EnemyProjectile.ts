import AssetManager from "./AssetManager";
import Player from "./Player";
import Projectile from "./Projectile";
import Tile from "./Tile";
import { radiusHit } from "./Toolkit";


export default class EnemyProjectile extends Projectile{

    public static TYPE_BULLET:number = 0;
    public static TYPE_LASER:number = 1;
    public static TYPE_TURRET:number = 2;

    // properties
    private _type:number;
    private player:Player;

    private eventPlayerKilled:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player, eventPlayerKilled:createjs.Event, type:number){
        super(stage, assetManager);
        this._type = type;
        if(this._type == EnemyProjectile.TYPE_BULLET){
            this._sprite = assetManager.getSprite("projectile-vfx-sprites","bullet/active");
        }
        else if(this._type == EnemyProjectile.TYPE_LASER){
            this._sprite = assetManager.getSprite("projectile-vfx-sprites","turret/active");
        }
        else if(this._type == EnemyProjectile.TYPE_TURRET){
            this._sprite = assetManager.getSprite("projectile-vfx-sprites","turret/active");
        }

        this._sprite.scaleX = 1.2;
        this._sprite.scaleY = 1.2;
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
        this._sprite.play();
        this.stage.addChildAt(this._sprite, this.stage.getChildIndex(this.player.sprite));
    }
    // --------------------------------------------------------------------- private methods
    protected detectCollisions(tiles:Tile[]):void{
        super.detectCollisions(tiles);
        if(radiusHit(this._sprite, 5, this.player.sprite, 13)){
            if(!this.player.isActive || this.player.state != Player.STATE_ALIVE) {return;}
            console.log("enemy projectile kill" + " " + this._type);
            this.removeMe();
            this.player.killMe();
        }
    }

    // --------------------------------------------------------------------- accessors
    public get type():number{
        return this._type;
    }

}