import GameTile from "./gametile.mjs";
import { slotDistance, countInversions } from "./helpers.mjs";

export default class GameGrid {

    #grid
    #gridbox
    #tiles
    #floater
    #tilesize
    #startorder
    #movecount

    constructor() {
        this.#setGrid();
        this.#addTiles();
    }

    #setGrid() {
        this.#grid = document.querySelector('#gamegrid');
        this.#gridbox= this.#grid.getBoundingClientRect();
        this.#tilesize = (this.#gridbox.width / 4); 
    }

    #addTiles() {
        this.#tiles = [...Array(15).keys()];
        const ts = this.#tilesize
        for (let i = 0; i < this.#tiles.length; i++) {
            this.#tiles[i] = new GameTile(i, ts);
            this.#tiles[i].label = i + 1;
            this.#tiles[i].homeslot = i;
            this.#tiles[i].toSlot(i);
            this.#tiles[i].tileUI.addEventListener( "tileclick", (e) => {
                e.stopPropagation();
                const tileId = parseInt(e.target.id.match(/\d+/g))
                this.#moveTile(e.detail);
            })
            /* this.#tiles[i].tileUI.addEventListener( "click", (e) => {
                console.log('hey')
                const tileId = parseInt(e.target.id.match(/\d+/g))
                console.log(e.target.id)
                this.#moveTile(tileId)
            }) */
        }

        this.#addFloater();
    }

    #addFloater() {
        const floater = new GameTile(15, this.#tilesize)
        floater.label = " ";
        floater.isFloater = true;
        floater.toSlot(15);
        this.#tiles.push(floater);

        this.#floater = floater;
    }

    #moveTile(movedata) {
        const floatSlot = this.#floater.currslot
        const tileSlot = movedata.currslot

//        const toFloat = slotDistance(tileSlot, floatSlot)

        if ( slotDistance(tileSlot, floatSlot) === 1 ) {
            this.#tiles[movedata.tileid].toSlot(floatSlot)
            this.#floater.toSlot(tileSlot)

            movedata.movecount = ++this.#movecount
            movedata.inversions = this.#getInversions()
            movedata.minmoves = this.#minMoves()

            const event = new CustomEvent("tilemove", { detail: movedata } )
            this.#grid.dispatchEvent(event)
        }
    }

    #slotData(slotid) {
        const row = parseInt(slotid % 4)
        const col = parseInt(slotid / 4)

        const slotdata = {
            id: slotid,
            grid: {
                row: row,
                col: col
            },
            pos: {
                x: `${col * this.#tilesize}px`,
                y: `${row * this.#tilesize}px`
            }
        }

        return slotdata
    }

    #getInversions() {
        const arr = this.#tiles
            .filter( tile => tile.tileUI.id !== "floater")
            .map( tile => tile.currslot )

        return countInversions(arr)
    }

    newGame() {
        this.#startorder = this.#newStartOrder();
        this.#setBoard();
        return this.#gamestart()
    }

    #setBoard() {
        if (!this.#startorder)
            this.#startorder = this.#newStartOrder();

        this.#movecount = 0;
        for (let i = 0; i < this.#tiles.length; i++) {
            this.#tiles[i].toSlot(this.#startorder[i])
        }
    }


    #newStartOrder() {
        const stack = [...Array(16).keys()];
        for (let i = stack.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            // Swap elements stack[i] and stack[j] using destructuring
            [stack[i], stack[j]] = [stack[j], stack[i]];
        }
        return stack;
    }

    get grid() {
        return this.#grid
    }

    #minMoves() {
        return this.#tiles
            .filter( tile => tile.tileUI.id !== "floater")
            .map( tile => tile.distance )
            .reduce( (sum, distance) => sum + distance )
    }

    restart() {
        this.#setBoard();
        return this.#gamestart()
    }

    #gamestart() {
        const inversions = this.#getInversions();
        const minmoves = this.#minMoves();
        const floaterRow = (4 - Math.floor(this.#floater.currslot / 4)) - 1
        const isSolvable = (inversions + floaterRow) % 2 === 0;

        const gamedata = {
            solvable: isSolvable,
            invertions: inversions,
            minmoves: minmoves,
            movecount: this.#movecount
        };

        return gamedata;
    }

    get tileSize() {
        return this.#tilesize;
    }

    tileMoved(ret) {

    }

    started(fn) {   

    }

}