import axios from "axios";
import { body,validationResult,param } from "express-validator";

export const validationResultExpress = (req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    next()
}

export const paramLinkValidator = [
    param("id","Formato no valido (expressValidator)")
    .trim()
    .notEmpty()
    .escape()
    ,
    validationResultExpress
];

export const bodyLinkValidator = [
    body("longLink","Formato link incorrecto")
    .trim()
    .notEmpty()
    .custom(async value => {
        try {

            if (!value.startsWith('http://') && !value.startsWith('https://')){
                value = 'https://'+value;
            }

            console.log('value');
            console.log(value);
        
            await axios.get(value);

            return value;
        } catch (error) {
            throw new Error ("Not found longLink 404");
        }
    })
    //.exists()
    ,
    validationResultExpress
];

export const bodyLoginValidator = [
    body('email',"Formato de Email correcto")
        .trim()
        .isEmail()
        .normalizeEmail(),
    body("password","Minimo 6 caracteres")
        .trim()
        .isLength({min:6}),
    body("password","Formato de password incorrecta")
        .trim()
        .custom((value,{req}) => {
            if (value !== req.body.repassword){
                throw new Error("No coinciden las contraseñas")
            }

            return value;
        }),
    validationResultExpress
];