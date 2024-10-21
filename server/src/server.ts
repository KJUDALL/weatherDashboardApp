import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
// DONE by me. Import path
import path from 'path';
dotenv.config();

// Import the routes
import routes from './routes/index.js';

const app = express();

const PORT = process.env.PORT || 3001;

// Get the directory name in ES module scope. This was causing an error without it.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// DONE: Serve static files of entire client dist folder
app.use(express.static(path.join(__dirname, 'client/dist')));
// DONE: Implement middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// DONE: Implement middleware to connect the routes
app.use(routes);

// Start the server on the port
app.listen(PORT, () => console.log(`Listening on PORT: ${PORT}`));
