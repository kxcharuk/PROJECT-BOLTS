// game constants
export const STAGE_WIDTH:number = 480;
export const STAGE_HEIGHT:number = 480;
export const FRAME_RATE:number = 30;
// player const
export const PLAYER_SPEED = 5;
export const PLAYER_SHOT_DELAY = 15;

// player projectile const
export const PLAYER_PROJECTILE_SPEED = 8;
export const PLAYER_PROJECTILE_MAX = 20;

// enemy const
export const ENEMY_SPEED = 4;
export const ENEMY_SHOT_DELAY = 20;

// manifest for AssetManager
export const ASSET_MANIFEST = [
    {
        type:"json",
        src:"./lib/spritesheets/placeholder-assets.json",
        id:"placeholder-assets",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/placeholder-assets.png",
        id:"placeholder-assets",
        data:0
    },
    // projectiles
    {
        type:"json",
        src:"./lib/spritesheets/projectile-sprites.json",
        id:"projectile-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/projectile-sprites.png",
        id:"projectile-sprites",
        data:0
    },
    // characters
    {
        type:"json",
        src:"./lib/spritesheets/character-sprites.json",
        id:"character-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/character-sprites.png",
        id:"character-sprites",
        data:0
    },
    // screens
    {
        type:"json",
        src:"./lib/spritesheets/screens-sprites.json",
        id:"screens",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/screens-sprites.png",
        id:"screens",
        data:0
    },
    // glyphs
    {
        type:"json",
        src:"./lib/spritesheets/glyphs.json",
        id:"glyphs",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/glyphs.png",
        id:"glyphs",
        data:0
    }
];