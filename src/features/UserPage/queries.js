import { gql } from '@apollo/client';

export const FETCH_USER = gql`
	query fetchUser($id: ID! $page:Int $limit:Int) {
		user(id: $id) {
			_id
			name
			createdAt
            photo
            speaks
            reviews (page:$page limit:$limit) {
                hasMore
                nextPage
                total
                data {
					_id
					createdAt
					review
					tour {
						_id
						slug
						name
						imageCover

					}
					author {
						_id
						name
						createdAt
						photo
					}
                }
            }
			ownReviews (page:$page limit:$limit) {
				hasMore
				nextPage
				total
				data {
					_id
					createdAt
					review
					tour {
						_id
						slug
						name
						imageCover

					}
					author {
						_id
						name
						createdAt
						photo
					}
				}
			}
            tours {
                _id
                name
				slug
				starts {
                    date
					participants {
						_id
					}
                }
                imageCover
                createdAt
                ratingsAverage
                ratingsQuantity
				startLocation {
                    description
                }
                maxGroupSize
            }
		}
	}
`;