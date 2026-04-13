import Cabecalho from "../../Componentes/Cabecalho";
import Carrossel from "../../Componentes/Carrossel";
import Menu from "../../Componentes/Menu";
import Rodape from "../../Componentes/Rodape";

function Home() {
    return (
        <>
            <Menu/>
         <Carrossel/>
            <Cabecalho/>
            <Rodape/>
        </>
    )
}

export default Home;