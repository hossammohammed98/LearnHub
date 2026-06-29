const rateLimit = require('express-rate-limit');
const { RedisStore } = require('rate-limit-redis');
const { createClient } = require('redis');
const dotenv = require('dotenv');

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

class RateLimiter {
    constructor() {
        this.limiterInstances = new Map();
    }

    create(options = {}) {
        const {
            windowMs = 15 * 60 * 1000,
            limit = 100,
            prefix = 'ratelimit:',
            message = 'Too many requests from this IP, please try again later.',
            keyGenerator,
            skip,
            handler,
            ...restOptions
        } = options;

        const key = `${prefix}${windowMs}-${limit}`;

        if (this.limiterInstances.has(key)) {
            return this.limiterInstances.get(key);
        }

        let store;

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
            standardHeaders: true,
            legacyHeaders: false,
            store,
            message: {
                status: 429,
                error: 'Rate limit exceeded',
                message,
            },
            // ✅ FIX 1: Explicitly add validation rules to disable the IPv6 warning 
            // If you use Nginx/Cloudflare and app.set('trust proxy', true), set this to true.
            validate: {
                default: false,
                xForwardedForHeader: false,
                trustProxy: false
            },
           keyGenerator: keyGenerator || ((req) => {
                // Return user ID if logged in, otherwise default to the library's safe IP resolver
                if (req.user?.id) {
                    return req.user.id;
                }
                
                // Falling back directly to req.ip is what triggers the error if the 
                // library thinks you haven't validated your server's proxy trust settings.
                return req.ip || 'unknown';
            }),
            skip: skip || ((req) => {
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

module.exports = new RateLimiter();