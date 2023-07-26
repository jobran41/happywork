import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  playStore: yup.string(),
  appStore: yup.string(),
});

const MobileSettingsForm = ({ data, update }: any) => {
  const { playStore, appStore } = data;
  const formik = useFormik({
    initialValues: {
      playStore,
      appStore,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      update({ ...data, ...values });
      // eslint-disable-next-line no-alert
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" p={1}>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="playStore"
            name="playStore"
            label="Utilisateur - PlayStore"
            placeholder="ENTRER l'utlisateur- PlayStore"
            value={formik.values.playStore}
            onChange={formik.handleChange}
            error={formik.touched.playStore && Boolean(formik.errors.playStore)}
            helperText={formik.touched.playStore && formik.errors.playStore}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="appStore"
            name="appStore"
            label="Utilisateur - Appstore "
            placeholder="ENTRER l'utlisateur- Appstore "
            value={formik.values.appStore}
            onChange={formik.handleChange}
            error={formik.touched.appStore && Boolean(formik.errors.appStore)}
            helperText={formik.touched.appStore && formik.errors.appStore}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
export default MobileSettingsForm;
