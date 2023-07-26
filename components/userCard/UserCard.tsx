/* eslint-disable react/require-default-props */
import * as React from "react";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";

import { useIntl } from "react-intl";

const UserCard = ({
  name,
  email,
  avatar,
}: {
  name?: string;
  email?: string;
  avatar?: string;
}) => {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { name: loggerName, email: loggerEmail } = keycloak?.tokenParsed as any;

  const user = {
    id: "1",
    img:
      avatar ||
      "https://i.ibb.co/PTZJyrC/Ben-parker-Oh-KEl-Ok-Q3-RE-unsplash.jpg",
    name: name || loggerName || "unavailable",
    email: email || loggerEmail || "unavailable",
    status: f("approved"),
    verify: "verified",
    documents: "approved",
  };
  return (
    <ListItem sx={{ padding: 3 }} key={user.id} disablePadding>
      <ListItemButton>
        <ListItemAvatar>
          <Avatar
            sx={{ width: 100, height: 100, marginRight: 5 }}
            alt={`Avatar n°${+user.id + 1}`}
            src={user.img}
          />
        </ListItemAvatar>
        <ListItemText
          id={user.id}
          secondary={user.email}
          primary={`${user.name}`}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default UserCard;
