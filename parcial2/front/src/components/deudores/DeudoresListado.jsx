import React from "react";
import moment from "moment";

export default function DeudoresListado({
  Items,
  Imprimir,
  Pagina,
  RegistrosTotal,
  Paginas,
  Buscar,
}) {
  return (
    <div className="table-responsive">
      <table className="table table-hover table-sm table-bordered table-striped">
        <thead>
          <tr>
            <th className="text-center">Apellido y Nombre</th>
            <th className="text-center">Fecha Deuda</th>
            <th className="text-center">Importe Adeudado</th>
      
          </tr>
        </thead>
        <tbody>
          {Items.map((item) => (
            <tr key={item.IdDeudor}>
              <td>{item.ApellidoYNombre}</td>
              <td className="text-center">
                {moment(item.FechaDeuda).format("DD/MM/YYYY")}
              </td>
              <td className="text-end">{item.ImporteAdeudado}</td>
              <td className="text-center">
 
              </td>
            </tr>
          ))}
          {Items.length === 0 && (
            <tr>
              <td colSpan="4" className="text-center">
                No se encontraron registros
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Paginador */}
      <div className="paginador">
        <div className="row">
          <div className="col">
            <span className="pyBadge">Registros: {RegistrosTotal}</span>
          </div>
          <div className="col text-center">
            Página:&nbsp;
            <select
              value={Pagina}
              onChange={(e) => {
                Buscar(e.target.value);
              }}
            >
              {Paginas?.map((pagina) => (
                <option key={pagina} value={pagina}>
                  {pagina}
                </option>
              ))}
            </select>
            &nbsp;de {Paginas?.length}
          </div>
          <div className="col">
            <button
              className="btn btn-primary float-end"
              onClick={() => Imprimir()}
            >
              <i className="fa fa-print"></i> Imprimir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

