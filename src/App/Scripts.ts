import jwt from 'jsonwebtoken';
import { Usuario } from '../data/Users';

const llave = '12345678';

function generateAccessToken(user:string){
    return jwt.sign({user}, llave, {expiresIn: 60 * 60})
}

function validateToken(req:any, res:any, next:any){
    const token = req.headers['x-access-token']
    if (!token) {
        return res.json({
            auth: false,
            message: 'No token access'
        })
    }
    try {
        const usuario:Usuario = {
            Id: 1,
            Nombre: "Usuario 1",
            User: "Admin",
            Password: "12345678910"
        }
        const decode = jwt.verify(token, llave)
        if (decode.user != usuario.User) {
            return res.json({
                auth: false,
                message: 'error verifying token'
            })
        }
        next()
    } catch (error) {
        return res.status(401).json({
            auth: false,
            message: 'error verifying token'
        })
    }
}

const exp = {validateToken,generateAccessToken}

export default exp;