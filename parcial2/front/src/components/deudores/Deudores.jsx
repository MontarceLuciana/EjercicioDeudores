import React, { useState, useEffect } from "react";
import DeudoresListado from "../deudores/DeudoresListado";
import RegistroDeudores from "../deudores/RegistroDeudores";
import { deudoresService } from "../../services/deudores.service";
import modalDialogService from "../../services/modalDialog.service";

function Deudores() {
  const TituloAccionABMC = {
    A: "(Agregar)",
    B: "(Eliminar)",
    M: "(Modificar)",
    C: "(Consultar)",
    L: "(Listado)",
  };

  const [AccionABMC, setAccionABMC] = useState("L");
  const [Items, setItems] = useState(null);
  const [Item, setItem] = useState(null); // usado en BuscarPorId (Modificar, Consultar)
  const [RegistrosTotal, setRegistrosTotal] = useState(0);
  const [Pagina, setPagina] = useState(1);
  const [Paginas, setPaginas] = useState([]);

  useEffect(() => {
    async function fetchDeudores() {
      modalDialogService.BloquearPantalla(true);
      try {
        const data = await deudoresService.Buscar("", Pagina);
        setItems(data.Items);
        setRegistrosTotal(data.RegistrosTotal);
        // Generar array de páginas para paginación
        const arrPaginas = [];
        for (let i = 1; i <= Math.ceil(data.RegistrosTotal / 15); i++) {
          arrPaginas.push(i);
        }
        setPaginas(arrPaginas);
      } finally {
        modalDialogService.BloquearPantalla(false);
      }
    }

    fetchDeudores();
  }, [Pagina]); // Solo se ejecuta al cambiar Pagina

  async function Buscar(_pagina) {
    if (_pagina && _pagina !== Pagina) {
      setPagina(_pagina);
    } else {
      _pagina = Pagina;
    }
  }

  async function BuscarPorId(item, accionABMC) {
    const data = await deudoresService.BuscarPorId(item);
    setItem(data);
    setAccionABMC(accionABMC);
  }

  function Consultar(item) {
    BuscarPorId(item, "C");
  }

  function Modificar(item) {
    BuscarPorId(item, "M");
  }

  async function Agregar() {
    setAccionABMC("A");
    setItem({
      IdDeudor: 0,
      ApellidoYNombre: "",
      ImporteAdeudado: "",
      FechaDeuda: "",
    });
  }

  async function Grabar(item) {
    try {
      await deudoresService.Grabar(item);
      await Buscar(); // Actualiza la lista de deudores después de agregar/modificar
      Volver();
      modalDialogService.Alert(
        `Registro ${AccionABMC === "A" ? "agregado" : "modificado"} correctamente.`
      );
    } catch (error) {
      modalDialogService.Alert(
        error?.response?.data?.message ?? error.toString()
      );
    }
  }

  function Volver() {
    setAccionABMC("L");
  }

  function Imprimir() {
    modalDialogService.Alert("En desarrollo...");
  }

  return (
    <div>
      <div className="tituloPagina">
        Deudores <small>{TituloAccionABMC[AccionABMC]}</small>
      </div>

      {/* Botones de Acción */}
      <div className="row">
        <div className="col text-center botones">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => Agregar()}
          >
            <i className="fa fa-plus"></i> Agregar
          </button>
        </div>
      </div>

      {/* Tabla de resultados de búsqueda y Paginador */}
      {Items?.length > 0 && (
        <DeudoresListado
          Items={Items}
          Consultar={Consultar}
          Modificar={Modificar}
          Imprimir={Imprimir}
          Pagina={Pagina}
          RegistrosTotal={RegistrosTotal}
          Paginas={Paginas}
          Buscar={Buscar}
        />
      )}

      {Items?.length === 0 && (
        <div className="alert alert-info mensajesAlert">
          <i className="fa fa-exclamation-sign"></i>
          No se encontraron registros...
        </div>
      )}

      {/* Formulario de alta/modificación/consulta */}
      {AccionABMC !== "L" && (
        <RegistroDeudores
          AccionABMC={AccionABMC}
          Item={Item}
          Grabar={Grabar}
          Volver={Volver}
        />
      )}
    </div>
  );
}

export { Deudores };

