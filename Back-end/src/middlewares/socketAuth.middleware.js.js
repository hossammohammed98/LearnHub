const jwt = require('jsonwebtoken');

exports.socketAuth = (socket, next) => {
    try {
        const authHeader = socket.handshake.headers.authorization || socket.handshake.auth?.token;
        const headerCookie = socket.handshake.headers.cookie;

        let token = null;

        if (authHeader) {
            token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;
        }

        if (!token && headerCookie) {
            const parsedCookies = {};
            headerCookie.split(';').forEach(cookie => {
                const parts = cookie.split('=');
                if (parts.length >= 2) {
                    parsedCookies[parts[0].trim()] = parts.slice(1).join('=').trim();
                }
            });

            token = parsedCookies.accessToken;
        }

        if (!token) {
            console.error("❌ Auth Failure: accessToken missing from handshake.");
            return next(new Error("Authentication failed: Access token missing."));
        }

        console.log("🔑 Extracted Access Token Success:", `${token.substring(0, 15)}...`);

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