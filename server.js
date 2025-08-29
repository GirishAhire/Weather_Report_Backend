require("dotenv").config();
const express = require("express");
const requestLogger = require("./middleware/requestLogger");
const weatherRoutes = require("./routes/weatherRoutes");

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api/weather", weatherRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});
