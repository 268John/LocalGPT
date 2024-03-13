// server.js
const express = require('express');
const app = express();
const { loadModel, createCompletion } = require('gpt4all');

app.use(express.json());

let model;

// Load the GPT4All model
async function loadGPTModel() {
  model = await loadModel('em_german_mistral_v01.Q4_0.gguf', { verbose: true });
}

// Initialize the GPT model
loadGPTModel();

// Endpoint for GPT completion
app.post('/complete', async (req, res) => {
  try {
    const messages = req.body.messages;
    const response = await createCompletion(model, messages);
    res.json({ completion: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const port = process.env.PORT || 3000;
// Root path handler
app.get('/', (req, res) => {
    res.send('Welcome to the GPT server!');
    app.use(express.static('./public'))
  });
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
 

  
  
