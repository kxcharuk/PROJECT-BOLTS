// game constants
export const STAGE_WIDTH:number = 480;
export const STAGE_HEIGHT:number = 480;
export const FRAME_RATE:number = 30;
// player const
export const PLAYER_SPEED = 5;
export const PLAYER_SHOT_DELAY = 30;

// player projectile const
export const PLAYER_PROJECTILE_SPEED = 8;
export const PLAYER_PROJECTILE_MAX = 20;

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
    }
];