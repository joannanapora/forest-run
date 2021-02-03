import { gql } from 'apollo-boost';

export const GET_POSTS = gql` 
  query($filters: GetPostsArgs!) {
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

