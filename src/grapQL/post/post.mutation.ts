import { gql } from 'apollo-boost';



export const CREATE_POST = gql`
mutation createPost(
    $title: String!
    $keywords: [String!]!
    $text: String!
) {
    createPost(
        createPostInput: {
            title: $title
            text: $text
            keywords: $keywords
        }
    ) {
        title
        keywords
        text
    }
}
`


export const DELETE_POST = gql`
mutation deletePosts(
    $ids: [String!]!
) {
    deletePosts(
        deletePostsInput: {
            ids: $ids
        }
    ) {
        id
    }
}
`