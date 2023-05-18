import React from "react";
import { Box } from "@mui/material";
import loadingIcon from "../../assets/loading.gif";

const Loader = () => {
  return (
    <Box display="flex" width="100%" justifyContent="center" marginTop="50px">
      <Box component="img" src={loadingIcon} />
    </Box>
  );
};

export default Loader;
