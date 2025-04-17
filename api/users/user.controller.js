const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  getUserByEmail,uploadUserImageService
} = require("./user.service");
require("dotenv").config();

const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { generateAccessToken, generateRefreshToken } = require("../auth/refresh_token");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
  
      const user = await createUser(body);
      user.success = "200";
      return res.status(201).json({ success:true,status: 200,data: user });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "DB error", error: err.message });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await getUserByEmail(email);
  
      if (!user || !compareSync(password, user.password)) {
        return res.status(400).json({ success:false,status: 400, message: "Invalid Email or Password" });
      }
  
      user.password = undefined;
      const payload = { id: user.user_id, email: user.email, role: user.role };
  
      const accessToken = generateAccessToken(payload);
      const refreshToken = generateRefreshToken(payload);
  
      // Manually define the access token expiry time (same as in token generation)
      const hours = parseInt(process.env.TOKEN_TIME); 
      const expiresIn = new Date(Date.now() + hours * 60 * 60 * 1000); // 3 hours in seconds
      const formatDateTime = (date) => {
        const pad = (n, width = 2) => String(n).padStart(width, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
               `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 6)}`;
      };

      const formattedExpiresIn = formatDateTime(expiresIn);
      return res.status(200).json({
        data: {
          success:true,status: 200, 
          message: "Login successful",
          accessToken,
          refreshToken,
          expiresIn:formattedExpiresIn
        }
      });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "Login error", error: err.message });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await getUsers(); // Await the promise returned by getUsers
      return res.status(200).json({ success:true,status: 200,  data: users });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "DB Error", error: err.message });
    }
  },
  getUserById: async (req, res) => {
    try {
      const id = req.body.user_id;
      const user = await getUserById(id);

      if (!user) {
        return res.status(404).json({ success:false,status: 400, message: "User not found" });
      }

      return res.status(200).json({ success:true,status: 200,  data: user });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "DB Error", error: err.message });
    }
  },

  getUserByEmail: async (req, res) => {
    try {
      const email = req.body.email;
      const user = await getUserByEmail(email);

      if (!user) {
        return res.status(404).json({ success:false,status: 400, message: "User not found" });
      }

      return res.status(200).json({
        data: {
          success:true,status: 200, 
          ...user
        }
      });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "DB Error", error: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const data = req.body;
      const result = await updateUser(data);
      return res.status(200).json({ success:true,status: 200,  message: "User updated", data: result });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "Update error", error: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const result = await deleteUser(req.body);
      if (!result) {
        return res.status(404).json({ success:false,status: 400, message: "User not found" });
      }
      return res.json({ success:true,status: 200,  message: "User deleted successfully" });
    } catch (err) {
      return res.status(500).json({ success:false,status: 400, message: "Delete error", error: err.message });
    }
  },
    
  uploadUserImage: async (req, res) => {
    try {
      const file = req.file;
      const userId = req.body.user_id;
  
      if (!file || !userId) {
        return res.status(400).json({ success: false, message: "Image or User ID missing" });
      }
  
      const imageUrl = await uploadUserImageService(file, userId);
      return res.status(200).json({ success: true, imageUrl });
    } catch (err) {
      console.error("Upload error:", err);
      return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
    }
  }
};
  