import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

import admin from "firebase-admin";
import fs from "fs";


admin.initializeApp({
    credential: admin.credential.cert(
        // @ts-ignore
        JSON.parse(fs.readFileSync("./src/Testprojekte/2-Messenger/serviceAccountKey.json"))
    ),
});


const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:admin1234@mongodb.0yop5p5.mongodb.net/TestDB?retryWrites=true&w=majority";

const UserSchema = new mongoose.Schema({
    nutzername: { type: String, required: true, unique: true },
    vorname: { type: String },
    nachname: { type: String },
    passwort: { type: String, required: true },
    profilbildSource: { type: String },
});

const User = mongoose.model("User", UserSchema);

async function start() {
    console.log("Verbinde zu MongoDB...");
    await mongoose.connect(uri);
    console.log("MongoDB verbunden!");

    app.get("/", (_req, res) => res.send("Server läuft"));

    app.get("/api/users", async (_req, res) => {
        const data = await User.find({});
        res.json(data);
    });

    // Registrierung
    app.post("/api/register/user", async (req, res) => {
        const { nutzername, vorname, nachname, passwort, profilbildSource } = req.body;

        try {
            const exist = await User.findOne({ nutzername });
            if (exist) return res.status(400).json({ message: "exists" });
            const hashedPassword = await bcrypt.hash(passwort, 10);
            const newUser = new User({ nutzername, vorname, nachname, passwort: hashedPassword, profilbildSource });
            await newUser.save();
            res.json(newUser);
        } catch (err) {
            console.error("Fehler bei Registrierung:", err);
            res.status(500).json({ message: "Serverfehler" });
        }
    });

    // Login
    app.post("/api/login/user", async (req, res) => {
        const { nutzername, passwort } = req.body;

        try {
            const user = await User.findOne({ nutzername });
            if (user && await bcrypt.compare(passwort, user.passwort)) {
                const firebaseToken = await admin.auth().createCustomToken(user._id.toString());
                return res.json({ firebaseToken });
            } else {
                res.status(400).json({ message: "400" });
            }
        } catch (err) {
            console.error("Fehler beim Login:", err);
            res.status(500).json({ message: "Serverfehler beim Login" });
        }
    });

    //Post neues Profilbild
    app.post("/api/NewProfileSource", async (req, res) => {
        const { username, filename } = req.body;
        const filePath = "/Testprojekte/2-Messenger/uploads/" + filename;

        if (!username || !filename) {
            return res.status(400).json({ message: "Username oder Dateiname fehlt" });
        }

        try {
            const user = await User.findOne({ nutzername: username });
            if (!user) return res.status(404).json({ message: "User nicht gefunden" });

            user.profilbildSource = filePath;
            await user.save();

            res.json({ message: "Profilbild erfolgreich aktualisiert", profilbildSource: filePath });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Serverfehler" });
        }
    });


    //Get Usernames
    app.get("/api/getUsers", async (_req, res) => {
        try {
            const users = await User.find({}, "nutzername");
            const usernames = users.map(u => u.nutzername);
            res.json(usernames);
        } catch (error) {
            console.error("Error fetching users:", error);
            res.status(500).json({ error: "Server error" });
        }
    });

    //Get profilbildSource
    app.get("/api/profilbildSource/:username", async (req, res) => {
        const { username } = req.params; // Username aus der URL

        try {
            const user = await User.findOne({ nutzername: username });
            if (!user) return res.status(404).json({ message: "User nicht gefunden" });

            res.json({ profilbildSource: user.profilbildSource });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Serverfehler" });
        }
    });
    app.listen(3001, () => console.log("Server läuft auf http://localhost:3001"));
}

start().catch(err => console.error("Fehler beim Start:", err));
