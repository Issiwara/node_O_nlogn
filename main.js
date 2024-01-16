const express = require('express');
const app = express();
const port = 3000;

// Simulate an asynchronous data fetching operation
async function fetchData(size) {
  return new Promise(resolve => {
    setTimeout(() => {
      const data = Array.from({ length: size }, () => Math.floor(Math.random() * 100000));
      resolve(data);
    }, 1000);
  });
}

// Quick Sort algorithm
function quickSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const pivot = arr[arr.length - 1];
  const left = [];
  const right = [];

  for (let i = 0; i < arr.length - 1; i++) {
    arr[i] <= pivot ? left.push(arr[i]) : right.push(arr[i]);
  }

  return [...quickSort(left), pivot, ...quickSort(right)];
}

app.get('/', async (req, res) => {
  const dataSize = 15000;
  const data = await fetchData(dataSize);

  // Create a copy of the data to avoid modifying the original array
  const unsortedData = [...data];
  
  // Sort the data using Quick Sort
  const sortedData = quickSort(unsortedData);

  // Send both unsorted and sorted data as a response
  res.send(`
    <html>
      <head>
        <title>Quick Sort Result</title>
      </head>
      <body style="font-family: 'Courier New', monospace;">
        <h1>Quick Sort Result</h1>
        <p>Sorted Data: ${sortedData.join(', ')}</p>
      </body>
    </html>
  `);
});

app.listen(port, () => {
  console.log(`Quick Sort app listening at http://localhost:${port}`);
});
