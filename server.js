const express = require("express")
const mongoose = require("mongoose");
const app = express()


app.use(express.json())

const MONGO_URI = "mongodb+srv://shalenmj:zItOA9aPR7V2I7FY@job-portal-db.bvhko19.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-db"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

app.get("/", (req, res) => {
    res.send("Welcome to Job Portal API!");
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});