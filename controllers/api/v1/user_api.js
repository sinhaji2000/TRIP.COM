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

exports.postSignUp = async (req, res) => {
  try {
    const { name, email, DOB, password } = req.body;

    const isUserExit = await User.findOne({ email: email });
    console.log(isUserExit);

    if (isUserExit) {
      return res.status(422).json({
        message: "User already exists",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    let avatarPath = "";
    if (req.file) {
      avatarPath = `/uploads/users/avatar/${req.file.filename}`;
    }

    const user = await User.create({
      name,
      email,
      DOB,
      avatar: avatarPath,
      password: hashPassword,
    });
    return res.status(200).json({
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    // Ensure the user is authorized to update the profile
    if (req.body._id === req.params.id) {
      const { name, password } = req.body;
      let avatarPath = "";
      if (req.file) {
        avatarPath = `/uploads/users/avatar/${req.file.filename}`;
      }

      let hashedPassword = undefined;
      if (password) {
        const saltRounds = 10;
        hashedPassword = await bcrypt.hash(password, saltRounds);
      }

      const updateFields = {
        name,
        avatar: avatarPath,
      };

      if (hashedPassword) {
        updateFields.password = hashedPassword; // Add the hashed password only if it exists
      }

      await User.findByIdAndUpdate(req.params.id, updateFields);

      // Redirect to the profile page after a successful update
      return res.json(200, {
        message: "User updated  successfully",
      });
    } else {
      return res.status(403).send("Unauthorized action.");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};