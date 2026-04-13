import "./formulario.css";

const DESTINATION_EMAIL = "helppsioficial@gmail.com";

function Formulario() {
  const formActionUrl = `https://formsubmit.co/${DESTINATION_EMAIL}`;
  
  return (
    <div className="form-container">
      <form action={formActionUrl} method="POST">
        <div className="form-group">
          <label htmlFor="nome">Digite seu nome</label>
          <input
            type="text"
            name="nome"
            className="form-control"
            id="nome"
            placeholder="Seu nome"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Endereço de email</label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            placeholder="nome@exemplo.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="mensagem">Digite sua mensagem</label>
          <textarea
            className="form-control"
            name="mensagem"
            id="mensagem"
            rows="4"
            placeholder="Sua mensagem..."
            required
          ></textarea>  
        </div>

        {/* Campos ocultos para controle */}
        <input type="hidden" name="_captcha" value="false" />
        <input type="hidden" name="_next" value="https://seusite.com/obrigado" />

        <button type="submit" className="btn-salvar">
          Enviar
        </button>
      </form>
    </div>
  );
}

export default Formulario;
