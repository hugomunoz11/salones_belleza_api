import jwt from 'jsonwebtoken';
import { TokenVerificationErrors } from "../utils/tokenManager.js";

export const requireRefreshToken = (req,res,next) => {
    try {
        const refreshTokenCookie    = req.cookies.refreshToken;
        if (!refreshTokenCookie) throw new Error("No Bearer");

        const {uid} = jwt.verify(refreshTokenCookie,process.env.JWT_REFRESH);

        req.uid = uid;
        next();
    } catch (error) {
        res
            .status(401)
            .json({error: TokenVerificationErrors[error.message]});
    }
}