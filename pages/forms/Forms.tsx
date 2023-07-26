// import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
// import { useIntl } from "react-intl";
// import Title from "components/title";

// import ClearIcon from "@mui/icons-material/Clear";
// import SearchIcon from "@mui/icons-material/Search";
// import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import DeleteIcon from "@mui/icons-material/Delete";
// // import ArticleIcon from "@mui/icons-material/Article";
// import Table from "components/table";
// import {
//   GridActionsCellItem,
//   GridColDef,
//   GridRowParams,
// } from "@mui/x-data-grid";
// import { useRouter } from "next/router";
// import { useMutation } from "react-query";
// import { getPosts, deletePostById } from "services/forms";
// import Typography from "@mui/material/Typography";
// import toast from "react-hot-toast";

// import CardContent from "@mui/material/CardContent";
// import Paper from "@mui/material/Paper";
// import { styled } from "@mui/material/styles";
// import Grid from "@mui/material/Grid";
// import Button from "@mui/material/Button";
// import InputLabel from "@mui/material/InputLabel";
// import FormControl from "@mui/material/FormControl";
// import OutlinedInput from "@mui/material/OutlinedInput";
// import InputAdornment from "@mui/material/InputAdornment";

// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContentText from "@mui/material/DialogContentText";
// import styles from "./Posts.module.scss";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// function Posts() {
//   const router = useRouter();
//   const { formatMessage } = useIntl();
//   const f = (id: string) => formatMessage({ id });
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [search, setSearch] = useState<string | undefined>(undefined);
//   const [localSearch, setLocalSearch] = useState<string | undefined>("");
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [paginationTotalRows, setPaginationTotalRows] = useState(0);
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [page, setPage] = useState(1);
//   const [pageSize, setPageSize] = useState(10);
//   const [rowId, setRowId] = useState("");

//   const { data, isLoading, mutate } = useMutation(
//     ["posts", page, pageSize],
//     getPosts,
//     {
//       //  keepPreviousData: true,
//       onSuccess: (res: any) => {
//         setPaginationTotalRows(parseInt(res.rowsLength, 10));
//       },
//     }
//   );
//   console.log("any1", data);

//   // ** States
//   const [open, setOpen] = useState(false);
//   const handleClickOpen = (id) => {
//     console.log(id, "iddddddddddddd");
//     setRowId(id);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     deletePostById(rowId)
//       .then((res) => {
//         toast.success("Détails de la grossesse supprimés avec succès ! ");

//         setOpen(false);
//       })
//       .catch((error) => {
//         toast.error("Détails de la grossesse non supprimés! ");
//         console.log(error);
//         setOpen(false);
//       });
//   };

//   useEffect(() => {
//     mutate({
//       page,
//       perPage: pageSize,
//       type: "public",
//       localSearch,
//     });
//   }, [localSearch, mutate, page, pageSize]);

//   const handleLocalSearchChange = (
//     event: ChangeEvent<HTMLInputElement>
//   ): void => {
//     setLocalSearch(event.target.value);
//     mutate({
//       page,
//       perPage: pageSize,
//       type: "public",
//       localSearch: event.target.value,
//     });
//   };

//   const columns: GridColDef[] = useMemo(
//     () => [
//       {
//         field: "id",
//         headerName: f("id"),
//         flex: 2,
//         sortable: false,
//       },
//       {
//         field: "start_date",
//         headerName: f("Start date"),
//         type: "string",
//         flex: 2.5,
//         sortable: false,
//       },
//       {
//         field: "due_date",
//         headerName: f("Due date"),
//         type: "string",
//         flex: 1.5,
//         sortable: false,
//       },
//       {
//         field: "actions",
//         headerName: f("actions"),
//         type: "actions",
//         getActions: (params: GridRowParams) => [
//           // eslint-disable-next-line react/jsx-key
//           <GridActionsCellItem
//             icon={<RemoveRedEyeIcon />}
//             // eslint-disable-next-line no-alert
//             onClick={() => {
//               router.push({
//                 // eslint-disable-next-line no-underscore-dangle
//                 pathname: `forms/${params.row.id}`,
//                 query: { realm: router.query.realm },
//               });
//             }}
//             label={f("Voir")}
//             showInMenu
//           />,
//           <GridActionsCellItem
//             icon={<DeleteIcon />}
//             // eslint-disable-next-line no-alert
//             onClick={() => {
//               handleClickOpen(params.row.id);
//             }}
//             label={f("Supprimer")}
//             showInMenu
//           />,
//         ],
//         sortable: false,
//         filterable: false,
//         width: 160,
//       },
//     ],
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//     []
//   );

//   return (
//     <>
//       <Title>{f("Liste de grosesse")}</Title>

//       <Grid container spacing={2}>
//         <Grid item xs={12} md={12}>
//           <Item>
//             <CardContent>
//               <Typography variant="body2" color="text.secondary">
//                 <Grid
//                   className={styles.useFilters_filters}
//                   container
//                   direction="row"
//                   alignItems="center"
//                   p={2}
//                 >
//                   <Grid p={1} item xs={12} sm={12} md={12} lg={12}>
//                     <FormControl
//                       className={styles.useFilters_filters_selectFilter1}
//                       variant="outlined"
//                       sx={{ m: 1 }}
//                     >
//                       <InputLabel>{f("Rechercher")}</InputLabel>
//                       <OutlinedInput
//                         label={f("Rechercher")}
//                         placeholder={f("Rechercher une publication")}
//                         value={localSearch}
//                         onChange={handleLocalSearchChange}
//                         endAdornment={
//                           <InputAdornment position="end">
//                             {localSearch && (
//                               <button
//                                 type="button"
//                                 className={styles.useFilters_filters_clearBtn}
//                               >
//                                 <ClearIcon
//                                   onClick={() => {
//                                     setSearch(undefined);
//                                     setLocalSearch("");
//                                   }}
//                                 />
//                               </button>
//                             )}
//                             <button
//                               type="button"
//                               className={styles.useFilters_filters_searchButton}
//                             >
//                               <SearchIcon
//                                 onClick={() => {
//                                   setSearch(localSearch);
//                                 }}
//                               />
//                             </button>
//                           </InputAdornment>
//                         }
//                       />
//                     </FormControl>
//                   </Grid>
//                 </Grid>
//                 <Table
//                   rows={data}
//                   columns={columns}
//                   rowCount={paginationTotalRows}
//                   pageSize={pageSize}
//                   // eslint-disable-next-line no-underscore-dangle
//                   getRowId={(row: any) => row?.id}
//                   rowsPerPageOptions={[5, 10, 20]}
//                   checkboxSelection={false}
//                   onPageSizeChange={(newPageSize: number) => {
//                     setPageSize(newPageSize);
//                   }}
//                   onPageChange={(newPage: number) => {
//                     setPage(newPage + 1);
//                   }}
//                   onFilterModelChange={() => undefined}
//                   onSortModelChange={() => undefined}
//                   loading={isLoading}
//                   openModal={false}
//                   handleCloseModal={() => undefined}
//                   clientSidePagination
//                 />
//               </Typography>
//             </CardContent>
//           </Item>

//           <>
//             <Dialog
//               open={open}
//               onClose={handleClose}
//               aria-labelledby="alert-dialog-title"
//               aria-describedby="alert-dialog-description"
//             >
//               <DialogTitle id="alert-dialog-title">
//               Êtes-vous sure de bien vouloir supprimer les détails de cette grossese              </DialogTitle>
            
//               <DialogActions className="dialog-actions-dense">
//                 <Button onClick={handleClose}>Non</Button>
//                 <Button onClick={handleClose}>Oui</Button>
//               </DialogActions>
//             </Dialog>
//           </>
//         </Grid>
//       </Grid>
//     </>
//   );
// }

// export default Posts;




import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useIntl } from "react-intl";
import Title from "components/title";

import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import DeleteIcon from "@mui/icons-material/Delete";
// import ArticleIcon from "@mui/icons-material/Article";
import Table from "components/table";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { getPregancyList, deletePostById } from "services/forms";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";

import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import styles from "./Posts.module.scss";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function Posts() {
  const router = useRouter();
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [localSearch, setLocalSearch] = useState<string | undefined>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [rowId, setRowId] = useState("");

  const { data, isLoading, mutate } = useMutation(
    ["posts", page, pageSize],
    getPregancyList,
    {
      //  keepPreviousData: true,
      onSuccess: (res: any) => {
        setPaginationTotalRows(parseInt(res.rowsLength, 10));
      },
    }
  );
  console.log(data,'datadata')

  // ** States
  const [open, setOpen] = useState(false);
  const handleClickOpen = (id) => {
    setRowId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };
  const handleDeletePregancy = () => {
    deletePostById(rowId)
      .then((res) => {
        toast.success("Conseil supprimé avec succès ! ");

        setOpen(false); 
      })
      .catch((error) => {
        toast.error("Conseil n'a pas été supprimé avec succès! ");
        setOpen(false);
      });
  };
  useEffect(() => {
    mutate({
      page,
      perPage: pageSize,
      type: "public",
      localSearch,
    });
  }, [localSearch, mutate, page, pageSize]);

  const handleLocalSearchChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setLocalSearch(event.target.value);
    mutate({
      page,
      perPage: pageSize,
      type: "public",
      localSearch: event.target.value,
    });
  };

  const columns: GridColDef[] = useMemo(
    () => [
  
      {
        field: "start_date",
        headerName: f("Date de debut"),
        type: "string",
        flex: 2.5,
        sortable: false,
      },
      {
        field: "due_date",
        headerName: f("Date de fin"),
        type: "string",
        flex: 1.5,
        sortable: false,
      },
     
   
      {
        field: "actions",
        headerName: f("actions"),
        type: "actions",
        getActions: (params: GridRowParams) => [
          // eslint-disable-next-line react/jsx-key
          <GridActionsCellItem
            icon={<RemoveRedEyeIcon />}
            // eslint-disable-next-line no-alert
            onClick={() => {
              router.push({
                // eslint-disable-next-line no-underscore-dangle
                pathname: `forms/${params.row.id}`,
                query: { realm: router.query.realm },
              });
            }}
            label={f("Modifier")}
            showInMenu
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            // eslint-disable-next-line no-alert
            onClick={() => {
              handleClickOpen(params.row.id);
            }}
            label={f("Supprimer")}
            showInMenu
          />,
        ],
        sortable: false,
        filterable: false,
        width: 160,
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return (
    <>
      <Title>{f("Liste de conseils")}</Title>

      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Item>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
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
                        placeholder={f("Rechercher une publication")}
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
                  rows={data?.data}
                  columns={columns}
                  rowCount={paginationTotalRows}
                  pageSize={pageSize}
                  // eslint-disable-next-line no-underscore-dangle
                  getRowId={(row: any) => row?.id}
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
              </Typography>
            </CardContent>
          </Item>

          <>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
              Êtes-vous sure de bien vouloir supprimer les détails de cette grossesse?</DialogTitle>
            
              <DialogActions className="dialog-actions-dense">
                <Button onClick={handleDeletePregancy}>Oui</Button>
                <Button onClick={handleClose}>Non</Button>
              </DialogActions>
            </Dialog>
          </>
        </Grid>
      </Grid>
    </>
  );
}

export default Posts;

