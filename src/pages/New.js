import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import './New.css';
import ImageUpload from "../components/ImageUpload";

function NewPixslyFunc() {
  const [nameState, setNameState] = useState("");
  const [imageState, setImageState] = useState("");
  const [descriptionState, setDescriptionState] = useState("");
  const [image, setImage] = useState(() => "");
  const navigate = useNavigate();
  

  const onChangeHandler = (e, setValue) => {
    setValue(e.target.value);
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const newPixsly = {
      name: nameState,
      image,
      description: descriptionState,
    };
    console.log(newPixsly)

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPixsly),
    };
    console.log(options)

    const responseData = await fetch(
      "https://pixsly-backend.onrender.com/pixslys",
      options
    );

    const newPixslyObj = await responseData.json();
    console.log(newPixslyObj)

    navigate("/");
  };

  return (
    <Container className="new-pixsly">
      <Form onSubmit={onSubmitHandler}>
        <Form.Group className="mb-1" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            type="text"
            placeholder="Enter name"
            value={nameState}
            onChange={(e) => onChangeHandler(e, setNameState)}
          />
          <Form.Text className="text-muted">
            Add name
          </Form.Text>
        </Form.Group>

        <ImageUpload
        setImage={setImage}
        initialState="https://i.ibb.co/K94DwZc/empty.jpg"
      />

        <Form.Group className="mb-1" controlId="formImage">
          <Form.Label>Image</Form.Label>
          <Form.Control
            name="image"
            type="text"
            placeholder="Enter Image URL"
            value={imageState}
            onChange={(e) => onChangeHandler(e, setImageState)}
          />
        </Form.Group>

        <Form.Group className="mb-1" controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            placeholder="Description"
            value={descriptionState}
            onChange={(e) => onChangeHandler(e, setDescriptionState)}
          />

        </Form.Group>

        <Col className="d-flex justify-content-center">
          <Button className="btn-secondary" type="submit">Submit</Button>
        </Col>
      </Form>
    </Container>
  );
}

export default NewPixslyFunc;
