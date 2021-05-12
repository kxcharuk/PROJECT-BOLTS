import AssetManager from "./AssetManager";
import GameObject from "./GameObject";


export default class Tile extends GameObject{

    public static ID_WALL:number = 0;
    public static ID_FLOOR:number = 1;
    public static ID_OBSTACLE:number = 2;
    public static ID_PLAYER_SPAWN:number = 3;
    public static ID_ENEMY_SPAWN:number = 4;
    public static ID_ITEM_SPAWN:number = 5;

    protected _id:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        super(stage, assetManager);
    }

    // -------------------------------------------------------------- public methods
    // -------------------------------------------------------------- private methods
    // -------------------------------------------------------------- accessors
    public get id():number{
        return this._id;
    }
    
    public get class(){
        return this;
    }
}