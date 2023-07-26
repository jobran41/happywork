import * as React from "react";
import Box from "@mui/material/Box";
import MuiCard from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import styles from "./Card.module.scss";

const Card = ({
  title = "Total Users",
  figure = 0,
  color = "purple",
  icon = <PersonOutlineIcon />,
}) => (
  <MuiCard className={styles.card}>
    <div
      className={styles.card_iconContainer}
      style={{ backgroundColor: color }}
    >
      {icon}
    </div>
    <Box className={styles.card_contentContainer}>
      <CardContent sx={{ flex: "1 0 auto" }}>
        <Typography component="div" variant="h6" noWrap>
          {title}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" component="div">
          {figure}
        </Typography>
      </CardContent>
    </Box>
  </MuiCard>
);

export default Card;
