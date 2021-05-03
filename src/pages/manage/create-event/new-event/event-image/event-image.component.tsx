import React from "react";

import { useUploadStyles } from "./event-image.styles";

import { Typography } from "@material-ui/core";

const ImageUploud = () => {
  const classes = useUploadStyles();

  return (
    <div className={classes.upload}>
      <Typography>Sorry! Image uploading is unavalible now.</Typography>
    </div>
  );
};

export default ImageUploud;
