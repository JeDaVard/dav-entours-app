import { gql } from '@apollo/client';

export const FETCH_STARTS = gql`
    query startingDates($slug: String!) {
		me {
            myTour(slug: $slug) {
                _id
                slug
                starts {
                    _id
                    date
                    participants {
                        _id
                    }
				}
            }
        }
    }
`
export const MANAGE_STARTS = gql`
	mutation manageStart(
		$id: ID!
        $date: Date
        $startId: String
    ) {
		manageStart(
            id: $id
            date: $date
            startId: $startId
        ) {
			message
			success
			code
			data {
				_id
				slug
                starts {
                    _id
                    date
					participants {
						_id
					}
                }
			}
        }
	}
`