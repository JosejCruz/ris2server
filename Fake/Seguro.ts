export type Segurojson = {
    _id?: string
    nombre: string
    cobertura: number
}
export default class Seguro{
    _id : string = ""
    nombre : string = "Particular"  
    cobertura : number = 0
    setdata(seguro: Segurojson) {
        this._id = seguro._id?seguro._id:""
        this.nombre = seguro.nombre
        this.cobertura = seguro.cobertura
    }
    tojson(): Segurojson {
        return {
            _id: this._id,
            nombre: this.nombre,
            cobertura: this.cobertura
        }
    }
    static init(){ 
        let S = new Seguro()
        let S1 = S.tojson() 
        return S1
    };
}