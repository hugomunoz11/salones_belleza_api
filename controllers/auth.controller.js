import {Usuario} from '../models/ctusuarios.js'
import { generateRefreshToken, generateToken, TokenVerificationErrors } from '../utils/tokenManager.js';

export const register = async (req,res) => {
    console.log(req.body);

    const {email,password}  = req.body;

    try{

        //  SE BUSCA SI EL USUARIO YA EXISTA
        let user = await Usuario.findOne({email:email});

        if (user){
            throw ({code: 11000});
        }

        user    = new Usuario({email,password});
        await user.save();

        const {token,expireInSeconds} = generateToken(user._id);
        generateRefreshToken(user.id,res);
        
        return res.status(201).json({token,expireInSeconds});

    }catch(error){
        console.log(error);
        if (error.code === 11000){
            return res.status(400).json({error: "Usuario ya registrado"})
        }

        res.status(500).json({error: "Error en la ejecución de la petición"});
    }
}

export const login = async (req,res) => {

    try{
        const {email,password}  = req.body;

        let user = await Usuario.findOne({email:email});

        if (!user){
            return res.status(403).json({error: "Usuario o contraseña incorrecta"})
        }

        const validatePassword = await user.comparePassword(password)

        if (!validatePassword) {
            return res.status(403).json({error: "Usuario o contraseña incorrecta"})
        }

        const {token,expireInSeconds} = generateToken(user._id);
        generateRefreshToken(user.id,res);

        //  GENARAR TOKEN Y REGRESA LA EXPIRACION DE ESTE EN SEGUNDOS
        return res.json({token,expireInSeconds});

    }catch(error){
        res.status(500).json({error: "Error en la ejecución de la petición"});
    }
}

export const infoUser = async (req,res) => {

    try{
        const usuario = await Usuario.findById(req.uid).lean();

        return res.json({email :usuario.email,uid: usuario._id});
    }catch(error){
        console.log(error.message);
        return res.status(404).json({error: error.message})
    }
    //res.json({'user':'correo@gmail.com'});
}

export const refreshToken= (req,res) => {
    //  AQUI TIENE QUE LEER LA COOKIE
    try{
        const {token,expireInSeconds} = generateToken(req.uid);
        return res.json({token,expireInSeconds});

    } catch(error){
        return res
            .status(401)
            .send({error: TokenVerificationErrors[error.message]});
    }
}

export const logout = (req,res) => {
    res.clearCookie('refreshToken');
    res.json({ok : true});
}