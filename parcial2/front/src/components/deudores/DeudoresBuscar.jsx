// DeudoresBuscar.jsx esto se queda inutil, se puede borrar
import React from "react";

export default function DeudoresBuscar({ Buscar, Agregar }) {
  return (
    <form>

      {/* acá antes estaba la barra de búsqueda si haces esto no repetir en Deudores.jsx */}

      {/* Botones */}
      <div className="row">
        <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Buscar(1)}
          >
            {/* acá cambie buscar por listar todo, ambos hacen la función básica de listar */}

            <i className="fa fa-search"></i> Listar Todo
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar()}
          >
            <i className="fa fa-plus"></i> Agregar
          </button>
        </div>
      </div>
    </form>
  );
}
