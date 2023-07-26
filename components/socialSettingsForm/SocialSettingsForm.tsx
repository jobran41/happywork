import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  fbLink: yup.string().url("valid URL is required"),
  linkedinLink: yup.string().url("valid URL is required"),
  twitterLink: yup.string().url("valid URL is required"),
  pinterestLink: yup.string().url("valid URL is required"),
  instaLink: yup.string().url("valid URL is required"),
  ytbeLink: yup.string().url("valid URL is required"),
  snapLink: yup.string().url("valid URL is required"),
  mailGunPublicKey: yup.string().url("valid URL is required"),
  mailGunSecret: yup.string().url("valid URL is required"),
  mailGunDomain: yup.string().url("valid URL is required"),
});

const SocialSettingsForm = ({ data, update }: any) => {
  const {
    fbLink,
    linkedinLink,
    twitterLink,
    pinterestLink,
    instaLink,
    ytbeLink,
    snapLink,
    mailGunPublicKey,
    mailGunSecret,
    mailGunDomain,
  } = data;
  const formik = useFormik({
    initialValues: {
      fbLink,
      linkedinLink,
      twitterLink,
      pinterestLink,
      instaLink,
      ytbeLink,
      snapLink,
      mailGunPublicKey,
      mailGunSecret,
      mailGunDomain,
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
            id="fbLink"
            name="fbLink"
            label="LIEN DU FACEBOOK"
            placeholder="ENTRER LE LIEN DU FACEBOOK"
            value={formik.values.fbLink}
            onChange={formik.handleChange}
            error={formik.touched.fbLink && Boolean(formik.errors.fbLink)}
            helperText={formik.touched.fbLink && formik.errors.fbLink}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="linkedinLink"
            name="linkedinLink"
            label="LIEN DU LINKEDIN"
            placeholder="ENTRER LE LIEN DU LINKEDIN"
            value={formik.values.linkedinLink}
            onChange={formik.handleChange}
            error={
              formik.touched.linkedinLink && Boolean(formik.errors.linkedinLink)
            }
            helperText={
              formik.touched.linkedinLink && formik.errors.linkedinLink
            }
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="twitterLink"
            name="twitterLink"
            label="LIEN DU TWITTER"
            placeholder="ENTRER LE LIEN DU TWITTER"
            value={formik.values.twitterLink}
            onChange={formik.handleChange}
            error={
              formik.touched.twitterLink && Boolean(formik.errors.twitterLink)
            }
            helperText={formik.touched.twitterLink && formik.errors.twitterLink}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="pinterestLink"
            name="pinterestLink"
            label="LE LIEN DU PINTEREST"
            placeholder="ENTRER LE LIEN DU PINTEREST"
            value={formik.values.pinterestLink}
            onChange={formik.handleChange}
            error={
              formik.touched.pinterestLink &&
              Boolean(formik.errors.pinterestLink)
            }
            helperText={
              formik.touched.pinterestLink && formik.errors.pinterestLink
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="instaLink"
            name="instaLink"
            label="LIEN D'INSTAGRAM"
            placeholder="ENTRER LE LIEN D'INSTAGRAM"
            value={formik.values.instaLink}
            onChange={formik.handleChange}
            error={formik.touched.instaLink && Boolean(formik.errors.instaLink)}
            helperText={formik.touched.instaLink && formik.errors.instaLink}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="snapLink"
            name="snapLink"
            label="LIEN DU SNAPCHAT"
            placeholder="ENTRER LE LIEN DU SNAPCHAT"
            value={formik.values.snapLink}
            onChange={formik.handleChange}
            error={formik.touched.snapLink && Boolean(formik.errors.snapLink)}
            helperText={formik.touched.snapLink && formik.errors.snapLink}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="ytbeLink"
            name="ytbeLink"
            label="LIEN DU YOUTUBE"
            placeholder="ENTRER LE LIEN DU YOUTUBE"
            value={formik.values.ytbeLink}
            onChange={formik.handleChange}
            error={formik.touched.ytbeLink && Boolean(formik.errors.ytbeLink)}
            helperText={formik.touched.ytbeLink && formik.errors.ytbeLink}
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
export default SocialSettingsForm;
