// game constants
export const STAGE_WIDTH:number = 480;
export const STAGE_HEIGHT:number = 480;
export const FRAME_RATE:number = 30;

export const MIN_TIMER_AMOUNT:number = 15;
// player const
export const PLAYER_SPEED:number = 5;
export const PLAYER_SHOT_DELAY:number = 15;

// player projectile const
export const PLAYER_PROJECTILE_SPEED:number = 8;
export const PLAYER_PROJECTILE_MAX:number = 20;

// enemy const
export const ENEMY_SPEED:number = 4;
export const ENEMY_SHOT_DELAY:number = 20;

// level manager const
export const ENEMY_SPAWN_MAX:number = 15;
export const ITEM_SPAWN_MAX:number = 6;

// manifest for AssetManager
export const ASSET_MANIFEST = [
    // placeholder
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
    // environment (tiles)
    {
        type:"json",
        src:"./lib/spritesheets/environment-sprites.json",
        id:"environment-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/environment-sprites.png",
        id:"environment-sprites",
        data:0
    },
    // projectiles/vfx(explosions)
    {
        type:"json",
        src:"./lib/spritesheets/projectile-vfx-sprites.json",
        id:"projectile-vfx-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/projectile-vfx-sprites.png",
        id:"projectile-vfx-sprites",
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
    // items
    {
        type:"json",
        src:"./lib/spritesheets/items-sprites.json",
        id:"items-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/items-sprites.png",
        id:"items-sprites",
        data:0
    },
    // screens/ui
    {
        type:"json",
        src:"./lib/spritesheets/screens-ui-sprites.json",
        id:"screens-ui-sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/screens-ui-sprites.png",
        id:"screens-ui-sprites",
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
    },
    // sounds
    {
        type:"sound",
        src:"./lib/sounds/enemy_explosion.ogg",
        id:"enemy_explosion",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/enemy_shooting.ogg",
        id:"enemy_shooting",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/fail.ogg",
        id:"fail",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/hit.ogg",
        id:"hit",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/hit2.ogg",
        id:"hit2",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/menu_blip.ogg",
        id:"menu_blip",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/pickup_life.ogg",
        id:"pickup_life",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/pickup_time.ogg",
        id:"pickup_time",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/pickup_score.ogg",
        id:"pickup_score",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/player_explosion.ogg",
        id:"player_explosion",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/player_shoot.ogg",
        id:"player_shoot",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/start.ogg",
        id:"start",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/song.ogg",
        id:"song",
        data:1
    }
];