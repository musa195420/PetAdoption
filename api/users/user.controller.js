const {
    createUser,
    getUserById,
    getUsers,
    updateUser,
    deleteUser,
    getUserByEmail} = require("./user.service");


  const { genSaltSync, hashSync, compareSync } = require("bcrypt");
  const { generateAccessToken, generateRefreshToken } = require("../auth/refresh_token");
  
  module.exports = {
    registerUser: (req, res) => {
      const body = req.body;
      const salt = genSaltSync(10);
      body.password = hashSync(body.password, salt);
  
      createUser(body, (err, results) => {
        if (err) {
          return res.status(500).json({ success: 0, message: "DB error", error: err });
        }
        return res.status(201).json({ success: 1, data: results });
      });
    },
  
    getUserByEmail: (req, res) => {
      const body = req.body;
  
      getUserByEmail(body.email, (err, user) => {
        if (err || !user) {
          return res.status(400).json({ success: 0, message: "Invalid Email or Password" });
        }
  
        const isValid = compareSync(body.password, user.password);
        if (!isValid) {
          return res.status(400).json({ success: 0, message: "Invalid Email or Password" });
        }
  
        user.password = undefined;
        const payload = { id: user.user_id, email: user.email, role: user.role };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);
  
        return res.status(200).json({
          success: 1,
          message: "Login successful",
          accessToken,
          refreshToken,
          user,
        });
      });
    },
  
    getAllUsers: (req, res) => {
      getUsers((err, results) => {
        if (err) return res.status(500).json({ success: 0, message: "DB Error" });
        return res.status(200).json({ success: 1, data: results });
      });
    },
  
    getUserById: (req, res) => {
      const id = req.params.id;
      getUserById(id, (err, result) => {
        if (err) return res.status(500).json({ success: 0, message: "DB Error" });
        if (!result) return res.status(404).json({ success: 0, message: "User not found" });
        return res.status(200).json({ success: 1, data: result });
      });
    },
  
    updateUser: (req, res) => {
      const data = req.body;
      updateUser(data, (err, result) => {
        if (err) return res.status(500).json({ success: 0, message: "DB Error" });
        return res.status(200).json({ success: 1, message: "User updated" });
      });
    },
  
    deleteUser: (req, res) => {
      const id = req.params.id;
      deleteUser(id, (err, result) => {
        if (err) return res.status(500).json({ success: 0, message: "DB Error" });
        return res.status(200).json({ success: 1, message: "User deleted" });
      });
    },
    login: (req, res) => {
        const body = req.body;
        getUserByUserEmail(body.email, (err, results) => {
            if (err) {
                console.log(err);
            }
            if (!results) {
                return res.json({
                    success: 0,
                    data: "Invalid Email or Password"
                });
            }
    
            const result = compareSync(body.password, results.password);
            if (result) {
                results.password = undefined;
                const userPayload = { id: results.id, email: results.email };
    
                const accessToken = generateAccessToken(userPayload);
                const refreshToken = generateRefreshToken(userPayload);
    
                return res.json({
                    success: 200,
                    message: "Login successful",
                    accessToken,
                    refreshToken
                });
            } else {
                return res.json({
                    success: 400,
                    message: "Invalid Email or Password"
                });
            }
        });
    }

  };
  