import { gql } from '@apollo/client';

type QueryUser = {
	id: number;
	username: string;
	emailAddress: string;
};

export const userQuery = `
    id
    username
    emailAddress
`;

export default QueryUser;
