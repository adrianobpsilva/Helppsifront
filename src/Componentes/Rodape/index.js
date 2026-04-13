import rodape from "./rodape.css";


function Rodape () {
    return(
       <>
<footer className="mt-auto">
  <div className="container">
    <div className="row">
      <div className="col-md-4 mb-3">
        <h5></h5>
      </div>
      </div>
   
   
  </div>
  <div className="footer-social mt-3">
  <a href="https://www.instagram.com/sua_pagina" target="_blank" rel="noopener noreferrer" className="me-3">
    <i className="fab fa-instagram fa-2x" style={{ color: '#C13584' }}></i>
  </a>
  <a href="https://wa.me/5581987321465" target="_blank" rel="noopener noreferrer" className="me-3">
    <i className="fab fa-whatsapp fa-2x" style={{ color: '#25D366' }}></i>
  </a>
  <a href="https://www.linkedin.com/in/seu-perfil" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-linkedin fa-2x" style={{ color: '#0077B5' }}></i>
  </a>
  <a href="mailto:helppsite@gmail.com" className="me-3">
  <i className="fas fa-envelope fa-2x" style={{ color: '#D44638' }}></i>
</a>
</div>
 <div className="row">
      <div className="col-md-15 mb-1 text-center">
        <p>&copy; Desenvolvido por: Adriano Silva, Cleidson França, Emerson José, Guilherme Silva, João Victor</p>
      </div>
    </div>
</footer>
      
       </> 
    )
}

export default Rodape;