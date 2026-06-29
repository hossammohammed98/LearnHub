const jwt = require('jsonwebtoken');

exports.socketAuth = (socket, next) => {
    try {
        const headerCookie = socket.handshake.headers.cookie;
        
        if (!headerCookie) {
            console.error("🔒 Auth Failure: No cookies found in handshake headers.");
            return next(new Error("Authentication failed: Cookies missing."));
        }

        // 🎯 NATIVE FALLBACK: Parse the cookie string directly using native JavaScript
        const parsedCookies = {};
        headerCookie.split(';').forEach(cookie => {
            const parts = cookie.split('=');
            if (parts.length === 2) {
                parsedCookies[parts[0].trim()] = parts[1].trim();
            }
        });

        // Verify exactly what was parsed in your console safely
        console.log("📦 Natively Parsed Cookies Object:", Object.keys(parsedCookies));

        const token = parsedCookies.accessToken;
        
        if (!token) {
            console.error("❌ Auth Failure: accessToken missing from parsed cookies.");
            return next(new Error("Authentication failed: Access token missing."));
        }

        console.log("🔑 Extracted Access Token Success:", `${token.substring(0, 15)}...`);

        // Verify token authenticity against your environment key
        const decoded = jwt.verify(token, process.env.SECRET_ACCESS_KEY);
        
        socket.user = {
            id: decoded.id || decoded._id,
            ...decoded
        };

        return next();
    } catch (error) {
        console.error("❌ Socket Authentication Handshake Rejected:", error.message);
        return next(new Error("Authentication failed: Invalid or expired session token."));
    }
};