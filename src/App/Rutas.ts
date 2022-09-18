import {Router} from 'express'
import { Content } from '../data/Content';
import {Usuario} from '../data/Users'
const jwt = require('jsonwebtoken')

const llave = '12345678';
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


route.post("/login", (req, res, next)=>{
    const { user, password } = req.body;
    const usuario:Usuario = {
        Id: 1,
        Nombre: "Usuario 1",
        User: "Admin",
        Password: "12345678910"
    }
    if(user ==  usuario.User && password == usuario.Password){
        const accesstoken = generateAccessToken(user);
        res.json({auth: true, token: accesstoken})
    }else{
        res.json({auth: false})
    }
})

function generateAccessToken(user:string){
    return jwt.sign({user}, llave, {expiresIn: 60 * 60})
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

route.get("/content", (req, res)=>{
    const token = req.headers['x-access-token']
    var data = Content;
    const usuario:Usuario = {
        Id: 1,
        Nombre: "Usuario 1",
        User: "Admin",
        Password: "12345678910"
    }
    if (!token) {
        return res.status(401).json({
            auth: false,
            message: 'No token access'
        })
    }

    const decode = jwt.verify(token, llave)
    if (decode.user != usuario.User) {
        return res.status(404).send('user not found')
    }
    console.log(decode)
    res.json(Content)
    // let datos = "";
    // data.map((contenido) =>{
    //     datos += `<tr>
    //                 <td>${contenido.id}</td>
    //                 <td>${contenido.title}</td>
    //                 <td>${contenido.body}</td>
    //             </tr>`
    // })
    // res.send(
    //     `<table border=2>
    //         <tr>
    //             <th>Id</th>
    //             <th>Title</th>
    //             <th>Body</th>
    //         </tr>
    //         ${datos}
    //     </table>`
    // )
})
export default route