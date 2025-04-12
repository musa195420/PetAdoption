const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = []; // In-memory store (use DB or Redis in production)

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    },

    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        return refreshToken;
    },

    refreshTokenHandler: (req, res) => {
        const { token } = req.body;
    
        if (!token) return res.status(401).json({ message: "Refresh token required" });
        if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid refresh token" });
    
        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });
    
            const payload = { id: user.id, email: user.email };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    
            res.json({ accessToken });
        });
    },

    logout: (req, res) => {
        const { token } = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.sendStatus(204);
    }
};
