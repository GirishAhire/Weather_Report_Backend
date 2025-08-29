const express = require("express");
const axios = require("axios");

const router = express.Router();

const WEATHER_API_BASE = process.env.WEATHER_API_BASE;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;

router.get("/:city", async (req, res) => {
    const city = req.params.city;

    try {
        const response = await axios.get(
            `${WEATHER_API_BASE}?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
        );

        const data = response.data;

        res.json({
            city: data.name,
            temperature: data.main.temp,
            description: data.weather[0].description,
            humidity: data.main.humidity,
            wind_speed: data.wind.speed,
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

module.exports = router;