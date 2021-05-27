import AssetManager from "./AssetManager";
import Player from "./Player";

export default class ScreenManager{

    private stage:createjs.StageGL;
    private player:Player;
    // private startScreen:createjs.Container;
    // private gameOverScreen:createjs.Container;
    private startScreen:createjs.Sprite;
    private infoScreen:createjs.Sprite;
    private gameScreen:createjs.Container;
    private gameOverScreen:createjs.Sprite;

    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;
        // screens
        this.startScreen = assetManager.getSprite("screens-ui-sprites","start", 0,0);
        this.infoScreen = assetManager.getSprite("screens-ui-sprites", "info", 0, 0);
        this.gameOverScreen = assetManager.getSprite("screens-ui-sprites", "placeholder-gameover",0,0);
        this.gameScreen = new createjs.Container();
        let uiScore:createjs.Sprite = assetManager.getSprite("screens-ui-sprites", "score-text", 298, 16); //298
        let uiTime:createjs.Sprite = assetManager.getSprite("screens-ui-sprites", "time-text", 182, 16);
        let uiRound:createjs.Sprite = assetManager.getSprite("screens-ui-sprites", "round-text", 64, 16);// 64
        let uiLives:createjs.Sprite = assetManager.getSprite("screens-ui-sprites", "lives-text", 416, 16);
        this.gameScreen.addChild(uiScore);
        this.gameScreen.addChild(uiTime);
        this.gameScreen.addChild(uiRound);
        this.gameScreen.addChild(uiLives);

        // custom events
        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
    }

    // ----------------------------------------------------------------------------- public methods
    public showStart():void{
        this.hideAll();
        this.stage.addChildAt(this.startScreen, this.stage.getChildIndex(this.player.sprite));

        this.stage.on("click", ()=> { this.showInfo(); }, this, true);
    }

    public showInfo():void{
        this.hideAll();
        this.stage.addChildAt(this.infoScreen, 0);

        this.stage.on("click", ()=> { this.stage.dispatchEvent(this.eventStartGame);}, this, true)
    }

    public showGame():void{
        this.hideAll();

        this.stage.addChildAt(this.gameScreen, this.stage.numChildren);
    }

    public showGameOver():void{
        this.hideAll();

        this.stage.addChildAt(this.gameOverScreen, this.stage.numChildren);
        this.stage.on("click", ()=> { this.hideAll(); this.stage.dispatchEvent(this.eventResetGame); }, this, true);
    }

    // ------------------------------------------------------------------------------ private methods
    private hideAll():void{
        this.stage.removeChild(this.startScreen);
        this.stage.removeChild(this.gameScreen);
        this.stage.removeChild(this.infoScreen);
        this.stage.removeChild(this.gameOverScreen);
    }
}