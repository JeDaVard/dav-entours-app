import { gql } from '@apollo/client';

export const FETCH_DISCOVER = gql`
	query {
		tours {
			slug
			_id
			name
			imageCover
            summary
		}
	}
`;