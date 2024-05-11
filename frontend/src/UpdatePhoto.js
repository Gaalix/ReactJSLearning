import React, { useState } from "react";
import Photo from "./components/Photo";

function UpdatePhoto() {
  const [photo, setPhoto] = useState({});

  const updatePhoto = (updatedPhoto) => {
    setPhoto(updatedPhoto);
  };

  return <Photo photo={photo} updatePhoto={updatePhoto} />;
}

export default UpdatePhoto;
