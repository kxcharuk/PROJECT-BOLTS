
export default class Vector2{

    // properties
    private _x:number;
    private _y:number;


    constructor(x:number, y:number){
        this._x = x;
        this._y = y;
    }

    // -------------------------------------------------------------------------- public methods
    public return():Vector2{
        return this;
    }

    public add(x:number, y:number):Vector2{
        return new Vector2(this._x+x, this._y+y);
    }

    // -------------------------------------------------------------------------- accessors
    public get x():number{
        return this._x;
    }

    public set x(value:number){
        this._x = value;
    }

    public get y():number{
        return this._y;
    }

    public set y(value:number){
        this._y = value;
    }
}