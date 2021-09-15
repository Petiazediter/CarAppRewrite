import React, {FunctionComponent, useState} from 'react';
import {gql, useMutation, useQuery} from '@apollo/client';
import {Comment, Avatar, Input, Button, Divider} from 'antd';
import {PUBLISH_COMMENT, PublishCommentArgs, PublishCommentT} from "./CommentList";

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
	const { data } = useQuery<CommentQueryT>(COMMENT_QUERY, {
		variables: {
			id: props.comment.id,
		},
	});
	const [comment,setComment] = useState<string>("");
	const [publishComment,{loading}] = useMutation<PublishCommentT,PublishCommentArgs>(PUBLISH_COMMENT,{
		variables: {
			text: comment,
			commentId: props.comment.id
		},
		update(cache, {data}){
			const query: CommentQueryT | null = cache.readQuery({
				query: COMMENT_QUERY,
				variables: {
					id: props.comment.id
				}
			});

			if ( query && data ){
				const updatedComments: CommentT[] = [...query.comment.comments, data.addComment];
				cache.writeQuery({
					query: COMMENT_QUERY,
					data: {
						comment: {
							comments: updatedComments
						}
					},
					variables: {
						id: props.comment.id
					}
				})
			}
		}
	});
	const [isReplying, setIsReplying] = useState<boolean>(false);

	return (
		<>
			<Comment
				actions={[<span onClick={() => {
					setIsReplying(replying => !replying)
				}}>Reply to</span>]}
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
				content={<p>{props.comment.message}</p>}>
				{data &&
					data.comment.comments.map((comment) => (
						<CommentComponent key={comment.id} comment={comment} />
					))}
			</Comment>
			{isReplying && <>
				<Input placeholder={"your thoughts"} onChange={(value) => {
					setComment(value.currentTarget.value);
				}}/>
				<Button loading={loading} onClick={() => {
					publishComment().then()
				}}>Publish comment</Button>
			</>}
			<Divider/>
		</>
	);
};

export default CommentComponent;
