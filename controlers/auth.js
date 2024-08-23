const {response} = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')
const {generateJWT} = require('../helpers/jwt')


const createUser = async(req, res = response)=>{
    console.log(req.body)
    
    const {name, email, password} = req.body
    // const user = new User(req.body);
    try {
        
        let user =  await User.findOne({email:email});
        console.log(user)

        if(user){
            return res.status(400).json({
                ok:false,
                msg:"El usuario ya existe con "+ email
            })
        }
        user = new User(req.body);

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        
        await user.save()
        // Generar JWT
        const token = await generateJWT(user.id, user.name)

        res.status(201).json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Por favor hable con el administrador."
        })
    }
    
}

const userLogin = async(req, res)=>{
    
    const {email, password} = req.body

    try {

        const user =  await User.findOne({email});
        console.log(user)

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"Usuario y/o contraseña no son correctos."
            })
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, user.password)

        if(!validPassword){
            res.status(400).json({
                ok:false,
                msg:"Contraseña no es correcta."
            })
        }
        // Generar JWT
        const token = await generateJWT(user.id, user.name)

        res.json({
            ok:true,
            uid:user.id,
            name:user.name,
            token
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"Por favor hable con el administrador."
        })
    }
}

const revalidateToken = async(req, res)=>{
    const uid = req.uid
    const name = req.name

    const token = await generateJWT(uid, name)
    
    res.json({
        ok:true,
        uid:uid,
        name:name,
        token
        
    })
}


module.exports = {
    createUser,
    userLogin,
    revalidateToken
}