const express = require('express');
const { OpenAI } = require('openai');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = 3000;

// Initialize OpenAI with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

app.use(express.json());

app.post('/generate-ideas', async (req, res) => {
  try {
    const { topic, audience, platform } = req.body;

    const prompt = `Generate creative content ideas for the topic "${topic}", targeting the audience of "${audience}", and suitable for the ${platform} platform. Keep the ideas concise and actionable.`;

    const response = await openai.complete({
      engine: 'text-davinci-003',
      prompt: prompt,
      max_tokens: 300,
      temperature: 0.8,
      top_p: 1,
      presence_penalty: 0,
      frequency_penalty: 0,
    });

    const ideas = response.choices[0].text.trim();

    res.json({ ideas });

  } catch (error) {
    console.error('Error generating ideas:', error);
    res.status(500).json({ error: 'An error occurred while generating ideas.' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
