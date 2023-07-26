import React, { ChangeEvent, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";
import {
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import Table from "components/table";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { getUsers, updateUser } from "services/users";
import { useQuery } from "react-query";
import styles from "./Users.module.scss";
import DownloadDoneIcon from '@mui/icons-material/DownloadDone';
function BlockedUsers() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [search, setSearch] = useState<string | undefined>(undefined);
  const [localSearch, setLocalSearch] = useState<string | undefined>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const handleLocalSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLocalSearch(event.target.value);
  };

  const { data } = useQuery(
    ["users", page, pageSize],
    () =>
      getUsers({
        search: { enabled: false },
        localSearch,
        page,
        perPage: pageSize,
      }),
    {
      keepPreviousData: true,
      onSuccess: (res: { content: any; rowsLength: string }) => {
        setPaginationTotalRows(parseInt(res.rowsLength, 10));
      },
    }
  );
  const handleGridActionsCellItemClick = async (userId) => {
    console.log("userId", userId);
    try {
      // Assuming you already have the necessary user data to be updated
      const payload = { id: userId ,enabled:true /* update the necessary properties */ };

      // Update user data
      const response = await updateUser(payload);

      // Handle the response, e.g., show success message, refresh the data, etc.
      console.log("User updated successfully:", response);

 
    } catch (error) {
      console.error("Error updating user:", error);
      // Handle errors, e.g., show error message, etc.
    }
  };
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "username",
        headerName: f("Nom d'utilisateur"),
        type: "string",
        flex: 1,
        sortable: false,
      },
      {
        field: "email",
        headerName: f("Email"),
        type: "string",
        flex: 1.5,
        sortable: false,
      },
      {
        field: "firstName",
        headerName: f("Nom"),
        type: "string",
        sortable: false,
        flex: 1,
      },

      {
        field: "lastName",
        headerName: f("Prenom"),
        sortable: false,
        filterable: false,
        width: 160,
      },
      {
        field: "actions",
        headerName: f("actions"),
        type: "actions",
        getActions: (params: GridRowParams) => [
          // eslint-disable-next-line react/jsx-key
       
          <GridActionsCellItem
            icon={<DownloadDoneIcon />}
            onClick={() => handleGridActionsCellItemClick(params.row.id)}
            label={f("Activer")}
            showInMenu
          />,
          // // eslint-disable-next-line react/jsx-key
          // <GridActionsCellItem
          //   icon={<ArticleIcon />}
          //   onClick={() => {
          //     // eslint-disable-next-line no-alert
          //     alert(params.row.id);
          //   }}
          //   label={f("Posts")}
          //   showInMenu
          // />,
          // // eslint-disable-next-line react/jsx-key
          // <GridActionsCellItem
          //   icon={<BookmarkIcon />}
          //   onClick={() => {
          //     // eslint-disable-next-line no-alert
          //     alert(params.row.id);
          //   }}
          //   label={f("Liked Posts")}
          //   showInMenu
          // />,
        ],
        sortable: false,
        filterable: false,
        width: 160,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const dataFilterd = data?.content
    .map((el: any) => {
      if (el.enabled) {
        return false;
      }
      return el;
    })
    .filter((d: any) => d !== false);
  console.log("dataFilterd", dataFilterd);
  return (
    <>
      <Title>Utilisateur Bloqués</Title>

      <Grid
        className={styles.useFilters_filters}
        container
        direction="row"
        alignItems="center"
        justifyContent="end"
        p={2}
      >
        <Grid p={1} item xs={12} sm={12} md={12} lg={12}>
          <FormControl
            className={styles.useFilters_filters_selectFilter1}
            variant="outlined"
            sx={{ m: 1 }}
          >
            <InputLabel>{f("Rechercher")}</InputLabel>
            <OutlinedInput
              label={f("Rechercher")}
              placeholder={f(
                "Rechercher par nom d'utilisateur,Email Id,Mobile"
              )}
              value={localSearch}
              onChange={handleLocalSearchChange}
              endAdornment={
                <InputAdornment position="end">
                  {localSearch && (
                    <button
                      type="button"
                      className={styles.useFilters_filters_clearBtn}
                    >
                      <ClearIcon
                        onClick={() => {
                          // setSearch(undefined);
                          setLocalSearch("");
                        }}
                      />
                    </button>
                  )}
                  <button
                    type="button"
                    className={styles.useFilters_filters_searchButton}
                  >
                    <SearchIcon
                      onClick={() => {
                        // setSearch(localSearch);
                      }}
                    />
                  </button>
                </InputAdornment>
              }
            />
          </FormControl>
        </Grid>
      </Grid>

      <Table
        rows={dataFilterd}
        columns={columns}
        rowCount={dataFilterd?.length}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection={false}
        onPageSizeChange={(newPageSize: number) => {
          setPageSize(newPageSize);
        }}
        onPageChange={(newPage: number) => {
          setPage(newPage + 1);
        }}
        onFilterModelChange={() => null}
        onSortModelChange={() => null}
        loading={false}
        openModal={false}
        handleCloseModal={() => null}
      />
    </>
  );
}

export default BlockedUsers;
