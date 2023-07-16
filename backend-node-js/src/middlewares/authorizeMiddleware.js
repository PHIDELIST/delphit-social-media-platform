import { CognitoJwtVerifier } from "aws-jwt-verify";
import config from '../db/config.js';

const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: config.userPoolId,
  tokenUse: "access",
  clientId: config.clientId,
  timeout: '5000'
});


export const authorizeMiddleware = async (req, res, next) => {
    try {
      const token = req.headers.authorization;
  
      if (!token) {
        return res.status(401).json({ error: "Unauthorized: Missing token." });
      }
  
      const payload = await jwtVerifier.verify(token);
      req.user = {
        userID:payload.sub
      }
  
      next();
    } catch (err) {
      console.error("Access forbidden:", err);
      return res.status(403).json({ error: "Access forbidden: Invalid token." });
    }
  };

