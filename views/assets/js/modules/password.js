'use strict';

let passwordList = [
    'about', 'after', 'again', 'below', 'could',
    'every', 'first', 'found', 'great', 'house',
    'large', 'learn', 'never', 'other', 'place',
    'plant', 'point', 'right', 'small', 'sound',
    'spell', 'still', 'study', 'their', 'there',
    'these', 'thing', 'think', 'three', 'water',
    'where', 'which', 'world', 'would', 'write',
];

let possiblePasswords = [];

let passwordLetterList = [];
let currentPasswordLetterRank = 0;

function setPasswordKey(key, rank) {
    let letterRank = Math.floor(rank/6);
    let num = rank%6;
    if(!passwordLetterList[letterRank]) {
        passwordLetterList[letterRank] = [];
    }
    passwordLetterList[letterRank][num] = key;
    console.log(letterRank+' - '+num+' - >' +key);
}

function calculatePassword() {
    for(let i=0; i<possiblePasswords.length; i++) {
        // password
        for(let r=0; r<5; r++) {
            let possible = false;
            //rank
            for(let j=0; j<6; j++) {
                if(passwordLetterList[r] && passwordLetterList[r][j]) {
                    if(passwordList[i].charAt(r) == passwordLetterList[r][j]) {
                        possible = true;
                        break;
                    }
                } else {
                    possible = true;
                }
            }
            if(!possible) {
                possiblePasswords[i] = false;
            }
        }
    }
}


modules['password'] = {
    init: function (){
        possiblePasswords = [];
        passwordLetterList = [];
        currentPasswordLetterRank = 0;
    },
    draw: function() {
        ctx.fillStyle = 'white';
        ctx.font="16px Arial";
        ctx.fillText("password", 10,15);
    
        ctx.fillStyle = 'white';
        ctx.font="30px Arial";
        for(let i=0; i<possiblePasswords.length; i++) {
            if(possiblePasswords[i]){
                ctx.fillText(passwordList[i], width/2+ Math.floor(i/10)*100, 100+(i%10)*25);
            }
        }
        
        for(let i=0; i<5; i++) {
            for(let j=0; j<6; j++) {
                if(passwordLetterList[i] && passwordLetterList[i][j]) {
                    ctx.fillText(passwordLetterList[i][j], 50+i*50, 100+j*25);
                }
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
        if(key == ' '){
            this.init();
        } else {
            if(currentPasswordLetterRank == 0) {
                possiblePasswords = passwordList.slice();
            }
            setPasswordKey(key, currentPasswordLetterRank);
            currentPasswordLetterRank++;
            if(currentPasswordLetterRank > 6*5) {
                currentPasswordLetterRank = 0;
            }
            calculatePassword();
        }
    },

};
