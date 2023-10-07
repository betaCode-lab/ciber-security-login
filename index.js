import express from "express";
import cookieParser from "cookie-parser";

// Routes
import userRoutes from './routes/auth/userRoutes.js';
import homeRoutes from './routes/home/homeRoutes.js';

// Database
import dbConnection from "./database/config.js";

// We created an express app
const app = express();
const port = 3000;

// Enable form reading
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Active cookies
app.use(cookieParser());

// Static Files
app.use(express.static('public'));


// Establish database connection
dbConnection();

// Routing
app.get('/', (req, res) => res.redirect('/auth/login'));

app.use(userRoutes);
app.use(homeRoutes);

// Set view engine
app.set('view engine', 'pug');

// Set application views
app.set('views', './views');

// Listen port for execution
app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});