const { verify } = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("authorization");

        if (token) {
            token = token.slice(7); // Remove 'Bearer '

            // First try with ACCESS_TOKEN_SECRET
            verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
                if (err) {
                    // If the error is specifically an invalid signature, try REFRESH_TOKEN_SECRET
                    if (err.name === "JsonWebTokenError" && err.message === "invalid signature") {
                        verify(token, process.env.REFRESH_TOKEN_SECRET, (err2, decoded2) => {
                            if (err2) {
                                return res.json({
                                    success: 0,
                                    message: "Invalid Token: " + err2.message,
                                });
                            } else {
                                req.user = decoded2;
                                next();
                            }
                        });
                    } else {
                        return res.json({
                            success: 0,
                            message: "Invalid Token: " + err.message,
                        });
                    }
                } else {
                    req.user = decoded;
                    next();
                }
            });
        } else {
            return res.json({
                success: 0,
                message: "Access denied! Unauthorized user",
            });
        }
    }
};
