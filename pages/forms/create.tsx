// ** React Imports
import React, { forwardRef, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import CardHeader from "@mui/material/CardHeader";

import CardActions from "@mui/material/CardActions";
import { createPregnacy } from "services/forms";

// ** Third Party Imports
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import toast from 'react-hot-toast'

// ** Icon Imports

const FormLayoutsSeparator = () => {
  // ** State

  const [startDate, setStartDate] = useState<Dayjs | null>(dayjs(Date.now()));
  const [endDate, setEndDate] = useState<Dayjs | null>(dayjs(Date.now()));

  const handleSubmit = (e: any) => {
    e.preventDefault();

    createPregnacy({
      start_date: startDate,
      due_date: endDate,
    })
      .then((res) => {
        console.log("res.type", res);

        switch (res.status) {
          case 200:
            toast.success("Détails d'une grossesse ajoutés avec succès ");
            break;
        
          default:
            toast.error("Détails d'une grossesse non ajoutés ! ", res.status);
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
    <Card>
      <CardHeader title="​Ajouter détails d'une grossesse" />
      <Divider sx={{ m: "0 !important" }} />
      <form onReset={handleFormReset} onSubmit={handleSubmit}>
        <br />{" "}
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date debut de grossesse"
              value={startDate}
              onChange={(newValue) => setStartDate(newValue)}
            />
          </LocalizationProvider>
        </Grid>
        <br />
        <Grid item xs={12} sm={12}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date fin de grossesse"
              value={endDate}
              onChange={(newValue) => setEndDate(newValue)}
            />
          </LocalizationProvider>{" "}
        </Grid><br />
        <Divider sx={{ m: "0 !important" }} /><br />
        <CardActions>
          <Button size="large" type="submit" sx={{ mr: 2 }} variant="contained">
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
  );
};

export default FormLayoutsSeparator;
