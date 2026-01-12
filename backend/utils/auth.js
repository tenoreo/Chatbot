const verifyAccessToken = (req, res, next) => {
  const ACCESS_TOKEN = process.env.ACCESS_CODE;

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "No tienes acceso" });
  }

  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).json({ error: "No tienes acceso" });
  }

  const [type, token] = parts;

  if (type !== "Bearer" || token !== ACCESS_TOKEN) {
    return res.status(401).json({ error: "No tienes acceso" });
  }

  next();
};

export default verifyAccessToken;
