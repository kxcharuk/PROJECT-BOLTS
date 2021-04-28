// game constants
export const STAGE_WIDTH:number = 600;
export const STAGE_HEIGHT:number = 600;
export const FRAME_RATE:number = 30;
// gameplay const
export const POINTS_PER_KILL = 50;
// player const
export const PLAYER_MAX_HEALTH = 5;
export const PLAYER_SPEED = 6;
export const PLAYER_RADIUS = 15;
// player projectile
export const MAX_PLAYER_PROJECTILES = 100;
export const DELAY_BETWEEN_SHOTS = 5;
export const PROJECTILE_LVL1_DAMAGE = 1;
export const PROJECTILE_LVL2_DAMAGE = 2;
export const PROJECTILE_LVL3_DAMAGE = 3;
// enemy const
export const ENEMY_SHIP_MAX_AMOUNT = 50;
export const ENEMY_RELEASE_DELAY = 1500;
export const ENEMY_RADIUS = 25;
export const ENEMY_SHOOT_DELAY = 1000;
// projectiles const
export const PROJECTILE_SPEED = 10;
export const PROJECTILE_RADIUS = 5;
// enemy projectile
export const MAX_ENEMY_PROJECTILES = 100;
// pick up const
export const PICK_UP_SPEED = 2;
export const PICK_UP_RADIUS = 15;
export const PICK_UP_DROP_CHANCE_INITIAL = 5;

// manifest for AssetManager
export const ASSET_MANIFEST = [
    {
        type:"json",
        src:"./lib/spritesheets/sprites.json",
        id:"sprites",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/sprites.png",
        id:"sprites",
        data:0
    },
    {
        type:"json",
        src:"./lib/spritesheets/sprites2.json",
        id:"sprites2",
        data:0
    },
    {
        type:"image",
        src:"./lib/spritesheets/sprites2.png",
        id:"sprites2",
        data:0
    },
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
    {
        type:"sound",
        src:"./lib/sounds/enemy_explosion.ogg",
        id:"enemy_explosion",
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
        src:"./lib/sounds/enemy_shoot.ogg",
        id:"enemy_shoot",
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
        src:"./lib/sounds/power_powerup.ogg",
        id:"power_powerup",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/energy_powerup.ogg",
        id:"energy_powerup",
        data:1
    },
    {
        type:"sound",
        src:"./lib/sounds/hit.ogg",
        id:"hit",
        data:1
    },
];