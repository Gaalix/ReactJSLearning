import React, { useState } from "react";
import { Button, Form, Message, Card } from "semantic-ui-react";
import "../photo.css";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:3001/users", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        username: username,
        password: password,
      }),
    });
    const data = await res.json();
    if (data._id !== undefined) {
      window.location.href = "/";
    } else {
      setUsername("");
      setPassword("");
      setEmail("");
      setError("Registration failed");
    }
  }

  return (
    <Card centered className="card-login">
      <Card.Content>
        <Form onSubmit={handleRegister} error={!!error}>
          <Form.Field>
            <label>Email</label>
            <Form.Input
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Username</label>
            <Form.Input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <Form.Input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Field>
          <Button type="submit" color="blue">
            Register
          </Button>
          {error && (
            <Message error header="Registration Failed" content={error} />
          )}
        </Form>
      </Card.Content>
    </Card>
  );
}

export default Register;
