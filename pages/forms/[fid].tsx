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
import toast from "react-hot-toast";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Divider from "@mui/material/Divider";

// ** Third Party Imports
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function Post() {
  const router = useRouter();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fid, realm } = router.query;

  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  const [AdviceInfo, setAdviceInfo] = useState({});
  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));

  useEffect(() => {
    getPregnancyById(fid as string)
      .then((res) => {
        console.log(res.result.data, "AdviceInfo");
        setAdviceInfo(res.result.data);
      })
      .catch((error) => {
        // setData(null);
      });
  }, [fid]);
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
        <CardHeader title={f("Mettre à jour details d'une grossesse")} />
        <Divider sx={{ m: "0 !important" }} />
        <form onReset={handleFormReset} onSubmit={handleSubmit}>
          <br />{" "}
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date debut de grossesse"
                value={dayjs(AdviceInfo.start_date)}
                onChange={(newValue) => setStartDate(newValue)}
              />
            </LocalizationProvider>
          </Grid>
          <br />
          <Grid item xs={12} sm={12}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Date fin de grossesse"
                value={dayjs(AdviceInfo.due_date)}
                onChange={(newValue) => setEndDate(newValue)}
              />
            </LocalizationProvider>{" "}
          </Grid>
          <br />
          <Divider sx={{ m: "0 !important" }} />
          <br />
          <CardActions>
            <Button
              size="large"
              type="submit"
              sx={{ mr: 2 }}
              variant="contained"
            >
              Submit
            </Button>
            <Button
              type="reset"
              size="large"
              color="secondary"
              variant="outlined"
            >
              Reset
            </Button>
          </CardActions>
        </form>
      </Card>
    </>
  );
}

export default Post;
