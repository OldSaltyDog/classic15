import GameGrid from "./gamegrid.mjs";

const gamegrid = new GameGrid();
//document.querySelector('#tilesize-op').textContent = gamegrid.tileSize;

const btnNew = document.querySelector('#newgame');

const solvableOp = document.querySelector('#solvable-op')
const inversalsOp = document.querySelector('#inversals-op')
const movecountOp = document.querySelector('#movecount-op')
const minmovesOp = document.querySelector('#minmoves-op')

btnNew.addEventListener('click', (e) => {

    e.preventDefault();
    const gamedata = gamegrid.newGame();
    solvableOp.textContent = (gamedata.solvable === true) ? "True" : "False"
    inversalsOp.textContent = gamedata.invertions
    movecountOp.textContent = gamedata.movecount
    minmovesOp.textContent = gamedata.minmoves
    
})

gamegrid.grid.addEventListener( "tilemove", (ret) => {
    const gamedata = ret.detail
    inversalsOp.textContent = gamedata.inversions
    movecountOp.textContent = gamedata.movecount
    minmovesOp.textContent = gamedata.minmoves
})

const btnRestart = document.querySelector('#restart');
btnRestart.addEventListener( "click", (e) => {
    e.preventDefault();
    const gamedata = gamegrid.restart();
    inversalsOp.textContent = gamedata.inversions
    movecountOp.textContent = gamedata.movecount
    minmovesOp.textContent = gamedata.minmoves
})