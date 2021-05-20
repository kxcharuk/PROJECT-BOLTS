import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import Tile from "./Tile";
import Tile_EnemySpawn from "./Tile-EnemySpawn";
import { randomMe } from "./Toolkit";


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
        ];
    }

    // ----------------------------------------------------- public methods
    public loadLevel():void{
        let offset:number = 16;
        let increment:number = 32;
        // loop throw array and add tiles to stage
        // change cap in loop to a constant
        for(let i:number = 0; i < 15; i++){
            console.log("i = " + i);
            let x:number = 16;
            let y:number = (i * increment) + offset;
            for(let number of this.level[i]){
                if(number == Tile.ID_WALL){
                    // place a wall tile at i
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_WALL && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_OBSTACLE){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_OBSTACLE && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_PLAYER_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_PLAYER_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_ENEMY_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_ENEMY_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_ITEM_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_ITEM_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            break;
                        }
                    }
                }
                else{
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_FLOOR && !tile.isActive){
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

    public randomizeLevel():void{

        for(let y:number = 1; y < 14; y++){
            for(let x:number = 1; x < 14; x++){
                let random:number = randomMe(0,100);
                if(random >= 0 && random <= 75){
                    this.level[y][x] = Tile.ID_FLOOR;
                }
                else if(random > 75 && random <= 85){
                    this.level[y][x] = Tile.ID_OBSTACLE;
                }
                else if(random > 85 && random <= 95){
                    this.level[y][x] = Tile.ID_ENEMY_SPAWN;
                }
                else if(random > 95){
                    this.level[y][x] = Tile.ID_ITEM_SPAWN;
                }
                else{
                    this.level[y][x] = Tile.ID_FLOOR;
                }
            }
        }
    }

    public clearLevel():void{
        for(let tile of this.tiles){
            tile.removeMe();
        }
    }

    public loadNewLevel():void{
        this.clearLevel();
        this.randomizeLevel();
        this.setPlayerSpawn();
        this.checkAroundPlayer();
        this.setBorder();
        this.loadLevel();
    }

    // ----------------------------------------------------- private methods

    private setBorder():void{
        for(let y:number = 0; y < 15; y++){
            for(let x:number = 0; x < 15; x++){
                if(y == 0 || y == 14 || x == 0 || x == 14){
                    this.level[y][x] = Tile.ID_WALL;
                }
            }
        }
    }

    private checkAroundPlayer():void{
        for(let y:number = 1; y < 14; y++){
            for(let x:number = 1; x < 14; x++){
                if(this.level[y][x] == Tile.ID_PLAYER_SPAWN){
                    if(this.level[y - 1][x] != Tile.ID_FLOOR || this.level[y - 1][x] != Tile.ID_WALL) { this.level[y - 1][x] = Tile.ID_FLOOR; }
                    if(this.level[y + 1][x] != Tile.ID_FLOOR || this.level[y + 1][x] != Tile.ID_WALL) { this.level[y + 1][x] = Tile.ID_FLOOR; }
                    if(this.level[y][x - 1] != Tile.ID_FLOOR || this.level[y][x - 1] != Tile.ID_WALL) { this.level[y][x - 1] = Tile.ID_FLOOR; }
                    if(this.level[y][x + 1] != Tile.ID_FLOOR || this.level[y][x + 1] != Tile.ID_WALL) { this.level[y][x + 1] = Tile.ID_FLOOR; }
                    if(this.level[y - 1][x - 1] != Tile.ID_FLOOR || this.level[y - 1][x - 1] != Tile.ID_WALL) { this.level[y - 1][x - 1] = Tile.ID_FLOOR; }
                    if(this.level[y + 1][x + 1] != Tile.ID_FLOOR || this.level[y + 1][x + 1] != Tile.ID_WALL) { this.level[y + 1][x + 1] = Tile.ID_FLOOR; }
                    if(this.level[y + 1][x - 1] != Tile.ID_FLOOR || this.level[y + 1][x - 1] != Tile.ID_WALL) { this.level[y + 1][x - 1] = Tile.ID_FLOOR; }
                    if(this.level[y - 1][x + 1] != Tile.ID_FLOOR || this.level[y - 1][x + 1] != Tile.ID_WALL) { this.level[y - 1][x + 1] = Tile.ID_FLOOR; }
                }
            }
        }
    }

    private setPlayerSpawn():void{
        let x:number = randomMe(1, 14);
        let y:number = randomMe(1, 14);

        this.level[y][x] = Tile.ID_PLAYER_SPAWN;
    }

    private changeElement(y:number, x:number, newElement:number):void{
        this.level[y][x] = newElement;
    }
}