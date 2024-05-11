import { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import Photo from "./Photo";

function Photos() {
  const [photos, setPhotos] = useState([]);

  const updatePhoto = (updatedPhoto) => {
    setPhotos(
      photos.map((photo) =>
        photo._id === updatedPhoto._id ? updatedPhoto : photo
      )
    );
  };

  useEffect(function () {
    const getPhotos = async function () {
      const res = await fetch("http://localhost:3001/photos");
      const data = await res.json();

      setPhotos(data);
    };
    getPhotos();
  }, []);

  return (
    <div className="photo-grid">
      <Grid columns={2}>
        {photos
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((photo) => (
            <Grid.Column key={photo._id}>
              <Photo
                photo={photo}
                updatePhoto={updatePhoto}
                setPhotos={setPhotos}
                photos={photos}
              />
            </Grid.Column>
          ))}
      </Grid>
    </div>
  );
}

export default Photos;
