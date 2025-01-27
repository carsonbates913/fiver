import './ImageUpload.css';

import { useState, useEffect } from 'react';

export default function ImageUpload(props) {

  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState();

  useEffect(() => {
    if(!file) {
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
      console.log(fileReader.result);
    }
    fileReader.readAsDataURL(file);
    console.log(file);
    console.log("check");
  }, [file])

  const handleSelectImage = (e) => {
    let selectedFile;
    let isFileValid = isValid;
    if(e.target.files && e.target.files.length === 1){
      selectedFile = e.target.files[0];
      setFile(selectedFile);
      isFileValid=true;
      setIsValid(true);
    }else {
      isFileValid=false;
      setIsValid(false);
    }
    props.onInput(props.id, selectedFile, isFileValid);
  }

  return (
    <div className={`image-upload ${props.className}`}>
      <label htmlFor={props.id}>Upload Image</label>
      <div className="image-upload__preview">
        {previewUrl && <img src={previewUrl}/>}
      </div>
      <input id={props.id} style={{display: "none"}} type="file" accept=".jpg,.png,.jpeg" onChange={handleSelectImage}/>
    </div>
  )
}