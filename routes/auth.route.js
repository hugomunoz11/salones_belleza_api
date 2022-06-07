import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";


//  MIDDLEWARE PARA GESTIONAR LAS RUTAS
const router = express.Router();

//  RUTA DE REGISTRO DE USUARIOS
router.post(
    "/register",
    [
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
            })
    ],
    validationResultExpress,
    register
);

router.post("/login",
    [
        body('email',"Formato de Email correcto")
                .trim()
                .isEmail()
                .normalizeEmail(),
        body("password","Minimo 6 caracteres")
            .trim()
            .isLength({min:6})
    ],
    validationResultExpress,
    login
);
export default router;