import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress
} from "@material-ui/core";

export default ({ text }) => {
  return (
    <Card style={{ backgroundColor: "transparent" }}>
      <CardContent>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid xs={12} container item justify="center">
            <Typography variant="subtitle1" gutterBottom>
              {text}
            </Typography>
          </Grid>
          <Grid xs={12} container item justify="center">
            <CircularProgress disableShrink style={{ color: "#e74c3c" }} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};