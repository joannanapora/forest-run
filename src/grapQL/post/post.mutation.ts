import { gql } from 'apollo-boost';



export const CREATE_POST = gql`
mutation createPost(
    $title: String!
    $keywords: [String!]!
    $text: String!
    $imageId: String
) {
    createPost(
        createPostInput: {
            title: $title
            text: $text
            keywords: $keywords
            imageId: $imageId
        }
    ) {
        id
        title
        keywords
        text
        image {
            id,
            url
        }
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