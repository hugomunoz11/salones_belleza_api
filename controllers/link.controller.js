import { nanoid } from "nanoid";
import { Link } from "../models/Links.js";

export const getLinks = async (req,res) => {

    try {
        const links = await Link.find({uid: req.uid});

        return res.json({links});
    } catch (error) {
        console.log(error);
        returnres.status(500).json({error: 'error de servidor'});
    }

    return res.json({ok:true});
}

export const getLink = async (req,res) => {
    try {
        const {id}  = req.params;
        const link  = await Link.findById(id);

        if(!link){
            return res.status(404).json({error: "No existe el link"});
        }

        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "No eres el usuario que creo este link"});
        }

        console.log(link);

        return res.json({link});
    } catch (error) {
        console.log(error);

        if (error.kind == "ObjectId"){
            return res.status(403).json({error: 'Formato id Incorrecto'});
        }

        return res.status(500).json({error: 'error de servidor'});
    }

    return res.json({ok:true});
}

export const createLink = async (req,res) => {
    try {
        
        let {longLink} = req.body;

        console.log(longLink);

        if (!longLink.startsWith('http://')){
            longLink = 'https://'+longLink;
        }

        const link = new Link({longLink,nanoLink: nanoid(6),uid: req.uid});
        const newLink = await link.save();

        return res.status(201).json({newLink});
    } catch (error) {
        console.log(error);
        returnres.status(500).json({error: 'error de servidor'});
    }

    return res.json({ok:true});
}

export const removeLink = async (req,res) => {
    try {
        const {id}  = req.params;
        const link  = await Link.findById(id);

        if(!link){
            return res.status(404).json({error: "No existe el link"});
        }

        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "No eres el usuario que creo este link"});
        }

        await link.remove();

        return res.json({link});
    } catch (error) {
        console.log(error);

        if (error.kind == "ObjectId"){
            return res.status(403).json({error: 'Formato id Incorrecto'});
        }

        return res.status(500).json({error: 'error de servidor'});
    }

    return res.json({ok:true});
}