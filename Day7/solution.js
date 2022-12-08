const {readFileSync} = require('fs');
const lines = readFileSync('./example.txt', 'utf-8').split(/\r?\n/)

/* A State machine - never done of these before so followed
https://www.youtube.com/watch?v=ZNLF2DavA6U&t=362s */

// STEP 1 - parse the lines, making a tree with createTree()
// STEP 2 - make the tree easier to read with printTree() (if just log out what is returned from above, the console doesn't show the whole thing)

const createTree = (lines) => {
    const tree = {
        name: "/", // hardcode initial directory
        isDirectory: true,
        children: [],
      }; // node: name, isDirectory, size, children, parent
    
    let currentNode = tree;
    let currentCommand = null;


    for (const line of lines){

        if (line[0] === "$") { // first handle commands
            const match = /^\$ (?<command>\w+)(?: (?<arg>.+))?$/.exec(line); //return an array - see below
            //match an escaped $
            // then 2 named capturing groups to grab the command (always a word) eg cd 
            // and then an arg which could be a character eg / or a file/directory name

            /*
            [
                '$ cd /',
                'cd',
                '/',
                index: 0,
                input: '$ cd /',
                groups: [Object: null prototype] { command: 'cd', arg: '/' }
            ] */

            currentCommand = match.groups.command;

            if (currentCommand === "cd") {
                const target = match.groups.arg;

                // how we navigate the tree
                switch (target) {
                    case "/":
                      currentNode = tree;
                      break;
                    case "..":
                      currentNode = currentNode.parent;
                      break;
                    default:
                      currentNode = currentNode.children.find(
                        (folder) => folder.isDirectory && folder.name === target
                      );
                }
            }
        }  else { // if not a command then handle the file/dirs (which follow an ls)
            if (currentCommand === "ls") { // don't think this if statement is strictly necessary as files and dirs always follow an ls but could be useful later in solution

                const fileMatch = /^(?<size>\d+) (?<name>.+)$/.exec(line);
                console.log(fileMatch)
                if (fileMatch) {
                    console.log(fileMatch)
                    const node = {
                    name: fileMatch.groups.name,
                    size: parseInt(fileMatch.groups.size),
                    isDirectory: false,
                    parent: currentNode,
                    };
                    currentNode.children.push(node);
                }
                const dirMatch = /^dir (?<name>.+)$/.exec(line);
                console.log(dirMatch)
                if (dirMatch) {
                    console.log(dirMatch)
                    const node = {
                    name: dirMatch.groups.name,
                    isDirectory: true,
                    children: [],
                    parent: currentNode,
                    };
                    currentNode.children.push(node);
                }
            }
            else {
                throw new Error("unkown state");
            }
        }
    } 

    return tree
}

const printTree = (node, depth = 0) => {
    // recursive function - tree is starting node
    /* output like
    - / (dir)
        - a (dir)
            - e (dir)
            - i (file, size=584)
            - f (file, size=29116)
            - g (file, size=2557)
            - h.lst (file, size=62596)
        - b.txt (file, size=14848514)
        - c.dat (file, size=8504156)
        - d (dir)
            - j (file, size=4060174)
            - d.log (file, size=8033020)
            - d.ext (file, size=5626152)
            - k (file, size=7214296)
    */

    console.log(
        `${" ".repeat(depth * 2)}- ${node.name} (${ // initial depth is 0 so parent will have no initialising spaces but rest will do 2xdept
            node.isDirectory ? "dir" : `file, size=${node.size}`
        })`
        );
        if (node.isDirectory) {
        for (const child of node.children) {
            printTree(child, depth + 1);
        }
        }

}

const getSize = (node, directoryCallback = () => {}) => { //instead of having a dict here (where i was going to log name and size), we pass in a function that logs the name and size instead
    if (!node.isDirectory) { // break on recursion
        return node.size;
      }
    // otherwise sum of all sub nodes
    const directorySize = node.children
        .map(child => getSize(child, directoryCallback)) // if there are any children dirs these will get logged first
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0) // sum all children and grandchildren
    
    directoryCallback(node.name, directorySize)

    return directorySize //why do we return directory size? children need to return their size to the parents to be able to sum
}



const partOne = () => {
    //for each dir - iterate through and add up sizes, including of any children - another recursive function
    // then find those with totals less than 10,000
    // add all those sizes up
    const thresholdSize = 100000;
    const tree = createTree(lines)
    printTree(tree)

    let totalSmallFolder = 0;

    getSize(tree, (name, size) => {
        console.log(name, size) //give us files and their sizes

        if (size < thresholdSize) {
          totalSmallFolder += size;
        }
      });
    
    console.log(totalSmallFolder);
}

const partTwo = () => {
    const tree = createTree(lines)

    const diskSpace = 70000000
    const requiredDiskSpace = 30000000
    const diskSpaceUsed = getSize(tree); // don't need to pass in callback - default is empty function, we just care about overall size not accumulation of values
    const unusedDiskSpace = diskSpace - diskSpaceUsed
    if (unusedDiskSpace > requiredDiskSpace) {
        throw new Error("There is already enough space");
      }
    const minDirSize = requiredDiskSpace - unusedDiskSpace

    const possibleFolders = []

    getSize(tree, (name, size) => {
        console.log(name, size) //give us files and their sizes

        if (size >= minDirSize) {
          possibleFolders.push({
            name,
            size
          })
        }
      });

      const smallestPossibleFolder = possibleFolders.sort((a, b) => a.size - b.size)[0]

      console.log(smallestPossibleFolder)
}

//console.log(lines)
partOne()
partTwo()