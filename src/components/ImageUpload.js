import React, { useContext, useEffect, useState } from "react";
import "./imageUpload.styles.css";
const ImageUpload = (props) => {
  const initialState = props.initialState; //initialState is just blank-avatar hosted on ibb
  const [imageState, setImageState] = useState(() => null); //state and state-setter for image
  const [previewUrl, setPreviewUrl] = useState(() => initialState); //state and state-setter for img preview src url
  useEffect(() => {
    //useeffect doesn't run on the first go if no imagestate
    if (!imageState) {
      return;
    }
    const fileReader = new FileReader(); //lets us read files on the pc
    //As soon as it's done loading the file, set the preview img src url state to the result
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result); //setting src to result.
      props.setImage(fileReader.result.split("base64,")[1]); //passing the state upwards
    };
    console.log("inside useeffect");
    fileReader.readAsDataURL(imageState);
  }, [imageState]);
  //selected image handler
  const onChangeImageHandler = (event) => {
    console.log("inside onChangeImageHandler, a file has been chosen/changed");
    //as soon as the value of the <input type=file/> changes we grab the value which is an array of files.
    const filesArray = event.target.files; //grabbing array of files
    let imageFile;
    if (filesArray && filesArray.length === 1) {
      imageFile = filesArray[0];
      console.log(imageFile);
      setImageState(() => imageFile);
    } else {
      console.log("Accepts 1 file please.");
    }
  };
  return (
    <div className="form-control">
      <h7>
        {props.avatarImage
        //   ? "Welcome! Now lets get you a profile image!"
        //   : "Select an image for your Space"
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