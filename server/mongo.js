const { MongoClient } = require("mongodb");

const mongoClient = require("mongodb").MongoClient;
const url =
  "mongodb+srv://ashwin2003:pocoashwin@myproject.1h8ymf3.mongodb.net/?retryWrites=true&w=majority";

const createCompany = async (req, res) => {
  const company = {
    name: req.body.companyName,
    id: req.body.companyId,
    about: req.body.aboutCompany,
    skills: req.body.skillsExpected,
    salary: req.body.companySalary,
    position: req.bod.position,
    image: req.body.companyImageUrl,
  };

  const client = new MongoClient(url);

  try {
    await client.connect();
    const db = client.db();
    const result = db.collection("companies").insertOne(company);
  } catch (error) {
    return res.json({ message: "Could not connect to the db" });
  }
  client.close();
  res.json(company);
};

exports.createCompany = createCompany;
