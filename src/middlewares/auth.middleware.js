import { auth } from "../config/firebase.js";

// Middleware para usuarios autenticados
export const requireAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ ok: false, message: "No token provided" });
    }

    const idToken = authHeader.split("Bearer ")[1];
    const decoded = await auth.verifyIdToken(idToken);

    // Guardamos información del usuario en req.user
    req.user = { uid: decoded.uid, email: decoded.email, claims: decoded };
    next();
  } catch (err) {
    console.error("Auth middleware error", err);
    return res
      .status(401)
      .json({ ok: false, message: "Invalid or expired token" });
  }
};

// Middleware para verificar que el usuario sea admin
export const requireAdmin = (req, res, next) => {
  // Puedes usar claims custom en Firebase o simplemente un flag en decoded
  if (req.user?.claims?.admin === true) {
    return next();
  }
  return res
    .status(403)
    .json({ ok: false, message: "Admin privileges required" });
};
