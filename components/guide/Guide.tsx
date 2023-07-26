import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
/* import Link from "@mui/material/Link"; */
import FilePresentIcon from "@mui/icons-material/FilePresent";
import FolderIcon from "@mui/icons-material/Folder";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  GlobalStyles,
  IconButton,
  InputBase,
  Modal,
  Paper,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

import Copyright from "../../theme/Copyright";

import styles from "./Guide.module.scss";

export default function Guide() {
  const router = useRouter();
  // const [open, setOpen] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [search, setSearch] = React.useState("");
  const [searchContent, setSearchContent] = React.useState("");
  const [currentCard, setCurrentCard] = React.useState({
    id: null,
    title: "",
    content: [],
    video: "",
    items: 0,
  });

  const handleSearchContent = (e: any) => {
    setSearchContent(e.target.value);
  };
  const handleClickSearch = () => {
    setSearch(searchContent);
  };

  const handleClickClear = () => {
    setSearch("");
    setSearchContent("");
  };

  const handleOpenModal = (card: any) => {
    setOpenModal(true);
    setCurrentCard(card);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };
  // const handleOpenPopUp = (e) => {};

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const BringMeHome = () => {
    router.push("/");
  };
  /*  const footers = [
    {
      title: "Notre Entreprise",
      description: ["Equipe", "Histoire", "Contactez-nous", "Emplacements"],
    },
    {
      title: "Caractéristiques",
      description: [
        "Des trucs cool",
        "Des caractéristiques aléatoire",
        "Des caractéristiques d'équipe",
        "Des trucs des développeurs",
        "Une autre….",
      ],
    },
    {
      title: "Ressources",
      description: [
        "Ressource",
        "Nom de la ressource",
        "Une autre ressource",
        "Ressource finale",
      ],
    },
    {
      title: "Juridique",
      description: ["Politique de confidentialité", "Conditions d'utilisation"],
    },
  ]; */
  const footerWithMenuMode = true;
  const Footer = () =>
    footerWithMenuMode ? (
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: () => `1px solid black`,
          mt: 8,
          py: [3, 6],
        }}
      >
        {/*     <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid> */}
        <Copyright sx={{ mt: 5 }} />
      </Container>
    ) : (
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          mt: 25,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
    );

  const i = 0;
  const cards = [
    {
      id: i + 1,
      title: "Auth",
      content: ["Installation"],
      video: " https://www.youtube.com/embed/H2KilFIdG5g",
      items: 1,
    },
    {
      id: i + 2,
      title: "Setting",
      content: ["Installation"],
      video: "https://www.youtube.com/embed/cWsS8JT9Uo4",
      items: 1,
    },
    {
      id: i + 3,
      title: "Profile",
      content: [],
      video: "https://www.youtube.com/embed/cyXbATVzIN0",
      items: 3,
    },
    {
      id: i + 4,
      title: "Mood",
      content: [],
      video: "https://www.youtube.com/embed/Jez25fCdfic",
      items: 3,
    },
    {
      id: i + 5,
      title: "Innovation",
      content: [],
      items: 3,
      video: "https://www.youtube.com/embed/pU6CwfaGg6A",
    },

    {
      id: i + 6,
      title: "Groupe de Discussion",
      content: [],
      items: 3,
      video: "https://www.youtube.com/embed/JzqRob88yD4",
    },

    {
      id: i + 7,
      title: "Formulaire",
      content: [],
      items: 3,
      video: "https://www.youtube.com/embed/-FdnZcJZ_E0",
    },

    {
      id: i + 8,
      title: "Setting d'entreprise",
      content: [],
      items: 3,
      video: "https://www.youtube.com/embed/8bKfwFGmLZo",
    },
  ];
  const regex = new RegExp(search, "gi");

  return (
    <>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button color="inherit" onClick={BringMeHome}>
              {f("homeTitle")}
            </Button>
          </Typography>
          <Button color="inherit">{f("goToDashboard")}</Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "#e7e7e7",
            pt: footerWithMenuMode ? 8 : 20,
            minHeight: 250,
            pb: 6,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            component="div"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 500,
            }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1 }}
              placeholder="Search"
              inputProps={{ "aria-label": "search google maps" }}
              onChange={handleSearchContent}
              value={searchContent}
            />
            <IconButton
              onClick={handleClickClear}
              sx={{ p: "10px" }}
              aria-label="clear"
            >
              {searchContent && <ClearIcon />}
            </IconButton>
            <IconButton
              onClick={handleClickSearch}
              sx={{ p: "10px" }}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </Box>
        {/* End hero unit */}
        <Grid
          container
          p={1}
          spacing={2}
          direction="row"
          justifyContent="center"
          alignItems="baseline"
        >
          {cards
            .filter(
              (e) =>
                e.title.match(regex) ||
                e.content.filter((y) => y.match(regex)).length !== 0
            )
            .map((card) => (
              <Grid
                item
                display="flex"
                justifyContent="center"
                alignItems="center"
                p={2}
                xs={12}
                sm={6}
                md={4}
                lg={3}
                key={card.id}
              >
                <Card sx={{ width: 345 }}>
                  <CardActionArea>
                    <CardContent>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: 10,
                        }}
                      >
                        <FolderIcon style={{ color: "#1a4493d9" }} />
                        <Typography p={2} color="#1a4493d9" variant="h6">
                          {card.title}
                        </Typography>
                        <p className={styles.guide_items}>{card.items}</p>
                      </div>
                      <p>
                        {card.content.map((e) => (
                          <div key={e} className={styles.guide_itemsContent}>
                            <span>
                              <FilePresentIcon />
                            </span>
                            {e}
                          </div>
                        ))}
                      </p>
                    </CardContent>
                  </CardActionArea>

                  <CardActions>
                    <Button onClick={() => handleOpenModal(card)}>
                      Voir de plus
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
        </Grid>
        {openModal && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div className="videoWrapper">
                {currentCard && (
                  <iframe
                    width="500"
                    height="300"
                    src={currentCard?.video}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
            </Box>
          </Modal>
        )}
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </>
  );
}
