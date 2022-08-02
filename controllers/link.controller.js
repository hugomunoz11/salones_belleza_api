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

//  PARA UN CRUD TRADICIONAL
// export const getLinkcRUD = async (req,res) => {
//     try {
//         const {id}  = req.params;
//         const link  = await Link.findById(id);

//         if(!link){
//             return res.status(404).json({error: "No existe el link"});
//         }

//         if (!link.uid.equals(req.uid)){
//             return res.status(401).json({error: "No eres el usuario que creo este link"});
//         }

//         console.log(link);

//         return res.json({link});
//     } catch (error) {
//         console.log(error);

//         if (error.kind == "ObjectId"){
//             return res.status(403).json({error: 'Formato id Incorrecto'});
//         }

//         return res.status(500).json({error: 'error de servidor'});
//     }

//     return res.json({ok:true});
// }

export const createLink = async (req,res) => {
    try {
        
        let {longLink} = req.body;

        console.log(longLink);

        if (!longLink.startsWith('http://') && !longLink.startsWith('https://')){
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

export const updateLink = async (req,res) => {
    try {
        const {id}  = req.params;
        const {longLink} = req.body;
        const link  = await Link.findById(id);

        console.log('longLink');
        console.log(longLink);

        if (!longLink.startsWith('http://') && !longLink.startsWith('https://')){
            longLink = 'https://'+longLink;
        }

        if(!link){
            return res.status(404).json({error: "No existe el link"});
        }

        if (!link.uid.equals(req.uid)){
            return res.status(401).json({error: "No eres el usuario que creo este link"});
        }

        link.longLink = longLink;
        link.save();

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

export const getLink = async (req,res) => {
    try {
        const {nanoLink}    = req.params;
        const link          = await Link.findOne({nanoLink});

        if(!link){
            return res.status(404).json({error: "No existe el link"});
        }

        console.log(link);

        return res.json({longLink : link.longLink});
    } catch (error) {
        console.log(error);

        if (error.kind == "ObjectId"){
            return res.status(403).json({error: 'Formato id Incorrecto'});
        }

        return res.status(500).json({error: 'error de servidor'});
    }

    return res.json({ok:true});
}