require("dotenv").config(); // Umgebungsvariablen laden
const express = require("express");
const cors = require("cors");
const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Middleware
app.use(express.json());
app.use(cors());

// Datenbankverbindung
async function connectDB() {
    const client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log("✅ Mit MongoDB verbunden!");
    return client.db("burger_lab");
}
const dbPromise = connectDB();

// **Registrierungs-Route**
app.post("/register", async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    try {
        const db = await dbPromise;
        const usersCollection = db.collection("users");

        // Prüfen, ob der Benutzer existiert
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Benutzer existiert bereits!" });
        }

        // Passwort hashen
        const hashedPassword = await bcrypt.hash(password, 10);

        // Neuen Benutzer in MongoDB speichern
        await usersCollection.insertOne({
            username,
            email,
            password: hashedPassword,
            order_history: [],
            created_at: new Date()
        });

        res.json({ message: "Registrierung erfolgreich!" });
    } catch (error) {
        console.error("❌ Fehler beim Speichern:", error);
        res.status(500).json({ message: "Serverfehler" });
    }
});

// **Login-Route**
app.post("/anmelden", async (req, res) => {
    const { anmeldeUserName, anmeldePassword } = req.body;
    if (!anmeldeUserName || !anmeldePassword) {
        return res.status(400).json({ message: "Alle Felder sind erforderlich!" });
    }

    try {
        const db = await dbPromise;
        const usersCollection = db.collection("users");

        // Nutzer in der Datenbank suchen
        let user = await usersCollection.findOne({ username: anmeldeUserName });
        if (!user) {
            return res.status(400).json({ message: "Benutzer nicht gefunden!" });
        }

        // Passwort überprüfen
        const passwordMatch = await bcrypt.compare(anmeldePassword, user.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "Falsches Passwort!" });
        }

        res.json({ message: "Login erfolgreich!", username: user.username });
    } catch (error) {
        console.error("❌ Fehler beim Login:", error);
        res.status(500).json({ message: "Serverfehler" });
    }
});

// **Starte den Server**
app.listen(PORT, () => {
    console.log(`🚀 Server läuft auf http://localhost:${PORT}`);
});
