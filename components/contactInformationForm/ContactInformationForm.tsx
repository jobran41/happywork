import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  copyrightContent: yup.string(),
  contactMobile: yup.string(),
  contactEmail: yup.string(),
  contactAddress: yup.string(),
});

const ContactInformationForm = ({ data, update }: any) => {
  const { copyrightContent, contactMobile, contactEmail, contactAddress } =
    data;
  const formik = useFormik({
    initialValues: {
      copyrightContent,
      contactMobile,
      contactEmail,
      contactAddress,
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
            id="copyrightContent"
            name="copyrightContent"
            label="Contenu des droits d'auteur"
            placeholder="ENTRER le Contenu des droits d'auteur"
            value={formik.values.copyrightContent}
            onChange={formik.handleChange}
            error={
              formik.touched.copyrightContent &&
              Boolean(formik.errors.copyrightContent)
            }
            helperText={
              formik.touched.copyrightContent && formik.errors.copyrightContent
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="contactMobile"
            name="contactMobile"
            label="Contact Mobile "
            placeholder="Entrer le Contact Mobile "
            value={formik.values.contactMobile}
            onChange={formik.handleChange}
            error={
              formik.touched.contactMobile &&
              Boolean(formik.errors.contactMobile)
            }
            helperText={
              formik.touched.contactMobile && formik.errors.contactMobile
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="contactEmail"
            name="contactEmail"
            label="Email de contact"
            placeholder="Entrer l'Email de contact"
            value={formik.values.contactEmail}
            onChange={formik.handleChange}
            error={
              formik.touched.contactEmail && Boolean(formik.errors.contactEmail)
            }
            helperText={
              formik.touched.contactEmail && formik.errors.contactEmail
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="contactAddress"
            name="contactAddress"
            label="Addresse de Contact"
            placeholder="Entrer Addresse de Contact"
            value={formik.values.contactAddress}
            onChange={formik.handleChange}
            error={
              formik.touched.contactAddress &&
              Boolean(formik.errors.contactAddress)
            }
            helperText={
              formik.touched.contactAddress && formik.errors.contactAddress
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
export default ContactInformationForm;
