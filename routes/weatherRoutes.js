const express = require("express");
const axios = require("axios");
const { validateCity } = require("../middleware/validationMiddleware");

const router = express.Router();

const API_URL = process.env.WEATHER_API_URL;
const API_KEY = process.env.WEATHER_API_KEY;

router.get("/:city", validateCity, async (req, res, next) => {
  const { city } = req.params;

  try {
    const response = await axios.get(API_URL, {
      params: { q: city, appid: API_KEY, units: "metric" },
    });

    res.json(response.data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;