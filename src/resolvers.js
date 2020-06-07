import gql from "graphql-tag";

export const typeDefs = gql`
	extend type Query {
		loggedIn: Boolean!
		photo: String!
		name: String!
		userId: String!
#		cartItems: [ID!]!
	}
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