
const slotData = (slotid, size) => {
    const row = parseInt(slotid % 4)
    const col = parseInt(slotid / 4)

    const slotdata = {
        id: slotid,
        grid: {
            row: row,
            col: col
        },
        pos: {
            x: `${col * size}px`,
            y: `${row * size}px`
        }
    }

    return slotdata
}

const slotDistance = (s1, s2) => {
    const slotFrom = { 
        x: s1 % 4, 
        y: parseInt(s1 / 4)
    };

    const slotTo = { 
        x: s2 % 4, 
        y: parseInt(s2 / 4)
    };

    return Math.abs(slotFrom.x - slotTo.x) + Math.abs(slotFrom.y - slotTo.y);
} 

export { slotData, slotDistance }