import helmet from 'helmet';

const helmetConfig = (isProduction: boolean) => {
	return helmet({
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
};

export default helmetConfig;
