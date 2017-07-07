'use strict';

let morseFrequency = {
    shell:'3.505',
    halls:'3.515',
    slick:'3.522',
    trick:'3.532',
    boxes:'3.535',
    leaks:'3.542',
    strobe:'3.545',
    bistro:'3.552',
    flick:'3.555',
    bombs:'3.565',
    break:'3.572',
    bricks:'3.575',
    steak:'3.582',
    sting:'3.592',
    vector:'3.595',
    beats:'3.600',
};
let morseCode = {
    cl:'a',
    lccc:'b',
    lclc:'c',
    lcc:'d',
    c:'e',
    cclc:'f',
    llc:'g',
    cccc:'h',
    cc:'i',
    clll:'j',
    lcl:'k',
    clcc:'l',
    ll:'m',
    lc:'n',
    lll:'o',
    cllc:'p',
    llcl:'q',
    clc:'r',
    ccc:'s',
    l:'t',
    ccl:'u',
    cccl:'v',
    cll:'w',
    lccl:'x',
    lcll:'y',
    llcc:'z',
};

let possibleFrequency = [];
let currentSequence = [];
let currentMorseSequence;

function registerMorseSequence() {
    if(morseCode[currentMorseSequence]) {
        currentSequence.push(morseCode[currentMorseSequence]);
    }
}

function getPossibleFrequencies() {
    possibleFrequency = [];
    for(let word in morseFrequency) {
        if(morseFrequency.hasOwnProperty(word)) {
            let possible = true;
            for(let i=0; i<word.length; i++) {
                if(currentSequence[i]) {
                    if(word.charAt(i) == currentSequence[i]) {
                        // ok
                       //  possible = true;
                    } else {
                        // ko
                        possible = false;
                    }
                } else {
                    // ok
                    // possible = true;
                }
            }
            if(possible) {
                possibleFrequency.push(morseFrequency[word]);
            }
        }
    }
}

modules['morse'] = {
    init: function() {
        currentSequence = [];
        possibleFrequency = [];
        currentMorseSequence = '';
    },
    
    draw: function() {
        ctx.fillStyle = 'white';
        ctx.font="16px Arial";
        ctx.fillText("morse", 10,15);
        
        ctx.fillStyle = 'white';
        ctx.font="30px Arial";
        
        ctx.fillText(JSON.stringify(currentSequence), 30,45);
        
        for(let i=0; i<possibleFrequency.length; i++) {
            if(possibleFrequency[i]) {
                ctx.fillText(possibleFrequency[i], width/2+ Math.floor(i/10)*100, 100+(i%10)*25)
            }
        }
    },

    mousePressed: function() {
        
    },

    mouseReleased: function() {
        
    },

    mouseDragged: function() {
        
    },

    keyPressed: function(key) {
        if(key == 'r') {
            // reset
            this.init();
        }
        if(key == 'l' || key == 'c') {
            currentMorseSequence+=key;
        }
        if(key == ' '){
            registerMorseSequence();
            currentMorseSequence = '';
        }
        getPossibleFrequencies();
    },

};
