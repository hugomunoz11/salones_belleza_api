import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/link.controller.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router();

//  GET         /api/v1/links       all links
//  GET         /api/v1/links/:ID   SINGLE LINK
//  POST        /api/v1/links/      CREATE LINK
//  PATCH/PUT   /api/v1/links/:id   update link       
//  NOTA: PATCH ESTA DESTINADO A NO MODIFICAR TODA LA INFORMACION
//  DELETE      /api/v1/links/:id   remove link

router.get("/",requireToken,getLinks);
router.get("/:id",requireToken,getLink)
router.post("/",requireToken,bodyLinkValidator,createLink)
router.delete("/:id",requireToken,paramLinkValidator,removeLink)

//  PARA PODER UTILIZAR LAS RUTAS
export default router;