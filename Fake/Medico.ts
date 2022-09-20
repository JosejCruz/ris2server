export type Medicojson = {
    _id?: string
    nombre: string
}
export default class Medico {
    _id: string = ""
    nombre: string = "A QUIEN CORRESPONDA"
    static init() {
        let M = new Medico()
        let M1 = M.tojson()
        return M1
    };
    setdatos(medico: Medicojson) {
        this._id = medico._id?medico._id:""
        this.nombre = medico.nombre
    }
    tojson(): Medicojson {
        return {
            _id: this._id,
            nombre: this.nombre
        }
    }
}