require("dotenv").config();
const express = require("express");
const requestLogger = require("./middleware/requestLogger");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(requestLogger);

// Routes
app.use("/api/weather", weatherRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
