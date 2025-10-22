export default function log(req, res, next) {
  const userInfo = req.user ? req.user.email || req.user.id : 'guest';
  console.log(`${req.method} - ${req.url} called from ${req.ip} as ${userInfo}`);
  next();
}
