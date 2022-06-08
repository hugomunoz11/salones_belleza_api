import {Usuario} from '../models/ctusuarios.js'
import jwt from 'jsonwebtoken'

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
        
        return res.status(201).json({ok:true});

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

        //  GENARAR TOKEN
        const token = jwt.sign({uid: user._id},process.env.JWT_SECRET)

        return res.json({ok:token});
    }catch(error){
        res.status(500).json({error: "Error en la ejecución de la petición"});
    }
}