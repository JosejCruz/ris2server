import fs from 'fs';
async function main(){
    let estudios:any = fs.readFileSync("./Fake/estudios.json","utf-8");
    estudios = JSON.parse(estudios);
    let nuevo = estudios.map((estudio:any) => {
        return {
            _id: estudio._id.$oid,
            precio: [ {etiqueta:"base",valor:estudio.precio[0]}, {etiqueta:"emergencia",valor:estudio.precio[1]} ],
            codigo: estudio.codigo,
            nombre: estudio.nombre,
            modalidad: estudio.modalidad==="tomografias"?"CT":estudio.modalidad,
            modalidad_nombre: estudio.modalidad_nombre,
            descripcion: estudio.descripcion,
            parte_anatomica: estudio.parte_anatomica,
            preparacion: estudio.preparacion
          }
    })
    fs.writeFileSync("./Fake/estudios2.json",JSON.stringify(nuevo));
}
main();