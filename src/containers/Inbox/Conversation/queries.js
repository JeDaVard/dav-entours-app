import gql from 'graphql-tag'

export const FETCH_CONVERSATION = gql`
	query fetchConversation($id: ID!)  {
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
`

export const FETCH_MESSAGES = gql`
	query fetchMessages($id: ID!, $page: Int)  {
		messages(id: $id, page: $page) {
			_id
			text
			createdAt
			sender {
				photo
				_id
			}
		}
	}
`

export const SEND_MESSAGE = gql`
	mutation SendMessage($convId: ID!, $text: String!) {
		sendMessage(convId: $convId, text: $text) {
			_id
			text
			createdAt
			sender {
				photo
				_id
			}
		}
	}
`

export const REMOVE_MESSAGE = gql`
	mutation RemoveMessage($id: ID!) {
		removeMessage(id: $id) {
			_id
			text
			createdAt
			sender {
				photo
				_id
			}
		}
	}
`

export const SUBSCRIBE_MESSAGE = gql`
	subscription MessageAdded($id: ID!) {
		messageAdded(convId: $id) {
			_id
			text
			createdAt
			sender {
				photo
				_id
			}
		}
	}
`;
