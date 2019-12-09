import Player from "./player.js";
import Rocket from "./rocket.js";

class Game {
    constructor() {
        this.player = new Player();

        this.bodyHTML = document.querySelector('body');
        this.borderHTML = document.getElementById('border');
        this.screenHTML = document.getElementById('game');
        this.hpHTML = document.querySelector('#hp > span:nth-child(2)');
        this.ammoHTML = document.querySelector('#ammo > span:nth-child(2)');
        this.moneyHTML = document.querySelector('#money > span:nth-child(2)');
        this.outOfAmmoHTML = document.getElementById('out-of-ammo');
        this.levelHTML = document.getElementById('current-level');
        this.levelCountHTML = document.querySelector('#current-level > span');

        this.hp = 100;
        this.ammo = 50;
        this.money = 10;
        this.rotation = 0;
        this.rotationSpeed = 8;
        this.defaultSpeed = 4;
        this.maxSpeed = 8;
        this.speed = this.defaultSpeed;
        this.upSpeed = 0;
        this.leftSpeed = 0;
        this.playerAttackSpeed = 30;
        this.playerAttackSpeedReset = 70;
        this.outOfAmmoMsgLifeSpan = 999;
        this.outOfAmmoMsgMaxLifeSpan = 120;
        this.keyMap = { 65: false, 68: false, 87: false, 32: false, 80: false };
        this.mapTexture = 'Animation_Water.gif';
        this.mapTextureString = 'url(../img/map/' + this.mapTexture + ')';
        this.gameLevel = 1;
        this.nextLevelCounter = 0;
        this.nextLevelCounterMax = 10800;
        this.msgLevelCounter = 0;
        this.msgLevelCounterMax = 120;
    }
    init() {
        this.screenHTML.style.backgroundImage = this.mapTextureString;
        this.updateStats();
        this.player.init();
        this.centerStage();
        this.keyPressCheck();
        window.requestAnimationFrame(() => { this.engine() });
    }
    centerStage() {
        this.bodyHTML.style.display = 'block';
        this.borderHTML.scrollLeft = this.screenHTML.offsetWidth / 2;
        this.borderHTML.scrollTop = this.screenHTML.offsetHeight / 2;
        this.screenHTML.style.border = '25px solid red';
    }
    updateStats() {
        this.hpHTML.innerHTML = this.hp;
        this.ammoHTML.innerHTML = this.ammo;
        this.moneyHTML.innerHTML = this.money;
    }
    displayCurrentLevel() {
        this.msgLevelCounter++;
        if (this.msgLevelCounter < this.msgLevelCounterMax) {
            this.levelCountHTML.innerHTML = 'Current Level:' + this.gameLevel;
            this.levelHTML.style.visibility = 'visible';
        }
        else {
            this.levelHTML.style.visibility = 'hidden';
        }
    }
    pauseGame() {

    }
    toggleShop() {
        this.pauseGame();
    }
    keyPressCheck() {
        document.addEventListener('keydown', (e) => {
            if (e.keyCode in this.keyMap) {
                this.keyMap[e.keyCode] = true;
                if (this.keyMap[65] || this.keyMap[68]) {
                    this.updateRotation();
                }
                if (this.keyMap[87]) {
                    this.speedUp(true);
                }
                if (this.keyMap[32]) {
                    this.fire();
                }
                if (this.keyMap[80]) {
                    this.toggleShop();
                }
            }
        });
        document.addEventListener('keyup', (e) => {
            if (e.keyCode in this.keyMap) {
                this.keyMap[e.keyCode] = false;
                if (!this.keyMap[87]) {
                    this.speedUp(false);
                }
            }
        });
    }
    updateRotation() {
        if (this.keyMap[65]) {
            this.rotation -= this.rotationSpeed;
        }
        if (this.keyMap[68]) {
            this.rotation += this.rotationSpeed;
        }
        this.player.imgHTML.style.transform = 'rotate(' + this.rotation + 'deg) translate(-50%,-50%)';
    }
    speedUp(isSpeedUp) {
        if (isSpeedUp) {
            this.speed = this.maxSpeed;
        }
        else {
            this.speed = this.defaultSpeed;
        }
    }
    fire() {
        if (this.ammo <= 0) {
            return this.outOfAmmoMsgLifeSpan = 0;
        }
        if (this.playerAttackSpeedReset <= this.playerAttackSpeed) {
            return;
        }
        new Rocket('player', this.rotation).init();
        this.ammo--;
        this.updateStats();
        this.playerAttackSpeedReset = 0;
    }
    outOfAmmoShow() {
        this.outOfAmmoMsgLifeSpan++;
        if (this.outOfAmmoMsgLifeSpan < this.outOfAmmoMsgMaxLifeSpan) {
            this.outOfAmmoHTML.style.visibility = 'visible';
        }
        else {
            this.outOfAmmoHTML.style.visibility = 'hidden';
        }
    }
    checkLevel() {
        this.nextLevelCounter++;
        if (this.nextLevelCounter > this.nextLevelCounterMax) {
            this.gameLevel++;
            this.nextLevelCounter = 0;
            this.msgLevelCounter = 0;
            this.displayCurrentLevel();
        }
    }
    engine() {
        this.displayCurrentLevel();
        this.checkLevel();
        this.fly();
        this.playerAttackSpeedReset++;
        this.outOfAmmoShow();
        window.requestAnimationFrame(() => { this.engine() });
    }
    fly() {
        this.topSpeed = (Math.sin((this.rotation + 90) / 180 * Math.PI) * this.speed) * -1;
        this.leftSpeed = (Math.cos((this.rotation + 90) / 180 * Math.PI) * this.speed) * -1;
        this.borderHTML.scrollBy(this.leftSpeed, this.topSpeed);
    }
}

export default Game;