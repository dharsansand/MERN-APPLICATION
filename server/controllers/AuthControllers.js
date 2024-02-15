const test = (req, res) => {
  res.json("test is working");
};
const registerUser = (req, res) => {
  try {
    const { email, password } = req.body;
    
  } catch (error) {}
};

module.exports = {
  test,
  registerUser,
};
