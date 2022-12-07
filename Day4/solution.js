const {readFileSync} = require('fs');
const elfPairs = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

const getAllSections = (elf) => {
    /*example input = '96-99' output = [96,97,98, 99]*/
    const [start, end] = elf.split('-')
    const allSections = []

    for(let i = Number(start); i <= Number(end); i++) {
        allSections.push(i)
      }
    return allSections
}

const hasDuplicatedSections = (firstSections, secondSections) => {
    //part 1 use .every
    //part 2 use .some - probs makes the second condition redundance but will leave for entirety
    if (firstSections.some(section => secondSections.includes(section))){
        return true
    } else if (secondSections.some(section => firstSections.includes(section))) {
        return true
    } else {
        return false
    }
}

const calculateElfSections = (elfPair) => {
    const [elf1,elf2] = elfPair.split(',')

    elf1Sections = getAllSections(elf1)
    elf2Sections = getAllSections(elf2)

    return hasDuplicatedSections(elf1Sections, elf2Sections)
}

const result = elfPairs.map(elfPair => calculateElfSections(elfPair))
                        .filter(outcome => outcome == true)
                        .length

console.log(result)
console.log(hasDuplicatedSections([5,6,7], [8,9]))