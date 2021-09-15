import React, { FunctionComponent } from 'react';
import { gql, useQuery } from '@apollo/client';
import { Comment, Avatar } from 'antd';

type CommentComponentProps = {
	comment: CommentT;
};

export type CommentT = {
	id: number;
	message: string;
	user: {
		username: string;
	};
};

const COMMENT_QUERY = gql`
	query GetCommentById($id: Int!) {
		comment(id: $id) {
			comments {
				id
				message
				user {
					username
				}
			}
		}
	}
`;

type CommentQueryT = {
	comment: {
		comments: CommentT[];
	};
};

const CommentComponent: FunctionComponent<CommentComponentProps> = (props) => {
	const { data, loading } = useQuery<CommentQueryT>(COMMENT_QUERY, {
		variables: {
			id: props.comment.id,
		},
	});

	return (
		<Comment
			actions={[<span key="comment-nested-reply-to">Reply to</span>]}
			author={
				<a href={`/user/${props.comment.user.username}`}>
					{props.comment.user.username}
				</a>
			}
			avatar={
				<Avatar
					src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
					alt="Han Solo"
				/>
			}
			content={<p>{props.comment.message}</p>}
		>
			{data &&
				data.comment.comments.map((comment) => (
					<CommentComponent key={comment.id} comment={comment} />
				))}
			{loading && <p>Loading...</p>}
		</Comment>
	);
};

export default CommentComponent;
