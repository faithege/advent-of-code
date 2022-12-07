const {readFileSync} = require('fs');

const divideTwoCompartments = (allItems) => {
    const midway = allItems.length/2
    const compartment1 = allItems.slice(0,midway)
    const compartment2 = allItems.replace(compartment1,"")
    return [compartment1, compartment2]
}

const findSpecialItem = (allItems) => {
    const [compartment1, compartment2] = divideTwoCompartments(allItems)
    let compartment1Array = [...compartment1]

    const specialItem = compartment1Array.find(char => {
        return compartment2.includes(char)
    })

    return specialItem
}

const findScore = (char) => {
    const priorities = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ' // could I make use of ASCII code??
    return priorities.indexOf(char) + 1
}

// Problem 1
const elves = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)
const specialItems = elves.map(rucksack => {
    const item = findSpecialItem(rucksack)
    return findScore(item)
})

const totalItems = specialItems.reduce(
    (accumulator, currentValue) => accumulator + currentValue
    )

console.log('answer1: ', totalItems)

//Problem 2
const createGroups = (array, groupSize) => {
    const groups = []
    while (array.length) {
        groups.push(
          array.splice(0, groupSize)
        )
      }
    return groups
}

const findBadge = (threeElves) => {
    let elf1Array = [...threeElves[0]]

    const badge= elf1Array.find(char => {
        return threeElves[1].includes(char) && threeElves[2].includes(char)
    })

    return badge
}

const groups = createGroups(elves, 3)

const badges = groups.map(group => {
    const badge = findBadge(group)
    return findScore(badge)
})

const totalBadges = badges.reduce(
    (accumulator, currentValue) => accumulator + currentValue
    )

console.log('answer2: ', totalBadges)


