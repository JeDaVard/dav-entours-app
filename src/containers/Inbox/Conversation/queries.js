import gql from 'graphql-tag'

export const FETCH_CONVERSATION = gql`
	query fetchConversation($id: ID!)  {
		me {
			conversation(id: $id) {
				_id
				createdAt
				tour {
					_id
					slug
					imageCover
					name
					slug
				}
				participants {
					_id
					photo
					name
				}
				guides {
					_id
					photo
					name
				}
			}
		}
	}
`

export const FETCH_MESSAGES = gql`
	query fetchMessages($id: ID!, $page: Int, $limit: Int)  {
		me {
			conversation(id: $id) {
				_id
				messages(page: $page, limit: $limit) {
					hasMore
					nextPage
					total
					messages {
						_id
						text
						createdAt
						sender {
							photo
							_id
						}
					}
				}
			}
		}
	}
`

export const SEND_MESSAGE = gql`
	mutation SendMessage($convId: ID!, $text: String!) {
		sendMessage(convId: $convId, text: $text) {
			success
			code
			message
			data {
				_id
				text
				createdAt
				sender {
					photo
					_id
				}
			}
		}
	}
`

export const REMOVE_MESSAGE = gql`
	mutation RemoveMessage($id: ID!) {
		removeMessage(id: $id) {
			success
			code
			message
			data {
				_id
				text
				createdAt
				sender {
					photo
					_id
				}
			}
		}
	}
`

export const SUBSCRIBE_MESSAGE = gql`
	subscription MessageAdded($id: ID!) {
		messageAdded(convId: $id) {
			success
			code
			message
			data {
				_id
				text
				createdAt
				sender {
					photo
					_id
				}
			}
		}
	}
`;
