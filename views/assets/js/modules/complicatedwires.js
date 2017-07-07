'use strict';

let wireCombinations = {
    ____:'C',
    r___:'S',
    rb__:'S',
    rbs_:'P',
    rbsd:'D',
    r_sd:'B',
    r__d:'B',
    r_s_:'C',
    rb_d:'S',
    _b__:'S',
    _bs_:'D',
    _bsd:'P',
    _b_d:'P',
    __s_:'C',
    __sd:'B',
    ___d:'D',
};
let currentWireConfiguration = '____';
let bombConfiguration = {};
let answeringQuestion;
let mustCut = '?';

function setWireConfiguration(key) {
    if(answeringQuestion) {
        if(key == 'y') {
            mustCut = 'YES';
            bombConfiguration[answeringQuestion] = 'y'; 
            answeringQuestion = false;
        } else if(key=='n'){
            mustCut = 'NO';
            bombConfiguration[answeringQuestion] = 'n';
            answeringQuestion = false;
        }
        return;
    }
    if(mustCut != '?') {
        return;    
    }
    switch(key) {
        case 'r':
            currentWireConfiguration = toggleWireConfiguration('r', 0, currentWireConfiguration);
            break;
        case 'b':
            currentWireConfiguration = toggleWireConfiguration('b', 1, currentWireConfiguration);
            break;
        case 's':
            currentWireConfiguration = toggleWireConfiguration('s', 2, currentWireConfiguration);
            break;
        case 'd':
            currentWireConfiguration = toggleWireConfiguration('d', 3, currentWireConfiguration);
            break;
    }
}

function toggleWireConfiguration(key, index, text) {
    if(text.charAt(index) == '_') {
        text = text.substr(0, index) + key + text.substr(index+1, text.length);
    } else {
        text = text.substr(0, index) + '_' + text.substr(index+1, text.length);
    }
    
    return text;
}

function validateConfiguration() {
    if(mustCut != '?') {
        // reset wire
        mustCut = '?';
        currentWireConfiguration = '____';
        answeringQuestion = false;
        return;
    }
    let letter = wireCombinations[currentWireConfiguration];
    switch(letter) {
        case 'C':
            mustCut = 'YES';
            break;
        case 'D':
            mustCut = 'NO';
            break;
        case 'S':
            askBombQuestion('lastNumberEven');
            break;
        case 'P':
            askBombQuestion('parallelPort');
            break;
        case 'B':
            askBombQuestion('twoBatteryOrMore');
            break;
    }
}

function askBombQuestion(param) {
    if(bombConfiguration[param] == 'y') {
        mustCut = 'YES';
    } else if(bombConfiguration[param] == 'n') {
        mustCut = 'NO';
    } else {
        answeringQuestion = param;
    }
}

modules['complicatedwires'] = {
    init: function() {
        bombConfiguration = {
            lastNumberEven: '?',
            parallelPort: '?',
            twoBatteryOrMore: '?',
        };
        mustCut = '?';
        currentWireConfiguration = '____';
        answeringQuestion = false;
    },
    
    draw: function() {
        ctx.fillStyle = 'white';
        ctx.font="16px Arial";
        ctx.fillText("complicated wires (rbsd)", 10,15);
        
        ctx.font="30px Arial";
        ctx.fillText(currentWireConfiguration, 10,height/2);
        
        if(answeringQuestion){
            ctx.fillText(answeringQuestion, width/2 ,height/2);
        }
        
        ctx.font="40px Arial";
        ctx.fillText(mustCut, width/1.5 ,height/2);
        
    },

    mousePressed: function() {
        
    },

    mouseReleased: function() {
        
    },

    mouseDragged: function() {
        
    },

    keyPressed: function(key) {
        if(key == ' ') {
            // validate
            validateConfiguration();
        }
        else {
            setWireConfiguration(key);
        }
    },

};