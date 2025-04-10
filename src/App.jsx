// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";
import "./App.css";

import ListEmpleados from "./components/ListEmpleados";
import NewEmpleados from "./components/NewEmpleados";
import UpdateEmpleados from "./components/UpdateEmpleados";

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand navbar-light bg-light">
        <div className="nav navbar-nav">
          <Link className="nav-item nav-link" to={"/list-empleados"}>
            Listar
          </Link>
          <Link className="nav-item nav-link" to={"/new-empleados"}>
            Agregar nuevooss
          </Link>
        </div>
      </nav>

      <br />

      <div className="container">
        <Routes>
          <Route path="/list-empleados" element={<ListEmpleados />} />
          <Route path="/new-empleados" element={<NewEmpleados />} />
          <Route path="/update-empleados/:id" element={<UpdateEmpleados />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;