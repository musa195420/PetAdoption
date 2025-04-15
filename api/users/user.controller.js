const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,
} = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/refresh_token");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
  
      const result = await createUser(body);
      return res.status(201).json({ success: 200, data: result });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "DB error", error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
     
      if (!user || !compareSync(password, user.password)) {
        return res.status(400).json({ success: 400, message: "Invalid Email or Password" });
      }

      user.password = undefined;
      const payload = { id: user.user_id, email: user.email, role: user.role };

      return res.status(200).json({
       
        data:{
          success: 200,
        message: "Login successful",
        accessToken: generateAccessToken(payload),
        refreshToken: generateRefreshToken(payload),
        }
      });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "Login error", error: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await getUsers(); // Await the promise returned by getUsers
      return res.status(200).json({ success: 200, data: users });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "DB Error", error: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.body.user_id;
      const user = await getUserById(id);

      if (!user) {
        return res.status(404).json({ success: 400, message: "User not found" });
      }

      return res.status(200).json({ success: 200, data: user });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "DB Error", error: err.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ success: 400, message: "User not found" });
      }

      return res.status(200).json({
        data: {
          success: 200,
          ...user
        }
      });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "DB Error", error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const data = req.body;
      const result = await updateUser(data);
      return res.status(200).json({ success: 200, message: "User updated", data: result });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "Update error", error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await deleteUser(req.body);
      if (!result) {
        return res.status(404).json({ success: 400, message: "User not found" });
      }
      return res.json({ success: 200, message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success: 400, message: "Delete error", error: err.message });
    }
  },
    

  };
  