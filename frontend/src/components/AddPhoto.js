import { useContext, useState } from "react";
import { Navigate } from "react-router";
import { Button, Form, Card } from "semantic-ui-react";
import { UserContext } from "../userContext";

function AddPhoto(props) {
  const userContext = useContext(UserContext);
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [message, setMessage] = useState(""); // Dodano stanje za message

  async function onSubmit(e) {
    e.preventDefault();

    if (!name) {
      alert("Vnesite ime!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("message", message);
    formData.append("image", file);
    const res = await fetch("http://localhost:3001/photos", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();

    setUploaded(true);
  }

  return (
    <Card centered className="card-login">
      <Card.Content>
        <Form className="form-group" onSubmit={onSubmit}>
          {!userContext.user ? <Navigate replace to="/login" /> : ""}
          {uploaded ? <Navigate replace to="/" /> : ""}
          <Form.Field>
            <label>Ime slike</label>
            <Form.Input
              type="text"
              name="ime"
              placeholder="Ime slike"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Opis slike</label>
            <Form.Input
              type="text"
              name="message"
              placeholder="Opis slike"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <label>Izberi sliko</label>
            <input
              type="file"
              id="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
              }}
            />
          </Form.Field>
          <Button type="submit" color="blue">
            Naloži
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
}

export default AddPhoto;
