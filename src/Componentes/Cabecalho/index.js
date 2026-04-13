import Carrossel from "../Carrossel";
import { Link } from "react-router-dom";
import cabecalho from "./cabecalho.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


function Cabecalho() {
  const [cidade, setCidade] = useState("");
  const navigate = useNavigate();

  const handleBuscar = (e) => {
    e.preventDefault();
    if (cidade.trim() === "") return;
    navigate(`/resultado?cidade=${cidade}`); // envia a cidade como parâmetro
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <form className="d-flex w-10 form-busca" onSubmit={handleBuscar}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Cidade"
          aria-label="Buscar PSI"
          value={cidade}
          onChange={(e) => setCidade(e.target.value)}
        />
        <button className="btn" type="submit">
          Buscar Psicólogo
        </button>
      </form>
    </div>
  );
}

export default Cabecalho;
