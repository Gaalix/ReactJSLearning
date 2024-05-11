import React from "react";
import { Card, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import VotePhoto from "./VotePhoto";
import "../photo.css";

function Photo({ photo, updatePhoto, setPhotos, photos }) {
  return (
    <Card className="photo-card">
      <Link to={`/photo/${photo._id}`} className="image">
        <Image
          src={"http://localhost:3001/" + photo.path}
          wrapped
          ui={false}
          style={{ cursor: "pointer" }}
          className="image"
        />
      </Link>
      <Card.Content>
        <Card.Header>{photo.name}</Card.Header>
        <Card.Description>{photo.message}</Card.Description>
        <Card.Meta>
          Posted by: {photo.postedBy.username} <br></br> Date: {photo.date}{" "}
        </Card.Meta>
      </Card.Content>
      <Card.Content extra>
        <VotePhoto
          photo={photo}
          updatePhoto={updatePhoto}
          setPhotos={setPhotos}
          photos={photos}
        />
      </Card.Content>
    </Card>
  );
}

export default Photo;
