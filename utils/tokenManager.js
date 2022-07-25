import jwt from 'jsonwebtoken'

export const generateToken = (uid) => {

    const expireInSeconds   = 60 * 15;

    try{
        const token = jwt.sign({uid},process.env.JWT_SECRET,{expiresIn : expireInSeconds});
        return {token,expireInSeconds};
    }catch(error){
        console.log(error);
    }
}

export const generateRefreshToken = (uid,res) => {
    const expiresIn = 60 * 60 * 8;   //REFRESH TOKEN DE 8 HORAS

    try{
        const refreshToken = jwt.sign({uid},process.env.JWT_REFRESH,{expiresIn})

        res.cookie("refreshToken",refreshToken,{
            httpOnly: true,
            secure: !(process.env.MODO === "developer"),
            expires: new Date(Date.now() + expiresIn * 1000)
        });

    }catch(error){
        console.log(error)
    }
}

export const TokenVerificationErrors   = {
    "invalid signature": "La firma del jwt no es valida",
    "jwt expired": "JWT expirado",
    "invalid token": "Token no valido",
    "No Bearer": "Formato de token incorrecto",
    "jwt malformed" : "JWT Formato no valido",
    "jwt must be provided": "Error desconocido"
}

