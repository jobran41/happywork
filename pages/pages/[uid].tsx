// /* eslint-disable no-bitwise */
// import React, { useEffect, useState } from "react";
// import { useIntl } from "react-intl";
// import Title from "components/title";
// import {
//   Avatar,
//   Button,
//   FormControl,
//   // Button,
//   Grid,
//   InputLabel,
//   ListItem,
//   ListItemAvatar,
//   ListItemButton,
//   ListItemText,
//   MenuItem,
//   Select,
//   SelectChangeEvent,
// } from "@mui/material";
// import { useRouter } from "next/router";
// import DataDisplayer from "components/DataDisplayer";
// import { useQuery, useMutation } from "react-query";
// import { getBabyById } from "services/mood";
// import toast from "react-hot-toast";
// import { NEXT_PUBLIC_BASE_URL } from "config";

// // import styles from "./Innovation.module.scss";

// function Innovation() {
//   const router = useRouter();
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { inid, realm } = router.query;

//   const { formatMessage } = useIntl();
//   const f = (id: string) => formatMessage({ id });

//   const { data, refetch } = useQuery(
//     ["getBabyById"],
//     () => getBabyById(inid as string, realm),
//     {
//       keepPreviousData: true,
//     }
//   );

//   const [status, setStatus] = useState(data?.status || "");
//   const handleChangeStatus = (event: SelectChangeEvent): void => {
//     setStatus(event.target.value);
//   };

//   useEffect(() => {
//     setStatus(data?.status);
//   }, [data?.status]);

//   const { data: userData } = useQuery(
//     ["user", data?.user_id],
//     () => getUserById(data?.user_id as string),
//     {
//       keepPreviousData: true,
//       enabled: !!data?.user_id,
//     }
//   );

//   const innovationData = [
//     {
//       col1: "Reclamation ID",
//       // eslint-disable-next-line no-underscore-dangle
//       col2: data?._id,
//     },
//     {
//       col1: "title",
//       col2: data?.title,
//     },
//     {
//       col1: "description",
//       col2: data?.description,
//     },
//     {
//       col1: "status",
//       col2: data?.status,
//     },
//     {
//       col1: "Created At",
//       col2: data?.createdAt,
//     },
//     {
//       col1: "Updated At",
//       col2: data?.updatedAt,
//     },
//     {
//       col1: "category",
//       col2: data?.category,
//     },
//     {
//       col1: "matricule",
//       col2: data?.matricule,
//     },
//     {
//       col1: "retweets Count",
//       col2: data?.retweetsCount,
//     },
//     {
//       col1: "user id",
//       col2: data?.user_id,
//     },
//   ];

//   return (
//     <>
//       {/* <Title>uid :{uid}</Title> */}
//       {data?.user_id && (
//         <ListItem sx={{ padding: 3 }} key={user.id} disablePadding>
//           <ListItemButton>
//             <ListItemAvatar>
//               <Avatar
//                 sx={{ width: 100, height: 100, marginRight: 5 }}
//                 alt={`Avatar n°${user.id + 1}`}
//                 src={user.img}
//               />
//             </ListItemAvatar>
//             <ListItemText
//               id={user.id}
//               secondary={user.email}
//               primary={`${user.name}`}
//             />
//           </ListItemButton>
//         </ListItem>
//       )}

//       <Grid container direction="row" alignItems="baseline" p={2}>
//         <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
//           <Title>Reclamation Data</Title>

//           <DataDisplayer data={innovationData} />
//         </Grid>
//         <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
//           <Grid mb={3} item direction="column">
//             <Title>
//               {f("Status")} : {data?.status}
//             </Title>
//             <FormControl fullWidth>
//               <InputLabel id="select-label">Status</InputLabel>
//               <Select
//                 labelId="select-label"
//                 id="select"
//                 value={status}
//                 label="Age"
//                 onChange={handleChangeStatus}
//               >
//                 <MenuItem value="pending">Pending</MenuItem>
//                 <MenuItem value="processing">Processing</MenuItem>
//                 <MenuItem value="completed">Completed</MenuItem>
//                 <MenuItem value="denied">Denied</MenuItem>
//               </Select>
//             </FormControl>
//             <Grid
//               p={3}
//               item
//               direction="column"
//               display="flex"
//               justifyContent="center"
//               xs={12}
//             >
//               <Button
//                 variant="contained"
//                 onClick={() => mutate({ ...data, status, realm })}
//               >
//                 Update
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Innovation;
/* eslint-disable no-bitwise */
import React, { useState, useEffect } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import {
  Avatar,
  Button,
  // Button,
  Grid,
} from "@mui/material";
import { useRouter } from "next/router";
import { getPregnancyById, updatePregancy } from "services/forms";
import { getBabyById } from "services/mood";

import toast from "react-hot-toast";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

// ** Third Party Imports
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Post() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { uid, realm } = router.query;

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const [AdviceInfo, setAdviceInfo] = useState({});
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));

  useEffect(() => {
    getBabyById(uid as string)
      .then((res) => {
        console.log(res.result.data, "AdviceInfo");
        setAdviceInfo(res.result.data);
      })
      .catch((error) => {
        // setData(null);
      });
  }, [uid]);
  const handleSubmit = (e: any) => {
    e.preventDefault();

    updatePregancy({
      id: fid,
      start_date: dayjs(startDate),
      due_date: dayjs(endDate),
    })
      .then((res) => {
        switch (res.status) {
          case 200:
            toast.success("Détails d'une grossesse mis à jour avec succès ");
            break;

          default:
            toast.error(
              "Détails d'une grossesse non  mis à jour ! ",
              res.status
            );
        }
      })
      .catch((err) => {
        console.log("err", err);
      });
  };
  const handleFormReset = (e: any) => {
    e.preventDefault();
    setStartDate(dayjs(Date.now()));
    setEndDate(dayjs(Date.now()));
  };

  return (
    <>
      <Card>
      <Title>{f("Détails du bébé")}</Title>

        <Divider sx={{ m: "0 !important" }} />
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                {f("Nom")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell component="th" scope="row">
                {f("Date de naissance")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.birthdate}
                </TableCell>
              </TableRow>


              <TableRow>
                <TableCell component="th" scope="row">
                {f("Sexe")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.gender}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                {f("Poids")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.weight}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                {f("Taille")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.height}
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell component="th" scope="row">
                {f("Circonférence de la tête")}
                </TableCell>
                <TableCell align="right">
                  {AdviceInfo.head_circumference}
                </TableCell>
              </TableRow>





          




         
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

export default Post;
