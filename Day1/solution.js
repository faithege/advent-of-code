const {readFileSync} = require('fs');

const sumCalories = (caloriesArray) => {
    return caloriesArray.reduce(
        (accumulator, currentValue) => accumulator + currentValue
        )
}

const countCaloriesPerElf = (elfString) => {
    //create an array of numeric calories
    const elfCalories = elfString
                        .split((/\r?\n/))
                        .map(string => Number(string))

    const totalCalories = sumCalories(elfCalories)
    return totalCalories
}

const contents = readFileSync('./input.txt', 'utf-8'); //returns a string
const contentsByElf = contents.split(/\r?\n\n/) //returns an array of strings
const caloriesbyElf = contentsByElf.map(elf => countCaloriesPerElf(elf))

const mostCalories = Math.max(...caloriesbyElf) // did this first - after second solution could just find first item after array sort
const top3Calories = caloriesbyElf.sort((a, b) => b - a).slice(0,3)
const top3CaloriesTotal = sumCalories(top3Calories)

console.log(mostCalories)
console.log(top3Calories)
console.log(top3CaloriesTotal)