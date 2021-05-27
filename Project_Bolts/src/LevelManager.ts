import { STAGE_HEIGHT, STAGE_WIDTH } from "./Constants";
import Tile from "./Tile";
import Tile_EnemySpawn from "./Tile-EnemySpawn";
import Tile_ItemSpawn from "./Tile-ItemSpawn";
import { randomMe } from "./Toolkit";
import Vector2 from "./Vector2";


export default class LevelManager{

    // local refs
    private stage:createjs.StageGL;
    private tiles:Tile[];
    
    private level:number[][];
    private waypoints:Vector2[] = []; // all non wall/obstacle tiles (potential nodes)
    private searchQueue:Vector2[] = [];
    private enemySpawns:Vector2[] = [];
    private searched:Vector2[] = [];
    private playerSpawn:Vector2;
    private searchCenter:Vector2;
    private _numEnSpawn:number;
    private _numItemSpawn:number;

    // custom event
    private eventLevelLoaded:createjs.Event;

    private static directions:Vector2[] = [new Vector2(1,0), new Vector2(0,1), new Vector2(-1,0), new Vector2(0,-1)];

    private _pathFound:boolean;

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

        this.playerSpawn = new Vector2(0,0);
        this.searchCenter = new Vector2(0,0);

        this.eventLevelLoaded = new createjs.Event("levelLoaded", true, false);

        this._numEnSpawn = 5;
        this._numItemSpawn = 8;
    }

    // ----------------------------------------------------- public methods
    public loadLevel():void{
        console.log("loading level");
        let offset:number = 16;
        let increment:number = 32;
        //let tilesPlaced:number = 0;
        // loop through array and add tiles to stage
        for(let i:number = 0; i < 15; i++){
            let x:number = 16;
            let y:number = (i * increment) + offset;
            for(let number of this.level[i]){
                if(number == Tile.ID_WALL){
                    // place a wall tile at i
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_WALL && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_OBSTACLE){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_OBSTACLE && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_PLAYER_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_PLAYER_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_ENEMY_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_ENEMY_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                else if(number == Tile.ID_ITEM_SPAWN){
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_ITEM_SPAWN && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                else{
                    for(let tile of this.tiles){
                        if(tile.id == Tile.ID_FLOOR && !tile.isActive){
                            tile.positionMe(x , y);
                            tile.addMe();
                            // tilesPlaced++;
                            break;
                        }
                    }
                }
                x += increment;
            }
            x = 16;
        }
        // console.log("tiles placed: " + tilesPlaced);
        this.stage.dispatchEvent(this.eventLevelLoaded);
    }

    public randomizeLevel():void{
        let enSpawns = 0;
        let itemSpawn = 0;
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
                    if(enSpawns < this.numEnSpawn){
                        this.level[y][x] = Tile.ID_ENEMY_SPAWN;
                        enSpawns++;
                    }
                    else{
                        this.level[y][x] = Tile.ID_FLOOR;
                    }
                }
                else if(random > 95){
                    if(itemSpawn < this.numItemSpawn){
                        this.level[y][x] = Tile.ID_ITEM_SPAWN;
                        itemSpawn++;
                    }
                    else{
                        this.level[y][x] = Tile.ID_FLOOR;
                    }
                }
                else{
                    this.level[y][x] = Tile.ID_FLOOR;
                }
            }
        }
    }

    public clearLevel():void{
        console.log("clearing level");
        for(let tile of this.tiles){
            if(tile.isActive){
                tile.removeMe();
            }
        }
    }

    public loadNewLevel():void{
        console.log("loading new level");
        this.clearLevel();
        this.randomizeLevel();
        while(this.checkPaths()){
            this.randomizeLevel();
        }
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
        // this could be optimized by storing the player spawn x,y in variables (eliminating the need to search for it)
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
        let x:number = randomMe(2, 13);
        let y:number = randomMe(2, 13);

        this.level[y][x] = Tile.ID_PLAYER_SPAWN;
        this.playerSpawn.x = x;
        this.playerSpawn.y = y;
        console.log("placing player at: " + x + "," + y);
    }

    private checkPaths():boolean{
        for(let y:number = 0; y < 15; y++ ){
            for(let x:number = 0; x < 15; x++){
                if(this.level[y][x] != Tile.ID_WALL && this.level[y][x] != Tile.ID_OBSTACLE){
                    this.waypoints.push(new Vector2(x,y)); // consider object pooling
                }
                if(this.level[y][x] == Tile.ID_ENEMY_SPAWN){
                    this.enemySpawns.push(new Vector2(x,y)); // consider object pooling
                }
            }
        }
        for(let enemySpawn of this.enemySpawns){
            if(!this.bfs(enemySpawn)){
                return false;
            }
        }
        return true;
    }

    private bfs(target:Vector2):boolean{
        this.searchQueue.push(this.playerSpawn);
        let searching:boolean = true;
        while(/*this.searchQueue.length > 0 && !this._pathFound*/searching){
            if(this.searchQueue.length == 0){
                this._pathFound = false;
                searching = false;
                return false;
            }
            else if(this.searchCenter == target){
                this._pathFound = true;
                searching = false;
                return true;
            }
            else{
                this.searchCenter = this.searchQueue.shift();
                this.searchNeighbors();
                this.searched.push(this.searchCenter);
            }
        }
        return false; // might be a problem
    }

    private searchNeighbors():void{
        for(let direction of LevelManager.directions){
            let searchCoords = this.searchCenter.add(direction.x, direction.y);
            for(let waypoint of this.waypoints){
                if(waypoint == searchCoords){
                    this.queueNeighbor(searchCoords);
                }
            }
        }
    }

    private queueNeighbor(searchCoords:Vector2){
        let addToQueue:boolean = true;
        for(let searchedWaypoint of this.searched){
            if(searchedWaypoint == searchCoords){
                addToQueue = false;
            }
        }
        for(let queuedWaypoint of this.searchQueue){
            if(queuedWaypoint == searchCoords){
                addToQueue = false;
            }
        }
        if(addToQueue){
            this.searchQueue.push(searchCoords);
        }
    }

    // ---------------------------------------------------------------------- accessors
    public get numEnSpawn():number{
        return this._numEnSpawn;
    }

    public set numEnSpawn(value:number){
        this._numEnSpawn = value;
    }

    public get numItemSpawn():number{
        return this._numItemSpawn;
    }

    public set numItemSpawn(value:number){
        this._numItemSpawn = value;
    }
}