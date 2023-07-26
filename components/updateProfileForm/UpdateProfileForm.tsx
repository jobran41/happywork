import * as React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Grid, LinearProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().required(),
  about: yup.string(),
});

const UpdateProfileForm = ({ data, update }: any) => {
  const {
    firstName,
    lastName,
    email,
    attributes: { userBio: about },
  } = data;

  const formik = useFormik({
    initialValues: {
      firstName,
      lastName,
      email,
      about,
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
          <TextField
            fullWidth
            id="firstName"
            name="firstName"
            label="Nom "
            placeholder="Entrer votre Nom"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid p={1} item xs={12}>
          <TextField
            fullWidth
            id="lastName"
            name="lastName"
            label="Prenom"
            placeholder="ENTER votre Prenom"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <TextField
            fullWidth
            id="email"
            name="email"
            label="Email "
            placeholder="Entrer votre Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <TextField
            fullWidth
            multiline
            id="about"
            name="about"
            label="A propos"
            placeholder="Enter A propos"
            value={formik.values.about}
            onChange={formik.handleChange}
            error={formik.touched.about && Boolean(formik.errors.about)}
            helperText={formik.touched.about && formik.errors.about}
          />
        </Grid>

        {formik.isSubmitting && <LinearProgress />}
        {/* <Grid p={1} item xs={12}>
          <Button
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            type="submit"
          >
            Submit
          </Button>
        </Grid> */}
      </Grid>
    </form>
  );
};
export default UpdateProfileForm;
