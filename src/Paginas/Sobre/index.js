import React from "react";
import Menu from "../../Componentes/Menu";
import Rodape from "../../Componentes/Rodape";
import Carrossel from "../../Componentes/Carrossel";
import "./sobre.css";

function Sobre() {
  return (
    <>
      <Menu />

      <section className="sobre-container">
        {/* Cabeçalho com efeito e imagem */}
        <div className="sobre-hero">
          <div className="overlay"></div>
          <div className="hero-content">
            <img src="help1.png" alt="Logo da Helppsi" className="logo" />
            <h1 className="titulo"></h1>
            <p className="subtitulo">
              Conectando você ao cuidado emocional que merece.
            </p>
          </div>
        </div>

        {/* Conteúdo principal */}
        <div className="sobre-conteudo container">
          <h2>Nosso Propósito</h2>
          <p>
            Cuidar da saúde mental é essencial. Nosso site conecta você aos
            melhores psicólogos de forma rápida, segura e acessível. Acreditamos
            que todos merecem acesso a um acompanhamento psicológico de
            qualidade, seja presencial ou online.
          </p>

          <h2>Como Atuamos</h2>
          <p>
            Aqui, você encontra profissionais de diferentes abordagens,
            especialidades e localidades. Nosso objetivo é facilitar sua jornada
            em direção ao autoconhecimento, equilíbrio emocional e bem-estar.
          </p>

          <h2>Nossa Missão</h2>
          <p>
            Seja para enfrentar momentos difíceis, lidar com ansiedade,
            depressão, estresse, traumas ou simplesmente se conhecer melhor,
            estamos aqui para ajudar você a encontrar o apoio que precisa. Seu
            bem-estar começa com um passo — e esse passo pode começar aqui.
          </p>
        </div>

      </section>

      <Rodape />
    </>
  );
}

export default Sobre;
