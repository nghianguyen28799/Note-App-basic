import { Box, Typography } from "@mui/material";
import React from "react";

const NotFound = () => {
  return (
    <Box>
      <Typography variant="h3">Oops!</Typography>
      <Typography variant="body1">Sorry, an unexpected error has occurred</Typography>
      <Typography variant="body1">Not Found!</Typography>
    </Box>
  );
};

export default NotFound;
