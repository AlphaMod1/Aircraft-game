class Rocket {
    constructor(firedBy, rotation) {
        this.screenHTML = document.getElementById('game');
        this.borderHTML = document.getElementById('border');
        this.rocketHTML;

        this.id = this.newID();
        this.maxLifeSpan = 360;
        this.currentLifeSpan = 0;
        this.speed = 6;
        this.rotation = rotation || 0;
        this.firedBy = firedBy || 'enemy1';
        this.explosionGifIndex = 0;
        this.hasExploded = false;
        this.spriteIterator = 4;
    }
    init() {
        this.generate()
        window.requestAnimationFrame(() => { this.engine() });
    }
    newID() {
        let num = Math.floor(Math.random() * 100000);
        try {
            document.getElementById('rocket-' + num).style.backgroundColor = 'unset';
        }
        catch {
            return num;
        }
        return this.newID();
    }
    generate() {
        let HTML = `<div class='rocket rocket-${this.firedBy}' id='rocket-${this.id}'></div>`
        this.screenHTML.insertAdjacentHTML('beforeend', HTML);
        this.rocketHTML = document.getElementById('rocket-' + this.id);
        let y = this.borderHTML.scrollTop + 300;
        let x = this.borderHTML.scrollLeft + 373;
        this.rocketHTML.style.top = y + 'px';
        this.rocketHTML.style.left = x + 'px';
        this.rocketHTML.style.transform = 'rotate(' + this.rotation + 'deg)';
    }
    engine() {
        this.fly();
        this.checkLifetime();
        window.requestAnimationFrame(() => { this.engine() });
    }
    fly() {
        if (this.hasExploded) {
            return;
        }
        this.topSpeed = (Math.sin((this.rotation + 90) / 180 * Math.PI) * this.speed) * -1;
        this.leftSpeed = (Math.cos((this.rotation + 90) / 180 * Math.PI) * this.speed) * -1;
        let x = this.rocketHTML.style.left;
        let y = this.rocketHTML.style.top;
        x = parseFloat(x);
        y = parseFloat(y);
        x += this.leftSpeed;
        y += this.topSpeed;
        this.rocketHTML.style.top = y + 'px';
        this.rocketHTML.style.left = x + 'px';
    }
    checkLifetime() {
        this.currentLifeSpan++;
        if (this.currentLifeSpan >= this.maxLifeSpan) {
            this.explodeRocket();
            this.hasExploded = true;
        }
    }
    explodeRocket() {

        if (this.explosionGifIndex == 0) {
            this.rocketHTML.classList.remove(`rocket-${this.firedBy}`);
            this.rocketHTML.classList.remove('rocket');
            this.rocketHTML.classList.add('expl');
        }

        switch (this.explosionGifIndex) {
            case (this.spriteIterator * 0):
                this.rocketHTML.classList.add('expl-1');
                break;
            case (this.spriteIterator * 1):
                this.rocketHTML.classList.add('expl-2');
                break;
            case (this.spriteIterator * 2):
                this.rocketHTML.classList.add('expl-3');
                break;
            case (this.spriteIterator * 3):
                this.rocketHTML.classList.add('expl-4');
                break;
            case (this.spriteIterator * 4):
                this.rocketHTML.classList.add('expl-5');
                break;
            case (this.spriteIterator * 5):
                this.rocketHTML.classList.add('expl-6');
                break;
            case (this.spriteIterator * 6):
                this.rocketHTML.classList.add('expl-7');
                break;
            case (this.spriteIterator * 7):
                this.rocketHTML.classList.add('expl-8');
                break;
            case (this.spriteIterator * 8):
                this.rocketHTML.classList.add('expl-9');
                break;
            case (this.spriteIterator * 9):
                this.rocketHTML.classList.add('expl-10');
                break;
            case (this.spriteIterator * 10):
                this.rocketHTML.classList.add('expl-11');
                break;
            case (this.spriteIterator * 11):
                this.rocketHTML.classList.add('expl-12');
                break;
            case (this.spriteIterator * 12):
                this.rocketHTML.classList.add('expl-13');
                break;
            case (this.spriteIterator * 13):
                this.rocketHTML.classList.add('expl-14');
                break;
            case (this.spriteIterator * 14):
                this.rocketHTML.classList.add('expl-15');
                break;
            case (this.spriteIterator * 16):
                    this.rocketHTML.remove();
                break;
        }
        this.explosionGifIndex++;
    }
}

export default Rocket;