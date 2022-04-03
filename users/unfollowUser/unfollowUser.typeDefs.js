import { gql } from "apollo-server-express";

export default gql`
  type UnfrollowUserResult {
    ok: Boolean!
    error: String
  }
  type Mutation {
    unfollowUser(username: String!): UnfrollowUserResult
  }
`;
