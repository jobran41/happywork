import * as React from "react";
import {
  Button,
  Grid,
  InputLabel,
  LinearProgress,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const FILE_SIZE = 2097152;

const validationSchema = yup.object({
  file: yup
    .mixed()
    .test("fileType", "Unsupported File Format", (file: any) =>
      SUPPORTED_FORMATS.includes(file.type)
    )
    .test(
      "fileSize",
      "File Size is too large",
      (file: any) => file.size <= FILE_SIZE
    ),
});

const UpdateProfileImageForm = () => {
  const formik = useFormik({
    initialValues: {
      file: null,
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
        {/* <input type="file" onInput={(e) => console.log(e.target.files[0])} /> */}
        <Grid p={1} item xs={12}>
          <InputLabel htmlFor="file">Profile Avatar</InputLabel>
          <TextField
            fullWidth
            type="file"
            id="file"
            name="file"
            variant="standard"
            onChange={(e: any) => {
              const file = e.target.files[0];
              formik.setFieldValue("file", file);
            }}
            error={formik.touched.file && Boolean(formik.errors.file)}
            helperText={formik.touched.file && formik.errors.file}
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
export default UpdateProfileImageForm;
