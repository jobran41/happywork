import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  mailDriver: yup.string().required("mailDriver is required"),
  mailUsername: yup.string().required("mailUsername is required"),
  mailHost: yup.string().required("mailHost is required"),
  mailPassword: yup.string().required("mailPassword is required"),
  mailFromAddess: yup.string().required("mailFromAddess is required"),
  mailPort: yup.string().required("mailPort is required"),
  mailEncryption: yup.string().required("mailEncryption is required"),
  mailGunPublicKey: yup.string().required("mailGunPublicKey is required"),
  mailGunSecret: yup.string().required("mailGunSecret is required"),
  mailGunDomain: yup.string().required("mailGunDomain is required"),
});
// const validationSchema = yup.object({
//   mailDriver: yup.string(),
//   mailUsername: yup.string(),
//   mailHost: yup.string(),
//   mailPassword: yup.string(),
//   mailFromAddess: yup.string(),
//   mailPort: yup.string(),
//   mailEncryption: yup.string(),
//   mailGunPublicKey: yup.string(),
//   mailGunSecret: yup.string(),
//   mailGunDomain: yup.string(),
// });

const EmailSettingsForm = ({ data, update }: any) => {
  const {
    mailDriver,
    mailUsername,
    mailHost,
    mailPassword,
    mailFromAddess,
    mailPort,
    mailEncryption,
    mailGunPublicKey,
    mailGunSecret,
    mailGunDomain,
  } = data;
  const formik = useFormik({
    initialValues: {
      mailDriver,
      mailUsername,
      mailHost,
      mailPassword,
      mailFromAddess,
      mailPort,
      mailEncryption,
      mailGunPublicKey,
      mailGunSecret,
      mailGunDomain,
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
      update({ ...data, ...values });
      // eslint-disable-next-line no-alert
      alert(JSON.stringify({ ...data, ...values }, null, 2));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" p={1}>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailDriver"
            name="mailDriver"
            label="CONDUCTEUR DE COURRIER"
            placeholder="Supporte - 'smtp', 'mailgun'"
            value={formik.values.mailDriver}
            onChange={formik.handleChange}
            error={
              formik.touched.mailDriver && Boolean(formik.errors.mailDriver)
            }
            helperText={formik.touched.mailDriver && formik.errors.mailDriver}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailUsername"
            name="mailUsername"
            label="NOM D'UTILISATEUR DU MAIL"
            placeholder="Ex- 'abcd.gmail.com'"
            value={formik.values.mailUsername}
            onChange={formik.handleChange}
            error={
              formik.touched.mailUsername && Boolean(formik.errors.mailUsername)
            }
            helperText={
              formik.touched.mailUsername && formik.errors.mailUsername
            }
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailHost"
            name="mailHost"
            label="HÔTE DU MAIL"
            placeholder="Ex- 'smtp.gmail.com', 'smtp.mailgun.org'"
            value={formik.values.mailHost}
            onChange={formik.handleChange}
            error={formik.touched.mailHost && Boolean(formik.errors.mailHost)}
            helperText={formik.touched.mailHost && formik.errors.mailHost}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailPassword"
            name="mailPassword"
            label="MOT DE PASSE MAIL"
            placeholder="Enter LE MOT DE PASSE DU MAIL"
            value={formik.values.mailPassword}
            onChange={formik.handleChange}
            error={
              formik.touched.mailPassword && Boolean(formik.errors.mailPassword)
            }
            helperText={
              formik.touched.mailPassword && formik.errors.mailPassword
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailFromAddess"
            name="mailFromAddess"
            label="MAIL DEPUIS ADRESSE"
            placeholder="Ex- 'no-reply@gmail.com'"
            value={formik.values.mailFromAddess}
            onChange={formik.handleChange}
            error={
              formik.touched.mailFromAddess &&
              Boolean(formik.errors.mailFromAddess)
            }
            helperText={
              formik.touched.mailFromAddess && formik.errors.mailFromAddess
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailEncryption"
            name="mailEncryption"
            label="CRYPTAGE DU MAIL"
            placeholder="Ex- 'tls'"
            value={formik.values.mailEncryption}
            onChange={formik.handleChange}
            error={
              formik.touched.mailEncryption &&
              Boolean(formik.errors.mailEncryption)
            }
            helperText={
              formik.touched.mailEncryption && formik.errors.mailEncryption
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailPort"
            name="mailPort"
            label="PORT DU MAIL"
            placeholder="Ex- 587,445"
            value={formik.values.mailPort}
            onChange={formik.handleChange}
            error={formik.touched.mailPort && Boolean(formik.errors.mailPort)}
            helperText={formik.touched.mailPort && formik.errors.mailPort}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailFromAddess"
            name="mailFromAddess"
            label="MAIL DEPUIS NOM"
            placeholder="Ex- 'nom Site'"
            value={formik.values.mailFromAddess}
            onChange={formik.handleChange}
            error={
              formik.touched.mailFromAddess &&
              Boolean(formik.errors.mailFromAddess)
            }
            helperText={
              formik.touched.mailFromAddess && formik.errors.mailFromAddess
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailGunPublicKey"
            name="mailGunPublicKey"
            label="LE CLE PUBLIC DU MAILGUN"
            placeholder="LE CLE PUBLIC DU MAILGUN"
            value={formik.values.mailGunPublicKey}
            onChange={formik.handleChange}
            error={
              formik.touched.mailGunPublicKey &&
              Boolean(formik.errors.mailGunPublicKey)
            }
            helperText={
              formik.touched.mailGunPublicKey && formik.errors.mailGunPublicKey
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailGunSecret"
            name="mailGunSecret"
            label="LE SECRET DU MAILGUN"
            placeholder="LE SECRET DU MAILGUN"
            value={formik.values.mailGunSecret}
            onChange={formik.handleChange}
            error={
              formik.touched.mailGunSecret &&
              Boolean(formik.errors.mailGunSecret)
            }
            helperText={
              formik.touched.mailGunSecret && formik.errors.mailGunSecret
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="mailGunDomain"
            name="mailGunDomain"
            label="LE DOMAIN DU MAILGUN"
            placeholder="MAILGUN DOMAIN"
            value={formik.values.mailGunDomain}
            onChange={formik.handleChange}
            error={
              formik.touched.mailGunDomain &&
              Boolean(formik.errors.mailGunDomain)
            }
            helperText={
              formik.touched.mailGunDomain && formik.errors.mailGunDomain
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
export default EmailSettingsForm;
