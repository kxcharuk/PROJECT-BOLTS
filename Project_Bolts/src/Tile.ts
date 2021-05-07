import AssetManager from "./AssetManager";
import GameObject from "./GameObject";


export default class Tile extends GameObject{

    // temp for first-playable (as the level manager map makes this obsolete)
    public static TYPE_WALL_TOP = 1;
    public static TYPE_WALL_LEFT = 2;
    public static TYPE_WALL_RIGHT = 3;
    public static TYPE_WALL_BOTTOM = 4;

    // temp for first-playable (as this will be handled with sub-classes)
    private _type:number;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, type:number){
        super(stage, assetManager);
        this._sprite = assetManager.getSprite("placeholder-assets", "wall");
        this._type = type;
    }

    // -------------------------------------------------------------- public methods
    // -------------------------------------------------------------- private methods
    // -------------------------------------------------------------- accessors
    public get type():number{
        return this._type;
    }
}