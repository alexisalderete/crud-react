// src/components/List.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchEmpleados, deleteEmpleado } from "../services/empleados";

const ListEmpleados = () => {
  const [datosCargados, setDatosCargados] = useState(false);
  const [datos, setDatos] = useState([]);
  const [error, setError] = useState(null);

  // Función para cargar los datos
  const listData = async () => {
    try {
      const data = await fetchEmpleados();
      console.log(data);
      setDatos(data);
      setDatosCargados(true);
    } catch (error) {
      setError(error.message);
    }
  };

  // Función para eliminar datos
  const eliminarDatos = async (id) => {
    try {
      await deleteEmpleado(id);
      listData(); // Recargar los datos después de eliminar
    } catch (error) {
      setError(error.message);
    }
  };

  // Efecto para cargar los datos al montar el componente
  useEffect(() => {
    listData();
  }, []);

  // Renderizado condicional
  if (!datosCargados) {
    return <div>Cargando datos...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="card">
      <div className="card-header">
        <Link className="btn btn-success" to={"/new-empleados"}>
          Agregar Empleado
        </Link>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nombre</th>
                <th scope="col">Correo</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {datos.map((dato) => (
                <tr key={dato.id}>
                  <td>{dato.id}</td>
                  <td>{dato.nombre}</td>
                  <td>{dato.correo}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <Link className="btn btn-warning" to={`/update-empleados/${dato.id}`}>
                        Editar
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => eliminarDatos(dato.id)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListEmpleados;