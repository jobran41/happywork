/* eslint-disable no-underscore-dangle */
import React from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import {
  Checkbox,
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  TextField,
} from "@mui/material";

import SpecialImage from "components/SpecialImage";
import { useQuery } from "react-query";
import { useRouter } from "next/router";
import { getFormById, getResponseById } from "services/forms";

function FormCreate() {
  const router = useRouter();

  const { rid, fid, realm } = router.query;
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const { data: options, isLoading: isLoadingResponse } = useQuery(
    ["response", rid],
    () =>
      getResponseById({
        rid: rid as string,
        fid: fid as string,
        realm: realm as string,
      }),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const { data: form, isLoading } = useQuery(
    ["form", fid],
    () => getFormById(fid as string, realm),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const formTypes = [
    { id: 1, label: "public" },
    { id: 2, label: "private" },
  ];

  const questionTypes = [
    { id: "true", label: "open" },
    { id: "false", label: "closed" },
  ];

  return (
    <>
      {isLoading && isLoadingResponse && <LinearProgress />}
      {form && options && (
        <>
          <Title>{f("Create Form")}</Title>
          <Grid container direction="row" p={1}>
            <Grid p={1} item xs={12} sm={12}>
              <Title>{f("Form General Data")}</Title>
            </Grid>

            <Grid p={1} item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                id="Name"
                name="name"
                label="Name"
                placeholder="Name"
                value={form.name}
              />
            </Grid>

            <Grid p={1} item xs={12} sm={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Form Type</InputLabel>
                <Select name="formType" value={form.formType} label="form Type">
                  {formTypes.map(({ id, label }) => (
                    <MenuItem key={id} value={label}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid p={1} item xs={12} sm={12} md={12}>
              <TextField
                fullWidth
                id="description"
                name="description"
                label="Description"
                placeholder="Description"
                value={form.description}
              />
            </Grid>
          </Grid>
          <Grid container direction="row" p={1}>
            <Grid p={1} item xs={12} sm={12}>
              <Title>{f("Form Questions")}</Title>
            </Grid>
            {form.questions.map((q: any, i: any) => (
              <>
                <Paper
                  elevation={3}
                  sx={{
                    width: "100%",
                    marginBottom: 5,
                  }}
                >
                  <Grid pl={3} pt={2} item xs={12}>
                    <Title>{f("Question: ") + (i + 1)}</Title>
                  </Grid>

                  <Grid p={1} item xs={12}>
                    <TextField
                      fullWidth
                      id="question"
                      name="question"
                      label="Question"
                      placeholder="Question"
                      value={q.questionText}
                    />
                  </Grid>

                  <Grid p={1} item xs={12} sm={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel>Question Type</InputLabel>
                      <Select
                        value={q.open === true ? "true" : "false"}
                        label="Question Type"
                      >
                        {questionTypes.map(({ id, label }) => (
                          <MenuItem key={id} value={id}>
                            {label}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid p={1} item xs={12}>
                    {q.questionImage && (
                      <SpecialImage imageKey={q.questionImage} alt="question" />
                    )}
                  </Grid>

                  {q.options.map((o: any) => (
                    <>
                      <Grid p={1} item xs={12} sm={12}>
                        <Checkbox checked={options.includes(o._id)} />
                        <TextField
                          fullWidth
                          id={i}
                          name="option"
                          label="option"
                          placeholder="option"
                          value={o.optionText}
                        />
                      </Grid>
                    </>
                  ))}
                </Paper>
              </>
            ))}
          </Grid>
        </>
      )}
    </>
  );
}

export default FormCreate;
