import React from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";
import router from "./router";
import "./firebase/config";
import { ApolloProvider } from "@apollo/client";
import { client } from "./api/api";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ApolloProvider client={client}>
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: "50px" }}>
      <RouterProvider router={router} />
    </Container>
  </ApolloProvider>
  // </React.StrictMode>
);
