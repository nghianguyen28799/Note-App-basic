import { gql } from "@apollo/client";

export const GET_FOLDERS = gql`
  query Folders {
    folders {
      id
      name
      createdAt
    }
  }
`;

export const ADD_FOLDER = gql`
  mutation addFolder($name: String!) {
    addFolder(name: $name) {
      name
      author {
        name
      }
    }
  }
`;
