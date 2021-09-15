import React, { FunctionComponent, useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import CommentComponent, { CommentT } from './CommentComponent';
import { Avatar, Divider, Comment, Form, Input, Button } from 'antd';

const { TextArea } = Input;

const GET_CAR_COMMENTS = gql`
	query GetCarComments($carId: Int!) {
		car(id: $carId) {
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

type GetCarCommentsT = {
	car: {
		comments: CommentT[];
	};
};

type CommentComponentProps = {
	carId: number;
};

export const PUBLISH_COMMENT = gql`
    mutation PublishComment($text: String!, $carId:Int, $commentId: Int){
        addComment(text: $text, carId: $carId, commentId: $commentId){
            id
        }
    }
`

export type PublishCommentArgs = {
    text: string
    carId?: number
    commentId?: number
}

export type PublishCommentT = {
    addComment: {
        id: number
    }
}

const CommentList: FunctionComponent<CommentComponentProps> = (props) => {
	const { data, loading, error } = useQuery<GetCarCommentsT>(GET_CAR_COMMENTS, {
		variables: {
			carId: Number(props.carId),
		},
	});

	const [comment,setComment] = useState<string>('')

	const [publishComment, { loading: submitting, error: submittingError }] = useMutation<PublishCommentT,PublishCommentArgs>(PUBLISH_COMMENT, {
	    variables: {
	        text: comment,
            carId: Number(props.carId)
	    }
    });

	if ( submittingError ){
	    console.log(JSON.stringify(submittingError, null, 2))
    }

	if (loading) {
		return <div>Loading...</div>;
	}
	if (error) {
		return <div>{JSON.stringify(error, null, 2)}</div>;
	}

	if (!data) {
		return <div>No comments yet.</div>;
	}

	if (data.car.comments.length === 0) {
		return <div>No comments yet.</div>;
	}

	return (
		<div>
			<Divider />
			<h1>Comments</h1>
			{data.car.comments.map((comment: CommentT) => (
				<CommentComponent key={comment.id} comment={comment} />
			))}

			<Comment
				avatar={
					<Avatar
						src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
						alt="Han Solo"
					/>
				}
				content={
					<>
						<Form.Item>
							<TextArea
								rows={4}
								onChange={(value) => {
									setComment(value.currentTarget.value);
								}}
								value={comment}
							/>
						</Form.Item>
						<Form.Item>
							<Button
								htmlType="submit"
								loading={submitting}
								onClick={() => {
									publishComment().then();
								}}
								type="primary"
							>
								Add Comment
							</Button>
						</Form.Item>
					</>
				}
			/>
		</div>
	);
};

export default CommentList;
