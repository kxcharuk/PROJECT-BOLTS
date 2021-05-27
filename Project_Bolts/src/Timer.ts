import AssetManager from "./AssetManager";

export default class Timer{

    // properties
    private timer:number; // timer id code
    private txtSeconds:createjs.BitmapText;
    private _seconds:number;
    private _showText:boolean;

    private eventTimeExpired:createjs.Event;

    private stage:createjs.StageGL;
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager, event:createjs.Event, digit:number){
        this.stage = stage;
        this.assetManager = assetManager;
        
        this._seconds = digit;

        this.eventTimeExpired = event;
        // construct bitmap text object when adding timer display
        this.txtSeconds = new createjs.BitmapText("3", assetManager.getSpriteSheet("glyphs"));
        this.txtSeconds.letterSpacing = 1;
        this.txtSeconds.x = 16;
        this.txtSeconds.y = 16;
        this._showText = false;
    }
    
    // ------------------------------------------------------------------------- public methods
    public startTimer(duration:number, showTimer:boolean):void{
        this._showText = showTimer;
        window.clearInterval(this.timer);
        if(this._showText){
            this.stage.addChildAt(this.txtSeconds, this.stage.numChildren);
        }
        
        // start interval here
        this._seconds = duration;
        this.txtSeconds.text = this._seconds.toString();
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

    
    public stopTimer():void{
        window.clearInterval(this.timer);
    }
    
    public addTime(amount:number):void{
        this._seconds += amount;
    }
    
    public positionText(x:number, y:number, scale:number):void{
        this.txtSeconds.x = x;
        this.txtSeconds.y = y;
        this.txtSeconds.scaleX = scale;
        this.txtSeconds.scaleY = scale;
    }
    // -------------------------------------------------------------------------- accessors
    public get seconds():number{
        return this._seconds;
    }

    public set showText(value:boolean){
        this._showText = value;
    }
    
}