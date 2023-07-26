import * as React from "react";
import MuiList from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { Button, Grid, Skeleton } from "@mui/material";
import Title from "components/title";
import router from "next/router";

export default function List({
  title,
  btnLabel,
  list = [],
  isLoading = true,
  setMood,
}: {
  title: string;
  btnLabel: string;
  list: Array<any>;
  isLoading: boolean;
  setMood: (i: any) => void;
}) {
  const style = {
    // width: "100%",
    width: 500,
    bgcolor: "background.paper",
  };

  function diffWeeks(dt: any) {
    const dt1 = new Date(dt);
    const dt2 = new Date();
    let diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60 * 60 * 24 * 7;
    return Math.abs(Math.round(diff));
  }
  return isLoading ? (
    <>
      <Grid
        container
        direction="row"
        flexWrap="nowrap"
        justifyContent="space-between"
        alignItems="center"
        sx={style}
      >
        <Skeleton width="100%" />

        <Skeleton width="100%" />
      </Grid>
      <MuiList dense sx={style}>
        {[1, 2, 3, 4, 5].map((e) => (
          <ListItem key={e} disablePadding>
            <ListItemButton>
              <Skeleton variant="circular">
                <Avatar />
              </Skeleton>
            </ListItemButton>
            <ListItemButton>
              <Skeleton width="100%" />
            </ListItemButton>
            <ListItemButton>
              <Skeleton width="100%" />
            </ListItemButton>
          </ListItem>
        ))}
      </MuiList>
    </>
  ) : (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={style}
      >
        <Title>{title}</Title>
        <Button variant="contained" onClick={() => router.push("users")}>
          {btnLabel}
        </Button>
        <Button variant="outlined" onClick={() => setMood(undefined)}>
          Tous les humeurs
        </Button>
      </Grid>
      <MuiList dense sx={style}>
        {list.map(({ email, name, createdAt, id }) => {
          const labelId = `checkbox-list-secondary-label-${id}`;
          return (
            <>
              <ListItem key={id} disablePadding>
                <ListItemButton>
                  <ListItemAvatar onClick={() => router.push(`/users/${id}`)}>
                    <Avatar
                      alt={`Avatar n°${id + 1}`}
                      src="https://i.ibb.co/PTZJyrC/Ben-parker-Oh-KEl-Ok-Q3-RE-unsplash.jpg"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    secondary={email}
                    primary={`${name}`}
                    onClick={() => router.push(`/users/${id}`)}
                  />
                  <ListItemText
                    style={{ textAlign: "end" }}
                    id={labelId}
                    primary={`${diffWeeks(createdAt)} Weeks ago `}
                    onClick={() => router.push(`/users/${id}`)}
                  />
                  <ListItemText
                    style={{ textAlign: "end" }}
                    id={labelId}
                    primary={<Button variant="outlined">mood</Button>}
                    onClick={() => setMood({ id, name })}
                  />
                </ListItemButton>
              </ListItem>
            </>
          );
        })}
      </MuiList>
    </>
  );
}
