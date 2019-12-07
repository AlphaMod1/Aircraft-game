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
    engine(){
        this.fly();
        this.checkLifetime();
        window.requestAnimationFrame(() => { this.engine() });
    }
    fly(){
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
    checkLifetime(){
        this.currentLifeSpan++;
        if(this.currentLifeSpan >= this.maxLifeSpan){
            this.removeRocket();
        }
    }
    removeRocket(){
        this.rocketHTML.remove(); //exposion gif tba
    }
}

export default Rocket;