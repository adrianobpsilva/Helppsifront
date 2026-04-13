import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../../Componentes/Formulario2/Formulario2.css';
import Menu from "../Menu";
import Rodape from "../Rodape";

const API_CADASTRO_URL = 'http://localhost:8081/cadastrar-psicologo'; // back-end agora recebe DTO + foto

export default function Formulario2() {
  const navigate = useNavigate();

  const [dados, setDados] = useState({
    nome: "",
    email: "",
    crp: 0,
    telefone: "",
    cidade: "",
    cep: "",
    senha: "",
    latitude: 0,
    longitude: 0,
    redeSocialUrl: "",
    fotoFile: null,
    humanista: false,
    psicanalise: false,
    tcc: false,
    gestalt: false,
    fenomenologia: false,
    sistemica: false,
  });

  // Reduz imagem (~400kb)
  const reduzirImagem = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        const MAX_WIDTH = 800;
        const scaleSize = MAX_WIDTH / img.width;
        canvas.width = MAX_WIDTH;
        canvas.height = img.height * scaleSize;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        let quality = 0.9;
        const compress = () => {
          canvas.toBlob(
            (blob) => {
              if (blob.size > 400 * 1024 && quality > 0.1) {
                quality -= 0.1;
                compress();
              } else {
                callback(blob);
              }
            },
            "image/jpeg",
            quality
          );
        };
        compress();
      };
    };
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "fotoFile" && files[0]) {
      reduzirImagem(files[0], (blobReduzido) => {
        setDados(prev => ({ ...prev, fotoFile: blobReduzido }));
      });
      return;
    }

    const finalValue = (name === 'crp' || name === 'latitude' || name === 'longitude') 
                       ? (value === '' ? 0 : Number(value)) 
                       : value;

    setDados(prev => ({ ...prev, [name]: finalValue }));
  };

  const buscarCep = async (cep) => {
    if (cep.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const data = await res.json();
        if (!data.erro) {
          setDados(prev => ({ ...prev, cep, cidade: data.localidade }));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP:", err);
      }
    }
  };

  const handleAbordagem = (e) => {
    const { value, checked } = e.target;
    const nomeCampoBackend = value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    setDados(prev => ({
      ...prev,
      [nomeCampoBackend]: checked
    }));
  };

  const verificarForcaSenha = (senha) => {
    if (senha.length < 6) return "Fraca";
    if (senha.match(/[A-Z]/) && senha.match(/[0-9]/) && senha.length >= 8)
      return "Forte";
    return "Média";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dados.fotoFile) {
      alert("Selecione uma foto");
      return;
    }

    const bodyData = new FormData();

    const dadosDTO = {
      nome: dados.nome,
      email: dados.email,
      senha: dados.senha,
      crp: dados.crp,
      telefone: dados.telefone,
      cep: dados.cep,
      cidade: dados.cidade,
      latitude: dados.latitude,
      longitude: dados.longitude,
      redeSocialUrl: dados.redeSocialUrl,
      humanista: dados.humanista,
      psicanalise: dados.psicanalise,
      tcc: dados.tcc,
      gestalt: dados.gestalt,
      fenomenologia: dados.fenomenologia,
      sistemica: dados.sistemica
    };

    bodyData.append("dados", new Blob([JSON.stringify(dadosDTO)], { type: "application/json" }));
    bodyData.append("foto", dados.fotoFile);

    try {
      const response = await fetch(API_CADASTRO_URL, {
        method: "POST",
        body: bodyData,
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        navigate(`/resultado?cidade=${dados.cidade}`);
      } else {
        const errorText = await response.text();
        alert(`Erro no cadastro: ${response.status}`);
        console.error("Erro de API:", errorText);
      }
    } catch (error) {
      alert("Erro de conexão. Verifique se o servidor está ativo.");
      console.error("Erro de fetch:", error);
    }
  };

  return (
    <>
      <Menu/>
      <div className="cadastro-container">
        <h2>Cadastro de Psicólogo</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Nome" name="nome" required value={dados.nome} onChange={handleChange} />
          <input type="email" placeholder="E-mail" name="email" required value={dados.email} onChange={handleChange} />
          <input type="text" placeholder="CRP" name="crp" required value={dados.crp === 0 ? '' : dados.crp} onChange={handleChange} />
          <input type="tel" placeholder="Telefone" name="telefone" value={dados.telefone} onChange={handleChange} />
          <input type="text" placeholder="CEP" name="cep" maxLength="8"
            value={dados.cep}
            onChange={e => { setDados({ ...dados, cep: e.target.value }); buscarCep(e.target.value); }} />
          <input type="text" placeholder="Cidade" name="cidade" value={dados.cidade} onChange={handleChange} />
          <input type="password" placeholder="Senha" name="senha" required onChange={handleChange} />
          <p>Força da senha: <strong>{verificarForcaSenha(dados.senha)}</strong></p>

          <h3>Dados do Mapa</h3>
          <input type="text" placeholder="Latitude" name="latitude" required value={dados.latitude === 0 ? '' : dados.latitude} onChange={handleChange} />
          <input type="text" placeholder="Longitude" name="longitude" required value={dados.longitude === 0 ? '' : dados.longitude} onChange={handleChange} />

          <h3>Mídia e Redes</h3>
          <input type="file" name="fotoFile" accept="image/*" required onChange={handleChange} />
          <input type="text" placeholder="URL da Rede Social (Opcional)" name="redeSocialUrl" value={dados.redeSocialUrl} onChange={handleChange} />

          <h3>Abordagens</h3>
          {["Humanista", "Psicanálise", "TCC", "Gestalt", "Fenomenológica", "Sistêmica"].map(
            (ab) => (
              <label key={ab}>
                <input type="checkbox" value={ab} checked={dados[ab.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")]} onChange={handleAbordagem} /> {ab}
              </label>
            )
          )}

          <button type="submit">Cadastrar</button>
        </form>
      </div>
      <Rodape/>
    </>
  );
}