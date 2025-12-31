const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

// SIGN UP
app.post("/signup", async (req, res) => {
    const { username, password, firstname, middlename, lastname, email, contact } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users 
        (username, password, firstname, middlename, lastname, email, contact) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [username, hashedPassword, firstname, middlename, lastname, email, contact],
        (err, result) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: "Username already exists" });
            }
            res.json({ message: "Account created successfully!" });
        }
    );
});

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const sql = "SELECT * FROM users WHERE username = ?";

    db.query(sql, [username], async (err, rows) => {
        if (err) return res.status(500).send(err);

        if (rows.length === 0) {
            return res.status(401).json({ message: "Invalid username" });
        }

        const user = rows[0];

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: "Incorrect password" });
        }

        res.json({
            message: "Login successful!",
            userId: user.id
        });
    });
});

app.listen(8080, () => {
    console.log("Server running on port 8080");
});
