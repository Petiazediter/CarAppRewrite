import React, {FunctionComponent } from 'react'
import {gql, useLazyQuery} from "@apollo/client";

type CommentComponentProps = {
    comment: CommentT
}

export type CommentT = {
    id: number
    message: string
    user: {
        username: string
    }
}

const COMMENT_QUERY = gql`
    query GetCommentById($id: Int!){
        comment(id: $id){
            comments {
                id
                message
                user {
                    username
                }    
            }
        }
    }
`

type CommentQueryT = {
    comment: {
        comments: CommentT[]
    }
}

const CommentComponent: FunctionComponent<CommentComponentProps> = props => {
    const [getComments, {data,loading}] = useLazyQuery<CommentQueryT>(COMMENT_QUERY, {
        variables: {
            id: props.comment.id
        }
    });

    if (loading){
        return <div>
            {props.comment.message}<br/>
            <i>{props.comment.user.username}</i><br/>
            Loading...
        </div>
    }

    if (!data){
        return <div>
            {props.comment.message}<br/>
            <i>{props.comment.user.username}</i>
            <section onClick={() => getComments()}>Show replies</section>
        </div>
    }

    return <div>
        {props.comment.message}<br/>
        <i>{props.comment.user.username}</i>
        {data.comment.comments.map(comment => <CommentComponent key={comment.id} comment={comment} />)}
    </div>
}

export default CommentComponent