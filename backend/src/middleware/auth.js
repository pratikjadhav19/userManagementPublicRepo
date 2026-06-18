const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || '';            // "Bearer eyJ..."
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET); // throws if invalid/expired
    req.userId = payload.sub;                                  // attach the user id to the request
    next();                                                    // allow the route to run
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
