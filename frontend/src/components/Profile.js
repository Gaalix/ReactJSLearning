import { useContext, useEffect, useState } from "react";
import { UserContext } from "../userContext";
import { Navigate } from "react-router-dom";
import { Card } from "semantic-ui-react";

function Profile() {
  const userContext = useContext(UserContext);
  const [profile, setProfile] = useState({});

  useEffect(function () {
    const getProfile = async function () {
      const res = await fetch("http://localhost:3001/users/profile", {
        credentials: "include",
      });
      const data = await res.json();
      setProfile(data);
    };
    getProfile();
  }, []);

  return (
    <>
      {!userContext.user ? <Navigate replace to="/login" /> : ""}
      <Card centered className="card-login">
        <Card.Content>
          <Card.Header>User Profile</Card.Header>
          <Card.Description>
            <p>Username: {profile.username}</p>
            <p>Email: {profile.email}</p>
          </Card.Description>
        </Card.Content>
      </Card>
    </>
  );
}

export default Profile;
