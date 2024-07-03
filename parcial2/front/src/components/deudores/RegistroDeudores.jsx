import React from "react";
import { useForm } from "react-hook-form";

export default function DeudoresRegistro({
  AccionABMC,
  Item,
  Grabar,
  Volver,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields, isValid, isSubmitted },
  } = useForm({ defaultValues: Item });

  const onSubmit = (data) => {
    Grabar(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>

      <div className="container-fluid">
        <fieldset disabled={AccionABMC === "C"}>
          {/* Campo Apellido y Nombre */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ApellidoYNombre">
                Apellido y Nombre<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="text"
                {...register("ApellidoYNombre", {
                  required: { value: true, message: "Apellido y Nombre es requerido" },
                  minLength: {
                    value: 1,
                    message: "Debe tener al menos 1 caracter",
                  },
                  maxLength: {
                    value: 55,
                    message: "Debe tener como máximo 55 caracteres",
                  },
                })}
                autoFocus
                className={
                  "form-control " + (errors?.ApellidoYNombre ? "is-invalid" : "")
                }
              />
              {errors?.ApellidoYNombre && touchedFields.ApellidoYNombre && (
                <div className="invalid-feedback">
                  {errors?.ApellidoYNombre?.message}
                </div>
              )}
            </div>
          </div>

          {/* Campo Importe Adeudado */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="ImporteAdeudado">
                Importe Adeudado<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="number" step=".01"
                {...register("ImporteAdeudado", {
                  required: { value: true, message: "Importe Adeudado es requerido" },
                  min: {
                    value: 0.01,
                    message: "Debe ser mayor a 0",
                  },
                  max: {
                    value: 99999.99,
                    message: "Debe ser menor o igual a 99999.99",
                  },
                })}
                className={
                  "form-control " + (errors?.ImporteAdeudado ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">{errors?.ImporteAdeudado?.message}</div>
            </div>
          </div>

          {/* Campo Fecha de Deuda */}
          <div className="row">
            <div className="col-sm-4 col-md-3 offset-md-1">
              <label className="col-form-label" htmlFor="FechaDeuda">
                Fecha de Deuda<span className="text-danger">*</span>:
              </label>
            </div>
            <div className="col-sm-8 col-md-6">
              <input
                type="date"
                {...register("FechaDeuda", {
                  required: { value: true, message: "Fecha de Deuda es requerido" }
                })}
                className={
                  "form-control " + (errors?.FechaDeuda ? "is-invalid" : "")
                }
              />
              <div className="invalid-feedback">
                {errors?.FechaDeuda?.message}
              </div>
            </div>
          </div>

        </fieldset>

        {/* Botones Grabar, Cancelar/Volver */}
        <hr />
        <div className="row justify-content-center">
          <div className="col text-center botones">
            {AccionABMC !== "C" && (
              <button type="submit" className="btn btn-primary">
                <i className="fa fa-check"></i> Registrar
              </button>
            )}
            <button
              type="button"
              className="btn btn-warning"
              onClick={() => Volver()}
            >
              <i className="fa fa-undo"></i>
              {AccionABMC === "C" ? " Volver" : " Volver"}
            </button>
          </div>
        </div>

        {/* Mensaje de validación */}
        {!isValid && isSubmitted && (
          <div className="row alert alert-danger mensajesAlert">
            <i className="fa fa-exclamation-sign"></i>
            Revisar los datos ingresados...
          </div>
        )}

      </div>
    </form>
  );
}
