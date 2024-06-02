import React from "react";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import ExampleCarouselImage from "components/ExampleCarouselImage";

function UncontrolledExample({ filteredGames }) {
  return (
    <Carousel>
      {filteredGames.map((game) => (
        <Carousel.Item key={game._id}>
          <Link to={`/games/${game._id}`}>
            <img src={game.image} alt={game.title} width="200" />
            <Carousel.Caption>
              <h2>{game.title}</h2>
              <p>{game.description}</p>
              <p>{game.genre}</p>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
      <Carousel.Item>
        <ExampleCarouselImage text="Second slide" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <ExampleCarouselImage text="Third slide" />
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;

// sobrante lista de juegos
{
  /*<Row>
  {filteredGames &&
    filteredGames.length > 0 &&
    filteredGames.map((game) => (
      <Col xs={12} md={2} lg={4}>
        <Link to={`/games/${game._id}`} key={game._id}>
          <h2>{game.title}</h2>
          <p>{game.description}</p>
          <p>{game.genre}</p>
          <img src={game.image} alt={game.title} width="200" />
        </Link>
      </Col>
    ))}
</Row>*/
}

// sobrante lista de juegos
return (
  <Row>
    {filteredGames &&
      filteredGames.length > 0 &&
      filteredGames.map((game) => (
        <Col xs={12} md={2} lg={4} key={game._id}>
          <Link to={`/games/${game._id}`}>
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <p>{game.genre}</p>
            <img src={game.image} alt={game.title} width="200" />
          </Link>
        </Col>
      ))}
  </Row>
);
