import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Col, Container, Row } from "react-bootstrap";
import "./ShowList.css"; // Import the CSS file

const ShowList = () => {
  const [shows, setShows] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Make API request to fetch shows
    fetch("https://api.tvmaze.com/search/shows?q=all")
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []);

  const handleSelectShow = (show) => {
    navigate(`/detail/${show.show.id}`);
  };

  return (
    <Container>
      <div className="list-title">
        <h1>Show List</h1>
      </div>

      <Row className="show-card-container">
        {shows.map((show) => (
          <Col key={show.show.id} sm={6} md={4} lg={3} className="show-card">
            <Card>
              {show.show.image && show.show.image.medium ? (
                <Card.Img
                  variant="top"
                  src={show.show.image.medium}
                  alt={show.show.name}
                />
              ) : (
                <div className="image-not-available">Image Not Available</div>
              )}
              <Card.Body className="show-card-body">
                <Card.Title className="show-title">{show.show.name}</Card.Title>
                <Card.Text className="show-genre">
                  Genre: {show.show.genres.join(", ")}
                </Card.Text>
                <Card.Text className="show-language">
                  Language: {show.show.language}
                </Card.Text>
                {show.show.rating && show.show.rating.average ? (
                  <Card.Text className="show-rating">
                    Rating: {show.show.rating.average}
                  </Card.Text>
                ) : (
                  <Card.Text className="show-rating">
                    Rating: Not Available
                  </Card.Text>
                )}
                <Button
                  className="show-details-button"
                  onClick={() => handleSelectShow(show)}
                >
                  View Details
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ShowList;
