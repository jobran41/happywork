import React, { useState } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import { LinearProgress, Typography } from "@mui/material";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useRouter } from "next/router";

import { useQuery, useMutation } from "react-query";
import toast from "react-hot-toast";

import SiteSettingsForm from "components/siteSettingsForm";
import EmailSettingsForm from "components/emailSettingsForm";
import SocialSettingsForm from "components/socialSettingsForm";
import SocialLoginForm from "components/socialLoginForm";
import MobileSettingsForm from "components/mobileSettingsForm";
import ContactInformationForm from "components/contactInformationForm";
import ConfigSettingsForm from "components/configSettingsForm";
import OtherSettingsForm from "components/otherSettingsForm";

import { updateRealm, getRealm } from "services/realm";

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
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
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
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

function Settings() {
  const [tab, setTab] = useState(0);

  const router = useRouter();
  const { realm } = router.query;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { data, refetch } = useQuery(["realm"], () => getRealm(), {
    keepPreviousData: true,
  });

  const { mutate, isLoading: isUpdating } = useMutation(updateRealm, {
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
      <Title>{f("Parametres")}</Title>
      {isUpdating && <LinearProgress />}

      <Box
        sx={{
          flexGrow: 1,
          bgcolor: "background.paper",
          display: "flex",
          height: "auto",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={tab}
          onChange={handleTabChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            minWidth: 200,
            maxWidth: 200,
          }}
        >
          <Tab label="Site Setting" {...a11yProps(0)} />
          <Tab label="Paramètres d'E-mail" {...a11yProps(1)} />
          <Tab label="Paramètres sociaux" {...a11yProps(2)} />
          <Tab label="Connexion sociale" {...a11yProps(3)} />
          <Tab label="Paramètres mobiles" {...a11yProps(4)} />
          <Tab label="Informations de contact" {...a11yProps(5)} />
          <Tab label="Paramètres de configuration" {...a11yProps(6)} />
          <Tab label="Autres paramètres" {...a11yProps(7)} />
        </Tabs>

        <TabPanel value={tab} index={0}>
          <Title>{f(" Site Settings")}</Title>
          <SiteSettingsForm realm={realm} data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <Title>{f("Paramètres d' E-mail")}</Title>
          <EmailSettingsForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={2}>
          <Title>{f("Paramètres sociaux")}</Title>
          <SocialSettingsForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={3}>
          <Title>{f("Connexion sociale")}</Title>
          <SocialLoginForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={4}>
          <Title>{f("Paramètres mobiles")}</Title>
          <MobileSettingsForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={5}>
          <Title>{f("Informations de contact")}</Title>
          <ContactInformationForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={6}>
          <Title>{f("Paramètres de configuration")}</Title>
          <ConfigSettingsForm data={data} update={mutate} />
        </TabPanel>
        <TabPanel value={tab} index={7}>
          <Title>{f("Autres paramètres")}</Title>
          <OtherSettingsForm data={data} update={mutate} />
        </TabPanel>
      </Box>
    </>
  );
}

export default Settings;
