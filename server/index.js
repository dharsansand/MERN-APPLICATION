const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");
const app = express();
const crypto = require("crypto");
const { spawn } = require("child_process");
const multer = require("multer");
const mongoose = require("mongoose");
const File = require("../server/File"); // Your mongoose model for files
const Grid = require('gridfs-stream');

const { MongoClient } = require("mongodb");

const mongoClient = require("mongodb").MongoClient;
const uri =
  "mongodb+srv://ashwin:1234ashwin@Myproject.1h8ymf3.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from http://localhost:3000
    credentials: true, // Enable credentials (e.g., cookies) to be sent with the request
  })
);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const conn = mongoose.connection;
let gfs;

conn.once('open', () => {
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});


const storage = multer.memoryStorage();

const upload = multer({ storage });


const formData = [];
const userData = [];

app.post("/api/submit", async (req, res) => {
  const company = {
    name: req.body.companyName,
    id: req.body.companyId,
    about: req.body.aboutCompany,
    skills: req.body.skillsExpected,
    salary: req.body.companySalary,
    position: req.body.position,
    image: req.body.companyImageUrl,
  };

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const result = await db.collection("companies").insertOne(company);

    client.close();

    res.json({ message: "Success", insertedCompany: company }); // Respond with a success message and the inserted company data
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" }); // Respond with an error message
  }
});

app.get("/api/send", async (req, res) => {
  const client = new MongoClient(uri);
  let companies;
  try {
    const db = client.db();
    companies = await db.collection("companies").find().toArray();
    client.close();
  } catch (error) {
    return res.send("Error retrieving data");
  }

  res.send(companies);
});

app.post("/api/register/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  console.log(req.body);
  const student = {
    name: req.body.name,
    gender: req.body.gender,
    percentage10th: req.body.percentage10th,
    percentage12th: req.body.percentage12th,
    cgpa: req.body.cgpa,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    skills: req.body.knownSkills,
    id: companyId,
  };
  console.log(student);

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const result = await db.collection("students").insertOne(student);

    client.close();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/users/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    const specificStudents = await db
      .collection("students")
      .find({ id: companyId })
      .toArray();
    client.close();
    res.send(specificStudents);
  } catch (error) {
    console.log(error);
  }
});

app.post("/ide/app/compile", (req, res) => {
  //console.log("Hello");
  const language = req.body.language.toLowerCase();
  const code = req.body.code;
  const input = req.body.input1; // Get input value from the request
  console.log(input);
  //console.log("Im in ");
  const random = crypto.randomBytes(8).toString("hex"); // Generate a random hexadecimal string
  const filePath = path.join(__dirname, `temp/${random}.${language}`);
  fs.writeFileSync(filePath, code);

  let command, outputExt;
  let process; // Declare process variable

  if (language === "php") {
    command = `php ${filePath}`;
    outputExt = ".php";
  } else if (language === "python") {
    command = `C:\\Users\\Ashwin\\AppData\\Local\\Programs\\Python\\Python311\\python.exe ${filePath}`;
    process = spawn(command, { shell: true }); // Define process here

    // Pass the input to the program using stdin
    process.stdin.write(input);
    process.stdin.end();

    outputExt = ".py";
  } else if (language === "node") {
    fs.renameSync(filePath, filePath + ".js");
    command = `node ${filePath}.js`;
    outputExt = ".js";
  } else if (language === "c") {
    command = `C:\\eSupport\\gcc\\bin\\gcc.exe ${filePath} -o ${filePath}.exe && ${filePath}.exe`;
    outputExt = ".exe";
  } else if (language === "cpp") {
    command = `C:\\eSupport\\gcc\\bin\\g++.exe ${filePath} -o ${filePath}.exe && ${filePath}.exe`;
    outputExt = ".exe";
  }

  process = spawn(command, { shell: true }); // Define process here if not defined previously

  let output = "";

  process.stdout.on("data", (data) => {
    output += data.toString();
  });

  process.stderr.on("data", (data) => {
    output += data.toString();
  });

  process.on("close", (code) => {
    fs.unlinkSync(filePath); // Clean up the temporary files
    res.send(output);
    console.log(output); // Log the output inside the process.on("close") event handler
  });
});

app.get("/api/messages", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    const messages = await db.collection("messages").find().toArray();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/messages", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();
    const { user, message } = req.body;
    await db.collection("messages").insertOne({ user, message });
    res.json({ user, message });
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
});


app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const writestream = gfs.createWriteStream({
    filename: req.file.originalname,
  });

  writestream.write(req.file.buffer);
  writestream.end();

  return res.send('File uploaded successfully.');
});


const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
