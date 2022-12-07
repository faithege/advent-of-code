const {readFileSync} = require('fs');
const contents = readFileSync('./input.txt', 'utf-8').split(/\r?\n/)

/* part 1 solution 
const scores = {
    'X': {
        'choice': 1,
        'outcome': {
            'A': 3,
            'B': 0,
            'C': 6,
        }
    },
    'Y': {
        'choice': 2,
        'outcome': {
            'A': 6,
            'B': 3,
            'C': 0,
        }
    },
    'Z': {
        'choice': 3,
        'outcome': {
            'A': 0,
            'B': 6,
            'C': 3,
        }
    }
}

const calculateChoiceScore = (choice) => {
    const letter = choice.toUpperCase()
    return scores[letter].choice
}

const calculateOutcomeScore = (choice, opponentChoice) => {
    const letter = choice.toUpperCase()
    const opponentLetter = opponentChoice.toUpperCase()
    return scores[letter].outcome[opponentLetter]
}
*/

// part 2 solution

const choiceScores = {
    'rock': 1,
    'paper': 2,
    'scissors': 3
}

const strategy = {
    'X': { // lose
        'choice': {
            'A': 'scissors',
            'B': 'rock',
            'C': 'paper',
        },
        'outcome': 0
    },
    'Y': { // draw
        'choice': {
            'A': 'rock',
            'B': 'paper',
            'C': 'scissors',
        },
        'outcome': 3
    },
    'Z': { // win
        'choice': {
            'A': 'paper',
            'B': 'scissors',
            'C': 'rock',
        },
        'outcome': 6
    }
}

const calculateChoiceScore = (result, opponentChoice) => {
    const letter = result.toUpperCase()
    const opponentLetter = opponentChoice.toUpperCase()

    const ourChoice = strategy[letter].choice[opponentLetter]
    return choiceScores[ourChoice]
}

const calculateOutcomeScore = (result) => {
    const letter = result.toUpperCase()
    return strategy[result].outcome
}

const calculateRoundScore = (round) => {
    const choices = round.split(" ")

    const choiceScore = calculateChoiceScore(choices[1], choices[0])
    const outcomeScore = calculateOutcomeScore(choices[1])
    return choiceScore + outcomeScore
}

//console.log(calculateRoundScore('C Z'))

const roundScores = contents.map(round => calculateRoundScore(round))
const total = roundScores.reduce(
    (accumulator, currentValue) => accumulator + currentValue
    )

console.log(total)