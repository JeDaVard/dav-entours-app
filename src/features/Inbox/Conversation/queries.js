import { gql } from '@apollo/client';

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
				start {
					date
					staff {
						_id
						name
						photo
					}
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
				lastMessage {
					sender {
						name
					}
					text
					isImage
				}
				messages(page: $page, limit: $limit) {
					hasMore
					nextPage
					total
					data {
						_id
						text
						isImage
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
	mutation SendMessage($convId: ID!, $text: String! $isImage: Boolean) {
		sendMessage(convId: $convId, text: $text isImage: $isImage) {
			success
			code
			message
			data {
				_id
				text
				isImage
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
	mutation RemoveMessage($id: ID! $key: String) {
		removeMessage(id: $id key: $key) {
			success
			code
			message
			data {
				_id
				text
				isImage
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
			_id
			text
			isImage
			createdAt
			sender {
				photo
				_id
			}
		}
	}
`;
