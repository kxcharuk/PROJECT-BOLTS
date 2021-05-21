import AssetManager from "./AssetManager";

export default class ScreenManager{

    private stage:createjs.StageGL;

    private startScreen:createjs.Container;
    private gameOverScreen:createjs.Container;

    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;

        // screens
        this.startScreen = new createjs.Container();
        // this.startScreen.addChild(assetManager.getSprite(""))
        this.gameOverScreen = new createjs.Container();
        // this.gameOverScreen.addChild(assetManager.getSprite())

        // custom events
        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventResetGame = new createjs.Event("resetGame", true, false);
    }

    // ----------------------------------------------------------------------------- public methods
    public showStart():void{
        this.hideAll();
        this.stage.addChild(this.startScreen);

        this.stage.on("click", ()=> { this.stage.dispatchEvent(this.eventStartGame); this.hideAll(); }, this, true);
    }

    public showGameOver():void{
        this.hideAll();

        this.stage.addChild(this.gameOverScreen);
        this.stage.on("click", ()=> { this.stage.dispatchEvent(this.eventResetGame); this.hideAll(); }, this, true);
    }

    // ------------------------------------------------------------------------------ private methods
    private hideAll():void{
        this.stage.removeChild(this.startScreen);
        this.stage.removeChild(this.gameOverScreen);
    }
}