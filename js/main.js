import Game from "./game.js";

document.querySelector('.btn-start').addEventListener('click', () => {
    let menuHTML = document.querySelector('.menu');
    let gameHTML = document.querySelector('.overlay');

    menuHTML.style.display = 'none';
    gameHTML.style.display = 'block';
    let game = new Game();
});

document.querySelector('.btn-help').addEventListener('click', () => {
    document.querySelector('.help-modal').style.display = 'inline-block';
});

document.querySelector('.btn-close').addEventListener('click', () => {
    document.querySelector('.help-modal').style.display = 'none';
});