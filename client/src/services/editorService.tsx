import { gql } from "@apollo/client";

export const GET_EDITOR = gql`
  query note($noteId: String!) {
    note(noteId: $noteId) {
      id
      content
    }
  }
`;
