import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

// Establishing connection with database
mongoose
  .connect("mongodb://127.0.0.1:27017/projects", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Defining Schema
const projectSchema = new mongoose.Schema({
  key: Number,
  img: String,
  alt: String,
  title: String,
});

// Mongoose Model
const Projectmodel = new mongoose.model("projectCardDetails", projectSchema);

// Create document or insert a document
const createDocument = async () => {
  try {
    const pj1 = new Projectmodel({
      key: 1,
      img: "../assets/project1",
      alt: "project1",
      title: "Project One",
    });
    const pj2 = new Projectmodel({
      key: 2,
      img: "../assets/project2",
      alt: "project2",
      title: "Project Two",
    });
    const pj3 = new Projectmodel({
      key: 3,
      img: "../assets/project3",
      alt: "project3",
      title: "Project Three",
    });

    const result = await Projectmodel.insertMany([pj1, pj2, pj3]);
    console.log(result);
  } catch (error) {
    console.error("error", error);
  }
};

// createDocument();

const getDocument = async () => {
  try {
    const output = await Projectmodel.find();
    console.log(output);
  } catch (error) {
    console.error("Error: ", error);
  }
};

getDocument();

app.use("/", (req, res) => {
  getDocument();
  // res.send("Backend is linked");
});
app.get("/", async (req, res) => {
  try {
    // Your database query or data retrieval code here
    const data = await fetchDataFromDatabase();
    res.json(data);
  } catch (error) {
    console.error("Error while fetching data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running in port: ${port}`);
});
