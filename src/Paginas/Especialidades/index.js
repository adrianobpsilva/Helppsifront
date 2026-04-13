import React from "react";
import Menu from "../../Componentes/Menu";
import Rodape from "../../Componentes/Rodape";
import "../../Paginas/Especialidades/especialidades.css";

const abordagens = [
  { nome: "Psicanálise", resumo: "Foca no inconsciente e nos conflitos internos que influenciam pensamentos e comportamentos.", cor: "#f8c8dc", icone: "🧠" },
  { nome: "Humanista", resumo: "Centra-se no potencial de crescimento, autonomia e autorrealização do indivíduo.", cor: "#c8e7f8", icone: "🌱" },
  { nome: "TCC", resumo: "Combina pensamentos e comportamentos para modificar padrões disfuncionais.", cor: "#d6f8c8", icone: "📝" },
  { nome: "Sistêmica / Familiar", resumo: "Foca nas relações familiares e nos sistemas que influenciam o indivíduo.", cor: "#f8e3c8", icone: "🏠" },
  { nome: "Gestalt", resumo: "Valoriza a percepção no presente, considerando experiências como um todo.", cor: "#e3c8f8", icone: "🎨" },
  { nome: "Analítica / Junguiana", resumo: "Estuda símbolos, arquétipos e o inconsciente coletivo.", cor: "#c8f0f8", icone: "🔮" },
  { nome: "Comportamental", resumo: "Foca em comportamentos observáveis e técnicas de modificação de comportamento.", cor: "#f8c8c8", icone: "⚙️" },
  { nome: "Existencial", resumo: "Explora questões da existência humana: liberdade, responsabilidade e sentido da vida.", cor: "#c8f8e8", icone: "🌌" },
];

export default function Especialidades() {
  return (
    <>
      <Menu />
      <div className="especialidades-container">
        <h1 className="titulo-principal">Especialidades em Psicologia Clínica</h1>
        <div className="cards-container">
          {abordagens.map((ab, index) => (
            <div key={index} className="flip-card">
              <div className="flip-card-inner" style={{ backgroundColor: ab.cor }}>
                <div className="flip-card-front">
                  <div className="icone">{ab.icone}</div>
                  <h3>{ab.nome}</h3>
                </div>
                <div className="flip-card-back">
                  <p>{ab.resumo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Rodape />
    </>
  );
}
