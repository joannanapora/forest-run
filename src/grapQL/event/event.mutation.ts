import { gql } from 'apollo-boost';

export const CREATE_EVENT = gql`
mutation createEvent(
    $date: String!
    $time: String!
    $place: String!
    $distance: Number!
    $organizerName: String!
    $organizerPhoneNumber: String!
    $meetingPoint: String!
    $eventDescription: String!
    $image
) {
    createPost(
        createPostInput: {
    date: $date
    time: $time
    place: $place
    distance: $distance
    organizerName: $organizerName
    organizerPhoneNumber: $organizerPhoneNumber
    meetingPoint: $meetingPoint
    eventDescription : $eventDescription
    image: $image
        }
    ) {
        date: $date
    time
    place
    distance
    organizerName
    organizerPhoneNumber
    meetingPoint
    eventDescription
    image
    }
}
`