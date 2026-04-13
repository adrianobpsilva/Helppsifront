// src/Paginas/Perfil/Perfil.js
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Rodape from "../../Componentes/Rodape";
import Menu from "../../Componentes/Menu";
import "../../Paginas/Perfil/Perfil.css";

export default function Perfil() {
  // ✅ CORRETO: pegar user e login (não usuario/cadastrar)
  const { user, login, logout } = useContext(AuthContext);

  // ✅ fallback para não perder login ao atualizar página
  const usuario = user || JSON.parse(localStorage.getItem("user"));

  const [editando, setEditando] = useState(false);
  const [dados, setDados] = useState(usuario || {});

  const salvar = () => {
    // ✅ atualiza contexto + localStorage
    login(dados);
    setEditando(false);
  };

  // ✅ proteção de rota
  if (!usuario) return <p>Você precisa fazer login.</p>;

  return (
    <>
      <Menu />
      <div className="perfil-container">
        <h2>Meu Cadastro</h2>

        {editando ? (
          <form className="perfil-form">
            <div className="form-group">
              <label>Nome</label>
              <input
                className="form-control"
                value={dados.nome || ""}
                onChange={(e) =>
                  setDados({ ...dados, nome: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                value={dados.email || ""}
                onChange={(e) =>
                  setDados({ ...dados, email: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>CRP</label>
              <input
                className="form-control"
                value={dados.crp || ""}
                onChange={(e) =>
                  setDados({ ...dados, crp: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Telefone</label>
              <input
                className="form-control"
                value={dados.telefone || ""}
                onChange={(e) =>
                  setDados({ ...dados, telefone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>CEP</label>
              <input
                className="form-control"
                value={dados.cep || ""}
                onChange={(e) =>
                  setDados({ ...dados, cep: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Cidade</label>
              <input
                className="form-control"
                value={dados.cidade || ""}
                onChange={(e) =>
                  setDados({ ...dados, cidade: e.target.value })
                }
              />
            </div>

            <button
              type="button"
              className="btn btn-primary"
              onClick={salvar}
            >
              Salvar
            </button>
          </form>
        ) : (
          <div className="perfil-dados">
            <p><b>Nome:</b> {usuario.nome}</p>
            <p><b>Email:</b> {usuario.email}</p>
            <p><b>CRP:</b> {usuario.crp}</p>
            <p><b>Telefone:</b> {usuario.telefone}</p>
            <p><b>CEP:</b> {usuario.cep}</p>
            <p><b>Cidade:</b> {usuario.cidade}</p>

            <button
              className="btn btn-secondary"
              onClick={() => setEditando(true)}
            >
              Editar
            </button>
          </div>
        )}

        <button className="btn btn-danger mt-3" onClick={logout}>
          Sair
        </button>
      </div>
      <Rodape />
    </>
  );
}