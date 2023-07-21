import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './Show.css';
import Figure from 'react-bootstrap/Figure';
import Button from 'react-bootstrap/Button';

function Show() {
  const [pixsly, setPixslyState] = useState(null);
  const { id } = useParams();
  const url = `http://localhost:8080/pixslys/${id}`;

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

    console.log("#2: inside useEffect...component mounted, now we are here.");
    fetchPixsly();
  }, [id, url]);

  return (
    <div className="show">
      {pixsly ? (
        <>
          <Figure className='img'>
            <Figure.Image
              className='img'
              style={{ display: 'block', margin: '0 auto' }}
              width={271}
              height={280}
              alt="171x180"
              src={pixsly.image}
            />
            <Figure.Caption>
              <h4 className='pixslyName'>{pixsly.name}</h4>
            </Figure.Caption>
            <Figure.Caption>
              <h7 className='pixslyDescription'>{pixsly.description}</h7>
            </Figure.Caption>
          </Figure>
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
