const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/weather/:city", async (req, res) => {
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
            // API responded with an error (e.g., 401, 404)
            console.error("Error Response:", error.response.data);
            res.status(error.response.status).json(error.response.data);
        } else {
            // Other errors (network, etc.)
            console.error("Error Message:", error.message);
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
