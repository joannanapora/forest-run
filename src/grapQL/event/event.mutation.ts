import { gql } from 'apollo-boost';

export const CREATE_EVENT = gql`
mutation createEvent(
    $date: String
    $time: String!
    $location: String!
    $distance: Float!
    $when: Int!
    $meetingPoint: String!
    $description: String!
    $organizerName: String!
    $organizerPhoneNumber: String!
    $imageId: String
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
    organizerName: $organizerName
    organizerPhoneNumber:  $organizerPhoneNumber
    imageId: $imageId
        }
    ) {
        id
        time
        location
        distance
        meetingPoint
        organizerName
        organizerPhoneNumber
        image {
            id
            url
        }
    }
}
`


export const DELETE_EVENT = gql`
mutation deleteEvents(
    $ids: [String!]!
) {
    deleteEvents(
        deleteEventsInput: {
            ids: $ids
        }
    ) {
        id
    }
}
`


export const ASSIGN_TO_EVENT = gql`
mutation assignToEvent(
    $eventId: String!
) {
    assignToEvent(
        eventId: $eventId
    ) {
        participateCounter,
        id
    }
}
`


export const UNASSIGN_TO_EVENT = gql`
mutation unassignToEvent(
    $eventId: String!
) {
    unassignToEvent(
        eventId: $eventId
    ) {
        participateCounter,
        id
    }
}
`

