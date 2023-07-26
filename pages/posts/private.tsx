// ** React Imports
import React, { forwardRef, useState } from "react";

// ** MUI Imports
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import CardHeader from "@mui/material/CardHeader";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Select from "@mui/material/Select";
import { getPosts, CreateAdvice } from "services/posts";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import MuiInput from "@mui/material/Input";
import VolumeUp from "@mui/icons-material/VolumeUp"; // ** Third Party Imports
import { MuiChipsInput } from "mui-chips-input";
import axiosClient from "../../config/axiosConfig";
// ** Icon Imports
const Input = styled(MuiInput)`
  width: 42px;
`;
const FormLayoutsSeparator = () => {
  // ** State

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [week, setWeek] = useState(1);
  const [tags, setTags] = useState([]);
  const [image, setImage] = useState({ preview: "", raw: "" });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response1 = await axiosClient.post(
        "/api/v1/doc/tunisdb/document",
        formData
      );
      console.log("Document created:", response1.data.fileId);

      const adviceData = {
        title,
        description,
        category,
        type,
        week: value,
        images: [{ id: response1.data.fileId }],
        tags:tags.map((tag) => ({ tag })),
        
        user_id: 1,
      };

      const response2 = await CreateAdvice(adviceData);
      // Handle the response if needed
    } catch (error) {
      console.error("Failed to create document:", error);
      // Handle the error, e.g., show error message on the UI
    }
  };
  const handleFormReset = (e: any) => {
    e.preventDefault();
    setTitle("");
    setDescription("");
    setCategory("");
    setType("");
    setWeek(1);
    setTags([]);

    console.log(title, description, category, type, week, tags);
  };
  const handleChange1 = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const handleChange = (newTags: any) => {
    setTags(newTags);
  };

  const [value, setValue] = React.useState(1);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === "" ? "" : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  return (
    <Card>
      <CardHeader title="Ajouter un conseil" />
      <Divider sx={{ m: "0 !important" }} />
      <form onReset={handleFormReset} onSubmit={handleSubmit}>
        <CardContent>
          <Grid container spacing={5}>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
                placeholder="Title"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                rows={4}
                multiline
                placeholder="Description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="textarea-filled-static"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <TextField
                fullWidth
                label="Categorie"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Title"
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="Type"
                fullWidth
                onChange={(e) => setType(e.target.value)}
              >
                <MenuItem value="Pregnacy">Grossesse</MenuItem>
                <MenuItem value="Baby">Bébé</MenuItem>
              </Select>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Box fullWidth>
                <Typography id="input-slider" gutterBottom>
                  Semaines
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs>
                    <Slider
                      value={typeof value === "number" ? value : 0}
                      onChange={handleSliderChange}
                      aria-labelledby="input-slider"
                    />
                  </Grid>
                  <Grid item>
                    <Input
                      value={value}
                      size="small"
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      inputProps={{
                        step: 1,
                        min: 0,
                        max: 40,
                        type: "number",
                        "aria-labelledby": "input-slider",
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              <br />
            </Grid>
            <Grid item xs={12} sm={12}>
              <MuiChipsInput
                fullWidth
                label="Tags"
                value={tags}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              {/* <div>
                <label htmlFor="upload-button">
                  {image.preview ? (
                    <img
                      src={image.preview}
                      alt="dummy"
                      width="300"
                      height="300"
                    />
                  ) : (
                    <>
                      <span className="fa-stack fa-2x mt-3 mb-2">
                        <i className="fas fa-circle fa-stack-2x" />
                        <i className="fas fa-store fa-stack-1x fa-inverse" />
                      </span>
                      <h5 className="text-center">Choisir votre photo </h5>
                    </>
                  )}
                </label>
                <input
                  type="file"
                  id="upload-button"
                  style={{ display: "none" }}
                  onChange={handleChange1}
                />
                <br />
              </div>
              <Button
                onClick={handleUpload}
                variant="contained"
                component="label"
              >
                Upload File
                <input type="file" hidden />
              </Button> */}

              <div>
                <input type="file" onChange={handleFileChange} />
                <button disabled={!file}>Download File</button>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <Divider sx={{ m: "0 !important" }} />
        <CardActions>
          <Button size="large" type="submit" sx={{ mr: 2 }} variant="contained">
            Submit
          </Button>
          <Button
            type="reset"
            size="large"
            color="secondary"
            variant="outlined"
          >
            Reset
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default FormLayoutsSeparator;
