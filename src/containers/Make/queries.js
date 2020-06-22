import gql from 'graphql-tag'

export const FETCH_EDIT_TOUR = gql`
	query fetchEditTour($slug: String!) {
		me {
			myTour(slug: $slug) {
				_id
				slug
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
                draft
			}
		}
	}
`

export const MAKE_A_TOUR = gql`
	mutation makeATour($difficulty: String!, $name:String!, $maxGroupSize: Int!) {
		makeATour(difficulty:$difficulty name:$name maxGroupSize:$maxGroupSize) {
			message
			success
			code
			data {
				_id
				slug
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
				draft
			}
		}
	}
`

export const EDIT_TOUR_HEADING = gql`
    mutation tourHeading($id: ID!, $difficulty: String!, $name:String!, $maxGroupSize: Int! $hashtags: String) {
        tourHeading(id: $id difficulty:$difficulty name:$name maxGroupSize:$maxGroupSize hashtags: $hashtags) {
            message
            success
            code
            data {
				_id
				slug
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
				draft
            }
	    }
	}
`