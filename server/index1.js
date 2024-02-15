const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { spawn } = require("child_process");
const multer = require("multer");
const File = require("../server/File"); // Your mongoose model for files
const Grid = require("gridfs-stream");

const companySchema = new mongoose.Schema({
  name: String,
  id: String,
  about: String,
  skills: [String],
  salary: String,
  position: String,
  image: String,
});

const messageSchema = new mongoose.Schema({
  user: String,
  message: String,
});

const studentSchema = new mongoose.Schema({
  profiled: Boolean,
  name: String,
  gender: String,
  percentage10th: String,
  percentage12th: String,
  cgpa: Number,
  email: String,
  phoneNumber: Number,
  skills: String,
  id: Number,
});

const profiledUser = new mongoose.Schema({
  profiled: Boolean,
  name: String,
  gender: String,
  percentage10th: String,
  percentage12th: String,
  cgpa: Number,
  email: String,
  phoneNumber: Number,
  skills: String,
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const userProfileSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true, // Ensure username is unique
  },
  isAuthenticated: {
    type: Boolean,
    default: false, // Default value is false when user profile is created
  },
});

const DataSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  percentage10th: {
    type: Number,
    required: true,
  },
  percentage12th: {
    type: Number,
    required: true,
  },
  cgpa: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  skills: {
    type: String,
    required: true,
  },
});

// Create model from schema

const uri =
  "mongodb+srv://ashwin:1234ashwin@Myproject.1h8ymf3.mongodb.net/?retryWrites=true&w=majority";

const { MongoClient } = require("mongodb");
const { log } = require("console");

const mongoClient = require("mongodb").MongoClient;
const Profile = mongoose.model("Profile", DataSchema);

const User = mongoose.model("User", userSchema);
const Company = mongoose.model("Company", companySchema);
const Student = mongoose.model("Student", studentSchema);
const Message = mongoose.model("Message", messageSchema);
const UserProfile = mongoose.model("UserProfile", userProfileSchema);

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose.connect(
  "mongodb+srv://ashwin:1234ashwin@Myproject.1h8ymf3.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const connection = mongoose.connection;

// Move the event handler for the "open" event inside the callback of mongoose.connect
connection.once("open", () => {
  console.log("Connected to MongoDB database");
});

app.post("/api/submit", async (req, res) => {
  const companyData = {
    name: req.body.companyName,
    id: req.body.companyId,
    about: req.body.aboutCompany,
    skills: req.body.skillsExpected,
    salary: req.body.companySalary,
    position: req.body.position,
    image: req.body.companyImageUrl,
  };

  try {
    // Create a new Company document using the Mongoose model
    const newCompany = new Company(companyData);

    // Save the new Company document to the database
    await newCompany.save();

    res.json({ message: "Success", insertedCompany: newCompany });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/registeruser", async (req, res) => {
  const pass = req.body.password;
  console.log(pass);

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(pass, 12);
  } catch (err) {
    const error = new HttpError(
      "Could not create user, please try again.",
      500
    );
    return res.status(500).json({ error: "An error occurred" });
  }

  const userData = {
    username: req.body.username,
    password: hashedPassword,
  };

  try {
    let newUser = new User(userData);
    await newUser.save();
    const username = userData.username;
    let userProfile = await UserProfile.findOne({ username });

    // Check if userProfile is null
    if (!userProfile) {
      // If userProfile is null, create a new profile
      userProfile = new UserProfile({ username, isAuthenticated: false });
    } else {
      // If userProfile exists, update its isAuthenticated property
      userProfile.isAuthenticated = false;
    }

    // Save the userProfile
    await userProfile.save();

    await userProfile.save();

    const token = jwt.sign(
      { userId: newUser.username },
      "supersecret_dont_share",
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({ userId: userData.username, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/loginuser", async (req, res) => {
  const { username, password } = req.body;

  try {
    const exUser = await User.findOne({ username: username });

    if (exUser) {
      let isValidPass;
      try {
        isValidPass = await bcrypt.compare(password, exUser.password);
      } catch (err) {
        return res
          .status(404)
          .json({ message: "Couldn't connect to the application right now" });
      }

      if (!isValidPass) {
        return res.status(403).json({ message: "Invalid password" });
      } else {
        console.log("User found");
      }

      let token;
      try {
        token = jwt.sign(
          { userId: exUser.username },
          "supersecret_dont_share",
          {
            expiresIn: "1h",
          }
        );
      } catch (err) {
        console.log("Error generating token");
        return res.status(500).json({ message: "Internal Server Error" });
      }

      return res.json({
        userId: exUser.username,
        token: token,
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

app.get("/api/send", async (req, res) => {
  try {
    // Use the Mongoose model to find all companies
    const companies = await Company.find();

    res.json(companies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.post("/api/register/:companyId", async (req, res) => {
  const studentData = {
    name: req.body.name,
    gender: req.body.gender,
    percentage10th: req.body.percentage10th,
    percentage12th: req.body.percentage12th,
    cgpa: req.body.cgpa,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    skills: req.body.knownSkills,
    id: req.params.companyId,
  };

  try {
    const newStudent = new Student(studentData);
    await newStudent.save();

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/user/profile/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user profile by username

    let userProfile = await Profile.findOne({ userId }); // Use Profile model here

    console.log(userProfile);
    // If user profile is found, return it
    if (userProfile) {
      res.json(userProfile); // Return userProfile directly, no need to wrap it in an object
    } else {
      // If user profile is not found, return 404 Not Found status
      res.status(404).json({ error: "User profile not found" });
    }
  } catch (error) {
    // If an error occurs, return 500 Internal Server Error status
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/profiling", async (req, res) => {
  const studentData = {
    name: req.body.name,
    userId: req.body.id,
    gender: req.body.gender,
    percentage10th: req.body.percentage10th,
    percentage12th: req.body.percentage12th,
    cgpa: req.body.cgpa,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    skills: req.body.skills,
  };
  const username = req.body.id;

  try {
    const newProfile = new Profile(studentData);
    await newProfile.save();
    console.log("its done");

    // Find the UserProfile document for the specified username
    let userProfile = await UserProfile.findOne({ username });

    // If userProfile is null, create a new UserProfile document
    if (!userProfile) {
      userProfile = new UserProfile({ username, isAuthenticated: false });
    }

    // Update the isAuthenticated property
    userProfile.isAuthenticated = true;
    await userProfile.save();
    console.log("User profile updated:", userProfile);

    res.json({ message: "User registered successfully!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/users/:companyId", async (req, res) => {
  const companyId = req.params.companyId;
  try {
    // Use the Mongoose model to find specific students based on companyId
    const specificStudents = await Student.find({ id: companyId });

    res.json(specificStudents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.get("/api/user/isProfiled/:username", async (req, res) => {
  try {
    console.log("hi");
    const { username } = req.params; // Retrieve username from request parameters
    const userProfile = await UserProfile.findOne({ username });
    if (userProfile) {
      // If userProfile is not null
      res.json({ isProfiled: userProfile.isAuthenticated });
    } else {
      // If userProfile is null (no profile found)

      res.json({ isProfiled: false }); // Assuming default value is false for isAuthenticated
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" }); // Send an error response if there's an error
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

app.get("/api/messages", async (req, res) => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = client.db();

    const messagess = await db.collection("messages").find().toArray();
    res.json(messagess);
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
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

const PORT = 8000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
