import React from 'react';
import { Link } from 'react-router-dom';
import MyNavbar from '../components/MyNavbar';

function AboutPage() {
  return (
    <div>
      
      <div className="about-body">
        <div className="about-container">
          <div>
            <h2>Oriol</h2>
            <p>
              Oriol es un talentoso creador de juegos de mesa, conocido por su habilidad para diseñar experiencias estratégicas e inmersivas. Su enfoque innovador en la mecánica del juego y la narrativa temática ha capturado la atención de entusiastas de los juegos de mesa en todo el mundo. Con una pasión por la creatividad y un compromiso con la calidad, Oriol continúa elevando los estándares en la industria de los juegos de mesa.
            </p>
          </div>
          <Link to="/">
            <button className="button">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
