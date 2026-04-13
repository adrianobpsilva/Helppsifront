import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./Login.css";
import Menu from "../../Componentes/Menu";
import Rodape from "../../Componentes/Rodape";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !senha) {
      alert("Preencha email e senha!");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login-psicologo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      // 🔴 DEBUG 1: ver status da resposta
      console.log("STATUS:", response.status);

      if (!response.ok) {
        const erro = await response.text();
        console.log("ERRO BACKEND:", erro); // 🔴 DEBUG 2
        throw new Error(erro);
      }

      const usuario = await response.json();

      // 🔴 DEBUG 3: ver o que veio do backend
      console.log("USUARIO LOGADO:", usuario);

      // 🔴 GARANTIA: só salva se veio algo válido
      if (!usuario) {
        alert("Erro ao receber usuário");
        return;
      }

      // salva no contexto + localStorage
      login(usuario);

      // 🔴 DEBUG 4: verificar se salvou
      console.log("LOCALSTORAGE:", localStorage.getItem("user"));

      // redireciona
      navigate("/perfil");

    } catch (error) {
      console.log("ERRO FINAL:", error.message); // 🔴 DEBUG 5
      alert(error.message);
    }
  };

  return (
    <>
      <Menu />

      <div className="login-container">
        <div className="login-box">
          <h2 className="login-title">Acesse sua conta</h2>

          <form onSubmit={handleLogin} className="login-form">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />

            <button type="submit">Entrar</button>
          </form>

          <p className="cadastro-link">
            Não tem conta?{" "}
            <span onClick={() => navigate("/cadastro2")}>
              Cadastre-se
            </span>
          </p>
        </div>
      </div>

      <Rodape />
    </>
  );
}