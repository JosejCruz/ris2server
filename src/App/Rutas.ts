import {Router} from 'express'
import { Content } from '../data/Content';
import {Usuario} from '../data/Users'
const jwt = require('jsonwebtoken')

const llave = 12345678;
const route = Router()
function prueba(req:any, res:any, next:any){
    console.log("Prueba")
    res.status(403)
    res.end()
}
route.get("/", async (req, res)=>{
    console.log(req.query)
    res.send("Hola")
})


route.post("/login", async (req, res)=>{
    const {User, Password} = req.body;
    const usuario:Usuario ={
        Id: 1,
        Nombre: "Usuario 1",
        User: "Admin",
        Password: "12345678910"
    }
    if(User ==  usuario.User && Password == usuario.Password){
        const user = {username: User}
        const accesstoken = generateAccessToken(user);
        res.header('authorization', accesstoken).json({
            message: 'Usuario autenticado',
            token: accesstoken
        })
        console.log(accesstoken)
    }
})

interface usuarios {
    username: string
}

function generateAccessToken(user:usuarios){
    return jwt.sign(user, llave, {expiresIn: '5m'})
}

function validateToken(req:any, res:any, next:any){
    const accesstoken = req.header['authorization']
    if (!accesstoken) {
        res.send('Access Denied')
    }
    jwt.verify(accesstoken, llave, (err:any, user:any) =>{
        if (err) {
            res.send('Access Denied, Token expire or incorrect')
        }else{
            next()
        }
    })
}

route.get("/content", validateToken, async (req, res)=>{
    console.log(req.query)
    var data = Content;
    let datos = "";
    data.map((contenido) =>{
        datos += `<tr>
                    <td>${contenido.id}</td>
                    <td>${contenido.title}</td>
                    <td>${contenido.body}</td>
                </tr>`
    })
    res.send(
        `<table border=2>
            <tr>
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
            </tr>
            ${datos}
        </table>`
    )
})
export default route