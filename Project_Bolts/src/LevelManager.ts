import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import Tile from "./Tile";


export default class LevelManager{

    private level:number[][];
    // local refs
    private stage:createjs.StageGL;
    private tiles:Tile[];
    constructor(stage:createjs.StageGL, tiles:Tile[]){
        this.stage = stage;
        this.tiles = tiles;
        // init level array
        this.level = [
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
            [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
        ]
    }

    // ----------------------------------------------------- public methods
    public loadLevel():void{
        let offset:number = 16;
        let increment:number = 32;
        
        // change cap in loop to a constant
        for(let i:number = 0; i < 15; i++){
            console.log("i = " + i);
            let x:number = 16;
            let y:number = (i * increment) + offset;
            for(let number of this.level[i]){
                if(number == 1){
                    // place a wall tile at i
                    for(let tile of this.tiles){
                        if(!tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                x += increment;
                console.log("x,y = " + x + "," + y);
            }
            x = 16;
        }
    }

    // ----------------------------------------------------- private methods

}