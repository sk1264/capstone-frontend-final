import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import './Edit.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ImageUpload from '../components/ImageUpload';


function Edit() {

  const [pixsly, setPixslyState] = useState(null);
  const [number, setNumber] = useState(5);

  const [nameState, setNameState] = useState('');
  const [descriptionState, setDescriptionState] = useState('');
  const [imageUrlState, setImageUrlState] = useState('');
  const [image, setImage] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const url = `https://pixsly-backend.onrender.com/pixslys/${id}`; 

  useEffect(() => {
    const fetchPixsly = async () => {
      console.log("fetch with id of: ", id);
      try {
        const responseData = await fetch(url);
        const pixslyData = await responseData.json(); 
        console.log(pixslyData); 
        console.log(
          "Setting state, about to rerender."
        );
        setPixslyState(pixslyData);
      } catch (error) {
        console.error(error);
      }
    };

    console.log("Component mounted.");

    fetchPixsly(); //fetching data and setting state
  }, [id, number]);

  useEffect(() => {
    if (pixsly) {
      setNameState(pixsly.name);
      setDescriptionState(pixsly.description);
      setImageUrlState(pixsly.imageUrl);
    }
  }, [pixsly]);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const Edit = {
      name: nameState,
      description: descriptionState,
      imageUrl: imageUrlState,
      image
    };
    console.log(Edit);

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Edit),
    };

    try {
      const responseData = await fetch(url, options);
      const EditObj = await responseData.json();
      navigate(`/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onDeleteHandler = async (event) => {
    event.preventDefault();

    const options = {
      method: "DELETE",
    };

    try {
      const responseData = await fetch(url, options);
      const response = await responseData.json();
      navigate(`/`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="edit">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
  type="text"
  placeholder="Name"
  value={nameState}
  onChange={(e) => onChangeHandler(e, setNameState)}
  className="input-field"
/>
<Form.Label>Description</Form.Label>
<Form.Control
  type="text"
  placeholder="Description"
  value={descriptionState}
  onChange={(e) => onChangeHandler(e, setDescriptionState)}
  className="input-field"
/>

<ImageUpload
        setImage={setImage}
        initialState={imageUrlState}
      />
        </Form.Group>
        <Button variant="outline-secondary" type="submit" className="my-2 btn-sm">
          Submit
        </Button>
        <Button variant="outline-secondary" onClick={onDeleteHandler} className="my-2 btn-sm">
  Delete
        </Button>
      </Form>
    </div>
  )
}

export default Edit;
