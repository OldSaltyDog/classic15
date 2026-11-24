import { slotDistance } from "./helpers.mjs"
export default class GameTile {

    #tile
    #id
    #tileLabel
    #startslot
    #currslot
    #homeslot
    #tilesize

    constructor(tileid, tilesize) {

        this.#init(tileid, tilesize);
        this.#addWrap();
    }

    #init(tileid, tilesize) { 
        this.#id = tileid;
        this.#tilesize = tilesize
    }

    #addWrap() {
        this.#tile = document.createElement("span");
        this.#tile.id = `tile_${this.#id}`;
        this.#tile.classList.add("gametile");
        this.#tile.textContent = `${this.#id + 1}`;
        document.getElementById("gamegrid").appendChild(this.#tile);

        this.#tile.addEventListener( "click", (e) => {
            
            e.stopPropagation();

            const ret = {
                tileid: this.#id,
                homeslot: this.#homeslot,
                currslot: this.#currslot,
                distance:this.distance
            }

            this.#clicked(ret);
        })
    }

    #clicked(ret) {
        
        const event = new CustomEvent("tileclick", { detail: ret } )
        this.#tile.dispatchEvent(event)
    }

    get id() {
        return this.#id;
    }

    set label(val) {
        this.#tile.textContent = val;
    }

    set isFloater(val = true) {
        this.#tile.id = "floater"
    }

    get homeslot() {
        return this.#homeslot;
    }

    set homeslot(val) {
        this.#homeslot = val;
    }

    get currslot() {
        return this.#currslot;
    }

    set startslot(slot) {
        this.#startslot = slot;
        this.toSlot(slot)
    }

    get distance() {
        return slotDistance(this.#currslot, this.#homeslot);
    }

    get isPlaced() {
        return this.#currslot === this.#homeslot;
    }

    get tileUI() {
        return this.#tile
    }

    toSlot(slot) {
        this.#currslot = slot;
        const pos = {
            x: parseInt(slot / 4) * this.#tilesize,
            y: parseInt(slot % 4) * this.#tilesize
        }
        this.#tile.style.top = `${pos.x}px`;
        this.#tile.style.left = `${pos.y}px`;
//        console.log(this.#tilesize)
    }
}