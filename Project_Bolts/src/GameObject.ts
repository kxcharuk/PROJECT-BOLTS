import AssetManager from "./AssetManager";


export default class GameObject{
    // class constants

    // properties
    protected _sprite:createjs.Sprite;
    protected _isActive:boolean;

    // local refs
    protected stage:createjs.StageGL;
    protected assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        // link local refs to handle
        this.stage = stage;
        this.assetManager = assetManager;

        // init properties
    }


    // ----------------------------------------------------------------------------- public methods
    // public update():void{

    // }

    public addMe():void{
        this._sprite.play();
        this.stage.addChild(this._sprite);
        this._isActive = true;
    }

    public removeMe():void{
        this._sprite.stop();
        this.stage.removeChild(this._sprite);
        this._isActive = false;
    }

    public positionMe(x:number, y:number):void{
        this._sprite.x = x;
        this._sprite.y = y;
    }

    // ------------------------------------------------------------------------------ accessors
    public get isActive(){
        return this._isActive;
    }

    public set isActive(value:boolean){
        this._isActive = value;
    }

    public get sprite(){
        return this._sprite;
    }
}