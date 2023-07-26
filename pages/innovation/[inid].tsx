/* eslint-disable no-bitwise */
import React, { useEffect, useState } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import {
  Avatar,
  Button,
  FormControl,
  // Button,
  Grid,

  SelectChangeEvent,
} from "@mui/material";
import { useRouter } from "next/router";
import DataDisplayer from "components/DataDisplayer";
import { useQuery, useMutation } from "react-query";
import { getVaccinationById } from "services/innovation";

// import styles from "./Innovation.module.scss";

function Innovation() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { inid, realm } = router.query;
  console.log("datadata", router.query);
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { data, refetch } = useQuery(
    ["ReclamationById"],
    () => getVaccinationById(inid as string, realm),
    {
      keepPreviousData: true,
    }
  );
  console.log("datadata", data);


  const innovationData = [
    {
      col1: "Nom",
      col2: data && data.result.data?.name,
    },

    {
      col1: "Description",
      col2: data && data.result.data?.description,
    },
    {
      col1: "date",
      col2: data && data.result.data?.date,
    },
  ];

  return (
    <>
      <Grid container direction="row" alignItems="baseline" p={2}>
        <Grid p={1} item xs={12} sm={12} md={12} lg={12}>
          <Title>{f("Détails du vaccins")}</Title>

          <DataDisplayer data={innovationData} />
        </Grid>
      </Grid>
    </>
  );
}

export default Innovation;
