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



// fetching all jobs
app.get("/jobs", async(req,res) => {

    try {
        const jobs = await Job.find();  // Fetch all jobs from the database
        res.status(200).json(jobs);  // Send the jobs as JSON
    } catch (err) {
        res.status(500).json({ message: "Error fetching jobs", error: err });
    }

});


// Create Job Route (POST)
app.post("/jobs", async (req, res) => {
    try {
        const { title, description, location } = req.body;

        // Create a new job
        const newJob = new Job({
            title,
            description,
            location,
        });

        // Save job to the database
        await newJob.save();

        // Return the created job
        res.status(201).json(newJob);
        
    } catch (err) {
        res.status(500).json({ message: "Error creating job", error: err });
    }
});


// fetching jobs by id
app.get("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const job = await Job.findById(id);

        if (!job) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(job);
    } catch (err) {
        res.status(500).json({ message: "Error fetching job", error: err });
    }
});


// Update Job Route (PUT)
app.put("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, location } = req.body;

        // Find the job by ID and update it
        const updatedJob = await Job.findByIdAndUpdate(
            id,
            { title, description, location },
            { new: true }  // Return the updated job
        );

        if (!updatedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json(updatedJob);  // Return the updated job
    } catch (err) {
        res.status(500).json({ message: "Error updating job", error: err });
    }
});

// Delete Job Route (DELETE)
app.delete("/jobs/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Find the job by ID and delete it
        const deletedJob = await Job.findByIdAndDelete(id);

        if (!deletedJob) {
            return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job deleted successfully" });  // Return success message
    } catch (err) {
        res.status(500).json({ message: "Error deleting job", error: err });
    }
});


app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});