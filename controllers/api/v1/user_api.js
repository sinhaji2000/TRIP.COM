const User = require("../../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.postSignIn = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);

    if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
      return res.status(422).json({
        message: "Invalid username or password",
      });
    }
    return res.json(200, {
      message: "Sign in successfull , here is your token please keep it safe",
      data: {
        token: jwt.sign(user.toJSON(), "secret", { expiresIn: "7d" }),
      },
    });
  } catch (error) {
    return res.status(500, {
      message: "Iternal server problem",
    });
  }
};
