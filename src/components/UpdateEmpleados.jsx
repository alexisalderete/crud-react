// src/components/Update.jsx
import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { fetchEmpleado, updateEmpleado } from "../services/empleados";

const UpdateEmpleados = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [datosCargados, setDatosCargados] = useState(false);
  const [error, setError] = useState(null);

  const cambioValor = useCallback((e) => {
    const { name, value } = e.target;
    if (name === "nombre") setNombre(value);
    if (name === "correo") setCorreo(value);
  }, []);

  const enviarDatos = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await updateEmpleado(id, { nombre, correo });
        navigate("/list-empleados"); // Redirige a la lista después de actualizar
      } catch (error) {
        setError(error.message);
      }
    },
    [id, nombre, correo, navigate]
  );

  const consultarDatos = useCallback(async () => {
    try {
      const data = await fetchEmpleado(id);
      setNombre(data[0].nombre);
      setCorreo(data[0].correo);
      setDatosCargados(true);
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  useEffect(() => {
    consultarDatos();
  }, [consultarDatos]);

  if (!datosCargados) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card">
      <div className="card-header">Actualizar Empleado</div>
      <div className="card-body">
        <form onSubmit={enviarDatos}>
          <div className="form-group">
            <input type="hidden" value={id} />
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              onChange={cambioValor}
              value={nombre}
              id="nombre"
              name="nombre"
            />
          </div>
          <div className="form-group">
            <label htmlFor="correo">Correo</label>
            <input
              type="email"
              className="form-control"
              onChange={cambioValor}
              value={correo}
              id="correo"
              name="correo"
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          <div className="btn-group">
            <button type="submit" className="btn btn-primary">
              Guardar
            </button>
            <Link className="btn btn-secondary" to="/list-empleados">
              Cancelar
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default UpdateEmpleados;