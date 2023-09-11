/* Using tutorial at https://www.youtube.com/watch?v=tJFpBE5Afs0 
NOTE 1 - use of set means that can traverse array from different angles but duplicates always discounted for.
* This is robust than my idea of trying to think of every conditional case that might result in duplicates*/

const {readFileSync} = require('fs');

const lines = readFileSync('./input.txt', 'utf-8')
                .split(/\r?\n/)
                .map((line) => [...line].map(Number)); //quickly get array of arrays - for each line turn string into array of chars, then convert each char into a Number

console.log(lines)

const setVisible = (y, x, visible) => {
    // pass in visible set so not sharing variables between functions
    visible.add(`${y}-${x}`);
  }

const checkLine = (y, x, dy, dx, map, visible) => {
    setVisible(y, x, visible); // first item in a line will always be visible 
   // will create a generic function that can check a line - then will do for each direction of the forest
   // dont need to do last item, just checkLines in 4 directions avoiding need to split lines and look both ways
    

    let maximum = map[y][x];
    // loop
    while (true) {
        const numberofRows = map.length
        const numberOfColumns = map[y].length

        y += dy; // head to next item, and iterate through according to which direction traversing
        x += dx;
        if (y < 0 || y >= numberofRows || x < 0 || x >= numberOfColumns) {
            break; // stop iterating once reach end of line
        }
        if (map[y][x] > maximum) { // if a tree is taller than the outermost tree before it, it will be visible
            maximum = map[y][x]; // it also becomes the next benchmark for all subsequent trees in that line
            setVisible(y, x, visible);
        }
    }

    /*e.g. for line 2 of example
    30373
    25512
    65332
    33549
    35390

    y (row) =1, x (column, we start at 0)=0, dy=0, dx=1 (we want to add 1 to each element to move along the row, without changing y), map=lines, visible = visible set
    to go left to right across forest dy=0, dx=1
    right to left  dy=0, dx=-1
    top down dy=1, dx=0
    bottom up dy=-1, dx=0
    diagonally down would be dy = 1, dx=1
    */
}

const checkLine2 = (y, x, dy, dx, map) => {
    let visible = 0;
    let maximum = map[y][x]; // we now need to do the calculation for every tree so wherever we are initially will be the maximum
    while (true) {
        const numberofRows = map.length
        const numberOfColumns = map[y].length

        y += dy; // head to next item, and iterate through according to which direction traversing
        x += dx;
        if (y < 0 || y >= numberofRows || x < 0 || x >= numberOfColumns) {
            break; // stop iterating once reach end of line
        }
        visible++ //as we are not at the edge (see above condition) we can have a view of 1
        if (map[y][x] >= maximum) { // as go down the line (from the tree in question, count how far you go until you reach a taller or equivalent tree)
            break;
        }
    }
    return visible
}

const part1 = () => {
    const visible = new Set(); // This set will contain all the visible coordinates
    //checkLine(1,0,0,1,lines, visible) //checking a row at a time in one direction
    //console.log(visible)

    // check all columns
    for (let i = 0; i < lines[0].length; i++) {
        checkLine(0, i, 1, 0, lines, visible); //top down
        checkLine(lines.length - 1, i, -1, 0, lines, visible); // down up
    }
    // all rows
    for (let i = 0; i < lines.length; i++) {
        checkLine(i, 0, 0, 1, lines, visible);
        checkLine(i, lines[0].length - 1, 0, -1, lines, visible);
    }

    console.log(visible)
    console.log(visible.size)
}
const part2 = () => {
    let max = 0;
    for (let y = 0; y < lines.length; y++) {
        for (let x = 0; x < lines[y].length; x++) { //iterate through all combinations of x and y
          const score =
            checkLine2(y, x, -1, 0, lines) *
            checkLine2(y, x, 1, 0, lines) *
            checkLine2(y, x, 0, 1, lines) *
            checkLine2(y, x, 0, -1, lines);
          if (score > max) max = score;
        }   
    }
    console.log(max)
}   

part1()
part2()