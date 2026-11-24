import GameGrid from "./gamegrid.mjs";

const gamegrid = new GameGrid();
document.querySelector('#tilesize-op').textContent = gamegrid.tileSize;

const btnNew = document.querySelector('#newgame');
btnNew.addEventListener('click', (e) => {
    e.preventDefault();
    const gamedata = gamegrid.newGame();
    document.querySelector('#solvable-op').textContent = (gamedata.solvable === true) ? "True" : "False"
    document.querySelector('#inversals').textContent = gamedata.invertions
    document.querySelector('#floatrow').textContent = gamedata.floaterRow
    document.querySelector('#minmoves').textContent = gamedata.minmoves
    
})

gamegrid.grid.addEventListener( "tilemove", (ret) => {
    const deets = ret.detail
    document.querySelector('#tileid-op').textContent = deets.tileid;
    document.querySelector('#tofloat-op').textContent = deets.tofloat;
    document.querySelector('#currslot-op').textContent = deets.currslot;
    document.querySelector('#homeslot-op').textContent = deets.homeslot;
    document.querySelector('#distance-op').textContent = deets.distance;
})

const btnRestart = document.querySelector('#restart');
