require("dotenv").config();

console.log("ENV PORT:", process.env.PORT);
console.log("ENV MONGODB_URI:", process.env.MONGODB_URI);

const express = require("express");
const mongoose = require("mongoose");
const Contact = require("./models/contact.js");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", function (req, res) {
    console.log(req.url);

    res.json({
        message: "Hello from backend",
        status: "success"
    });
});

app.post("/api/Contact", async function (req, res) {
    try {
        const { name, email, message } = req.body;

        const newContact = new Contact({
            name,
            email,
            message
        });

        await newContact.save();

        res.json({
            message: "Message saved successfully",
            status: "success"
        });
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            status: "error"
        });
    }
});

mongoose.connect(process.env.MONGODB_URI)
.then(function () {
    console.log("MongoDB connected");
})
.catch(function (error) {
    console.log("MongoDB error:", error);
});

app.listen(PORT, () => {
  console.log(`Backend listening on port ${PORT}`);
});
