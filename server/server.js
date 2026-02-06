const dotenv = require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const { Pool } = require("pg");

const app = express();
app.use(cors({
    origin: ["https://lnmkicc.netlify.app/", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));
app.use(express.json());

// 1. Connection Config - Fixed keys for 'user' and 'password'
const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;
const pool = new Pool({
    host: PGHOST,
    database: PGDATABASE,
    user: PGUSER,         
    password: PGPASSWORD, 
    port: 5432,
    ssl: { require: true }
});

// 2. SIGN UP - Updated to 'acc_info' table
app.post("/signup", async (req, res) => {
    const { username, password, firstname, middlename, lastname, email, contact } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Target 'acc_info' and use $ style placeholders
        const sql = `INSERT INTO acc_info 
            (username, password, firstname, middlename, lastname, email, contact) 
            VALUES ($1, $2, $3, $4, $5, $6, $7)`;

        await pool.query(sql, [username, hashedPassword, firstname, middlename, lastname, email, contact]);
        
        res.json({ message: "Account created successfully!" });

    } catch (error) {
        console.error("Signup Error:", error.message);
        res.status(400).json({ message: "Registration failed. Username or email may already exist." });
    }
});

// 3. LOGIN - Updated to 'acc_info' table
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find user in database
        const result = await pool.query("SELECT * FROM acc_info WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const user = result.rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json({
            message: "Login successful!",
            userId: user.id
        });

    } catch (err) {
        console.error("Login Error:", err.message);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});