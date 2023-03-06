import { gql } from "@apollo/client";

export const MUTATION_REGISTER = gql`
  # Increments a back-end counter and gets its resulting value
  mutation register($uid: String!, $name: String!) {
    register(uid: $uid, name: $name) {
      uid
      name
    }
  }
`;
