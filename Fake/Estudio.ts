// import IDB from "./IDB";

// //import Postman from "./Postman"
// export type Modalidadjson = {
//     _id?:string
//     nombreMod:string
//     nombreModDicom:string
// }
// export class Modalidad{
//     _id?:string;
//     nombreMod:string = "";
//     nombreModDicom:string = "";
//     static async getModalidades():Promise<Modalidadjson[]>{
//         try{
//             let mods = await IDB.LeerModalidades();
//             return mods as Modalidadjson[]
//         }
//         catch(error){
//             throw error;
//         }
//     }
// }



// export type Estudiojson = {
//     _id?:string;
//     nombreMod:string;
//     nombreModDicom:string;
//     nombreEstudio:string;
//     precio:number;
//     preparacion:boolean;
//     parteAnatomica:number;
//     datosPreparacion:string;
//     codigo:string;
// }
// export default class Estudio{
//     _id?:string;
//     nombreMod:string = "";
//     nombreModDicom:string = "";
//     nombreEstudio:string = "";
//     costoDefault:number = 0;
//     listaCostos:{etiqueta:string,valor:number}[] = [];
//     preparacion:boolean = false;
//     parteAnatomica:number =1;
//     datosPreparacion:string = "";
//     codigo:string = "";
//     setdata(data:any){
//         this._id = data._id;
//         this.nombreMod = data.nombreMod;
//         this.nombreModDicom = data.nombreModDicom;
//         this.nombreEstudio = data.nombreEstudio;
//         this.costoDefault = data.costoDefault;
//         this.listaCostos = data.listaCostos;
//         this.preparacion = data.preparacion;
//         this.parteAnatomica = data.parteAnatomica;
//         this.datosPreparacion = data.datosPreparacion;
//         this.codigo = data.codigo;
//     }
//     jsondefault():Estudiojson{
//         return {
//             _id:this._id,
//             nombreMod:this.nombreMod,
//             nombreModDicom:this.nombreModDicom,
//             nombreEstudio:this.nombreEstudio,
//             precio:this.costoDefault,
//             preparacion:this.preparacion,
//             parteAnatomica:this.parteAnatomica,
//             datosPreparacion:this.datosPreparacion,
//             codigo:this.codigo
//         }
//     }
//     jsonAlternativo(index:number):Estudiojson{
//         return {
//             _id:this._id,
//             nombreMod:this.nombreMod,
//             nombreModDicom:this.nombreModDicom,
//             nombreEstudio:this.nombreEstudio,
//             precio:this.listaCostos[index].valor,
//             preparacion:this.preparacion,
//             parteAnatomica:this.parteAnatomica,
//             datosPreparacion:this.datosPreparacion,
//             codigo:this.codigo
//         }
//     }
//     static async getEstudios(mod:string):Promise<Estudio[]>{
//         try{
//             let est = await IDB.LeerEstudios(mod)
//             let e = est.map(estudio => {
//                 let e = new Estudio();
//                 e.setdata(estudio);
//                 return e;
//             })
//             return e;
//         }
//         catch(error){
//             return [];
//         }
//     }
// }