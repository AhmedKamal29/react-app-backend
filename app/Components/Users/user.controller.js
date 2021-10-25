const Users = require("./user.model");

module.exports = {
  create: async (req, res) => {
    const { Name, Email, Password } = req.body;
    const user = await Users.create({ Name, Email, Password });
    return res.send(user);
  },

  login: async (req, res) => {
    const { Email, Password } = req.body;
    const user = await Users.findOne({ Email, Password });
    if (user != null) {
      return res.json(user.Name) && res.status(200, "Login successfull");
    }
  },
};
