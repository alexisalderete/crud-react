// src/components/Create.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { newEmpleados } from "../services/empleados";

const NewEmpleados = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const cambioValor = (e) => {
    const { name, value } = e.target;
    if (name === "nombre") setNombre(value);
    if (name === "correo") setCorreo(value);
  };

  const enviarDatos = async (e) => {
    e.preventDefault();
    try {
      await newEmpleados({ nombre, correo });
      navigate("/list-empleados"); // Navegar a la lista después de crear
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="card">
      <div className="card-header">Crear Empleado</div>
      <div className="card-body">
        <form onSubmit={enviarDatos}>
          <div className="form-group">
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
            <Link className="btn btn-secondary" to={"/list-empleados"}>
              Cancelar
            </Link>
          </div>
        </form>
      </div>
      <div className="card-footer text-muted">Footer</div>
    </div>
  );
};

export default NewEmpleados;