import React, { useContext } from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { MoviesContext } from "../../contexts/moviesContext";

const RemoveFromDislikedIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleRemoveFromDisliked = (e) => {
    e.preventDefault();
    context.removeFromDislikedMovies(movie);
  };
  return (
    <IconButton
      aria-label="remove from disliked"
      onClick={handleRemoveFromDisliked}
    >
      <DeleteIcon color="primary" fontSize="large" />
    </IconButton>
  );
};

export default RemoveFromDislikedIcon;