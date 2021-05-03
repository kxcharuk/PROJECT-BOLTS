import AssetManager from "./AssetManager";


export default class GameObject{
    // class constants

    // properties
    private _sprite:createjs.Sprite;
    private _isActive:boolean;

    // local refs
    private stage:createjs.StageGL;
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        // link local refs to handle
        this.stage = stage;
        this.assetManager = assetManager;

        // init properties
    }


    // ----------------------------------------------------------------------------- public methods
    public update():void{

    }

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