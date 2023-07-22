import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import PixslyCard from '../components/PixslyCard';
import './Home.css';

function Home() {
  const centerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    textAlign: 'center',
    height: '100%',
  };

  const [pixslysData, setPixslysData] = useState([]);

  const fetchPixslys = async () => {
    const response = await fetch("https://pixsly-backend.onrender.com/pixslys");
    const data = await response.json();
    setPixslysData(data);
  };

  useEffect(() => {
    fetchPixslys();
  }, []);

  const pixslysMarkup = (
    <div style={centerStyle}>
      <Row xs={1} sm={2} md={3} lg={4} className="g-0 justify-content-center" style={{ margin: '2 auto' }}>
        {pixslysData.map((pixsly, index) => (
          <Col key={index} className="mb-4">
            <Card className="custom-card p-0">
              <Card.Img variant="top" src={pixsly.image} />
              <Card.Body>
                <Button variant="transparent btn-square btn-sm" as={Link} to={`/${pixsly._id}`}>...</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );

  let pixslyList;

  if (pixslysData) {
    pixslyList = pixslysData.map((pixsly, index) => {
      return <PixslyCard key={index} pixsly={pixsly} />;
    });
  }

  return (
    <div>
      {pixslysData.length > 0 ? pixslysMarkup : <div>Loading</div>}
    </div>
  );
}

export default Home;
