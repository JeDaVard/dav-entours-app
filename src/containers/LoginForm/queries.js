import gql from 'graphql-tag';

export const SIGN_IN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			token
			expires
			user {
				_id
				name
				photo
			}
		}
	}
`;

export const SIGN_UP = gql`
	mutation UpdateTodo($email: String!, $password: String!, $name: String!) {
		signUp(email: $email, password: $password, name: $name) {
			token
			expires
			user {
				_id
				name
				photo
			}
		}
	}
`;