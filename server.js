const { getNextWord, getSolution, getSolutions } = require("./utils");
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
   let excludeLetters = req.query.exclude ? req.query.exclude.split(",") : [];
   let includePattern = req.query.include ? req.query.include.split(",") : [];
   let includeLetters = [];
   let exactMatches = [];
   let notExactMatches = [];

   includePattern.forEach((pattern) => {
      let matches = pattern.split("-");

      if (matches[0] && matches[1] && matches[2]) {
         includeLetters.push(matches[0]);
         notExactMatches.push({
            value: matches[0],
            position: matches[1],
         });
      } else if (matches[0] && matches[1]) {
         includeLetters.push(matches[0]);
         exactMatches.push({
            value: matches[0],
            position: matches[1],
         });
      }
   });

   let nextWord = getNextWord(
      excludeLetters,
      includeLetters,
      exactMatches,
      notExactMatches
   );
   res.status(201).json({ nextWord });
});


app.get("/solve", (req, res) => {

   let date = req.query.date ? req.query.date.split("-") : [];

   let solution = getSolution(date);
   res.status(201).json({ solution });
});

app.get("/solutions", (req, res) => {

   res.status(201).json({ solutions: getSolutions() });
});

app.listen(PORT, () => {
   console.log(`Listening on port ${PORT}`);
});
