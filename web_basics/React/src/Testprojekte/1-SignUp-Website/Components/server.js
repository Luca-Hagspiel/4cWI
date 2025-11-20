import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";

const app = express();
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://admin:admin1234@mongodb.0yop5p5.mongodb.net/?appName=MongoDB";
const client = new MongoClient(uri);
const dbName = "TestDB";

async function start() {
    console.log("Verbinde zu MongoDB...");
    await client.connect();
    console.log("MongoDB verbunden!");

    const db = client.db(dbName);
    const users = db.collection("users");

    app.get("/", (req, res) => res.send("Server läuft"));

    // GET Route
    app.get("/api/users", async (req, res) => {
        console.log("GET /api/users wurde aufgerufen!");
        const data = await users.find({}).toArray();
        res.json(data);
    });

    // POST Route
    app.post("/api/users", async (req, res) => {
        console.log("POST /api/users wurde aufgerufen!");
        await users.insertOne(req.body);
        res.json({ ok: true });
    });

    app.listen(3001, () => {
        console.log("Server läuft auf http://localhost:3001");
    });
}

start().catch(err => console.error("Fehler beim Start:", err));
