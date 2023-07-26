import React, { useMemo, useState } from "react";
import { useRouter } from "next/router";
import { IconButton, Toolbar } from "@mui/material";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";

import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { useKeycloak } from "@react-keycloak/ssr";
import { KeycloakInstance } from "keycloak-js";
import { useIntl } from "react-intl";
import { useQuery } from "react-query";
import { adminRole, drawerWidth } from "shared/constants";
import { AppBarProps, MainAppBarProps } from "shared/models";
import { getMerchantById } from "services/merchants";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import styles from "./Card.module.scss";

function OnMidDrawerWidth() {
  const router = useRouter();
  const { mid } = router.query;
  return mid ? drawerWidth : drawerWidth;
}
const StylesAppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== "open",
})<AppBarProps>(({ theme, open }: { theme: any; open: boolean }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: OnMidDrawerWidth(),
    width: `calc(100% - ${OnMidDrawerWidth()}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

function AppBar({ toggleDrawer, open }: MainAppBarProps) {
  const router = useRouter();
  const {
    query: { mid },
    basePath,
  } = router;

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const logoutUrl = window.location.origin + basePath;
  const { keycloak } = useKeycloak<KeycloakInstance>();
  const isAuth = keycloak?.authenticated === true;
  const isAdmin = isAuth && keycloak?.hasRealmRole(adminRole);
  const isMerchant = isAuth && keycloak?.hasRealmRole(adminRole) === false;
  const keycloakSignOut = () => {
    if (keycloak) {
      window.location.href = keycloak.createLogoutUrl({
        redirectUri: logoutUrl,
      });
    }
  };
  const [enabled, setEnabled] = useState(false);
  const { data: profile } = useQuery(
    ["profile", mid],
    () => getMerchantById(mid as string),
    { enabled, keepPreviousData: true, refetchOnWindowFocus: false }
  );
  const getMerchantEmail = useMemo(() => {
    if (isAdmin && mid) {
      setEnabled(true);
      return profile?.email;
    }
    if (isMerchant) {
      setEnabled(false);
      if (keycloak?.userInfo) {
        const info = keycloak?.userInfo as any;
        return info.email;
      }
    }
    setEnabled(false);
    return "";
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mid, profile]);

  // handle right menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const openRightMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const redirectToAccount = (isClient: any) => {
    handleClose();
    if (isClient) {
      router.push("/client");
    } else {
      router.push("/account");
    }
  };

  return (
    <StylesAppBar
      sx={{
        backgroundColor: "white",
        pr: "24px", // keep right padding when drawer closed
      }}
      position="absolute"
      open={open}
    >
      <Toolbar
        sx={{
          pr: "24px", // keep right padding when drawer closed
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          className={styles.buttonMenu}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Typography
          className={styles.card}
          component="h1"
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1 }}
        >
          <div className={styles.card_iconContainer}>
            {f("​Mama​​n​ & ​Bébé")}
          </div>

          {getMerchantEmail !== "" ? ` / ${getMerchantEmail}` : ""}
        </Typography>{" "}
        <SearchOutlinedIcon
          style={{
            color: "#FCA785",
          }}
        />
        <NotificationsNoneOutlinedIcon
          style={{
            color: "#FCA785",
          }}
        />
        <Stack direction="row" spacing={2}>
          <Avatar
            onClick={handleClick}
            alt="admin"
            src="/static/images/avatar/1.jpg"
          />
        </Stack>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={openRightMenu}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={redirectToAccount}>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            Compte
          </MenuItem>
          <MenuItem onClick={() => redirectToAccount(true)}>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
            Client
          </MenuItem>
          <MenuItem onClick={keycloakSignOut}>
            <IconButton color="inherit">
              <PowerSettingsNewIcon />
            </IconButton>
            Déconnexion
          </MenuItem>
        </Menu>
      </Toolbar>
    </StylesAppBar>
  );
}

export default AppBar;
