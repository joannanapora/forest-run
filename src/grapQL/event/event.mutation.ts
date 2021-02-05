import { gql } from 'apollo-boost';

export const CREATE_EVENT = gql`
mutation createEvent(
    $date: String!
    $time: String!
    $location: String!
    $distance: Float!
    $when: Float!
    $meetingPoint: String!
    $description: String!
) {
    createEvent(
        createEventInput: {
    date: $date
    time: $time
    location: $location
    distance: $distance
    when: $when
    meetingPoint: $meetingPoint
    description : $description
        }
    ) {
        time
        location
        distance
        meetingPoint
    }
}
`