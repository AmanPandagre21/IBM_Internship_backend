import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";

dotenv.config();

import connectDB from "./database/connect.js";
import postRoutes from "./routes/postRoutes.js";
import dalleRoutes from "./routes/dalleRoutes.js";
import chatbotRoutes from "./routes/chatbotRoutes.js";
 
const app = express();

app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);
app.use('/api/v1/chatbot', chatbotRoutes);


app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CodeX!'
  })
})

const startServer = async () => {
    try {
      connectDB();
      app.listen(process.env.PORT || 8080, () => console.log(`Server started on port ${process.env.PORT}`));
    } catch (error) {
      console.log(error);
    }
  };
  
  startServer();