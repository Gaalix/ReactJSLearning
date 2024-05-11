import React, { useState } from "react";
import { Comment, Header, Form, Button, TextArea } from "semantic-ui-react";

function CommentForm({ photo, updatePhoto, user }) {
  const [comment, setComment] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!user) {
      alert("You need to be logged in to comment");
      return;
    }

    const trimmedComment = comment.trim();
    if (!trimmedComment) {
      alert("Comment cannot be empty");
      return;
    }

    fetch(`http://localhost:3001/photos/${photo._id}/comment`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: comment, postedBy: user._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        updatePhoto(data);
      });

    setComment("");
  };

  return (
    <Comment.Group>
      <Header as="h3" dividing>
        Comments
      </Header>

      {photo.comments.map((comment) => (
        <Comment key={comment._id}>
          <Comment.Content>
            <Comment.Author as="a">{comment.postedBy.username}</Comment.Author>
            <Comment.Metadata>
              <div>{new Date(comment.date).toLocaleString()}</div>
            </Comment.Metadata>
            <Comment.Text>{comment.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      ))}

      <Form reply onSubmit={handleSubmit}>
        <TextArea
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <Button content="Add Reply" labelPosition="left" icon="edit" primary />
      </Form>
    </Comment.Group>
  );
}

export default CommentForm;
