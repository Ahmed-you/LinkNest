
import helmet from "helmet";
import csrf from "csurf";
import cookieParser from "cookie-parser";

// CSRF protection middleware
const csrfProtection = csrf({ cookie: true });

export const applySecurity = (app) => {
  app.use(helmet());
  app.use(cookieParser());
  app.use(csrfProtection);
};
