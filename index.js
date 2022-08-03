import "dotenv/config";
import "./config/connectdb.js"
import express from 'express'
import authRouter from './routes/auth.route.js'
import cookieParse from 'cookie-parser'
import linkRouter from "./routes/link.router.js";
import redirecRouter from "./routes/redirect.route.js";
import cors from 'cors';

const app = express();

//  SIRVE PARA VALIDAR SI EL DOMINIO QUE ESTA HACIENDO LA PETICION
//  ESTA PERMITIDO POR LA APLICACÓN
const whiteList = [
    process.env.ORIGIN1,
    process.env.ORIGIN2
];

app.use(cors({
    origin: (origin,callback) => {
        console.log('origin flecha');
        console.log(origin);
        if(!origin || whiteList.includes(origin)){
            return callback(null,origin);
        }

        return callback("Error de CORS origin: "+origin+" no autorizado");
    }
}));

//app.use(cors());

//  MIDDLEWARE PARA HABILITAR QUE EXPRESS PUEDA LEER LAS SOLICITUDES
//  EN JSON.
app.use(express.json());

//  PARA UTILIZAR LAS COOKIES
app.use(cookieParse());

//  RUTA BASE DE LA API
app.use('/api/v1/auth',authRouter);
app.use("/api/v1/links",linkRouter);
app.use("/",redirecRouter);

//  ESTO HABILITA A LA CARPETA PUBLIC PARA QUE PUEDA SER ACCEDIDADE FORMA PUBLICA 
app.use(express.static('public'));

//  NOTA: NO SE CREA LA VARIABLE DE ENTORNO DE PORT YA QUE AL
//  DESPLEGARLO A HEROKU ESTE LE ASIGNA POR DEFECTO UN VALOR
const PORT = process.env.PORT || 5000
app.listen(PORT,() => console.log('Inicio http://localhost:'+PORT));