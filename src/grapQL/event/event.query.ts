import { gql } from 'apollo-boost';

export const GET_EVENTS = gql` 
  query($filters: GetEventsArgs!) {
    events(filters: $filters) {
      id,
      date,
      time,
      location,
      distance,
      meetingPoint,
      when,
      participateCounter,
      organizerName,
      isAssign,
      user {
        username
      }
    }
  }
`

