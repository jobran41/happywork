import React from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import LinearProgress from "@mui/material/LinearProgress";

import Typography from "@mui/material/Typography";
import Icon from "./icon";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const data = [
  {
    progress: 64,
    stats: "545",
    title: "Nombre d'utilisateurs",
    avatarIcon:
      "streamline:travel-wayfinder-toilet-sign-man-woman-toilet-sign-restroom-bathroom-user-human-person",
  },
  {
    progress: 59,
    title: "Male",
    stats: "256",
    avatarColor: "info",
    progressColor: "info",
    avatarIcon:
      "streamline:travel-wayfinder-toilet-sign-man-toilet-sign-restroom-bathroom-user-human-person-man-male",
  },
  {
    progress: 22,
    stats: "74",
    title: "Femelle",
    avatarColor: "error",
    progressColor: "error",
    avatarIcon: "mdi:women",
  },
];
function Dashboard() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  return (
    <>
      <Title>{f("dashboard")}</Title>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item>
            <CardContent>
              <Box sx={{ mt: 6, borderRadius: 1 }}>
                <Grid container spacing={6}>
                  {data.map((item, index) => (
                    <Grid item xs={12} sm={4} key={index}>
                      <Box
                        sx={{ mb: 2.5, display: "flex", alignItems: "center" }}
                      >
                        <Avatar
                          skin="light"
                          variant="rounded"
                          color={item.avatarColor}
                          sx={{ mr: 2, width: 50, height: 50 }}
                        >
                          <Icon fontSize="2.125rem" icon={item.avatarIcon} />
                        </Avatar>
                        <Typography sx={{ fontWeight: 500 }}>
                          {item.title}
                        </Typography>
                      </Box>
                      <Typography variant="h5" sx={{ mb: 2.5 }}>
                        {item.stats}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={item.progress}
                        color={item.progressColor}
                        sx={{ height: 4 }}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </CardContent>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item>
            <Box sx={{ mt: 6, borderRadius: 1 }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ mb: 2.5, display: "flex", alignItems: "center" }}>
                    <Avatar
                      skin="light"
                      variant="rounded"
                      color="error"
                      sx={{ mr: 2, width: 50, height: 50 }}
                    >
                      <Icon
                        fontSize="2.125rem"
                        icon="icon-park-outline:pregnant-women"
                      />
                    </Avatar>
                    <Typography sx={{ fontWeight: 500 }}>
                      Femmes enceintes
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2.5 }}>
                    70
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    color="error"
                    sx={{ height: 4 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
        <Grid item xs={6} md={6}>
          <Item>
            <Box sx={{ mt: 6, borderRadius: 1 }}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={12}>
                  <Box sx={{ mb: 2.5, display: "flex", alignItems: "center" }}>
                    <Avatar
                      skin="light"
                      variant="rounded"
                      color="error"
                      sx={{ mr: 2, width: 50, height: 50 }}
                    >
                      <Icon
                        fontSize="2.125rem"
                        icon="grommet-icons:restroom-women"
                      />
                    </Avatar>
                    <Typography sx={{ fontWeight: 500 }}>
                      Femmes non enceintes
                    </Typography>
                  </Box>
                  <Typography variant="h5" sx={{ mb: 2.5 }}>
                    70
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={60}
                    color="error"
                    sx={{ height: 4 }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Item>
        </Grid>
       
      </Grid>

      {/* <Grid container direction="row" p={1}>
        {cardsList.map(({ title, figure, color, icon }) => (
          <Grid key={title} p={1} item xs={12} sm={12} md={6} lg={3}>
            <Card title={title} figure={figure} color={color} icon={icon} />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" p={4}>
        <Grid
          item
          direction="row"
          xs={12}
          p={4}
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Button
            sx={{ fontSize: "0.7em", marginRight: "10px" }}
            variant="outlined"
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={openPicker ? "true" : undefined}
            onClick={handlePickerOpen}
          >
            {dateBtnMsg()}
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              resetFilters();
            }}
          >
            {f("resetFilters")}
          </Button>
        </Grid>

        {openPicker && (
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openPicker}
            onClose={handlePickerClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
            elevation={0}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <DatePickerRange
              onChange={onDateFilterChange}
              value={dateValue}
              handlePickerClose={handlePickerClose}
            />
          </Menu>
        )}
        {userIdMood && (
          <Grid item direction="row" xs={12} p={4}>
            <Title align="center">Mood for {userIdMood?.name}</Title>
          </Grid>
        )}
        {localMoods && <MoodsChart incomingData={localMoods} />}
      </Grid>

      <Grid container direction="row" p={2}>
        <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <List
            list={userslist}
            isLoading={isLoading}
            title="UTILISATEURS RECENTS"
            btnLabel="voir tous"
            setMood={setMood}
          />
        </Grid>
      </Grid> */}
    </>
  );
}

export default Dashboard;
