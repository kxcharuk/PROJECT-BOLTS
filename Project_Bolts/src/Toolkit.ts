export function randomMe(low:number, high:number):number {
    let randomNum:number = 0;
    randomNum = Math.floor(Math.random() * (high - low + 1)) + low;
    return randomNum;
}

export function boxHit(sprite1:createjs.Sprite, sprite2:createjs.Sprite):boolean {
    // collision detection : bounding box
    let width1:number = sprite1.getBounds().width;
    let height1:number = sprite1.getBounds().height;
    let width2:number = sprite2.getBounds().width;
    let height2:number = sprite2.getBounds().height;

    if ((sprite1.x + width1 > sprite2.x) &&
        (sprite1.y + height1 > sprite2.y) &&
        (sprite1.x < sprite2.x + width2) &&
        (sprite1.y < sprite2.y + height2)) {
        return true;
    } else {
        return false;
    }
}

export function pointHit(sprite1:createjs.Sprite, sprite2:createjs.Sprite, sprite1HitX:number = 0, sprite1HitY:number = 0, stage:createjs.StageGL = null):boolean {
    // collision detection : hitTest() method
    
    // in debugging mode if stage object passed in
    // display visible markers on the stage to indicate where hotspots are located
    if (stage != null) {
        let markerPoint:createjs.Point = sprite1.localToGlobal(sprite1HitX, sprite1HitY);
        let marker:createjs.Shape = new createjs.Shape();
        marker.graphics.beginFill("#FF00EC");
        marker.graphics.drawRect(0,0,4,4);
        marker.regX = 2;
        marker.regY = 2;
        marker.x = markerPoint.x;
        marker.y = markerPoint.y;
        marker.cache(0,0,4,4);
        stage.addChild(marker);
    }

    // convert sprite2 coordinate system to be the same as sprite1
    let point:createjs.Point = sprite1.localToLocal(sprite1HitX, sprite1HitY, sprite2);
    // do collision detection test using hitTest() method of Sprite
    if (sprite2.hitTest(point.x, point.y)) {
        return true;
    } else {
        return false;
    }
}

export function radiusHit(sprite1:createjs.Sprite, radius1:number, sprite2:createjs.Sprite, radius2:number):boolean {
    // radius testing collision detection!
    let a:number = sprite1.x - sprite2.x;
    let b:number = sprite1.y - sprite2.y;

    // get the c with pythagorean's theorem
    let c:number= Math.sqrt((a * a) + (b * b));
    // add two radius together
    if (c <= (radius1 + radius2)) {
        return true;
    } else {
        return false;
    }
}

export function radiusHitExt(x1:number, y1:number, radius1:number, x2:number, y2:number, radius2:number):boolean {
    // radius testing collision detection!
    let a:number = x1 - x2;
    let b:number = y1 - y2;

    // get the c with pythagorean's theorem
    let c:number= Math.sqrt((a * a) + (b * b));
    // add two radius together
    if (c <= (radius1 + radius2)) {
        return true;
    } else {
        return false;
    }
}

export function radiusToBoxHit(spriteR:createjs.Sprite, radius:number, spriteB:createjs.Sprite):boolean{
    // this will only work for objects with registration points that are centered
    let halfExtX = (spriteB.getBounds().width)/2;
    let halfExtY = (spriteB.getBounds().height)/2;

    let topLeftX = spriteB.x - halfExtX;
    let topLeftY = spriteB.y - halfExtY;

    let topRightX = spriteB.x + halfExtX;
    let topRightY = spriteB.y - halfExtY;

    let bottomLeftX = spriteB.x - halfExtX;
    let bottomLeftY = spriteB.y + halfExtY;

    let bottomRightX = spriteB.x + halfExtX;
    let bottomRightY = spriteB.y + halfExtY;

    if(radiusHit(spriteR, radius, spriteB, halfExtX)){
        return true;
    }

    let a:number;
    let b:number;
    let c:number;
    
    // test top left
    a = spriteR.x - topLeftX;
    b = spriteR.y - topLeftY;
    // get c from points a (radius sprite) to points b-e (box x,y +- halfExts)
    c = Math.sqrt((a*a)+(b*b));
    // there is no extent from the corner so we just need to check if the radius reaches points b
    if(c <= radius){
        return true;
    }
    // test top right
    a = spriteR.x - topRightX;
    b = spriteR.y - topRightY;
    c = Math.sqrt((a*a)+(b*b));
    if(c <= radius){
        return true;
    }
    // test bottom right
    a = spriteR.x - bottomRightX;
    b = spriteR.y - bottomRightY;
    c = Math.sqrt((a*a)+(b*b));
    if(c <= radius){
        return true;
    }
    // test bottom left
    a = spriteR.x - bottomLeftX;
    b = spriteR.y - bottomLeftY;
    c = Math.sqrt((a*a)+(b*b));
    if(c <= radius){
        return true;
    }

    return false;
}

export function toRadians(degrees:number){
    return (degrees * (Math.PI/180));
}

export function toDegrees(radians:number){
    return (radians * (180/Math.PI));
}