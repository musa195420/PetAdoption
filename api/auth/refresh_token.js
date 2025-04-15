const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = []; // In-memory store (use DB or Redis in production)

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "3h" });
    },

    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        return refreshToken;
    },

    refreshTokenHandler: (req, res) => {
        const { RefreshToken } = req.body;
    
        if (!RefreshToken) return res.status(401).json({ message: "Refresh token required" });
        if (!refreshTokens.includes(RefreshToken)) return res.status(403).json({ message: "Invalid refresh token" });
    
        jwt.verify(RefreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.status(403).json({ message: "Invalid refresh token" });
    
            // Invalidate the old refresh token (rotation)
            refreshTokens = refreshTokens.filter(t => t !== RefreshToken);
    
            const payload = { id: user.id, email: user.email };
    
            // Generate new tokens
            const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "2h" });
            const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
    
            refreshTokens.push(newRefreshToken); // Store the new one
    
            return res.json({
              
                data:{
                    success: 200,
                message: "Token refreshed successfully",
                accessToken: newAccessToken,
                refreshToken: newRefreshToken
                }
            });
        });
    },

    logout: (req, res) => {
        const { token } = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.sendStatus(204);
    }
};
