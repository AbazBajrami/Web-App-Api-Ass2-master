import React, { useContext } from "react";
import { MoviesContext } from "../../contexts/moviesContext";
import IconButton from "@material-ui/core/IconButton";
//import CancelIcon from '@mui/icons-material/Cancel';
import CancelIcon from "@material-ui/icons/Cancel";



const AddToDislikedIcon = ({ movie }) => {
  const context = useContext(MoviesContext);

  const handleAddToDisliked = (e) => {
    e.preventDefault();
    context.addToDisliked(movie);
  };
  return (
    <IconButton aria-label="add to disliked" onClick={handleAddToDisliked}>
      <CancelIcon  color="primary" fontSize="large" />
    </IconButton>
  );
};

export default AddToDislikedIcon;