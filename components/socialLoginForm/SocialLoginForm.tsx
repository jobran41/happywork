import * as React from "react";
import { Button, Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import Title from "components/title";

const validationSchema = yup.object({
  fbClientId: yup.string(),
  fbClientSecret: yup.string(),
  fbCallback: yup.string(),
  gClientId: yup.string(),
  gClientSecret: yup.string(),
  gCallback: yup.string(),
});

const SocialLoginForm = ({ data, update }: any) => {
  const {
    fbClientId,
    fbClientSecret,
    fbCallback,
    gClientId,
    gClientSecret,
    gCallback,
  } = data;
  const formik = useFormik({
    initialValues: {
      fbClientId,
      fbClientSecret,
      fbCallback,
      gClientId,
      gClientSecret,
      gCallback,
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
        <Grid p={1} item xs={12}>
          <Title>PARAMETRES DU FB</Title>
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="fbClientId"
            name="fbClientId"
            label="Id du clien FB"
            placeholder="ENTRER votre Id du FB Client"
            value={formik.values.fbClientId}
            onChange={formik.handleChange}
            error={
              formik.touched.fbClientId && Boolean(formik.errors.fbClientId)
            }
            helperText={formik.touched.fbClientId && formik.errors.fbClientId}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="fbClientSecret"
            name="fbClientSecret"
            label="Secret du client FB "
            placeholder="Secret du client FB "
            value={formik.values.fbClientSecret}
            onChange={formik.handleChange}
            error={
              formik.touched.fbClientSecret &&
              Boolean(formik.errors.fbClientSecret)
            }
            helperText={
              formik.touched.fbClientSecret && formik.errors.fbClientSecret
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="fbCallback"
            name="fbCallback"
            label="FB CallBack"
            placeholder="ENTRER FB CallBack"
            value={formik.values.fbCallback}
            onChange={formik.handleChange}
            error={
              formik.touched.fbCallback && Boolean(formik.errors.fbCallback)
            }
            helperText={formik.touched.fbCallback && formik.errors.fbCallback}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <Title>PARAMETRES GOOGLE</Title>
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="gClientId"
            name="gClientId"
            label="Id du client GOOGLE"
            placeholder="ENTRER votre Id du Client GOOGLE"
            value={formik.values.gClientId}
            onChange={formik.handleChange}
            error={formik.touched.gClientId && Boolean(formik.errors.gClientId)}
            helperText={formik.touched.gClientId && formik.errors.gClientId}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="gClientSecret"
            name="gClientSecret"
            label="Secret du Client GOOGLE"
            placeholder="Secret du Client GOOGLE "
            value={formik.values.gClientSecret}
            onChange={formik.handleChange}
            error={
              formik.touched.gClientSecret &&
              Boolean(formik.errors.gClientSecret)
            }
            helperText={
              formik.touched.gClientSecret && formik.errors.gClientSecret
            }
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="gCallback"
            name="gCallback"
            label="GOOGLE CallBack"
            placeholder="ENTRER GOOGLE CallBack"
            value={formik.values.gCallback}
            onChange={formik.handleChange}
            error={formik.touched.gCallback && Boolean(formik.errors.gCallback)}
            helperText={formik.touched.gCallback && formik.errors.gCallback}
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
export default SocialLoginForm;
