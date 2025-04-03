// const userRoutes = require("./routes/userRoutes.js");
import records from "./routes/record.js";
import  express from "express";
import  cors from "cors";
import  axios from "axios"; // Import axios for HTTP requests
import dotenv from "dotenv";
dotenv.config();

const app = express();


// Get allowed origins from environment variables
const allowedOrigins = process.env.ALLOWED_ORIGINS.split(",");

// CORS configuration with dynamic origin checking

app.use(cors());
app.use(express.json());

// In-memory storage configuration
const keyLogCache = new Map();
const MAX_ENTRIES = 1000;

// Key logging endpoint
app.post('/api/keylog', (req, res) => {
  try {
    const { key, timestamp } = req.body;

    if (!key || !timestamp) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    if (keyLogCache.size >= MAX_ENTRIES) {
      const firstKey = keyLogCache.keys().next().value;
      keyLogCache.delete(firstKey);
    }

    keyLogCache.set(timestamp, {
      key,
      timestamp,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    res.status(201).json({ status: 'logged' });
  } catch (error) {
    console.error('Keylog error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve logged keys (for debugging)
app.get('/api/keylog', (req, res) => {
  res.json(Array.from(keyLogCache.values()));
});

// New API Route: Fetch Random Words
app.get('/api/words/:count', async (req, res) => {
  const { count } = req.params;
  const numberOfWords = parseInt(count, 10);

  if (isNaN(numberOfWords) || numberOfWords <= 0) {
    return res.status(400).json({ error: "Invalid word count" });
  }

  try {
    const response = await axios.get(`https://random-word-api.herokuapp.com/word?number=${numberOfWords}`);
    res.json({ words: response.data }); // The API returns an array of words
  } catch (error) {
    console.error("Error fetching words:", error);
    res.status(500).json({ error: "Failed to fetch words" });
  }
});

app.use("/record",records);


// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});