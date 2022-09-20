import { json, Router } from 'express'
import { Content } from '../data/Content';
import { Usuario } from '../data/Users'
import Scripts from './Scripts'
import fs from 'fs'


const route = Router()

route.get("/", async (req, res) => {
    console.log(req.query)
    res.send("Hola")
})


route.post("/login", (req, res, next) => {
    const { user, password } = req.body;
    const usuario: Usuario = {
        Id: 1,
        Nombre: "Usuario 1",
        User: "Admin",
        Password: "12345678910"
    }
    if (user == usuario.User && password == usuario.Password) {
        const accesstoken = Scripts.generateAccessToken(user);
        res.json({ auth: true, token: accesstoken })
    } else {
        res.json({ auth: false })
    }
})



route.get("/auth", (req, res) => {
    const token = req.headers['x-access-token']
    let respuesta = Scripts.VerificarToken(token as string)
    res.status(respuesta.estatus).json({
        auth: respuesta.auth,
        message: respuesta.mensaje
    })
})


route.get("/content", Scripts.validateToken, (req, res) => {
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

route.get("/modalidades",async (req,res) => {
    let modalidades = JSON.parse( fs.readFileSync("./Fake/modalidades.json","utf-8") );
    res.json(modalidades)
})
route.get("/estudios/:mod",async (req,res) => {
    let mod = req.params.mod;
    console.log(mod)
    let estudios = JSON.parse( fs.readFileSync("./Fake/estudios2.json","utf-8") );
    let estudiosFiltrados = estudios.filter((estudio:any) => estudio.modalidad == mod)
    res.json(estudiosFiltrados)
})

export default route