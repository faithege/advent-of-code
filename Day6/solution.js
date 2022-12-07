const {readFileSync} = require('fs');
const stream = readFileSync('./input.txt', 'utf-8').split('')

const packetSize = 14 //4 in problem 1

for (let i = 0; i < stream.length; i++) {
    const packet = stream.slice(i,i+packetSize)
    if (packet.length == new Set(packet).size){
        result = i + packetSize
        console.log(result)
        return
    }
    else {
        continue
    }
  }

console.log(result)