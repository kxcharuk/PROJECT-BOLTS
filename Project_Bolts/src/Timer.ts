import AssetManager from "./AssetManager";

export default class Timer{

    // properties
    private timer:number; // timer id code
    private txtSeconds:createjs.BitmapText;
    private _seconds:number;

    private eventTimeExpired:createjs.Event;

    private stage:createjs.StageGL;
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, event:createjs.Event){
        this.stage = stage;
        this.assetManager = assetManager;
        
        this._seconds = 0;

        this.eventTimeExpired = event;
        // construct bitmap text object when adding timer display
        this.txtSeconds = new createjs.BitmapText("10", assetManager.getSpriteSheet("glyphs"));
        this.txtSeconds.letterSpacing = 1;
        this.txtSeconds.x = 16;
        this.txtSeconds.y = 16;
    }
    
    // ------------------------------------------------------------------------- public methods
    public startTimer(duration:number):void{
        this.stage.addChild(this.txtSeconds);
        // start interval here
        this._seconds = duration;

        // timer is running this event handler every second -> to update the timer txt
        this.timer = window.setInterval(()=>{
            this._seconds--;
            // update timer txt here
            this.txtSeconds.text = this._seconds.toString();
            if(this._seconds <= 0){
                this.stage.removeChild(this.txtSeconds);
                this.stage.dispatchEvent(this.eventTimeExpired);
                window.clearInterval(this.timer);
            }
        }, 1000);
    }

    public positionText(x:number, y:number, scale:number):void{
        this.txtSeconds.x = x;
        this.txtSeconds.y = y;
        this.txtSeconds.scaleX = scale;
        this.txtSeconds.scaleY = scale;
    }

    // -------------------------------------------------------------------------- accessors
    
}