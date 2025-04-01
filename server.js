const express = require("express")
const mongoose = require("mongoose");
const app = express()
const Job = require("./models/jobModels");


app.use(express.json())


const MONGO_URI = "mongodb+srv://shalenmj:zItOA9aPR7V2I7FY@job-portal-db.bvhko19.mongodb.net/?retryWrites=true&w=majority&appName=job-portal-db"

mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB Atlas"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

// fetching main page 
app.get("/", (req, res) => {
    res.send("Welcome to Job Portal API!");
});


app.get("/jobs", async(req,res) => {

    try {
        const jobs = await Job.find();  // Fetch all jobs from the database
        res.status(200).json(jobs);  // Send the jobs as JSON
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs", error: err });
    }

});



app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});