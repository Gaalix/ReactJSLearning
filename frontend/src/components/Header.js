import React, { useContext } from "react";
import { UserContext } from "../userContext";
import { Link } from "react-router-dom";
import { Menu } from "semantic-ui-react";

function Header(props) {
  const context = useContext(UserContext);

  return (
    <Menu inverted>
      <Menu.Item header>{props.title}</Menu.Item>
      <Menu.Item as={Link} to="/">
        Home
      </Menu.Item>
      {context.user ? (
        <>
          <Menu.Item as={Link} to="/publish">
            Publish
          </Menu.Item>
          <Menu.Item as={Link} to="/profile">
            Profile
          </Menu.Item>
          <Menu.Item as={Link} to="/logout">
            Logout
          </Menu.Item>
        </>
      ) : (
        <>
          <Menu.Item as={Link} to="/login">
            Login
          </Menu.Item>
          <Menu.Item as={Link} to="/register">
            Register
          </Menu.Item>
        </>
      )}
    </Menu>
  );
}

export default Header;
