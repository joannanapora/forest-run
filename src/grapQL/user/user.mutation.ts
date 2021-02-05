import { gql } from 'apollo-boost';



export const UPDATE_USERNAME = gql`
mutation changeUsername(
    $username: String!
) {
    updateUsername(
        usernameInput: {
            username: $username
        }
    ) {
       username
    }
}
`