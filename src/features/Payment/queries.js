import gql from 'graphql-tag'

export const INTENT_PAYMENT = gql`
	mutation intentTourPayment(
		$tourId: String!
		$startId: String!
		$invitedIds: String
		$firstMessage: String!
	) {
		intentTourPayment(
			tourOrderInput: {
				tourId:$tourId
				startId:$startId
				invitedIds:$invitedIds
				firstMessage:$firstMessage
			}
		) {
			publicKey
			clientSecret
		}
	}
`;