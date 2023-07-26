import * as React from "react";
import { Button, Grid, LinearProgress, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  oldPass: yup.string().required(),
  newPass: yup.string().required(),
  confirmPass: yup
    .string()
    .required()
    .when("newPass", {
      is: (val: string | any[]) => !!(val && val.length > 0),
      then: yup
        .string()
        .oneOf([yup.ref("newPass")], "Both password need to be the same"),
    }),
});

const UpdateProfilePasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      oldPass: "",
      newPass: "",
      confirmPass: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setSubmitting(false);
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
            id="oldPass"
            name="oldPass"
            label="Old Password"
            placeholder="ENTER Old Password"
            value={formik.values.oldPass}
            onChange={formik.handleChange}
            error={formik.touched.oldPass && Boolean(formik.errors.oldPass)}
            helperText={formik.touched.oldPass && formik.errors.oldPass}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <TextField
            fullWidth
            id="newPass"
            name="newPass"
            label="New Password"
            placeholder="Enter New Password"
            value={formik.values.newPass}
            onChange={formik.handleChange}
            error={formik.touched.newPass && Boolean(formik.errors.newPass)}
            helperText={formik.touched.newPass && formik.errors.newPass}
          />
        </Grid>

        <Grid p={1} item xs={12}>
          <TextField
            fullWidth
            id="confirmPass"
            name="confirmPass"
            label="Confirm Password"
            placeholder="Enter Confirm Password"
            value={formik.values.confirmPass}
            onChange={formik.handleChange}
            error={
              formik.touched.confirmPass && Boolean(formik.errors.confirmPass)
            }
            helperText={formik.touched.confirmPass && formik.errors.confirmPass}
          />
        </Grid>

        {formik.isSubmitting && <LinearProgress />}
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
export default UpdateProfilePasswordForm;
