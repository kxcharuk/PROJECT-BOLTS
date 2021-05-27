import AssetManager from "./AssetManager";
import { } from "./Constants";
import GameObject from "./GameObject";
import Player from "./Player";


export default class Tile extends GameObject{

    public static ID_FLOOR:number = 0;
    public static ID_WALL:number = 1;
    public static ID_OBSTACLE:number = 2;
    public static ID_PLAYER_SPAWN:number = 3;
    public static ID_ENEMY_SPAWN:number = 4;
    public static ID_ITEM_SPAWN:number = 5;

    protected _id:number;

    protected player:Player;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        super(stage, assetManager);
        this.player = player;
        this._id = Tile.ID_FLOOR;
    }

    // -------------------------------------------------------------- public methods
    public addMe():void{
        super.addMe();
        this.stage.addChildAt(this._sprite, 0);
    }
    // -------------------------------------------------------------- private methods
    // -------------------------------------------------------------- accessors
    public get id():number{
        return this._id;
    }
}