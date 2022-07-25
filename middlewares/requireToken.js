import jwt from 'jsonwebtoken'
import { TokenVerificationErrors } from '../utils/tokenManager.js';

export const requireToken = (req,res,next) => {
    try{
        let token = req.headers?.authorization;

        if (!token) throw new Error("Token vacio");

        // EL HEADER EN AL CADENA DEL STRING SE MANDA LA PALABRA CLAVE ESPACIO TOKEN
        // EL SPLIT SEPARARA ESTO PARA QUE HAGA UN ARRAY DE LA PALABRA CLAVE
        // Y EL TOKEN
        token   = token.split(" ")[1];
        const {uid} = jwt.verify(token,process.env.JWT_SECRET);

        req.uid = uid;
        next();
    }catch(error){
        console.log(error);
        return res.status(401).json({error: TokenVerificationErrors[error.message]});
    }
}