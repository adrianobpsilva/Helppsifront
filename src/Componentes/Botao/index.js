

function Botao ({cor, nome, funcao}) {
    return(
<>


    <button type="button" className={`btn btn-${cor}`} onClick={funcao}>{nome} </button>
</>
    )
}

export default Botao;
