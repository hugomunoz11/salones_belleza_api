import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const ctusuariosSchema  = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: {unique : true}

    },
    password : {
        type: String,
        required: true
    }
});

//  PRE SE UTILIZA PARA HACER UN INTERSECCION ANTES DE REALIZAR
//  ALGUNA ACCION
//  PD: NO SE UTILIZA UN ARROWfUNCTION PORQUE SE DEBE DE TENER
//  ALCANCE PARA PODER UTILIZAR THIS
ctusuariosSchema.pre("save",async function(next){

    const user = this;

    if (!user.isModified('password')){
        return next();
    }

    try{
        const salt      = await bcryptjs.genSalt(10);
        user.password   = await bcryptjs.hash(user.password,salt)
        next();
    }catch(error){
        console.log(error);
        throw new Error("Fallo el hash del a contraseña");
    }
});

ctusuariosSchema.methods.comparePassword = async function(clientPassword) {
    return await bcryptjs.compare(clientPassword,this.password);
}

export const Usuario = mongoose.model('Usuario',ctusuariosSchema)