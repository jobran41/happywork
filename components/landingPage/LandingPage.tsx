import React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
/* import Link from "@mui/material/Link"; */
import Modal from "@mui/material/Modal";
import {
  FormControl,
  GlobalStyles,
  Input,
  InputAdornment,
} from "@mui/material";
import Title from "components/title";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { NEXT_PUBLIC_KEYCLOAK_REALM } from "config";

import Copyright from "../../theme/Copyright";

export interface myFormType {
  email: string;
  password: string;
  name: string;
  phone: string;
  company: string;
}

export default function LandingPage() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const defaultRealm = React.useMemo(
    () => NEXT_PUBLIC_KEYCLOAK_REALM || "",
    []
  );

  const [realm, setRealm] = React.useState(defaultRealm);

  const [myForm, setForm] = React.useState<myFormType>({
    email: "",
    password: "",
    name: "",
    phone: "",
    company: "",
  });

  /* 
  const { mutate } = useMutation(createRealm, {
    onSuccess: () => {
      toast.success("Successfully updated !");
    },
    onError: (error: any) => {
      toast.error(`cannot update  !\n${error.message}`);
    },
  });
*/

  const login = () => {
    // localStorage.setItem("realm", realm);
    router.push("/dashboard");
  };

  const goClient = () => {
    // localStorage.setItem("realm", realm);
    router.push(`client/${realm}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const BringMeHome = () => {
    router.push("/");
  };
  const bringMeToGuide = () => {
    router.push("/guide");
  };
  /*   const footers = [
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
        "Une autre…",
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
        {/*    <Grid container spacing={4} justifyContent="space-evenly">
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

  const sections = [
    {
      id: 1,
      h: "What is Lorem Ipsum?",
      img: "https://i.postimg.cc/G2cpzLQf/img2.jpg",
      p: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      btn: "Commencer",
      lr: "l",
    },
    {
      id: 2,
      h: "Where does it come from?",   
      img: "https://i.postimg.cc/5yWjvBrw/img3.jpg",
      p: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      lr: "r",
    },
    {
      id: 3,
      h: "Where does it come from?",
      img: "https://i.postimg.cc/L885z6x0/img4.jpg",
      p: " Dès que l'employé se connecte, une popup apparaît pour lui demander son humeur.  Ce module permet de suivre l'humeur des employés et indirectement de suivre leur assiduité. L'objectif principal de ce module est d'assurer la meilleure performance des employés. En fonction des résultats de son test d'humeur, on peut décider de la mesure de sa motivation, une humeur négative récurrente signale à l'entreprise qu'une assistance thérapeutique/financière...etc peut être nécessaire pour résoudre son problème. ",
      lr: "l",
    },
    {
      id: 4,
      h: "Where can I get some?",
      img: "https://i.postimg.cc/Bv8vV79T/img5.jpg",
      p: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      lr: "r",
    },
    {
      id: 5,
      h: "What is Lorem Ipsum?",
      img: "https://i.postimg.cc/G2cpzLQf/img2.jpg",
      p: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      ",
      btn: "Commencer",
      lr: "l",
    },
    {
      id: 6,
      h: "Where does it come from?",   
      img: "https://i.postimg.cc/5yWjvBrw/img3.jpg",
      p: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
      lr: "r",
    },
    {
      id: 7,
      h: "Where does it come from?",
      img: "https://i.postimg.cc/L885z6x0/img4.jpg",
      p: " Dès que l'employé se connecte, une popup apparaît pour lui demander son humeur.  Ce module permet de suivre l'humeur des employés et indirectement de suivre leur assiduité. L'objectif principal de ce module est d'assurer la meilleure performance des employés. En fonction des résultats de son test d'humeur, on peut décider de la mesure de sa motivation, une humeur négative récurrente signale à l'entreprise qu'une assistance thérapeutique/financière...etc peut être nécessaire pour résoudre son problème. ",
      lr: "l",
    },
    {
      id: 8,
      h: "Where can I get some?",
      img: "https://i.postimg.cc/Bv8vV79T/img5.jpg",
      p: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
      lr: "r",
    },
  ];

  const form: any = [
    { a: "Email", b: "Adresse Email", keyForm: "email" },
    {
      a: "Mot de passe",
      b: "Mot de passe pour l'installation de HAPPYWORK",
      keyForm: "password",
    },
    { a: "Nom de contact ", b: "Nom de contact ", keyForm: "name" },
    {
      a: "Numéro de contact",
      b: " numéro de téléphone avec code de pays (e:g  +49176…)",
      keyForm: "phone",
    },
    { a: "Nom d'entreprise", b: "Nom d'entreprise", keyForm: "company" },
  ];

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

          <Button disabled={false} onClick={login} color="inherit">
            {f("Admin")}
          </Button>
          <Button disabled={false} onClick={goClient} color="inherit">
            Client
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            position: "relative",
          }}
        >
          <img
            width="100%"
            src="https://i.postimg.cc/zDWC4VDb/img1.jpg"
            alt=""
          />
          <Container
            sx={{
              position: {
                lg: "absolute",
                md: "absolute",
                sm: "relative",
                xs: "relative",
              },
              top: "20px",
              left: "0",
              right: "0",
            }}
            maxWidth="lg"
          >
            <Typography
              sx={{
                fontSize: {
                  lg: 50,
                  md: 30,
                  sm: 25,
                  xs: 20,
                },
              }}
              component="h3"
              variant="h2"
              align="center"
              color="black"
              gutterBottom
            >
              {f("Lorem Ipsum")}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  lg: 50,
                  md: 30,
                  sm: 25,
                  xs: 20,
                },
              }}
              component="h3"
              variant="h2"
              color="black"
              align="center"
              paragraph
            >
              {f("Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..")}
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              justifyContent="center"
              direction={{ xs: "column", sm: "row" }}
              spacing={{ xs: 1, sm: 2, md: 4 }}
            >
              {/* <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
              >
                {f("COMMENCER GRATUITEMENT")}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen2}
              >
                {f("TROUVER VOTRE URL HAPPYWORK")}
              </Button> */}
            </Stack>
          </Container>
        </Box>
        {/* End hero unit */}
        {sections.map((sec) => (
          <Grid
            container
            p={1}
            spacing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            flexDirection={sec.lr === "l" ? "row" : "row-reverse"}
            key={sec.id}
          >
            <Grid
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              item
              p={1}
              xs={12}
              key={sec.id}
            >
              <Typography
                sx={{
                  fontSize: {
                    lg: 50,
                    md: 30,
                    sm: 25,
                    xs: 20,
                  },
                }}
                p={5}
                variant="h3"
              >
                {sec.h}
              </Typography>
            </Grid>
            <Grid item p={2} xs={12} sm={4} key={sec.id}>
              <img src={sec.img} alt="img" width="100%" />
            </Grid>
            <Grid item p={2} xs={12} sm={4} key={sec.id}>
              <p>{sec.p}</p>
              <Button onClick={bringMeToGuide}>{sec.btn}</Button>
            </Grid>
          </Grid>
        ))}

        {/* op up forms */}

        {open && (
          <Modal
            open={open}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                width: {
                  lg: "50%",
                  md: "50%",
                  sm: "80%",
                  xs: "90%",
                },
              }}
            >
              <Title>Obtenez votre compte HappyWork</Title>

              <>
                {" "}
                <Box m={2}>
                  {form.map((e: any) => {
                    const myKey: myFormType = e.keyForm;
                    return (
                      <>
                        <>
                          <FormControl
                            key={e.a}
                            variant="standard"
                            style={{ paddingTop: 15, width: "100%" }}
                          >
                            <Input
                              id="input-with-icon-adornment"
                              placeholder={e.b}
                              value={
                                myForm[myKey as unknown as keyof typeof myForm]
                              }
                              onChange={(de) => {
                                setForm({
                                  ...myForm,
                                  [e.keyForm]: de.target.value,
                                });
                              }}
                              startAdornment={
                                <InputAdornment position="start">
                                  {e.a}
                                </InputAdornment>
                              }
                            />
                          </FormControl>
                          <br />
                        </>
                      </>
                    );
                  })}
                </Box>
                <br />
                <p>
                  En cliquant sur Soumettre, j accepte de recevoir des e-mails
                  marketing et de mise à jour de statut de HappyWork se réserve
                  le droit de supprimer toute installation créée en fournissant
                  des coordonnées incorrectes ou incomplètes telles qu un numéro
                  de contact incorrect et des adresses e-mail générées à l aide
                  de fournisseurs de messagerie temporaires.
                </p>
                <Box textAlign="right" p={2}>
                  <Button onClick={handleClose}>Annuler</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleClose();
                      //  mutate({ realm: myForm.company, attributes: myForm });
                    }}
                  >
                    Soumettre
                  </Button>
                </Box>
              </>
            </Box>
          </Modal>
        )}

        {/* op2 up forms */}

        {open2 && (
          <Modal
            open={open2}
            onClose={() => handleClose()}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box
              sx={{
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                border: "2px solid #000",
                boxShadow: 24,
                p: 4,
                width: {
                  lg: "50%",
                  md: "50%",
                  sm: "80%",
                  xs: "90%",
                },
              }}
            >
              <Title>Trouvez votre instance HappyWork</Title>

              <>
                {" "}
                <Box m={2}>
                  <FormControl variant="standard">
                    <Input
                      id="input-with-icon-adornment"
                      placeholder="Adresse Email de l'entreprise"
                      onChange={(e) => {
                        const str = e.target.value;
                        const alt = str.indexOf("@");
                        const dot = str.indexOf(".");
                        const company = str.substr(
                          Number(alt + 1),
                          Number(dot - alt - 1)
                        );
                        localStorage.removeItem("realm");
                        localStorage.setItem("realm", company);
                        setRealm(company);
                      }}
                      startAdornment={
                        <InputAdornment position="start">Email </InputAdornment>
                      }
                    />
                  </FormControl>
                  <br />
                </Box>
                <br />
                <Box textAlign="right" p={2}>
                  <Button onClick={handleClose}>Annuler</Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      // refetch();
                      handleClose();
                    }}
                  >
                    Soumettre
                  </Button>
                </Box>
              </>
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
