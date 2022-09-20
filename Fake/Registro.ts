// import Equipo from "./Equipo"
// import { Estudiojson } from "./Estudio"
// import Factura, { Facturajson } from "./Factura"
// import IDB from "./IDB"
// import Medico, { Medicojson } from "./Medico"
// import Paciente, { Pacientejson } from "./Paciente"
// import Seguro, { Segurojson } from "./Seguro"



// type Prosesos = "Preregistro" | "Ingresado" | "Finalizado" | "Entregado" | "Reembolso"

// type estadoDeCuenta = {
//     MetodoPago: string;
//     Abono: number;
//     FechaAbono: number;
//     Detalle: string;
// }

// export type AbonoRegistro = {
//     MetodoPago: string;
//     Abono: number;
//     Detalle: string;
// }

// export type Registrojson = {
//     _id?: string
//     NumeroRegistro: number,
//     Tipo: Prosesos
//     Paciente: Pacientejson
//     Medico: Medicojson
//     Seguro: Segurojson
//     Facturacion: Facturajson
//     ListaEstudios: Estudiojson[]
//     Total: number
//     Abono: number
//     EstadosDeCuenta: estadoDeCuenta[]
//     FechaRegistro: number
//     FechaIngreso: number
//     FechaEntrega: number
// }

// export default class Registro {
//     _id?: string
//     NumeroRegistro: number = -1
//     Tipo: Prosesos = "Preregistro"
//     Paciente: Pacientejson = Paciente.init()
//     Medico: Medicojson = Medico.init()
//     Seguro: Segurojson = Seguro.init()
//     Facturacion: Facturajson = Factura.init()
//     ListaEstudios: Estudiojson[] = []
//     Total: number = 0
//     Abono: number = 0
//     EstadosDeCuenta: estadoDeCuenta[] = []
//     FechaRegistro: number = -1
//     FechaIngreso: number = -1
//     FechaEntrega: number = -1
//     constructor(r?:Registrojson) {
//         if (r) {
//             this._id = r._id
//             this.NumeroRegistro = r.NumeroRegistro
//             this.Tipo = r.Tipo
//             this.Paciente = r.Paciente
//             this.Medico = r.Medico
//             this.Seguro = r.Seguro
//             this.Facturacion = r.Facturacion
//             this.ListaEstudios = r.ListaEstudios
//             this.Total = r.Total
//             this.Abono = r.Abono
//             this.EstadosDeCuenta = r.EstadosDeCuenta
//             this.FechaRegistro = r.FechaRegistro
//             this.FechaIngreso = r.FechaIngreso
//             this.FechaEntrega = r.FechaEntrega
//         }
//     }
//     tojson(): Registrojson {
//         return {
//             _id: this._id,
//             NumeroRegistro: this.NumeroRegistro,
//             Tipo: this.Tipo,
//             Paciente: this.Paciente,
//             Medico: this.Medico,
//             Seguro: this.Seguro,
//             Facturacion: this.Facturacion,
//             ListaEstudios: this.ListaEstudios,
//             Total: this.Total,
//             Abono: this.Abono,
//             EstadosDeCuenta: this.EstadosDeCuenta,
//             FechaRegistro: this.FechaRegistro,
//             FechaIngreso: this.FechaIngreso,
//             FechaEntrega: this.FechaEntrega
//         }
//     }
//     static init(r?:Registrojson) {
//         let R = new Registro(r)
//         let R1 = R.tojson()
//         return R1
//     }

//     static async guardarPreRegistro(datos: Registrojson) {
//         let r = Registro.init(datos)
//         if (datos.Paciente.nombre !== ""
//             && datos.ListaEstudios.length > 0
//             && datos.Paciente.telefono !== "") {
//             r.Tipo = "Preregistro"
//             r.FechaRegistro = new Date().getTime()
//             r.NumeroRegistro = parseInt(`${Equipo.idEstacion}${Equipo.getCorrelativo()}`)
//             r._id = generateObjectId()
//             await IDB.GuardarRegistro(r)
//             return {err:false , registro:r}
//         }
//         else {
//             alert("Datos incompletos para el registro")
//             return {err:true, registro:null}
//         }
//     }
//     static async guardarIngreso(datos: Registrojson, abono: AbonoRegistro) {
//         let r = Registro.init(datos)
//         if (datos.Paciente.nombre !== ""
//             && datos.Paciente.ID !== ""
//             && datos.Paciente.telefono !== ""
//             && datos.ListaEstudios.length > 0
//             && abono.MetodoPago !== ""
//             && abono.Abono > 0) {
//             r.Tipo = "Ingresado"
//             r.FechaIngreso = new Date().getTime()
//             r.Abono += abono.Abono
//             r.EstadosDeCuenta.push({
//                 MetodoPago: abono.MetodoPago,
//                 Abono: abono.Abono,
//                 FechaAbono: new Date().getTime(),
//                 Detalle: "Abono inicial"
//             })
//             IDB.ActualizarRegistro(r)
//             return {err:false, registro:r}
//         } else {
//             alert("Datos incompletos para el ingreso")
//             return {err:true, registro:null}
//         }
//     }
//     static async FinalizarRegistro(datos: Registrojson) {
//         let r = Registro.init(datos)
//         r.Tipo = "Finalizado"
//         IDB.ActualizarRegistro(r)
//     }
//     static async Entregar(datos: Registrojson, abono: AbonoRegistro) {
//         if(abono.Abono > 0 || datos.Abono === datos.Total){
//             let r = Registro.init(datos)
//             r.Abono += abono.Abono
//             if(Math.round(r.Abono) === Math.round(r.Total)){
//                 r.Tipo = "Entregado"
//                 r.FechaEntrega = new Date().getTime()
//                 r.EstadosDeCuenta.push({
//                     MetodoPago: abono.MetodoPago,
//                     Abono: abono.Abono,
//                     FechaAbono: new Date().getTime(),
//                     Detalle: "Abono final"
//                 })
//             }else{
//                 r.EstadosDeCuenta.push({
//                     MetodoPago: abono.MetodoPago,
//                     Abono: abono.Abono,
//                     FechaAbono: new Date().getTime(),
//                     Detalle: abono.Detalle
//                 })
//             }
//             IDB.ActualizarRegistro(r)
//         }else{
//             alert("Datos incompletos para la entrega")
//         }
//     }
//     static async Rembolzar(datos: Registrojson) {
//         let r = Registro.init(datos)
//         r.Tipo = "Reembolso"
//         r.Abono = 0
//         r.EstadosDeCuenta.push({
//             MetodoPago: "Efectivo",
//             Abono: (r.Total * -1),
//             FechaAbono: new Date().getTime(),
//             Detalle: "Reembolso"
//         })
//         IDB.ActualizarRegistro(r)
//     }
//     static async actualizarRegistro(data: Registrojson) {
//         let r = Registro.init(data)
//         IDB.ActualizarRegistro(r)
                
//     }
//     static async leerRegistros(tipo?:string) {
//         let Reg = await IDB.LeerRegistros() as Registrojson[]
//         if(tipo){
//             let reg = Reg.filter(r => r.Tipo === tipo)
//             return reg
//         }else{
//             return Reg
//         }
//     }
// }

// function uuidv4(): string | undefined {
//     return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
//         var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
//         return v.toString(16);
//     }).toUpperCase();
// }
// //create a function to generate a mongodb ObjectID
// function generateObjectId() {
//     var timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
//     return timestamp + "xxxxxxxxxxxxxxxx".replace(/[x]/g, function () {
//         return ((Math.random() * 16) | 0).toString(16);
//     }).toLowerCase();
// }
