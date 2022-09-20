export type Facturajson = {
    _id?:string;
    NIT:string;
    Razonsocial:string;
}
export default class Factura {
    _id?: string
    NIT: string = ""
    Razonsocial: string = ""
    tojson(): Facturajson {
        return {
            _id: this._id,
            NIT: this.NIT,
            Razonsocial: this.Razonsocial
        }
    }
    static init() {
        let F = new Factura()
        let F1 = F.tojson()
        return F1
    };
}