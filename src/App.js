import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// Componentes
import Botao from './Componentes/Botao';
import Cabecalho from './Componentes/Cabecalho';
import Carrossel from './Componentes/Carrossel';
import Menu from './Componentes/Menu';
import Rodape from './Componentes/Rodape';
import Formulario from './Componentes/Formulario';
import Formulario2 from './Componentes/Formulario2';
import ProtectedRoute from './Componentes/ProtectedRoute';

// Páginas
import Home from './Paginas/Home';
import Sobre from './Paginas/Sobre';
import Contato from './Paginas/Contato';
import Cadastro from './Paginas/Cadastro';
import Psicologos from './Paginas/Psicologos';
import Especialidades from './Paginas/Especialidades';
import Resultado from './Paginas/Resultado';
import Adm from './Paginas/Adm';
import Login from './Paginas/Login';
import Perfil from './Paginas/Perfil';

// Contexto (IMPORTANTE)
import { AuthProvider } from './context/AuthContext';

// CSS externo
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          {/* Rotas públicas */}
          <Route path='/' element={<Home />} />
          <Route path='Sobre' element={<Sobre />} />
          <Route path='Contato' element={<Contato />} />
          <Route path='Home' element={<Home />} />
          <Route path='Cadastro' element={<Cadastro />} />
          <Route path='Carrossel' element={<Carrossel />} />
          <Route path='Cabecalho' element={<Psicologos />} />
          <Route path='resultado' element={<Resultado />} />
          <Route path='especialidades' element={<Especialidades />} />
          <Route path='Adm' element={<Adm />} />
          <Route path='login' element={<Login />} />
          <Route path='cadastro2' element={<Formulario2 />} />

          {/* 🔒 ROTA PROTEGIDA */}
          <Route 
            path='perfil' 
            element={
              <ProtectedRoute>
                <Perfil />
              </ProtectedRoute>
            } 
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;