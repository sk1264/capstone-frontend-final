import React, { useEffect, useState } from "react";
import "./imageUpload.styles.css";

// This component serves as a reusable image upload feature with image preview functionality.
// The component takes a props parameter, which contains the following properties:

const ImageUpload = (props) => {
  const initialState = props.initialState; 
  // initialState: The initial state of the image preview.
  // setImage: A function to set the image preview.
  const [imageState, setImageState] = useState(() => null); 
  // A state variable used to store the selected image file.
  // A function to update the imageState variable. The initial state of imageState is set to null.
  const [previewUrl, setPreviewUrl] = useState(() => initialState);
  // A state variable used to store the URL of the image preview.
  // A function to update the previewUrl variable. The initial state of previewUrl is set to the value of initialState received as a prop.



  // The useEffect hook is used to handle side effects related to the imageState variable.
// It runs whenever the imageState changes.
// The effect is responsible for reading the selected image file, converting it to a data URL, and updating the preview.
// The fileReader.onload event handler is used to set the previewUrl state to the result of the file reading (data URL).
// The data URL is then split to extract the base64-encoded image data, which is passed to the setImage prop function.
  useEffect(() => {
    if (!imageState) {
      return;
    }
    const fileReader = new FileReader(); 
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); 
      props.setImage(fileReader.result.split("base64,")[1]);
    };
    console.log("inside useeffect");
    fileReader.readAsDataURL(imageState);
  }, [imageState]);


// This function is called whenever the user selects a file using the file input element.
// It updates the imageState with the selected image file for further processing.
// If the user selects multiple files, only the first file will be considered.
// The function also logs relevant information to the console for debugging purposes.
  const onChangeImageHandler = (event) => {
    console.log("inside onChangeImageHandler, a file has been chosen/changed");
    const filesArray = event.target.files;
    let imageFile;
    if (filesArray && filesArray.length === 1) {
      imageFile = filesArray[0];
      console.log(imageFile);
      setImageState(() => imageFile);
    } else {
      console.log("Accepts 1 file please.");
    }
  };

// The component returns the JSX elements to be rendered.
// The return block contains the HTML structure for the image upload feature.
// The <input> element is a file input where the user can select an image file. It triggers the onChangeImageHandler function when a file is chosen.
// The <div> with the class "image-upload" is used to control the layout. The class "center" is added conditionally based on the props.center value.
// The image preview area is displayed inside the "image-upload__preview" <div>.
// If there is a previewUrl, an <img> element with the image preview is shown.
// If there is no previewUrl, a paragraph saying "please pick an image" is displayed.
  return (
    <div className="form-control">
      <h7>
        {props.avatarImage
        }
      </h7>
      <input
        id={props.id}
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={(e) => onChangeImageHandler(e)}
      />
      <div id="prev"></div>
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="preview" />}
          {!previewUrl && <p>please pick an image</p>}
        </div>
      </div>
    </div>
  );
};
export default ImageUpload;