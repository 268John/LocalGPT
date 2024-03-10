// server.js
const express = require('express');
const app = express();
const { loadModel, createCompletion } = require('gpt4all');

app.use(express.json());

let model;

// Load the GPT4All model
async function loadGPTModel() {
  model = await loadModel('mistral-7b-openorca.Q4_0.gguf', { verbose: true });
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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});