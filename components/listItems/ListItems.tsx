import React, { useEffect, useState } from "react";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { useTheme, styled } from "@mui/material/styles";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
/* import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline"; */
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";
import {
  Grid,
  Collapse,
  List,
  ListItemButton,
  ListSubheader,
} from "@mui/material";

import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Paper from "@mui/material/Paper";
import Image from 'next/image'
import mypic from '../../public/newLogo.svg'
import Typography from "@mui/material/Typography";
import styles from "./ListItems.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ListItems() {
  const router = useRouter();

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const theme = useTheme();

  // ----------------------------------------
  const [open, setOpen] = useState<any>({});

  const handleClick = (item: any) => {
    setOpen((prevState: any) => ({ [item]: !prevState[item] }));
  };

  const { keycloak } = useKeycloak<KeycloakInstance>();
  const logoutUrl = window.location.origin;
  const keycloakSignOut = () => {
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl({
        redirectUri: logoutUrl,
      });
    }
  };

  const url = "url";
  const parent = "parent";
  // const indicative = "indicative";
  const action = "action";

  const menu = [
    {
      type: url,
      icon: <DashboardIcon />,
      label: "Dashboard",
      url: "dashboard",
    },
    // {
    //   type: indicative,
    //   label: "ACCOUNT MANAGEMENT",
    // },
    {
      type: parent,
      icon: <PeopleIcon />,
      label: "Utilisateurs",
      children: [
        {
          type: url,
          label: "Voir les utilisateurs",
          url: "users",
        },
        {
          type: url,
          label: " Utilisateurs Bloqués",
          url: "users/blockedUsers",
        },
      ],
    },
    // {
    //   type: indicative,
    //   label: "POSTS MANAGEMENT",
    // },
    {
      type: parent,
      icon: <ArticleIcon />,
      label: "Conseils",
      children: [
        {
          type: url,
          label: "Ajouter un conseil ",
          url: "posts/private",
        },
        {
          type: url,
          label: "Liste de conseils",
          url: "posts",
        },
      ],
    },
    /*     {
      type: parent,
      icon: <ChatBubbleOutlineIcon />,
      label: "Messages",
      children: [
        {
          type: url,
          label: "View Messages",
          url: "messages",
        },
      ],
    }, */
    {
      type: parent,
      icon: <CheckBoxIcon />,
      label: "Détails grossesses",
      children: [
        {
          type: url,
          label: "Ajouter grossesse",
          url: "forms/create",
        },
        {
          type: url,
          label: "Liste grossesses",
          url: "forms",
        },
      ],
    },
    {
      type: parent,
      icon: <EmojiObjectsIcon />,
      label: "Gestion de bébé",
      children: [
        {
          type: url,
          label: "Liste des vaccins",
          url: "innovation",
        },
        {
          type: url,
          label: "Liste des rendez-vous",
          url: "reclamation",
        },
        {
          type: url,
          label: "Liste des bébé",
          url: "pages",
        },
      ],
    },
    // {
    //   type: parent,
    //   icon: <RecordVoiceOverIcon />,
    //   label: "Reclamation",
    //   children: [
    //     {
    //       type: url,
    //       label: "Reclamation",
    //       url: "reclamation",
    //     },
    //   ],
    // },

    // {
    //   type: parent,
    //   icon: <RecordVoiceOverIcon />,
    //   label: "Documents",
    //   children: [
    //     {
    //       type: url,
    //       label: "View Documents",
    //       url: "documents",
    //     },
    //     {
    //       type: url,
    //       label: "Verification Documents",
    //       url: "documents/verification",
    //     },
    //   ],
    // },
    // {
    //   type: parent,
    //   icon: <RecordVoiceOverIcon />,
    //   label: "Pages",
    //   children: [
    //     {
    //       type: url,
    //       label: "View Pages",
    //       url: "pages",
    //     },
    //   ],
    // },
    // {
    //   type: indicative,
    //   label: "SETTING MANAGEMENT",
    // },
    // {
    //   type: url,
    //   icon: <SettingsIcon />,
    //   label: "Paramètres",
    //   url: "settings",
    // },
    // {
    //   type: url,
    //   icon: <AccountBoxIcon />,
    //   label: "Compte",
    //   url: "account",
    // },
    {
      type: action,
      icon: <PowerSettingsNewIcon />,
      label: "Déconnexion",
      f: keycloakSignOut,
    },
  ];

  useEffect(() => {
    const { pathname } = router;
    let mainParent = "";
    let mainElement = "";
    menu.forEach((e) => {
      if (e.type === parent) {
        e.children?.forEach((child) => {
          if (child.url === pathname.substring(1).replace(/\/\[(.*?)\]/g, "")) {
            mainParent = e.label;
            mainElement = child.url;
          }
        });
      }
    });
    setOpen({ [mainParent]: true });
    setTimeout(() => {
      document
        .getElementById(mainElement)
        ?.scrollIntoView({ behavior: "smooth" });
    }, 0.2 * 1000);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);
  // ----------------------------------------

  const isActive = (path: string) => {
    if (router.pathname.replace(/\/\[(.*?)\]/g, "") === `/${path}`) {
      return theme.palette.primary.main;
    }
    return "";
  };

  return (
    <>
      {" "}
      <div style={{ overflowY: "auto", position: "absolute", width: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
          <Image
      src={mypic}
      alt="Logo"
      width="150px"
      height="150px"
    />
            {/* <Avatar variant="rounded"
            sx={{ width: 50, height: 50 }}
           alt="admin"
           src="/static/images/avatar/1.jpg"
         />
        </Grid>
        <Grid item xs={8} md={8}>
        <div className={styles.sideBarName}>      admin
</div> */}
          </Grid>
        </Grid>

        <Divider sx={{ m: "0 !important" }} />
        {menu.map((e: any) => {
          if (e.type === parent) {
            return (
              <>
                <ListItem
                  onClick={() => handleClick(e.label)}
                  style={{ color: isActive(e.label) }}
                  key={`${e.label} BigListItem`}
                >
                  <ListItemIcon
                    key={`${e.label} icon`}
                    style={{ color: isActive(e.label) }}
                  >
                    {e.icon}
                  </ListItemIcon>
                  <ListItemText
                    className={styles.ItemMenu}
                    key={`${e.label} text`}
                    primary={f(e.label)}
                  />
                  {open[e.label] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>

                <Collapse
                  key={`${e.label} collapse`}
                  in={open[e.label]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List key={`${e.label} list`} component="div" disablePadding>
                    {e.children.map((child: any) => (
                      <ListItemButton
                        style={{ color: isActive(child.url) }}
                        onClick={() =>
                          router.push({
                            pathname: `/${child.url}`,
                            query: { realm: router.query.realm },
                          })
                        }
                        key={`${child.label} listItem`}
                        id={child.url}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon
                          style={{ color: isActive(child.url) }}
                          key={`${child.label} listItemIcon`}
                        >
                          <HorizontalRuleIcon />
                        </ListItemIcon>
                        <ListItemText
                          className={styles.ItemMenu}
                          key={`${child.label} listItemText`}
                          primary={child.label}
                        />
                      </ListItemButton>
                    ))}
                  </List>
                </Collapse>
              </>
            );
          }
          if (e.type === url) {
            return (
              <ListItemButton
                style={{ color: isActive(e.url) }}
                onClick={() =>
                  router.push({
                    pathname: `/${e.url}`,
                    query: { realm: router.query.realm },
                  })
                }
                key={`${e.label} listItem`}
                id={e.url}
              >
                <ListItemIcon
                  style={{ color: isActive(e.url) }}
                  key={`${e.label} listItemIcon`}
                >
                  {e.icon}
                </ListItemIcon>
                <ListItemText
                  className={styles.ItemMenu}
                  key={`${e.label} listItemText`}
                  primary={e.label}
                />
              </ListItemButton>
            );
          }

          if (e.type === action) {
            return (
              <ListItemButton
                onClick={e.f}
                key={`${e.label} listItem`}
                id={e.label}
              >
                <ListItemIcon key={`${e.label} listItemIcon`}>
                  {e.icon}
                </ListItemIcon>
                <ListItemText
                  className={styles.ItemMenu}
                  key={`${e.label} listItemText`}
                  primary={e.label}
                />
              </ListItemButton>
            );
          }

          return (
            <ListSubheader
              key={`${e.label} listSubHeader`}
              component="div"
              id={e.label}
            >
              {e.label}
            </ListSubheader>
          );
        })}
      </div>
    </>
  );
}
