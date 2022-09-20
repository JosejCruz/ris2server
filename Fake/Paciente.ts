export type Pacientejson = {
    _id?: string
    ID:string
    nombre: string
    telefono: string
    correo: string
    edad: number
}
export default class Paciente {
    _id: string = ""
    ID: string = ""
    nombre: string = "";
    telefono: string = "";
    correo: string = "";
    edad: number = 0;
    setdata(paciente: Pacientejson) {
        this._id = paciente._id?paciente._id:""
        this.nombre = paciente.nombre
        this.telefono = paciente.telefono
        this.correo = paciente.correo
        this.edad = paciente.edad
        this.ID = paciente.ID
    }
    tojson(): Pacientejson {
        return {
            _id: this._id,
            ID: this.ID,
            nombre: this.nombre,
            telefono: this.telefono,
            correo: this.correo,
            edad: this.edad
        }
    }
    static init(){
        let p = new Paciente()
        let p1 = p.tojson()
        return p1
    };
}