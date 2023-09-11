/* Using tutorial at https://www.youtube.com/watch?v=aOwu5p55PFc */

const {readFileSync} = require('fs');

const lines = readFileSync('./input.txt', 'utf-8')
                .split(/\r?\n/)
                .map((line) => {
                    const [letter, number] = line.split(" ");
                    return {
                      direction: letter,
                      totalMoves: parseInt(number),
                    };
                })

const movesDefinition = {
    R: {
        x: 1,
        y: 0,
      },
      L: {
        x: -1,
        y: 0,
      },
      U: {
        x: 0,
        y: -1,
      },
      D: {
        x: 0,
        y: 1,
      },
    }

class Point {
    constructor(x,y) {
        this.x = x,
        this.y = y
    }

    move(direction) {
        const delta = movesDefinition[direction];
        this.x += delta.x;
        this.y += delta.y;
      }
    
    follow(point) {
        // check distance (manhattan distance)
        const distance = Math.max(
            Math.abs(this.x - point.x),
            Math.abs(this.y - point.y)
          );
        if (distance > 1) {

            const directionX = point.x - this.x;
            // 0 => do nothing
            // 1 or 2 => this.x++;
            // -1 or -2 => this.x--;
            this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX; //always mmoving one point at a time
            const directionY = point.y - this.y;
            this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY;
        }
    }

    
    }

const markVisited = (x,y, visited) => {
    visited.add(`${x}-${y}`);
}


const part1 = () => { // 2 points
    const visited = new Set()
    const head = new Point(0,0)
    const tail = new Point(0,0)
    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
          head.move(line.direction);
          console.log('head', head)
          tail.follow(head);
          console.log('tail', tail)
          markVisited(tail.x, tail.y, visited);
        }
      }
    console.log(visited, visited.size)
    
}
const part2 = () => { // 9 points
    const knots = new Array(10).fill(0).map((_) => new Point(0, 0)); // now have 10 knots to track so use array rather than two vars
    const visited = new Set()
    markVisited(0, 0, visited);

    for (const line of lines) {
        for (let i = 0; i < line.totalMoves; i++) {
          knots[0].move(line.direction);
          // Move the rest of the rope
        for (let knot = 1; knot < knots.length; knot++) {
            const point = knots[knot];
            point.follow(knots[knot - 1]); //follow the knot before
        }
          const tail = knots[knots.length - 1];
          markVisited(tail.x, tail.y, visited);
        }
      }
    console.log(visited, visited.size)
}




part1()
part2()