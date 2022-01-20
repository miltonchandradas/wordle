const { getNextWord} = require("./utils");

let excludeLetters = [];
let includeLetters = [];
let exactMatches = [];
let notExactMatches = [];

console.log(getNextWord(excludeLetters, includeLetters, exactMatches, notExactMatches));
