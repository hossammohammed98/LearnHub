const helmet = require('helmet');
const dotenv = require('dotenv');

dotenv.config();

class SecurityMiddleware {
    constructor() {
        this.defaultOptions = {
            // Content Security Policy (CSP) - Very important for security
            contentSecurityPolicy: {
                directives: {
                    defaultSrc: ["'self'"],
                    styleSrc: ["'self'", "'unsafe-inline'"],
                    scriptSrc: ["'self'", "'unsafe-inline'"],
                    imgSrc: ["'self'", "data:", "https:"],
                    connectSrc: ["'self'"],
                    fontSrc: ["'self'"],
                    objectSrc: ["'none'"],
                    mediaSrc: ["'self'"],
                    frameSrc: ["'none'"],           // Prevent clickjacking
                },
            },

            // Hide that your app is made with Express
            hidePoweredBy: true,

            // Prevent MIME type sniffing
            xssFilter: true,

            // Prevent clickjacking
            frameguard: { action: 'deny' },

            // Enable HSTS (HTTP Strict Transport Security) - forces HTTPS
            hsts: {
                maxAge: 31536000,           // 1 year
                includeSubDomains: true,
                preload: true,
            },

            // Prevent referrer leakage
            referrerPolicy: { policy: 'strict-origin-when-cross-origin' },

            // Other good defaults
            dnsPrefetchControl: true,
            ieNoOpen: true,
            noSniff: true,
            permittedCrossDomainPolicies: true,
        };
    }

    /**
     * Create Helmet middleware with custom options
     * @param {Object} options - Override default security settings
     * @returns {Function} Express middleware
     */
    create(options = {}) {
        const helmetOptions = {
            ...this.defaultOptions,
            ...options,
            contentSecurityPolicy: options.contentSecurityPolicy !== false 
                ? { ...this.defaultOptions.contentSecurityPolicy, ...options.contentSecurityPolicy }
                : false,
        };

        return helmet(helmetOptions);
    }

    /**
     * Quick preset for development (less strict)
     */
    development() {
        return helmet({
            contentSecurityPolicy: false,   // Often annoying in dev
            hsts: false,
        });
    }

    /**
     * Strict preset for production
     */
    production() {
        return this.create({
            hsts: {
                maxAge: 31536000,
                includeSubDomains: true,
                preload: true,
            }
        });
    }
}

// Export singleton
module.exports = new SecurityMiddleware();