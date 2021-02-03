import { gql } from 'apollo-boost';



export const CHANGE_USERNAME = gql`
mutation changeUsername(
    $username: String!
) {
    createPost(
        createPostInput: {
            username: $username
        }
    ) {
       username
    }
}
`