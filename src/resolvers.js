import gql from "graphql-tag";

export const typeDefs = gql`
	type Query {
#		it is just a fake
		getTours: String
	}
	
	extend type Query {
		loggedIn: Boolean!
		photo: String!
		name: String!
		userId: String!
#		cartItems: [ID!]!
	}
	
	type Location {
		_id: ID
		type: String
		coordinates: [Float]
		address: String
		description: String
		day: Int
	}
	
	input LocationInput {
		_id: ID
		type: String
		coordinates: [Float]
		address: String
		description: String
		day: Int
	}
#	fragment editedTourResponseFields on Tour {
#		message
#		success
#		code
#		data {
#			_id
#			slug
#			name
#			hashtags
#			maxGroupSize
#			difficulty
#			price
#			summary
#			description
#			imageCover
#			images
#			locations {
#				coordinates
#				description
#				day
#				address
#			}
#			draft
#		}
#	}
	
	
#	type Mutation {
#		logout: 
#	}

#	extend type Launch {
#		isInCart: Boolean!
#	}

#	extend type Mutation {
#		addOrRemoveFromCart(id: ID!): [ID!]!
#	}
`;

export const resolvers = {};