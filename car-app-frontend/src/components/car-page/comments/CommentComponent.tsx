import React, {FunctionComponent } from 'react'

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

const CommentComponent: FunctionComponent<CommentComponentProps> = props => {
    return <div>
        {props.comment.message}<br/>
        <i>{props.comment.user.username}</i>
        <section>Show replies</section>
    </div>
}

export default CommentComponent