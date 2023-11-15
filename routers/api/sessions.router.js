import { Router } from "express";
import userModel from "../../models/user.model.js";

const router = Router();

router.post('/sessions', async (req,res)=>{
    const { body } = req;
    const newUser = await userModel.create(body);
    console.log(newUser);
    res.redirect('/login')
})

router.post('/login', async (req,res)=>{
    const { body: { email , password} } = req;
    const usuario = await userModel.findOne({ email });
    
    if(!usuario){
        return res.status(401).send('Correo o contraseña invalido')
    }
    const isPassValid = usuario.password === password;
    if(!isPassValid){
        return res.status(401).send('Correo o contraseña invalido')
    }

    const { first_name, last_name, user } = usuario;
    req.session.user={ first_name, last_name, user };

    res.redirect('/api/products')
})

router.get('/logout', (req,res) =>{
    req.session.destroy((error)=>{
        res.redirect('/login')
    })
})

export default router