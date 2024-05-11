import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Card, Image } from "semantic-ui-react";
import AddComment from "./addComment";
import { UserContext } from "../userContext";

function PhotoPage({ params }) {
  const { id } = useParams();
  const [photo, setPhoto] = useState(null);
  const { user } = React.useContext(UserContext);

  const updatePhoto = (updatedPhoto) => {
    setPhoto((prevPhoto) => ({
      ...prevPhoto,
      comments: updatedPhoto.comments,
    }));
  };

  useEffect(() => {
    const fetchPhoto = async () => {
      const res = await fetch(`http://localhost:3001/photos/${id}`);
      const data = await res.json();
      setPhoto(data);
    };
    fetchPhoto();
  }, [id]);

  if (!photo) {
    return <div>Loading...</div>; // or return null or some loading spinner
  }

  return (
    <Card fluid>
      <Image src={"http://localhost:3001/" + photo.path} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{photo.name}</Card.Header>
        <Card.Description>{photo.message}</Card.Description>
        <Card.Meta>
          Posted by: {photo.postedBy.username} <br></br> Date: {photo.date}
        </Card.Meta>
        <AddComment photo={photo} updatePhoto={updatePhoto} user={user} />
      </Card.Content>
    </Card>
  );
}

export default PhotoPage;
