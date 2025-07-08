import helmet from "helmet";
import csrf from "csurf";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per window
});

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

export const applySecurity = (app) => {
  app.use(helmet());
  app.use(cookieParser());
  app.use(csrfProtection);
  app.use(limiter);
};
