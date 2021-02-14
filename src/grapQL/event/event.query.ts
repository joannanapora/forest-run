import { gql } from 'apollo-boost';

export const GET_EVENTS = gql` 
  query($filters: GetEventsArgs!) {
    events(filters: $filters) {
      id,
      date,
      time,
      location,
      distance,
      description,
      meetingPoint,
      when,
      participateCounter,
      organizerName,
      organizerPhoneNumber,
      isAssign,
      user {
        username
      },
      image {
        id
        url
    }
    }
  }
`
