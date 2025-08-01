const express = require('express');
const client = require('prom-client');

const app = express();
const port = 3000;

// Create a Registry to register the metrics
const register = new client.Registry();

// Enable collection of default metrics (CPU, memory, etc.)
client.collectDefaultMetrics({ register });

// Custom metric example: count how many times /hello is called
const helloCounter = new client.Counter({
  name: 'hello_requests_total',
  help: 'Total number of hello requests',
});
register.registerMetric(helloCounter);

// Define route
app.get('/hello', (req, res) => {
  helloCounter.inc(); // Increment custom counter
  res.send('Hello from DevOps Node App!');
});

// Prometheus metrics endpoint
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start the server
app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
  console.log(`Metrics available at http://localhost:${port}/metrics`);
});
