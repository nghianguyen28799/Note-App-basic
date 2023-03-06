import FolderList from "@/components/FolderList";
import Header from "@/components/Header";
import { Notification } from "@/components/Notification";
import { GET_FOLDERS } from "@/services/folderService";
import { ApolloQueryResult, OperationVariables, useQuery } from "@apollo/client";
import { Grid, Paper, Stack, Typography } from "@mui/material";
import React, { useMemo } from "react";
import { Outlet, useLoaderData } from "react-router-dom";

export interface IFolder {
  id: string;
  name: string;
}

export interface IFolderList {
  folders: IFolder[];
  refetch: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<any>>;
}

const Home = () => {
  const { data, refetch } = useQuery(GET_FOLDERS);

  return (
    <Stack gap={2}>
      <Typography variant="h4">Note App</Typography>
      <Stack flexDirection={"row"} justifyContent={"right"} alignItems={"center"} gap={1} mb="10px">
        <Header />
        <Notification />
      </Stack>

      <Paper elevation={2}>
        <Grid container sx={{ height: "50vh" }}>
          <Grid item xs={3} sx={{ height: "100%" }}>
            <FolderList folders={data?.folders} refetch={refetch} />
          </Grid>
          <Grid item xs={9} sx={{ height: "100%" }}>
            <Outlet />
          </Grid>
        </Grid>
      </Paper>
    </Stack>
  );
};

export default Home;
