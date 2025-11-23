import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

// __dirname Ersatz für ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Upload-Storage konfigurieren
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, "/uploads/");
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `${Date.now()}${ext}`);
    }
});

// Datei-Filter: nur bestimmte Formate erlauben
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|bmp/;
    const ext = path.extname(file.originalname).toLowerCase().replace(".", "");
    if (allowedTypes.test(ext)) {
        cb(null, true);
    } else {
        cb(new Error("Nur Bilder im Format JPG, PNG, GIF, WebP oder BMP sind erlaubt"), false);
    }
};

// Max-Dateigröße: 10MB
const upload = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    fileFilter
});

// Upload-Route
app.post("/file/upload/:username", upload.single("file"), async (req, res) => {
    if (!req.file) return res.status(400).json({ error: "Keine Datei hochgeladen" });

    const { username } = req.params;
    const filename = req.file.filename;

    try {
        await axios.post(`http://localhost:3001/api/NewProfileSource`, {
            username,
            filename
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        res.json({
            message: "Datei erfolgreich hochgeladen und Profilbild aktualisiert",
            filename
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Fehler beim Aktualisieren des Profilbilds" });
    }
});


app.get("/", (_req, res) => res.send("Upload Server läuft"));

app.listen(3000, () => console.log("Upload Server läuft auf http://localhost:3000"));
