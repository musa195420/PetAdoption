const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = []; // In-memory store (use DB or Redis in production)

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.TOKEN_TIME}h` });
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
            const newAccessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: `${process.env.TOKEN_TIME}h` });
            const newRefreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET);
            const hours = parseInt(process.env.TOKEN_TIME); // e.g., 3
            const expiresIn = new Date(Date.now() + hours * 60 * 60 * 1000); 
            const formatDateTime = (date) => {
                const pad = (n, width = 2) => String(n).padStart(width, '0');
                return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
                       `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}.${pad(date.getMilliseconds(), 6)}`;
              };
        
              const formattedExpiresIn = formatDateTime(expiresIn);
            refreshTokens.push(newRefreshToken); // Store the new one
            
            return res.json({
              
                data:{
                    success: 200,
                message: "Token refreshed successfully",
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn:formattedExpiresIn,
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
