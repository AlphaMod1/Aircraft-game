class Player {
    constructor() {
        this.imgHTML = document.getElementById('player');

        this.img = '../img/aircrafts/player.png';
    }
    init(){
        this.imgHTML.style.backgroundImage =`url(${this.img})`;
    }
}

export default Player;