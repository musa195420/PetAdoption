const jwt = require("jsonwebtoken");
require("dotenv").config();

let refreshTokens = []; // In-memory store (use DB or Redis in production)

module.exports = {
    generateAccessToken: (user) => {
        return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
    },

    generateRefreshToken: (user) => {
        const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
        refreshTokens.push(refreshToken);
        return refreshToken;
    },

    refreshTokenHandler: (req, res) => {
        const { token } = req.body;
        if (!token) return res.sendStatus(401);
        if (!refreshTokens.includes(token)) return res.sendStatus(403);

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) return res.sendStatus(403);
            const accessToken = jwt.sign({ id: user.id, email: user.email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
            res.json({ accessToken });
        });
    },

    logout: (req, res) => {
        const { token } = req.body;
        refreshTokens = refreshTokens.filter(t => t !== token);
        res.sendStatus(204);
    }
};
