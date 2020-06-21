import gql from 'graphql-tag'

export const FETCH_EDIT_TOUR = gql`
	query fetchEditTour($slug: String!) {
		me {
			myTour(slug: $slug) {
				_id
				name
                hashtags
                maxGroupSize
                difficulty
                price
                summary
                description
                imageCover
                images
                locations {
                    coordinates
                    description
                    day
                    address
                }
			}
		}
	}
`