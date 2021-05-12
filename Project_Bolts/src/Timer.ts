import AssetManager from "./AssetManager";

export default class Timer{

    // properties
    private timer:number; // time id code
    private _seconds:number;

    private eventTimeExpired:createjs.Event;

    private stage:createjs.StageGL;
    private assetManager:AssetManager;

    constructor(stage:createjs.StageGL, assetManager:AssetManager){
        this.stage = stage;
        this.assetManager = assetManager;
        
        this._seconds = 0;

        this.eventTimeExpired = new createjs.Event("timerExpired", true, false);
        // construct bitmap text object when adding timer display
    }

    // ------------------------------------------------------------------------- public methods
    public startTimer(duration:number):void{
        // start interval here
        this._seconds = duration;

        // timer is running this event handler every second -> to update the timer txt
        this.timer = window.setInterval(()=>{
            this._seconds--;
            // update timer txt here
            if(this._seconds <= 0){
                window.clearInterval(this.timer);
                this.stage.dispatchEvent(this.eventTimeExpired);
            }

        }, 1000);
    }
}