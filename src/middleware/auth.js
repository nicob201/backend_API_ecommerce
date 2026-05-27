import config from "../config/config.js";

const testMode = config.TEST_MODE;

export const isAuthenticated = (req, res, next) => {
  if (testMode) {
    return next();
  }
  if (req.isAuthenticated()) {
    return next();
  }

  console.error("Middleware: User not authenticated!");
  res.redirect("/login");
};

export const isNotAuthenticated = (req, res, next) => {
  if (testMode) {
    return next();
  }

  if (!req.session.user) {
    return next();
  } else {
    res.redirect("/profile");
  }
};

export function isAdmin(req, res, next) {
  if (testMode) {
    return next();
  }

  if (req.session.user && req.session.user.role === 'admin') {
    return next();
  }
  console.error("Forbidden: admin users only!");
  return res.status(403).send({ error: 'Forbidden: admin users only!' });
}

export function isUser(req, res, next) {
  if (testMode) {
    return next();
  }

  if (req.session.user && req.session.user.role === 'user') {
    return next();
  }
  console.error("Forbidden: Users only!");
  return res.status(403).send({ error: 'Forbidden: Users only!' });
}
