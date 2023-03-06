import { gql } from "@apollo/client";

export const GET_NOTES = gql`
  query Folders($folderId: String!) {
    folder(folderId: $folderId) {
      id
      name
      notes {
        content
        id
        updatedAt
      }
    }
  }
`;

export const ADD_NOTE = gql`
  mutation addNote($content: String!, $folderId: String!) {
    addNote(content: $content, folderId: $folderId) {
      id
      content
    }
  }
`;

export const UPDATE_NOTE = gql`
  mutation updateNote($id: String!, $content: String!) {
    updateNote(id: $id, content: $content) {
      id
      content
    }
  }
`;
