// src/Components/MapaResultados.jsx

import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// -------------------------------------------------------------------
// 1. LÓGICA DE ICONES (O Leaflet tem um erro com icones no React)
// -------------------------------------------------------------------
// Fixa o caminho do ícone padrão para que o Leaflet consiga exibi-lo
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});
// -------------------------------------------------------------------

// URL do Backend (Ajuste a porta se necessário!)
const API_URL_BASE = 'http://localhost:8081/psicologos/cidade'; 

// Componente que irá centralizar e popular o mapa
function ChangeView({ center, zoom }) {
    const map = useMap();
    map.setView(center, zoom);
    return null;
}

export default function MapaResultados({ cidade }) {
    const [psicologos, setPsicologos] = useState([]);
    const [mapCenter, setMapCenter] = useState([-8.0578, -34.8827]); // Padrão: Centro de Recife
    const [zoomLevel, setZoomLevel] = useState(10);
    const [loading, setLoading] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        if (!cidade) {
            setLoading(false);
            return;
        }

        async function fetchPsicologos() {
            setLoading(true);
            setErro(null);
            
            try {
                const apiUrl = `${API_URL_BASE}?cidade=${cidade}`;
                const response = await fetch(apiUrl);

                if (!response.ok) {
                    throw new Error(`Erro de rede: ${response.status}`);
                }
                
                const data = await response.json();
                setPsicologos(data);
                
                // Centraliza no primeiro resultado, se houver
                if (data.length > 0 && data[0].latitude && data[0].longitude) {
                    setMapCenter([data[0].latitude, data[0].longitude]);
                    setZoomLevel(13); 
                }

            } catch (err) {
                console.error("Erro ao buscar psicólogos:", err);
                setErro("Erro ao buscar dados. Verifique o servidor Java e sua conexão.");
            } finally {
                setLoading(false);
            }
        }
        
        fetchPsicologos();
    }, [cidade]); // Re-executa sempre que a cidade muda
    
    // Trata estados de carregamento e erro
    if (loading) return <p>Carregando resultados e mapa...</p>;
    if (erro) return <p style={{color: 'red'}}>Erro: {erro}</p>;
    
    // 3. Renderiza o Mapa com os Resultados
    return (
        <div style={{ padding: '20px' }}>
            <h2>Psicólogos em  {cidade} ({psicologos.length})</h2>
            
            <MapContainer center={mapCenter} zoom={zoomLevel} style={{ height: '500px', width: '100%' }}>
                
                <ChangeView center={mapCenter} zoom={zoomLevel} />
                
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                
                {psicologos.map(psi => (
                    // Verifica se latitude e longitude existem antes de renderizar
                    psi.latitude && psi.longitude && (
                        <Marker key={psi.crp} position={[psi.latitude, psi.longitude]}>
                            <Popup>
                                <div style={{ textAlign: 'center' }}>
                                    {/* Ajuste o caminho da imagem se necessário */}
                                    <img src={psi.fotoUrl || '/images/default-psi.png'} alt="Foto" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                                    <h4>{psi.nome} (CRP: {psi.crp})</h4>
                                    <p>E-mail: {psi.email}</p>
                                    <p>Telefone: {psi.telefone}</p>
                                    <a href={psi.redeSocialUrl || '#'} target="_blank" rel="noopener noreferrer">Perfil/Contato</a>
                                </div>
                            </Popup>
                        </Marker>
                    )
                ))}
            </MapContainer>
            
            {/* Opcional: Lista dos resultados abaixo do mapa */}
           
            {psicologos.length === 0 && (
                <p style={{ marginTop: '10px' }}>Nenhum PSI encontrado em {cidade}.</p>
            )}
        </div>
    );
}