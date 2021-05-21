import AssetManager from "./AssetManager";

export default class UIManager{

    private stage:createjs.StageGL;

    private _playerLives:number;
    private _score:number;
    private _time:number;

    // bitmap objects
    private txtScore:createjs.BitmapText;
    private txtTime:createjs.BitmapText;
    private txtLives:createjs.BitmapText;
    // sprite obj
    private spriteTimer:createjs.Sprite;
    private spriteScore:createjs.Sprite;
    private spriteLives:createjs.Sprite;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){

        this.stage = stage;

        // init bitmap obj
        this.txtScore = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtLives = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtTime = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));

        // init sprite obj
        this.spriteTimer = assetManager.getSprite("placeholder-assets", "item");
        // this.spriteLives = assetManager.getSprite("");
    }
    // ----------------------------------------------------------------------------- public methods
    public update(score:number, time:number):void{
        this.txtScore.text = score.toString();
        this.txtTime.text = time.toString();
    }


    // ----------------------------------------------------------------------------- private methods



    // ----------------------------------------------------------------------------- accessors

}