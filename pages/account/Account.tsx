import React, { useState } from "react";
import { useIntl } from "react-intl";
import { useKeycloak } from "@react-keycloak/ssr";
import type { KeycloakInstance } from "keycloak-js";
import { useQuery, useMutation } from "react-query";
import toast from "react-hot-toast";
import { useRouter } from "next/router";

import { NEXT_PUBLIC_BASE_URL } from "config";

import { Grid, LinearProgress, Typography } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { getUserById, updateUser } from "services/users";

import Title from "components/title";
import UpdateProfileForm from "components/updateProfileForm";
import UserCard from "components/userCard";
import UpdateProfileImageForm from "components/updateProfileImageForm";
import UpdateProfilePasswordForm from "components/updateProfilePasswordForm";
// import styles from "./Settings.module.scss";

interface TabPanelProps {
  // eslint-disable-next-line react/require-default-props
  children?: React.ReactNode;
  index: number;
  value: number;
}
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`horizontal-tabpanel-${index}`}
      aria-labelledby={`horizontal-tab-${index}`}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `horizontal-tab-${index}`,
    "aria-controls": `horizontal-tabpanel-${index}`,
  };
}

function Settings() {
  const [tab, setTab] = useState(0);
  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  const router = useRouter();
  const { realm } = router.query;

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { keycloak } = useKeycloak<KeycloakInstance>();
  const { sub } = keycloak?.tokenParsed as any;

  const { data, refetch } = useQuery(
    ["user", sub],
    () => getUserById(sub as string),
    {
      keepPreviousData: true,
      enabled: !!sub,
    }
  );

  const { mutate } = useMutation(updateUser, {
    onSuccess: () => {
      toast.success("Successfully updated !");
      refetch();
    },
    onError: (error: any) => {
      toast.error(`cannot update  !\n${error.message}`);
    },
  });

  if (!data) return <LinearProgress />;
  return (
    <>
      <Title>{f("Compte")}</Title>
      <Grid container direction="row" p={1}>
        <Grid item xs={12} sm={12} lg={4}>
          <UserCard
            avatar={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${data.attributes.profilePhoto}`}
          />
        </Grid>
        <Grid p={1} ml={5} item xs={12} sm={12} lg={7}>
          <Box sx={{ width: "100%" }}>
            <Tabs
              orientation="horizontal"
              variant="fullWidth"
              value={tab}
              onChange={handleTabChange}
              aria-label="horizontal tabs example"
              sx={{
                borderRight: 1,
                borderColor: "divider",
              }}
            >
              <Tab label="Profil" {...a11yProps(0)} />
              {/* <Tab label="Upload Image" {...a11yProps(1)} />
              <Tab label="Change Password" {...a11yProps(2)} /> */}
            </Tabs>
            <TabPanel value={tab} index={0}>
              <UpdateProfileForm data={data} update={mutate} />
            </TabPanel>
            <TabPanel value={tab} index={1}>
              <UpdateProfileImageForm />
            </TabPanel>
            <TabPanel value={tab} index={2}>
              <UpdateProfilePasswordForm />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default Settings;
