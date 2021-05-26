import AssetManager from "./AssetManager";
import Player from "./Player";

export default class ScreenManager{

    private stage:createjs.StageGL;
    private player:Player;
    // private startScreen:createjs.Container;
    // private gameOverScreen:createjs.Container;
    private startScreen:createjs.Sprite;
    private gameOverScreen:createjs.Sprite;

    private eventStartGame:createjs.Event;
    private eventResetGame:createjs.Event;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, player:Player){
        this.stage = stage;
        this.player = player;
        // screens
        // this.startScreen = new createjs.Container();
        // this.startScreen.addChild(assetManager.getSprite("screens","placeholder-start", 0,0));
        // this.gameOverScreen = new createjs.Container();
        // this.gameOverScreen.addChild(assetManager.getSprite("screens","placeholder-gameover",0,0));
        this.startScreen = assetManager.getSprite("screens","placeholder-start", 0,0);
        this.gameOverScreen = assetManager.getSprite("screens", "placeholder-gameover",0,0);

        // custom events
        this.eventStartGame = new createjs.Event("gameStart", true, false);
        this.eventResetGame = new createjs.Event("gameReset", true, false);
    }

    // ----------------------------------------------------------------------------- public methods
    public showStart():void{
        this.hideAll();
        this.stage.addChildAt(this.startScreen, this.stage.getChildIndex(this.player.sprite));

        this.stage.on("click", ()=> { this.hideAll(); this.stage.dispatchEvent(this.eventStartGame); }, this, true);
    }

    public showGameOver():void{
        this.hideAll();

        this.stage.addChildAt(this.gameOverScreen, this.stage.numChildren);
        this.stage.on("click", ()=> { this.hideAll(); this.stage.dispatchEvent(this.eventResetGame); }, this, true);
    }

    // ------------------------------------------------------------------------------ private methods
    private hideAll():void{
        this.stage.removeChild(this.startScreen);
        this.stage.removeChild(this.gameOverScreen);
    }
}