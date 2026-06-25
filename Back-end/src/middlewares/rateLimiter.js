const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

// Environment-based configuration
const isProduction = process.env.NODE_ENV === 'production';

class RateLimiter {
    constructor() {
        this.limiterInstances = new Map();
    }

    /**
     * Creates a rate limiter middleware
     * @param {Object} options - Rate limiter options
     * @returns {Function} Express middleware
     */
    create(options = {}) {
        const {
            windowMs = 15 * 60 * 1000,     // 15 minutes
            limit = 100,                   // Max requests per window
            prefix = 'ratelimit:',
            message = 'Too many requests from this IP, please try again later.',
            keyGenerator,
            skip,
            handler,
            ...restOptions
        } = options;

        const key = `${prefix}${windowMs}-${limit}`;

        // Return cached instance if exists
        if (this.limiterInstances.has(key)) {
            return this.limiterInstances.get(key);
        }

        let store;

        // Use Redis in production for distributed environments
        if (isProduction && process.env.REDIS_URL) {
            const redisClient = createClient({
                url: process.env.REDIS_URL,
                socket: {
                    reconnectStrategy: (retries) => Math.min(retries * 50, 2000)
                }
            });

            redisClient.connect().catch(console.error);

            store = new RedisStore({
                sendCommand: (...args) => redisClient.sendCommand(args),
                prefix,
            });
        }

        const limiter = rateLimit({
            windowMs,
            limit,
            standardHeaders: true,        // Return rate limit info in headers
            legacyHeaders: false,         // Disable deprecated X-RateLimit headers
            store,
            message: {
                status: 429,
                error: 'Rate limit exceeded',
                message,
            },
            keyGenerator: keyGenerator || ((req) => {
                // Use user ID if authenticated, otherwise IP
                return req.user?.id || 
                       req.ip || 
                       req.connection.remoteAddress ||
                       'unknown';
            }),
            skip: skip || ((req) => {
                // Skip rate limiting for health checks or internal requests
                return req.path === '/health' || req.path === '/favicon.ico';
            }),
            handler: handler || ((req, res) => {
                res.status(429).json({
                    success: false,
                    error: 'Rate limit exceeded',
                    message,
                    retryAfter: Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000)
                });
            }),
            ...restOptions
        });

        this.limiterInstances.set(key, limiter);
        return limiter;
    }
}

// Export singleton instance
module.exports = new RateLimiter();