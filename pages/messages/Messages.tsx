import React, { ChangeEvent, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import {
  Button,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  LinearProgress,
  OutlinedInput,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import Table from "components/table";
import { GridColDef } from "@mui/x-data-grid";
// import router from "next/router";
import { useQuery } from "react-query";
import { getMessagesById } from "services/messages";

import styles from "./Messages.module.scss";

function Messages() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const [sender, setSender] = useState<string | undefined>(undefined);
  const [localSender, setLocalSender] = useState<string | undefined>("");

  const [receiver, setReceiver] = useState<string | undefined>(undefined);
  const [localReceiver, setLocalReceiver] = useState<string | undefined>("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleLocalSenderChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLocalSender(event.target.value);
  };
  const handleLocalReceiverChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLocalReceiver(event.target.value);
  };

  const { data, isLoading } = useQuery(
    ["messages", sender, receiver, page, pageSize],
    () => getMessagesById(sender, receiver),
    {
      enabled: !!sender && !!receiver,
      keepPreviousData: false,
      refetchOnWindowFocus: false,
      onSuccess: (res: any) => {
        setPaginationTotalRows(parseInt(res.rowsLength, 10));
      },
    }
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "id",
        headerName: f("id"),
        flex: 2,
        sortable: false,
      },
      {
        field: "messageContent",
        headerName: f("message"),
        type: "string",
        flex: 2.5,
        sortable: false,
      },
      {
        field: "createdAt",
        headerName: f("publishTime"),
        type: "string",
        sortable: false,
        flex: 1.5,
      },
      {
        field: "type",
        headerName: f("status"),
        type: "string",
        sortable: false,
        flex: 1,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  return (
    <>
      <Title>{f("Messages")}</Title>
      <Grid
        className={styles.useFilters_filters}
        container
        direction="row"
        alignItems="center"
        p={2}
      >
        <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <FormControl
            className={styles.useFilters_filters_selectFilter1}
            variant="outlined"
            sx={{ m: 1 }}
          >
            <InputLabel>{f("USER ID Filter")}</InputLabel>
            <OutlinedInput
              label={f("USER ID Filter")}
              placeholder={f("filter messages by Sender ID")}
              value={localSender}
              onChange={handleLocalSenderChange}
              endAdornment={
                <InputAdornment position="end">
                  {localSender && (
                    <button
                      type="button"
                      className={styles.useFilters_filters_clearBtn}
                    >
                      <ClearIcon
                        onClick={() => {
                          setSender(undefined);
                          setLocalSender("");
                        }}
                      />
                    </button>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid p={1} item xs={12} sm={12} md={6} lg={6}>
          <FormControl
            className={styles.useFilters_filters_selectFilter1}
            variant="outlined"
            sx={{ m: 1 }}
          >
            <InputLabel>{f("USER ID Filter")}</InputLabel>
            <OutlinedInput
              label={f("USER ID Filter")}
              placeholder={f("filter messages by Receiver ID")}
              value={localReceiver}
              onChange={handleLocalReceiverChange}
              endAdornment={
                <InputAdornment position="end">
                  {localReceiver && (
                    <button
                      type="button"
                      className={styles.useFilters_filters_clearBtn}
                    >
                      <ClearIcon
                        onClick={() => {
                          setReceiver(undefined);
                          setLocalReceiver("");
                        }}
                      />
                    </button>
                  )}
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
        <Grid p={1} item xs={12} display="flex" justifyContent="center">
          {localSender && localReceiver && (
            <Button
              variant="outlined"
              onClick={() => {
                setSender(localSender);
                setReceiver(localReceiver);
              }}
            >
              Search
            </Button>
          )}
        </Grid>
      </Grid>
      {(!localSender || !localReceiver) &&
        "Please add a the sender and receiver to display messages"}
      {sender &&
        receiver &&
        !data &&
        !isLoading &&
        "It seems that you the user have not made any message or the Id was Invalid,Please add a VALID user Id to display messages"}
      {isLoading && <LinearProgress />}
      {sender && receiver && data && (
        <Table
          rows={data?.content}
          columns={columns}
          rowCount={paginationTotalRows}
          pageSize={pageSize}
          rowsPerPageOptions={[5, 10, 20]}
          checkboxSelection={false}
          onPageSizeChange={(newPageSize: number) => {
            setPageSize(newPageSize);
          }}
          onPageChange={(newPage: number) => {
            setPage(newPage + 1);
          }}
          onFilterModelChange={() => undefined}
          onSortModelChange={() => undefined}
          loading={isLoading}
          openModal={false}
          handleCloseModal={() => undefined}
          clientSidePagination
        />
      )}
    </>
  );
}

export default Messages;
