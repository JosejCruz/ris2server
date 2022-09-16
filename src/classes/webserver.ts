import Express from 'express'
import Cors from 'cors'
import Approute from '../App/Rutas'
export default class WebServer{
    static puerto = 4000;
    static App = Express();
    static Iniciar(){
        this.App.use(Cors())
        this.App.use("/App", Approute)

        this.App.listen(this.puerto, ()=>{
            console.log("Servidor Iniciado")
        })
    }
}