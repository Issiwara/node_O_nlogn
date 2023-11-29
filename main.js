const express = require('express');
const app = express();
const port = 3000;

// Simulate an asynchronous data fetching operation
async function fetchData(size) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Array.from({ length: size }, () => Math.floor(Math.random() * 1000));
      resolve(data);
    }, 1000);
  });
}

// Calculate the sum of an array of numbers
function calculateSum(arr) {
  return arr.reduce((acc, num) => acc + num, 0);
}

app.get('/', async (req, res) => {
  const dataSize = 100000;
  const data = await fetchData(dataSize);

  // Calculate the sum of the generated data
  const sum = calculateSum(data);

  // Send the sum as a response
  res.send(`Sum of 100,000 random numbers: ${sum}`);
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
