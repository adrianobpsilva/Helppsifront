// src/Pages/Resultado.jsx (ou similar)

import React from 'react';
import { useLocation } from 'react-router-dom'; // Se você usa react-router-dom

import MapaResultados from '../../Componentes/Mapa/MapaResultado'; // AJUSTE O CAMINHO
import Rodape from '../../Componentes/Rodape';
import Menu from '../../Componentes/Menu';
import Cabecalho from '../../Componentes/Cabecalho';

function Resultado() {
    // 1. Extrair a cidade da URL (depende de como seu React lida com as rotas)
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const cidade = params.get('cidade');
    
    return (
        <div>
            <Menu/>
                        
            <div className="conteudo-principal">
                
                
                {/* 2. Incluir o novo componente do Mapa, passando a cidade */}
                <MapaResultados cidade={cidade} /> 
                
            </div>
            
            <Rodape/>
        </div>
    );
}

export default Resultado;