// src/services/empleados.js
export const fetchEmpleados = async () => {
  const response = await fetch("http://localhost/empleados-main/");
  if (!response.ok) throw new Error("Error al cargar los datos");
  
  return response.json();
};

export const fetchEmpleado = async (id) => {
  const response = await fetch(
    `http://localhost/empleados-main/?consultar=${id}`
  );
  if (!response.ok) throw new Error("Error al cargar los datos");
  return response.json();
};

export const newEmpleados = async (data) => {
  const response = await fetch("http://localhost/empleados-main/?insertar=1", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al crear el empleado");
  return response.json();
};

export const updateEmpleado = async (id, data) => {
  const response = await fetch(
    `http://localhost/empleados-main/?actualizar=${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Error al actualizar los datos");
  return response.json();
};

export const deleteEmpleado = async (id) => {
  const response = await fetch(
    `http://localhost/empleados-main/?borrar=${id}`,
    {
      method: "DELETE",
    }
  );
  if (!response.ok) throw new Error("Error al eliminar el empleado");
  return response.json();
};
