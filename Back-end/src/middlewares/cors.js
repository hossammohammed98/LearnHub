const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

class CorsMiddleware {
    constructor() {
        this.defaultOptions = {
            origin: process.env.FRONTEND_URL 
                ? [process.env.FRONTEND_URL, 'http://localhost:3000', 'http://localhost:5173']
                : true, // Allow all origins in development
            
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
            credentials: true,                    // Allow cookies & auth headers
            maxAge: 86400,                        // Cache preflight request for 24 hours
        };
    }

    /**
     * Create CORS middleware
     * @param {Object} options - Custom CORS options
     * @returns {Function} Express middleware
     */
    create(options = {}) {
        const corsOptions = { ...this.defaultOptions, ...options };
        
        return cors(corsOptions);
    }

    /**
     * Development mode - more relaxed
     */
    development() {
        return cors({
            origin: true,
            credentials: true,
        });
    }

    /**
     * Production mode - more secure
     */
    production() {
        return this.create();
    }
}

// Export singleton
module.exports = new CorsMiddleware();