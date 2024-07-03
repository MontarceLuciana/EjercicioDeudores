import httpService from "./http.service";
import { config } from "../config";

const urlResource = config.urlResourceDeudores;

async function Buscar(ApellidoYNombre, Pagina) {
  try {
    const resp = await httpService.get(urlResource, {
      params: { ApellidoYNombre, Pagina },
    });
    return resp.data;
  } catch (error) {
    console.error("Error al buscar deudores:", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}

async function BuscarPorId(item) {
  try {
    const resp = await httpService.get(urlResource + "/" + item.IdDeudor);
    return resp.data;
  } catch (error) {
    console.error("Error al buscar por ID:", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}

async function Grabar(item) {
  try {
    if (item.IdDeudor === 0) {
      await httpService.post(urlResource, item);
    } else {
      await httpService.put(urlResource + "/" + item.IdDeudor, item);
    }
  } catch (error) {
    console.error("Error al grabar deudor:", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}

async function Consultar(filtro) {
  try {
    const resp = await httpService.get(urlResource, {
      params: filtro,
    });
    return resp.data;
  } catch (error) {
    console.error("Error al consultar deudores:", error);
    throw error; // Lanza el error para que sea manejado por el código que llama a esta función
  }
}

export const deudoresService = {
  Buscar,
  BuscarPorId,
  Grabar,
  Consultar,
};
