import { Button } from "@mui/material";
import React from "react";
import moment from "moment";

const Comments = ({ comments, loading, onChange, onSubmit, currentUser }) => {
  if (loading) {
    return null;
  }
  return (
    <div>
      {comments.map((comment, index) => (
        <div key={index} className="commentTile">
          <h4>{comment.name}</h4>
          <p>{moment(comment.date).fromNow()}</p>
          <p>{comment.comment}</p>
        </div>
      ))}
      {currentUser !== null ? (
        <div>
          <input
            className="textBox"
            type="text"
            placeholder="Enter comment"
            name="commentText"
            onChange={onChange}
          />
          <Button
            name="commentText"
            className="textBoxButton"
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Comments;
