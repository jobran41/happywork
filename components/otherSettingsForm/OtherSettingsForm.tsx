import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  gAnalytics: yup.string(),
  headerScript: yup.string(),
  bodyScript: yup.string(),
});

const OtherSettingsForm = ({ data, update }: any) => {
  const { gAnalytics, headerScript, bodyScript } = data;
  const formik = useFormik({
    initialValues: {
      gAnalytics,
      headerScript,
      bodyScript,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        setSubmitting(false);
        update({ ...data, ...values });

        // eslint-disable-next-line no-alert
        alert(JSON.stringify(values, null, 2));
      }, 1 * 1000);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" p={1}>
        <Grid p={1} item xs={12} sm={12}>
          <TextField
            fullWidth
            id="gAnalytics"
            name="gAnalytics"
            label="Google Analytiques"
            placeholder="ENTRER Google Analytiques code"
            multiline
            variant="standard"
            value={formik.values.gAnalytics}
            onChange={formik.handleChange}
            error={
              formik.touched.gAnalytics && Boolean(formik.errors.gAnalytics)
            }
            helperText={formik.touched.gAnalytics && formik.errors.gAnalytics}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12}>
          <TextField
            fullWidth
            id="headerScript"
            name="headerScript"
            label="Scripts d'en-tête"
            placeholder="Scripts d'en-tête"
            multiline
            variant="standard"
            value={formik.values.headerScript}
            onChange={formik.handleChange}
            error={
              formik.touched.headerScript && Boolean(formik.errors.headerScript)
            }
            helperText={
              formik.touched.headerScript && formik.errors.headerScript
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12}>
          <TextField
            fullWidth
            id="bodyScript"
            name="bodyScript"
            label="Body Scripts"
            placeholder="Body Scripts"
            multiline
            variant="standard"
            value={formik.values.bodyScript}
            onChange={formik.handleChange}
            error={
              formik.touched.bodyScript && Boolean(formik.errors.bodyScript)
            }
            helperText={formik.touched.bodyScript && formik.errors.bodyScript}
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
export default OtherSettingsForm;
