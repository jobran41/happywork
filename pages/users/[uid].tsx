import React from "react";
// import { useIntl } from "react-intl";
import Title from "components/title";
import {
  // Avatar,
  // Button,
  Grid,
  LinearProgress,
  // ListItem,
  // ListItemAvatar,
  // ListItemButton,
  // ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import DataDisplayer from "components/DataDisplayer";
import UserCard from "components/userCard";
import { useQuery } from "react-query";
import { getUserById } from "services/users";

import { NEXT_PUBLIC_BASE_URL } from "config";

function Users() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uid, realm } = router.query;

  // const { formatMessage } = useIntl();
  // const f = (id: string) => formatMessage({ id });

  const { data, isLoading } = useQuery(
    ["user"],
    () => getUserById(uid as string),
    {
      keepPreviousData: true,
    }
  );

  const user = {
    id: "1",
    img: data?.attributes?.profilePhoto
      ? data?.attributes?.profilePhoto[0]
      : "https://i.ibb.co/PTZJyrC/Ben-parker-Oh-KEl-Ok-Q3-RE-unsplash.jpg",
    name: `${data?.firstName} ${data?.lastName}`,
    email: data?.email,
    status: "approved",
    verify: "verified",
    documents: "approved",
  };

  const userData = [
  
    {
      col1: "Email",
      col2: data?.email,
    },
    {
      col1: "Email verification",
      col2: data?.emailVerified ? "True" : "False",
    },
    {
      col1: "Nom d'utilisateur",
      col2: data?.username,
    },
    {
      col1: "Nom",
      col2: data?.firstName,
    },
    {
      col1: "Prenom",
      col2: data?.lastName,
    },

    {
      col1: "Status",
      col2: data?.enabled ? "True" : "False",
    },
    // {
    //   col1: "Login Type",
    //   col2: "Manual",
    // },
    // {
    //   col1: "Device Type",
    //   col2: "Android",
    // },
    // {
    //   col1: "Text Message Price",
    //   col2: "0",
    // },
    // {
    //   col1: "Media Message Price",
    //   col2: "0",
    // },
    // {
    //   col1: "Cover Picture Price",
    //   col2: "0",
    // },
    // {
    //   col1: "Content Price",
    //   col2: "0",
    // },
    // {
    //   col1: "Status",
    //   col2: data?.enabled,
    // },
    // {
    //   col1: "Website",
    //   col2: "N/A",
    // },
    // {
    //   col1: "Amazon Wishlist",
    //   col2: "N/A",
    // },
    // {
    //   col1: "Account Type",
    //   col2: "Free Accounts",
    // },
    // {
    //   col1: "Mobile",
    //   col2: "N/A",
    // },
    // {
    //   col1: "Wallet Balance",
    //   col2: "$0.00",
    // },
    // {
    //   col1: "Tipped Amount",
    //   col2: "$0.00",
    // },
    // {
    //   col1: "Email Notification",
    //   col2: "YES",
    // },
    // {
    //   col1: "Mobile Notification",
    //   col2: "YES",
    // },
    // {
    //   col1: "Created At",
    //   col2: "24 Feb 2022 12:20 PM",
    // },
    // {
    //   col1: "Updated At",
    //   col2: "25 Feb 2022 02:09 PM",
    // },
  ];

  // const socialData = [
  //   {
  //     col1: "Amazon Wishlist",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Website",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Instagram Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Facebook Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Twitter Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Linkedin Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Pinterest Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "YouTube Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Twitch Link",
  //     col2: "-",
  //   },
  //   {
  //     col1: "Snapchat Link",
  //     col2: "-",
  //   },
  // ];
  // function randomColor(format: any) {
  //   const rint = Math.floor(0x100000000 * Math.random());
  //   switch (format) {
  //     case "hex":
  //       return `#${`00000${rint.toString(16)}`.slice(-6).toUpperCase()}`;
  //     case "hexa":
  //       return `#${`0000000${rint.toString(16)}`.slice(-8).toUpperCase()}`;
  //     case "rgb":
  //       return `rgb(${rint & 255},${(rint >> 8) & 255},${(rint >> 16) & 255})`;
  //     case "rgba":
  //       return `rgba(${rint & 255},${(rint >> 8) & 255},${(rint >> 16) & 255},${
  //         ((rint >> 24) & 255) / 255
  //       })`;

  //     default:
  //       return rint;
  //   }
  // }

  if (isLoading) return <LinearProgress />;
  return (
    <>
      {/* <Title>uid :{uid}</Title> */}
      <UserCard
        name={user.name}
        email={user.email}
        avatar={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${user.img}`}
      />
      <Grid container direction="row" alignItems="baseline" p={2}>
        <Grid p={1} item xs={12} sm={12} md={12} lg={12}>
          <Title>User Data</Title>

          <DataDisplayer data={userData} />
        </Grid>
        {/* <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <Grid mb={3} item>
            <Title>Actions</Title>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((e) => (
              <Button
                style={{ margin: 2, backgroundColor: randomColor("hex") }}
                variant="contained"
                key={e}
              >
                Feature {e}
              </Button>
            ))}
          </Grid>
          <Grid mb={3} item>
            <Title>{f("Social Settings")}</Title>
            <DataDisplayer data={socialData} />
          </Grid>
        </Grid> */}
      </Grid>
    </>
  );
}

export default Users;
