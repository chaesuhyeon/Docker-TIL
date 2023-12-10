const fs = require("fs");
const path = require("path");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const Goal = require("./models/goal");

const app = express();

const accessLogStream = fs.createWriteStream(
    path.join(__dirname, "logs", "access.log"),
    { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.get("/goals", async (req, res) => {
    console.log("TRYING TO FETCH GOALS");
    try {
        const goals = await Goal.find();
        res.status(200).json({
            goals: goals.map((goal) => ({
                id: goal.id,
                text: goal.text,
            })),
        });
        console.log("FETCHED GOALS");
    } catch (err) {
        console.error("ERROR FETCHING GOALS");
        console.error(err.message);
        res.status(500).json({ message: "Failed to load goals." });
    }
});

app.post("/goals", async (req, res) => {
    console.log("TRYING TO STORE GOAL");
    const goalText = req.body.text;

    if (!goalText || goalText.trim().length === 0) {
        console.log("INVALID INPUT - NO TEXT");
        return res.status(422).json({ message: "Invalid goal text." });
    }

    const goal = new Goal({
        text: goalText,
    });

    try {
        await goal.save();
        res.status(201).json({
            message: "Goal saved",
            goal: { id: goal.id, text: goalText },
        });
        console.log("STORED NEW GOAL");
    } catch (err) {
        console.error("ERROR FETCHING GOALS");
        console.error(err.message);
        res.status(500).json({ message: "Failed to save goal." });
    }
});

app.delete("/goals/:id", async (req, res) => {
    console.log("TRYING TO DELETE GOAL");
    try {
        await Goal.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "Deleted goal!" });
        console.log("DELETED GOAL");
    } catch (err) {
        console.error("ERROR FETCHING GOALS");
        console.error(err.message);
        res.status(500).json({ message: "Failed to delete goal." });
    }
});

mongoose.connect(
    // 'mongodb://localhost:27017/course-goals',
    // "mongodb://host.docker.internal:27017/course-goals", // 포트를 개시할 경우?
    // "mongodb://mongodb:27017/course-goals", // 도커 네트워크 사용 - 컨테이너 명으로 변경

    // === mongo db authentication ===
    // mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]
    // MONGO_INITDB_ROOT_USERNAME: su / MONGO_INITDB_ROOT_PASSWORD: secret
    // "mongodb://su:secret@mongodb:27017/course-goals?authSource=admin",

    // === mongo db authentication > 환경 변수 사용===
    // 도커 파일에서 정의한 환경 변수명 : MONGODB_USERNAME / MONGODB_PASSWORD
    `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/course-goals?authSource=admin`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.error("FAILED TO CONNECT TO MONGODB");
            console.error(err);
        } else {
            console.log("CONNECTED TO MONGODB");
            app.listen(80);
        }
    }
);
