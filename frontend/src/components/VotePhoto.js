import React, { useContext } from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import { UserContext } from "../userContext";

function VotePhoto({ photo, updatePhoto, setPhotos, photos }) {
  const userContext = useContext(UserContext);

  const handleVote = (voteType) => {
    if (!userContext.user) {
      alert("You need to be logged in to vote");
      return;
    }

    fetch(`http://localhost:3001/photos/${photo._id}/${voteType}`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        updatePhoto(data);
      });
  };

  const handleReport = () => {
    if (!userContext.user) {
      alert("You need to be logged in to report");
      return;
    }

    fetch(`http://localhost:3001/photos/${photo._id}/report`, {
      method: "POST",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isVisible === false) {
          setPhotos(photos.filter((p) => p._id !== photo._id));
        } else {
          updatePhoto(data);
        }
      });
  };

  return (
    <Grid columns={3} divided>
      <Grid.Column>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => handleVote("like")}
        >
          <Button color="green">
            <Icon name="thumbs up" />
          </Button>
        </Button>
        <Button
          as="div"
          labelPosition="right"
          onClick={() => handleVote("dislike")}
        >
          <Button basic color="red">
            <Icon name="thumbs down" />
          </Button>
        </Button>
      </Grid.Column>
      <Grid.Column>
        <h2>{photo.likes}</h2>
      </Grid.Column>
      <Grid.Column>
        <Button as="div" labelPosition="right" onClick={handleReport}>
          <Button color="red">
            <Icon name="flag" />
          </Button>
        </Button>
      </Grid.Column>
    </Grid>
  );
}

export default VotePhoto;
