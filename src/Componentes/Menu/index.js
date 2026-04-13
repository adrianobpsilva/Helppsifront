import { Link } from "react-router-dom";
import menu from "./menu.css";

function Menu() {
  return (
    <nav className="navbar navbar-expand-sm bg- navbar-">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src="helpt1.png"
            alt="HELP PSI"
            width="auto"
            height="auto"
            className="d-inline-block align-text-top"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/sobre">Sobre</Link>
            </li>
            <li className="nav-item">
              {/* Alterado para abrir a tela de login */}
              <Link className="nav-link" to="/login">Cadastro</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/especialidades">Especialidades</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contato">Fale Conosco</Link>
            </li>
            </ul>
        </div>
      </div>
    </nav>
  );
}

export default Menu;
