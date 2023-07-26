import * as React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  InputLabel,
  TextField,
} from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import { useMutation } from "react-query";
import { uploadMedia } from "services/realm";
import { NEXT_PUBLIC_BASE_URL } from "config";
import styles from "./SiteSettingsForm.module.scss";

const validationSchema = yup.object({
  // siteName: yup.string().required("siteName is required"),
  // tagName: yup.string().required("tagName is required"),
  // primaryColor: yup.string().required("primaryColor is required"),
  // secondaryColor: yup.string().required("secondaryColor is required"),
  // siteUrl: yup
  //   .string()
  //   .url("Enter your valid url")
  //   .required("siteUrl is required"),
  // favIcon: yup
  //   .mixed()
  //   .test("fileType", "Unsupported File Format", (value: { type: any }) =>
  //     SUPPORTED_FORMATS.includes(value.type)
  //   )
  //   .test(
  //     "fileSize",
  //     "File Size is too large",
  //     (value: { size: number }) => value.size <= FILE_SIZE
  //   ),
  // siteLogo: yup
  //   .mixed()
  //   .test("fileType", "Unsupported File Format", (value: { type: any }) =>
  //     SUPPORTED_FORMATS.includes(value.type)
  //   )
  //   .test(
  //     "fileSize",
  //     "File Size is too large",
  //     (value: { size: number }) => value.size <= FILE_SIZE
  //   ),
});

const SiteSettingsForm = ({ data, update, realm }: any) => {
  const {
    siteName,
    siteUrl,
    tagName,
    primaryColor,
    secondaryColor,
    isGroupeChat,
    isMessage,
    favIcon,
    siteLogo,
  } = data;

  const [uploadFavIcon, setUploadFavIcon] = React.useState("");

  const [uploadSiteLogo, setUploadSiteLogo] = React.useState("");

  const onSelectFavIcon = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadFavIcon(event.target.files[0]);
    }
  };

  const onSelectSiteLogo = (event: any) => {
    if (event.target.files && event.target.files.length > 0) {
      setUploadSiteLogo(event.target.files[0]);
    }
  };
  const { mutateAsync: uploadFilesMutation } = useMutation(uploadMedia);
  const formik = useFormik({
    initialValues: {
      siteName,
      siteUrl,
      tagName,
      primaryColor,
      secondaryColor,
      isGroupeChat,
      isMessage,
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      let newFavIcon = favIcon;
      let newSiteLogo = siteLogo;
      setSubmitting(false);

      if (uploadFavIcon) {
        newFavIcon = await uploadFilesMutation(uploadFavIcon).catch((error) => {
          throw new Error(`error in img upload${error}`);
        });
        newFavIcon = newFavIcon?.result?.key || "";
      }
      if (uploadSiteLogo) {
        newSiteLogo = await uploadFilesMutation(uploadSiteLogo).catch(
          (error) => {
            throw new Error(`error in img upload${error}`);
          }
        );
        newSiteLogo = newSiteLogo?.result?.key || "";
      }

      // insert new img url to data
      update({
        ...data,
        ...values,
        favIcon: newFavIcon,
        siteLogo: newSiteLogo,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container direction="row" p={1}>
        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="siteName"
            name="siteName"
            label="Nom du site"
            value={formik.values.siteName}
            onChange={formik.handleChange}
            error={formik.touched.siteName && Boolean(formik.errors.siteName)}
            helperText={formik.touched.siteName && formik.errors.siteName}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <TextField
            fullWidth
            id="siteUrl"
            name="siteUrl"
            label="Url du site"
            value={formik.values.siteUrl}
            onChange={formik.handleChange}
            error={formik.touched.siteUrl && Boolean(formik.errors.siteUrl)}
            helperText={formik.touched.siteUrl && formik.errors.siteUrl}
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            id="tagName"
            name="tagName"
            label="Nom du Tag"
            placeholder="Video meetings, conferences"
            value={formik.values.tagName}
            onChange={formik.handleChange}
            error={formik.touched.tagName && Boolean(formik.errors.tagName)}
            helperText={formik.touched.tagName && formik.errors.tagName}
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            id="primaryColor"
            name="primaryColor"
            label="Couleur primaire"
            placeholder="#432f97"
            value={formik.values.primaryColor}
            onChange={formik.handleChange}
            error={
              formik.touched.primaryColor && Boolean(formik.errors.primaryColor)
            }
            helperText={
              formik.touched.primaryColor && formik.errors.primaryColor
            }
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={12}>
          <TextField
            fullWidth
            id="secondaryColor"
            name="secondaryColor"
            label="Couleur secondaire"
            placeholder="#432f97"
            value={formik.values.secondaryColor}
            onChange={formik.handleChange}
            error={
              formik.touched.secondaryColor &&
              Boolean(formik.errors.secondaryColor)
            }
            helperText={
              formik.touched.secondaryColor && formik.errors.secondaryColor
            }
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={12}>
          <FormControlLabel
            control={
              <Checkbox
                id="isGroupeChat"
                name="isGroupeChat"
                checked={
                  formik.values.isGroupeChat === true ||
                  formik.values.isGroupeChat === undefined ||
                  formik.values.isGroupeChat === "true"
                }
                onChange={(e: any) => {
                  formik.setFieldValue("isGroupeChat", e.target.checked);
                }}
              />
            }
            label="Chat de groupe"
          />
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={12}>
          <FormControlLabel
            control={
              <Checkbox
                id="isMessage"
                name="isMessage"
                checked={
                  formik.values.isMessage === true ||
                  formik.values.isMessage === undefined ||
                  formik.values.isMessage === "true"
                }
                onChange={(e: any) => {
                  formik.setFieldValue("isMessage", e.target.checked);
                }}
              />
            }
            label="Message"
          />
        </Grid>

        <Grid p={1} item xs={12} sm={12} md={6}>
          <InputLabel htmlFor="favIcon">Fav Icon</InputLabel>
          <TextField
            fullWidth
            type="file"
            id="favIcon"
            name="favIcon"
            label="Fav Icon"
            variant="standard"
            value={undefined}
            onChange={onSelectFavIcon}
          />
        </Grid>
        <img
          src={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${favIcon}`}
          alt="favIcon"
          className={styles.img}
          onError={({ currentTarget }) => {
            // eslint-disable-next-line no-param-reassign
            currentTarget.onerror = null;
            // eslint-disable-next-line no-param-reassign
            currentTarget.src = `${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/7d1941599943312616c9d54fa571bf88`;
          }}
        />

        <Grid p={1} item xs={12} sm={12} md={6}>
          <InputLabel htmlFor="favIcon">Site Logo</InputLabel>
          <TextField
            fullWidth
            type="file"
            id="siteLogo"
            name="siteLogo"
            label="Logo du site"
            variant="standard"
            value={undefined}
            onChange={onSelectSiteLogo}
          />
        </Grid>
        <img
          src={`${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/${siteLogo}`}
          alt="siteLogo"
          className={styles.img}
          onError={({ currentTarget }) => {
            // eslint-disable-next-line no-param-reassign
            currentTarget.onerror = null;
            // eslint-disable-next-line no-param-reassign
            currentTarget.src = `${NEXT_PUBLIC_BASE_URL}/api/v1/post/${realm}/medias/7d1941599943312616c9d54fa571bf88`;
          }}
        />

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
export default SiteSettingsForm;
