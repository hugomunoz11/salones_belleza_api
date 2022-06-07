import {Schema,model} from "mongoose";

const ctusuariosSchema  = new Schema({
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

export const Usuario = model('user',ctusuariosSchema)