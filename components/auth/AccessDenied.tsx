import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import MuiLink from "@mui/material/Link";

import { NEXT_PUBLIC_BASE_URL } from "config";

const MultiActionAreaCard = () => (
  <Card sx={{ maxWidth: "30%", margin: "0 auto", marginTop: 20 }}>
    <CardActionArea>
      <CardMedia
        component="img"
        image="https://play-lh.googleusercontent.com/-6dakpztvyWe8BfTpvCjbjSo7qTspcSiRaYhRHRgvIzbOrBRyOKLK4IlITk26RTulII"
        alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Error Code 403
        </Typography>
        <Typography variant="body2" color="text.secondary">
          vous n avez pas la permission de voir cette page
        </Typography>
      </CardContent>
    </CardActionArea>
    <CardActions>
      <Button size="small" color="primary">
        <MuiLink color="inherit" href={`${NEXT_PUBLIC_BASE_URL}`}>
          HappyWork
        </MuiLink>{" "}
      </Button>
    </CardActions>
  </Card>
);

export default MultiActionAreaCard;
