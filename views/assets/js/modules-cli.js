'use strict';

let canvas;
let ctx;
let width;
let height;
let currentFrame;
let mouse = {
	x: 0,
	y: 0,
	on: false,
};
let loadedModule;
let modules = {};

$(document).ready(function() {
    initCanvas();
});

function initCanvas() {
    canvas = document.getElementById('module-canvas');
    ctx = canvas.getContext('2d');
    // vars
    currentFrame = 0;
	
    // window events
    window.onresize = resizeCanvas;
	window.addEventListener('mousedown', mousePressed);
	window.addEventListener('mouseup', mouseReleased);
	window.addEventListener('mousemove', mouseDragged);
	window.addEventListener('keypress', keyPressed);
	
    // canvas size
	width = canvas.width = (window.innerWidth) - 100;
	height = canvas.height = (window.innerHeight) - 100;
    resizeCanvas();
    draw();
}


function draw() {
    ctx.clearRect(0, 0, width, height);
    
    if(loadedModule) {
        loadedModule.draw();
    }
    
    currentFrame++;
    requestAnimationFrame(draw);
}

function loadModule(name) {
    loadedModule = modules[name];
    loadedModule.init();
    console.log(name+' loaded');
}

/**
 * resize canvas
 */
function resizeCanvas() {
    width = canvas.width = (window.innerWidth);
    setTimeout(function() {
        height = canvas.height = (window.innerHeight) - 150;
    }, 0);
};

function mousePressed(e) {
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
	mouse.on = true;
    if(loadedModule) {
        loadedModule.mousePressed();
    }
}

function mouseReleased(e) {
	mouse.on = false;
    if(loadedModule) {
        loadedModule.mouseReleased();
    }
}

function mouseDragged(e) {
	mouse.x = e.offsetX;
	mouse.y = e.offsetY;
    if(loadedModule) {
        loadedModule.mouseDragged();
    }
}

function keyPressed(e) {
    if(loadedModule) {
        loadedModule.keyPressed(e.key);
    }
}

function drawRect(x, y, w, h, col) {
    ctx.beginPath();
    ctx.fillStyle = col;
    ctx.fillRect(x, y, w, h);
    ctx.fill();
}