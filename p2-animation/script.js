"use strict";

var Scene = {
    canvas: undefined,
    canvasContext: undefined,
    offscreenCanvas: undefined,
    offscreenContext: undefined,
    elements: {
        sun: {
            img: undefined,
            x: 650,
            y: 100,
            width: 100,
            height: 100,
            speed: 0.2
        },
        cloud: {
            img: undefined,
            x: 100,
            y: 150,
            width: 200,
            height: 200,
            offset: 0,
            speed: 1.5,
            frames: [
                { frame: { x: 1, y: 1, w: 200, h: 200 } },
                { frame: { x: 203, y: 1, w: 200, h: 200 } },
                { frame: { x: 405, y: 1, w: 200, h: 200 } },
                { frame: { x: 1, y: 203, w: 200, h: 200 } },
                { frame: { x: 203, y: 203, w: 200, h: 200 } },
                { frame: { x: 405, y: 203, w: 200, h: 200 } },
                { frame: { x: 1, y: 405, w: 200, h: 200 } },
                { frame: { x: 203, y: 405, w: 200, h: 200 } },
                { frame: { x: 405, y: 405, w: 200, h: 200 } }
            ],
            frame: 0
        }
    },
    lastUpdateTime: undefined
};

Scene.start = function () {
    Scene.canvas = document.getElementById("myCanvas");
    Scene.canvasContext = Scene.canvas.getContext("2d");

    Scene.offscreenCanvas = document.createElement("canvas");
    Scene.offscreenCanvas.width = Scene.canvas.width;
    Scene.offscreenCanvas.height = Scene.canvas.height;
    Scene.offscreenContext = Scene.offscreenCanvas.getContext("2d");

    Scene.elements.sun.img = new Image();
    Scene.elements.sun.img.src = "sun.png";

    Scene.elements.cloud.img = new Image();
    Scene.elements.cloud.img.src = "spritesheet.png";

    Scene.elements.sun.img.onload = function () {
        Scene.elements.cloud.img.onload = function () {
            Scene.drawStaticElements();
            window.requestAnimationFrame(Scene.mainLoop);
        };
    };
};

document.addEventListener('DOMContentLoaded', Scene.start);

Scene.clearCanvas = function () {
    var gradient = Scene.canvasContext.createLinearGradient(0, 0, 0, Scene.canvas.height);
    gradient.addColorStop(0, '#FF4500'); 
    gradient.addColorStop(1, '#FFD700');
    Scene.canvasContext.fillStyle = gradient;
    Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

Scene.mainLoop = function (timestamp) {
    if (!Scene.lastUpdateTime) {
        Scene.lastUpdateTime = timestamp;
    }
    var deltaTime = timestamp - Scene.lastUpdateTime;
    Scene.clearCanvas();
    Scene.update(deltaTime);
    Scene.draw();
    Scene.lastUpdateTime = timestamp;
    window.requestAnimationFrame(Scene.mainLoop);
};

Scene.update = function (deltaTime) {
    Scene.elements.sun.y += Scene.elements.sun.speed * deltaTime * 0.1;
    if (Scene.elements.sun.y > Scene.canvas.height) {
        Scene.elements.sun.y = 150;
    }
    Scene.elements.cloud.offset += Scene.elements.cloud.speed;
    if (Scene.elements.cloud.offset > Scene.canvas.width) {
        Scene.elements.cloud.offset = -Scene.elements.cloud.width;
    }
};

Scene.draw = function () {
    Scene.drawImage(Scene.elements.sun.img, { x: Scene.elements.sun.x, y: Scene.elements.sun.y, width: Scene.elements.sun.width, height: Scene.elements.sun.height });
    Scene.canvasContext.drawImage(Scene.offscreenCanvas, 0, 0); 
    var cloudFrame = Scene.elements.cloud.frames[Scene.elements.cloud.frame];
    Scene.canvasContext.drawImage(
        Scene.elements.cloud.img,
        cloudFrame.frame.x,
        cloudFrame.frame.y,
        cloudFrame.frame.w,
        cloudFrame.frame.h,
        Scene.elements.cloud.offset,
        Scene.elements.cloud.y,
        cloudFrame.frame.w,
        cloudFrame.frame.h
    );

    Scene.elements.cloud.frame = (Scene.elements.cloud.frame + 1) % Scene.elements.cloud.frames.length;
};

Scene.drawImage = function (sprite, position) {
    Scene.canvasContext.save();
    Scene.canvasContext.translate(position.x - position.width / 2, position.y - position.height / 2);
    Scene.canvasContext.drawImage(sprite, 0, 0, position.width, position.height);
    Scene.canvasContext.restore();
};

Scene.drawStaticElements = function () {
    Scene.drawMountain(0, Scene.canvas.height - 100, 300, 200, Scene.offscreenContext);
    Scene.drawMountain(150, Scene.canvas.height - 100, 500, 300, Scene.offscreenContext);
    Scene.drawMountain(500, Scene.canvas.height - 100, 300, 200, Scene.offscreenContext);

    Scene.offscreenContext.fillStyle = '#228B22'; 
    Scene.offscreenContext.fillRect(0, Scene.canvas.height - 100, Scene.canvas.width, 100);

    for (var i = 0; i < Scene.canvas.width; i += 8) {
        var height = Math.random() * 20 + 10;
        Scene.drawGrass(i, height, Scene.offscreenContext);
    }
    for (var i = 50; i < Scene.canvas.width; i += 100) {
        Scene.drawTree(i, Scene.canvas.height - 140, Scene.offscreenContext);
    }

    Scene.offscreenContext.beginPath();
    Scene.offscreenContext.moveTo(250, Scene.canvas.height - 50);
    Scene.offscreenContext.lineTo(350, Scene.canvas.height - 50);
    Scene.offscreenContext.lineTo(300, Scene.canvas.height - 150);
    Scene.offscreenContext.closePath();
    Scene.offscreenContext.fillStyle = '#FF6347';
    Scene.offscreenContext.fill();

    Scene.offscreenContext.beginPath();
    Scene.offscreenContext.moveTo(300, Scene.canvas.height - 150);
    Scene.offscreenContext.lineTo(300, Scene.canvas.height - 50);
    Scene.offscreenContext.lineTo(275, Scene.canvas.height - 50);
    Scene.offscreenContext.closePath();
    Scene.offscreenContext.fillStyle = '#CD5C5C';
    Scene.offscreenContext.fill();

    Scene.offscreenContext.font = '30px Sans-Serif';
    Scene.offscreenContext.fillStyle = '#ffffff';
    Scene.offscreenContext.fillText('Mountain Sunset / Camping', 410, Scene.canvas.height - 20);
};

Scene.drawMountain = function (x, y, width, height, context) {
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width / 2, y - height);
    context.lineTo(x + width, y);
    context.closePath();
    context.fillStyle = '#A9A9A9';
    context.fill();
};

Scene.drawGrass = function (x, height, context) {
    context.beginPath();
    context.moveTo(x, Scene.canvas.height - 100); 
    context.lineTo(x + 5, Scene.canvas.height - 100 - height); 
    context.lineTo(x - 5, Scene.canvas.height - 100); 
    context.fillStyle = '#228B22';
    context.fill();
};

Scene.drawTree = function (x, y, context) {
    context.fillStyle = '#8B4513';
    context.fillRect(x - 10, y, 20, 50);

    context.beginPath();
    context.moveTo(x - 40, y);
    context.lineTo(x + 40, y);
    context.lineTo(x, y - 80);
    context.closePath();
    context.fillStyle = '#006400';
    context.fill();
};
