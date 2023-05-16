import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

router.route('/').post(async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `${prompt}`,
          temperature: 0, // Higher values means the model will take more risks.
          max_tokens: 3000, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        });

        res.status(200).send({
          bot: response.data.choices[0].text
        });
    
      } catch (error) {
        console.error(error)
        res.status(500).send(error || 'Something went wrong');
      }
});

export default router;