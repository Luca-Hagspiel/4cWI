import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:admin1234@mongodb.0yop5p5.mongodb.net/TestDB?retryWrites=true&w=majority";

const UserSchema = new mongoose.Schema({
    Nutzername: { type: String, required: true, unique: true },
    vorname: { type: String },
    nachname: { type: String },
    passwort: { type: String, required: true }
});

UserSchema.index({ Nutzername: 1 }, { unique: true });

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
        const { Nutzername, vorname, nachname, passwort } = req.body;

        try {
            const exist = await User.findOne({ Nutzername });
            if (exist) return res.status(400).json({ message: "400" });
            const hashedPassword = await bcrypt.hash(passwort, 10);
            const newUser = new User({ Nutzername, vorname, nachname, passwort: hashedPassword });
            await newUser.save();
            res.json(newUser);
        } catch (err) {
            console.error("Fehler bei Registrierung:", err);
            res.status(500).json({ message: "Serverfehler" });
        }
    });

    // Login
    app.post("/api/login/user", async (req, res) => {
        const { Nutzername, passwort } = req.body;

        try {
            const user = await User.findOne({ Nutzername });
            if (user && await bcrypt.compare(passwort, user.passwort)) {
                res.json("Success");
            } else {
                res.status(400).json({ message: "400" });
            }
        } catch (err) {
            console.error("Fehler beim Login:", err);
            res.status(500).json({ message: "Serverfehler beim Login" });
        }
    });

    app.listen(3001, () => console.log("Server läuft auf http://localhost:3001"));
}

start().catch(err => console.error("Fehler beim Start:", err));
