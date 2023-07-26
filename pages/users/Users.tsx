import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
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
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import ArticleIcon from "@mui/icons-material/Article";
// import BookmarkIcon from "@mui/icons-material/Bookmark";
import Table from "components/table";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import router from "next/router";
import { useMutation } from "react-query";
import { getUsers, updateUser } from "services/users";

import styles from "./Users.module.scss";

function Users() {
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [localSearch, setLocalSearch] = useState<string | undefined>("");

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  // const [filter, setFilter] = useState({});
  // const [sort, setSort] = useState({});

  const { data, mutate } = useMutation(["users", page, pageSize], getUsers, {
    // enabled: true,
    onSuccess: (res) => {
      setPaginationTotalRows(parseInt(res.rowsLength, 10));
    },
  });

  useEffect(() => {
    mutate({
      localSearch,
      page,
      perPage: pageSize,
    });
  }, [localSearch, mutate, page, pageSize]);

  const handleLocalSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLocalSearch(event.target.value);
    mutate({
      localSearch: event.target.value,
      page,
      perPage: pageSize,
    });
  };
  const handleGridActionsCellItemClick = async (userId) => {
    console.log("userId", userId);
    try {
      // Assuming you already have the necessary user data to be updated
      const payload = { id: userId ,enabled:false /* update the necessary properties */ };

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
        headerName: f("Nom de l'utilisateur"),
        type: "string",
        flex: 1,
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
        field: "email",
        headerName: f("Email"),
        type: "string",
        flex: 1.5,
        sortable: false,
      },
      // {
      //   field: "enabled",
      //   headerName: f("Status"),
      //   type: "string",
      //   sortable: false,
      //   flex: 1,
      // },
      // {
      //   field: "documents",
      //   headerName: f("documents"),
      //   type: "string",
      //   sortable: false,
      //   flex: 1,
      // },
      {
        field: "actions",
        headerName: f("actions"),
        type: "actions",
        getActions: (params: GridRowParams) => [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon />}
            onClick={() => {
              router.push(`users/${params.row.id}`);
            }}
            label={f("voir")}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon />}
            onClick={() => handleGridActionsCellItemClick(params.row.id)}
            label={f("Bloquer")}
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
  /*  if (isLoading) return <LinearProgress />; */
  return (
    <>
      <Title>{f("Utilisateurs")}</Title>
      <Grid
        className={styles.useFilters_filters}
        container
        direction="row"
        alignItems="center"
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
              placeholder={f("Rechercher par nom d'utlisateur,Email Id,Mobile")}
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
                          setSearch(undefined);
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
                        setSearch(localSearch);
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
        loading={false}
        openModal={false}
        handleCloseModal={() => undefined}
      />
    </>
  );
}

export default Users;
