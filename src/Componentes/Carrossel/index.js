import React from "react";
import "./carrossel.css"; // importa o CSS de estilização

export default function Carrossel() {
  return (
    <div className="container my-5">
      <div className="carrossel-wrapper">
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
          
          <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2"></button>
          </div>

          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="/p1.png" className="d-block w-100" alt="Primeira imagem"/>
            </div>
            <div className="carousel-item">
              <img src="/p5.png" className="d-block w-100" alt="Segunda imagem"/>
            </div>
            <div className="carousel-item">
              <img src="/p4.png" className="d-block w-100" alt="Terceira imagem"/>
            </div>
          </div>

          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon"></span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon"></span>
          </button>
        </div>
      </div>
    </div>
  );
}
