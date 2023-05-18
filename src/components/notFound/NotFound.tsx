import React from "react";
import { Box, Typography } from "@mui/material";

const NotFound: React.FC<{
  content?: string;
}> = ({ content }) => {
  return (
    <Box display="flex" width="100%" justifyContent="center" marginTop="50px">
      <Typography variant="h4">
        {content ? content : "Don't have any result!!!"}
      </Typography>
    </Box>
  );
};

export default NotFound;
