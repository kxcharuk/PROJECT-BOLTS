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
        this.txtScore.x = (298+36);
        this.txtScore.y = 10;
        this.txtScore.letterSpacing = 1;
        this.stage.addChildAt(this.txtScore, stage.numChildren);

        this.txtLives = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtLives.x = (416+32);
        this.txtLives.y = 10;
        this.txtLives.letterSpacing = 1;
        this.stage.addChildAt(this.txtLives, stage.numChildren);

        this.txtTime = new createjs.BitmapText("0", assetManager.getSpriteSheet("glyphs"));
        this.txtTime.x = (182+32);
        this.txtTime.y = 10;
        this.stage.addChildAt(this.txtTime, stage.numChildren);

        // init sprite obj
        this.spriteTimer = assetManager.getSprite("placeholder-assets", "item");
        // this.spriteLives = assetManager.getSprite("");
    }
    // ----------------------------------------------------------------------------- public methods
    public update(score:number, time:number, lives:number):void{
        this.txtScore.text = score.toString();
        this.txtTime.text = time.toString();
        this.txtLives.text = lives.toString();
    }

    public positionScoreText(x:number, y:number, scale:number):void{
        this.txtScore.x = x;
        this.txtScore.y = y;
        this.txtScore.scaleX = scale;
        this.txtScore.scaleY = scale;
    }

    public positionLivesText(x:number, y:number, scale:number):void{
        this.txtLives.x = x;
        this.txtLives.y = y;
        this.txtLives.scaleX = scale;
        this.txtLives.scaleY = scale;
    }

    public showUI():void{
        this.stage.addChildAt(this.txtScore, this.stage.numChildren);
        this.stage.addChildAt(this.txtLives, this.stage.numChildren);
        this.stage.addChildAt(this.txtTime, this.stage.numChildren);
    }

    public hideUI():void{
        this.stage.removeChild(this.txtScore);
        this.stage.removeChild(this.txtLives);
        this.stage.removeChild(this.txtTime);
    }


    // ----------------------------------------------------------------------------- private methods



    // ----------------------------------------------------------------------------- accessors

}