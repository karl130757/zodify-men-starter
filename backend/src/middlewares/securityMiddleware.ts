import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Request, Response, NextFunction } from 'express';
import { config } from '../constants/global';

const isProduction = config.environment === 'production';

// 🚀 **Rate Limiter Configuration**
const rateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per windowMs
	message: 'Too many requests from this IP, please try again later.',
	headers: true // Include rate limit info in response headers
});

// 🚀 **Helmet Security Configuration**
const helmetMiddleware = helmet({
	contentSecurityPolicy: isProduction
		? {
				directives: {
					defaultSrc: ["'self'"],
					scriptSrc: ["'self'", 'https://apis.google.com'],
					styleSrc: ["'self'", "'unsafe-inline'"],
					imgSrc: ["'self'", 'data:', 'https://trusted-images.com'],
					connectSrc: ["'self'", 'https://api.example.com'],
					frameAncestors: ["'none'"],
					upgradeInsecureRequests: []
				}
		  }
		: false,
	crossOriginResourcePolicy: { policy: 'same-origin' },
	dnsPrefetchControl: { allow: true },
	frameguard: { action: 'deny' },
	hidePoweredBy: true,
	hsts: isProduction
		? {
				maxAge: 31536000,
				includeSubDomains: true,
				preload: true
		  }
		: false,
	ieNoOpen: true,
	noSniff: true,
	permittedCrossDomainPolicies: { permittedPolicies: 'none' },
	referrerPolicy: { policy: 'strict-origin-when-cross-origin' }
});

// 🚀 **CORS Configuration**
const corsMiddleware = cors({
	origin: isProduction ? config.allowedOrigins.split(',') : 'http://localhost:3000',
	methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
	credentials: true
});

// 🚀 **Combine Middleware into a Single Function**
const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
	rateLimiter(req, res, () => {
		helmetMiddleware(req, res, () => {
			corsMiddleware(req, res, next);
		});
	});
};

export default securityMiddleware;
