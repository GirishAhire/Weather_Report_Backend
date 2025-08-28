const express = require("express");
const axios = require("axios");

const router = express.Router();

// GET /weather/:city
router.get("/:city", async (req, res) => {
    const city = req.params.city;
    const apiKey = process.env.WEATHER_API_KEY;

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
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
