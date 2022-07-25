import {Router} from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
import {body} from 'express-validator';
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
import { requireRefreshToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator as bodyRegisterValidator } from "../middlewares/validatorManager.js";


//  MIDDLEWARE PARA GESTIONAR LAS RUTAS
const router = Router();

//  RUTA DE REGISTRO DE USUARIOS
router.post("/register",bodyRegisterValidator,register);

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

router.get("/protected",requireToken,infoUser);
router.get("/refresh",requireRefreshToken,refreshToken);
router.get("/logout",logout);

export default router;