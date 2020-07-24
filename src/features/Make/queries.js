import { gql } from '@apollo/client';

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
				firstMessage
                summary
                description
                imageCover
                images
                locations {
                    coordinates
                    description
                    day
                    address
					_id
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
				firstMessage
				summary
				description
				imageCover
				images
				locations {
					coordinates
					description
					day
					address
					_id
				}
				draft
			}
		}
	}
`

export const EDIT_TOUR_HEADING = gql`
    mutation tourHeading(
        $id: ID!
        $difficulty: String!
        $name:String!
        $maxGroupSize: Int!
        $hashtags: String
        $price: Int
    ) {
        tourHeading(
            id: $id
            difficulty:$difficulty
            name:$name
            maxGroupSize:$maxGroupSize
            hashtags: $hashtags
            price: $price
        ) {
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
				firstMessage
				summary
				description
				imageCover
				images
				locations {
					coordinates
					description
					day
					address
					_id
				}
				draft
            }
	    }
	}
`
export const EDIT_TOUR_DETAILS = gql`
	mutation tourDetails(
		$id: ID!
		$summary: String
		$description: String
		$firstMessage: String
	) {
		tourDetails(
			id: $id
			summary:$summary
			description:$description
			firstMessage:$firstMessage
		) {
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
				firstMessage
				summary
				description
				imageCover
				images
				locations {
					coordinates
					description
					day
					address
					_id
				}
				draft
			}
		}
	}
`

export const EDIT_TOUR_LOCATIONS = gql`
	mutation tourLocations($id: ID! $locations: [LocationInput]) {
		tourLocations(id: $id locations: $locations) {
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
				firstMessage
				summary
				description
				imageCover
				images
				locations {
					coordinates
					description
					day
					address
					_id
				}
				draft
			}
		}
	}
`

export const EDIT_TOUR_GALLERY = gql`
	mutation tourGallery(
		$id: ID!
		$imageCover:String
		$images: [String]!
		$removeImage: String
	) {
		tourGallery(
			id: $id
			imageCover: $imageCover
			images: $images
			removeImage: $removeImage
		) {
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
				firstMessage
				summary
				description
				imageCover
				images
				locations {
					coordinates
					description
					day
					address
					_id
				}
				draft
			}
		}
	}
`


export const UPLOAD_IMAGE = gql`
	mutation uploadImage(
		$id: ID!
		$fileName: String!
		$contentType: String!
		$genre: String!
	) {
		uploadImage(
			id: $id
			fileName: $fileName
			contentType: $contentType
			genre: $genre
		) {
			key
			url
		}
	}
`