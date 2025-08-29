const express = require("express");
const axios = require("axios");

const router = express.Router();

const API_URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;

// GET weather by city
router.get("/:city", async (req, res) => {
    const { city } = req.params;

    try {
        const response = await axios.get(API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: "metric",
            },
        });

        res.json(response.data);
    } catch (error) {
        console.error(error.response ? error.response.data : error.message);

        if (error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ error: "Something went wrong" });
        }
    }
});

module.exports = router;