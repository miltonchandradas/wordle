const words = require("./data.json");
const solutions = require("./solution.json");

const getRandomWord = () => {
   return words[Math.floor(Math.random() * words.length)];
};

const getSolution = (date) => {

   let startDate = new Date(2021, 5, 19).setHours(0, 0, 0, 0);
   let today = new Date();

   if (date)
      today = new Date(...date).setHours(0, 0, 0, 0);

   return solutions[Math.round((today - startDate) / 86400000) % solutions.length];
};

const getSolutions = () => {
   return solutions;
}

const getNextWord = (
   excludeLetters,
   includeLetters,
   exactMatches,
   notExactMatches
) => {
   const filterExactMatchWords = (accumulator, word) => {
      if (
         exactMatches.every(
            (exactMatch) => word[exactMatch.position] === exactMatch.value
         )
      )
         accumulator.push(word);
      return accumulator;
   };

   const filterNotExactMatchWords = (accumulator, word) => {
      if (
         notExactMatches.every(
            (notExactMatch) =>
               word[notExactMatch.position] !== notExactMatch.value
         )
      )
         accumulator.push(word);
      return accumulator;
   };

   const filterExcludedLetters = (accumulator, word) => {
      if (
         excludeLetters.every((excludeLetter) => !word.includes(excludeLetter))
      )
         accumulator.push(word);
      return accumulator;
   };

   const filterIncludedLetters = (accumulator, word) => {
      if (includeLetters.every((includeLetter) => word.includes(includeLetter)))
         accumulator.push(word);
      return accumulator;
   };

   return words
      .reduce(
         (accumulator, word) => filterExactMatchWords(accumulator, word),
         []
      )
      .reduce(
         (accumulator, word) => filterNotExactMatchWords(accumulator, word),
         []
      )
      .reduce(
         (accumulator, word) => filterExcludedLetters(accumulator, word),
         []
      )
      .reduce(
         (accumulator, word) => filterIncludedLetters(accumulator, word),
         []
      )[0];
};

module.exports = {
   getRandomWord,
   getNextWord,
   getSolution,
   getSolutions,
};
