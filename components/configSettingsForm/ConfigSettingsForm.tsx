import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  chatSocketUrl: yup.string().url(),
  googleMapKey: yup.string(),
  chatExpiredDays: yup.number(),
});

const ConfigSettingsForm = ({ data, update }: any) => {
  const { chatSocketUrl, googleMapKey, chatExpiredDays } = data;
  const formik = useFormik({
    initialValues: {
      chatSocketUrl,
      googleMapKey,
      chatExpiredDays,
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
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="chatSocketUrl"
            name="chatSocketUrl"
            label="url de la prise de chat"
            placeholder="ENTRER url de la prise de chat"
            value={formik.values.chatSocketUrl}
            onChange={formik.handleChange}
            error={
              formik.touched.chatSocketUrl &&
              Boolean(formik.errors.chatSocketUrl)
            }
            helperText={
              formik.touched.chatSocketUrl && formik.errors.chatSocketUrl
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="googleMapKey"
            name="googleMapKey"
            label="Clé Google Map"
            placeholder="Clé Google Map"
            value={formik.values.googleMapKey}
            onChange={formik.handleChange}
            error={
              formik.touched.googleMapKey && Boolean(formik.errors.googleMapKey)
            }
            helperText={
              formik.touched.googleMapKey && formik.errors.googleMapKey
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="chatExpiredDays"
            name="chatExpiredDays"
            label="Journées de chat expirées"
            placeholder="Entrer le Journées de chat expirées"
            value={formik.values.chatExpiredDays}
            onChange={formik.handleChange}
            error={
              formik.touched.chatExpiredDays &&
              Boolean(formik.errors.chatExpiredDays)
            }
            helperText={
              formik.touched.chatExpiredDays && formik.errors.chatExpiredDays
            }
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
export default ConfigSettingsForm;
