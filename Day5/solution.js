const {readFileSync} = require('fs');


const createBoxArrayFromBoxString = (boxString) => {
    // input example - '[M] [Z] [H] [P] [N] [W] [P] [L] [C]'
    // output example - ['M', 'Z', 'H', 'P', 'N', 'W', 'P', 'L', 'C']


    const boxArray = boxString
                    .match(/.{1,4}/g) //split by column
                    .map(box => box.trim()[1]) //remove trailing spaces and grab letter only
    return boxArray
}

const createColumnsFromRows = (rows) => {
    const columns = []

    rows.forEach((row) => {
        for (let i = 0; i < row.length; i++) {
            if(row[i]){

                if (!columns[i]) {
                    columns[i] = []
                }

                columns[i].push(row[i])
            }
            else {
                continue
            }
          }
    })

    return columns
}

/* First prepare the starting array */
const rows = readFileSync('./startingConfiguration.txt', 'utf-8').split(/\r?\n/)
                            .reverse()
                            .map(boxString => createBoxArrayFromBoxString(boxString))

const columns = createColumnsFromRows(rows)
console.log(columns)

/* Then follow the instructions */

//solution 1 - moving boxes one at a time
const moveBoxes9000 = (numberOfBoxes, startingCol, endingCol) => {
    for(let i = 0; i < numberOfBoxes; i++) {
        const boxToMove = columns[startingCol].pop()
        columns[endingCol].push(boxToMove)
        //console.log(columns)
      }
}

//solution 2 - moving boxes at once
const moveBoxes9001 = (numberOfBoxes, startingCol, endingCol) => {
    const boxesToMove = columns[startingCol].splice(-numberOfBoxes, numberOfBoxes)
    columns[endingCol].push(...boxesToMove)
    //console.log(columns)
}

const instructions = readFileSync('./instructions.txt', 'utf-8').split(/\r?\n/)

instructions.forEach((instruction) => {
    let [numberOfBoxes, startingCol, endingCol] = instruction.match(/(\d+)/g)

    //type as ints and -1 for 0-ordered array numbering
    numberOfBoxes = Number(numberOfBoxes)
    startingCol = Number(startingCol) - 1
    endingCol = Number(endingCol) - 1

    moveBoxes9001(numberOfBoxes, startingCol, endingCol)
})

//console.log(columns)

const result = columns.map(columns => columns.pop()).join('').toString()
console.log(result)




