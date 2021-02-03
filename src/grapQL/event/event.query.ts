import { gql } from 'apollo-boost';

export const GET_EVENTS = gql` 
  query {
    posts(filters: $filters) {
        title,
        dateCreated,
        id,
        text,
        keywords,
        user {
          username
        }
    }
  }
`

