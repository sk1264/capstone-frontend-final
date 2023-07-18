import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Show.css';
import Figure from 'react-bootstrap/Figure';
import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';

function Show() {
  const [pixsly, setPixslyState] = useState(null);

  const [number, setNumber] = useState(5);
 
  const { id } = useParams();
  console.log(useParams());
  const url = `https://pixsly.onrender.com/pixsly/${id}`; 
 
  useEffect(() => {
    const fetchPixsly = async () => {
      console.log("going to fetch person with id of: ", id);
      try {
        const responseData = await fetch(url);
        const pixslyData = await responseData.json(); 
        console.log(pixslyData); 
        console.log(
          "Setting state, about to rerender..(not remount, just re-render)."
        );
        setPixslyState(pixslyData);
      } catch (error) {
        console.error(error);
      }
    };
    //this is the code that gets activated
    console.log("#2: inside useeffect...component mounted, now we are here.");

    fetchPixsly(); //fetching data and setting state
  }, [id, number]);

  return (
    <div className="show">
      {pixsly ? (
        <>
          <Figure className='img'>
            <Figure.Image className='img'
              width={271}
              height={280}
              alt="171x180"
              src={pixsly.image}
            />
            <Figure.Caption>
              <h2 className ='pixslyName'>{pixsly.name}</h2>
            </Figure.Caption>
          </Figure>

          <Accordion>
            <Accordion.Item eventKey="1">
              <Accordion.Header>Description:</Accordion.Header>
              <Accordion.Body>
                {pixsly.description}
              </Accordion.Body>
            </Accordion.Item>

          </Accordion>
          <Link to={`/${pixsly._id}/edit`}>
            <Button>EDIT</Button>
          </Link>
        </>
      ) : (
        "...loading"
      )}
    </div>
  );
}

export default Show;
