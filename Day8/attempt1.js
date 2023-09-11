const {readFileSync} = require('fs');

/*find all trees which are visible
    - able to evaluate row and column at same time? know what index is so can create column from index
    - then dont double count
    - add in condition to remove those on edge of arrays
    -count trees on periphery then include in total but discount from looping
    // check against another solution when done >> much shorter than mine!!!
    //refactor my check of hoz and vert>> 
*/

const isVisible = (tree, rowIndex, rowOfTrees) => {
    //will return array - where element will be true if visible, false if not
    colIndex +=1

    // if on edge than visible
    if (rowIndex === 0 || rowIndex === treesInRow - 1 ){
        return true
    }

    // check horizontally if visible
    const leftSide = rowOfTrees.slice(0,rowIndex)
    const rightSide = rowOfTrees.slice(rowIndex+1, rowOfTrees.length)
    if (leftSide.every(otherTree => parseInt(otherTree) < parseInt(tree)) 
        || 
        rightSide.every(otherTree => parseInt(otherTree) < parseInt(tree))) {
            return true
    }
     console.log('not')
     
    //check vertically is visible
    const colOfTrees = forest.map(row => row[rowIndex])

    //need the index of the col??????? where the tree is in the colimn or am i going mad ????? START HERE - need to think about this, don't think working as expected.

    const topSide = colOfTrees.slice(0,colIndex)
    const bottomSide = colOfTrees.slice(colIndex+1, colOfTrees.length)
    console.log(topSide, bottomSide)
    // if (leftSide.every(otherTree => parseInt(otherTree) < parseInt(tree)) 
    //     || 
    //     rightSide.every(otherTree => parseInt(otherTree) < parseInt(tree))) {
    //         return true
    // }
    //  console.log('not')
    
    
    return false
}

const assessRowOfTrees = (rowOfTrees, indexRow ) => {
    if(indexRow === 0 || indexRow === numberOfRows - 1){
        return treesInRow //deal with all trees on top and bottom being visible
    }
    return rowOfTrees.map((tree, index, array) => isVisible(tree, index, array))

}

const forest = readFileSync('./input.txt', 'utf-8')
                .split(/\r?\n/)
                .map(string => string.split('')); //create array or arrays

const numberOfRows = forest.length
const treesInRow = forest[0].length

// map through each row of tree
let colIndex = -1
const test = assessRowOfTrees([ '3', '0', '3', '7', '3' ], 1)
console.log(test)