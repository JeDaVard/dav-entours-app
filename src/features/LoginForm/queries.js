import { gql } from '@apollo/client';

export const SIGN_IN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			code
			success
			message
			data {
				_id
				name
				photo
			}
			isOperational
		}
	}
`;

export const SIGN_UP = gql`
	mutation UpdateTodo($email: String!, $password: String!, $name: String!) {
		signUp(email: $email, password: $password, name: $name) {
			code
			success
			message
			data {
				_id
				name
				photo
			}
			isOperational
		}
	}
`;