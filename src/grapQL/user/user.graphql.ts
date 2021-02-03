import { gql } from 'apollo-boost';


export const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
) {
    register(
        registerInput: {
            username: $username
            email: $email
            password: $password
        }
    ) {
        username
    }
}
`


export const LOGIN_USER = gql`
mutation login(
    $email: String!
    $password: String!
) {
    login(
        loginInput: {
            email: $email
            password: $password
        }
    ) {
        accessToken,
        username
    }
}
`