const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios").default;
const mongoose = require("mongoose");

const Favorite = require("./models/favorite");

const app = express();

app.use(bodyParser.json());

app.get("/favorites", async (req, res) => {
    const favorites = await Favorite.find();
    res.status(200).json({
        favorites: favorites,
    });
});

app.post("/favorites", async (req, res) => {
    const favName = req.body.name;
    const favType = req.body.type;
    const favUrl = req.body.url;

    try {
        if (favType !== "movie" && favType !== "character") {
            throw new Error('"type" should be "movie" or "character"!');
        }
        const existingFav = await Favorite.findOne({ name: favName });
        if (existingFav) {
            throw new Error("Favorite exists already!");
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

    const favorite = new Favorite({
        name: favName,
        type: favType,
        url: favUrl,
    });

    try {
        await favorite.save();
        res.status(201).json({
            message: "Favorite saved!",
            favorite: favorite.toObject(),
        });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/movies", async (req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/films");
        res.status(200).json({ movies: response.data });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

app.get("/people", async (req, res) => {
    try {
        const response = await axios.get("https://swapi.dev/api/people");
        res.status(200).json({ people: response.data });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong." });
    }
});

mongoose.connect(
    // === 로컬 db 접속 ===
    // host.docker.internal은 도커 컨테이너 내부에서 알 수 있는 호스트 머신(내 로컬 컴퓨터)의 ip 주소로 변환
    // "mongodb://host.docker.internal:27017/swfavorites",

    // === 컨테이너 db 접속 ===
    // "mongodb://172.17.0.2:27017/swfavorites",

    // === 컨테이너 db 접속 > 도커 네트워크 사용===
    // === ://다음에 오는 mongodb는 컨테이너 명 (docker run -d --name mongodb ~ )===
    "mongodb://mongodb:27017/swfavorites",
    { useNewUrlParser: true },
    (err) => {
        if (err) {
            console.log(err);
        } else {
            app.listen(3000);
        }
    }
);
