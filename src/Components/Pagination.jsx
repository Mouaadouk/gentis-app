import React from "react";
import { IconButton, Tooltip } from "@material-ui/core";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

function Pagination({ handlePrevious, handleNext }) {
  return (
    <div>
      <IconButton onClick={handlePrevious}>
        <Tooltip title="go left">
          <ChevronLeftIcon />
        </Tooltip>
      </IconButton>
      <IconButton onClick={handleNext}>
        <Tooltip title="go right">
          <ChevronRightIcon />
        </Tooltip>
      </IconButton>
    </div>
  );
}

export default Pagination;
