/* eslint-disable no-use-before-define */
import React, { useMemo, useState } from "react";
import { useIntl } from "react-intl";
import { Grid } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
// import ArticleIcon from "@mui/icons-material/Article";
import Table from "components/table";
import {
  GridActionsCellItem,
  GridColDef,
  GridRowParams,
} from "@mui/x-data-grid";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { getResponses } from "services/forms";
import ResponsChart from "./ResponsChart";
import styles from "./Posts.module.scss";

function Forms() {
  const router = useRouter();
  const { fid, realm, formType } = router.query;
  const { formatMessage } = useIntl();
  const f = (id: string) => formatMessage({ id });

  const [paginationTotalRows, setPaginationTotalRows] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading } = useQuery(
    ["responses", page, pageSize, fid],
    () =>
      getResponses({
        page,
        perPage: pageSize,
        fid,
        realm,
      }),
    {
      keepPreviousData: true,
      onSuccess: (res: any) => {
        setPaginationTotalRows(parseInt(res.rowsLength, 10));
      },
    }
  );

  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: "_id",
        headerName: f("id"),
        flex: 2,
        sortable: false,
      },
      {
        field: "user_id",
        headerName: f("userId"),
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
                pathname: `${fid}/${params.row._id}/`,
                query: { realm: router.query.realm },
              });
            }}
            label={f("View Response")}
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
      <Grid
        className={styles.useFilters_filters}
        container
        direction="row"
        alignItems="center"
        p={2}
      />
      {data?.content && (
        <ResponsChart fid={fid} realm={realm} dataChart={data?.content} />
      )}
      {formType === "public" && (
        <Table
          rows={data?.content}
          columns={columns}
          rowCount={paginationTotalRows}
          pageSize={pageSize}
          // eslint-disable-next-line no-underscore-dangle
          getRowId={(row: any) => row?._id}
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

export default Forms;
