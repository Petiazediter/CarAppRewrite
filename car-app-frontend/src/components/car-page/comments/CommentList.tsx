import React, {FunctionComponent} from 'react'
import {gql, useLazyQuery} from "@apollo/client";
import CommentComponent, {CommentT} from "./CommentComponent";

const GET_CAR_COMMENTS = gql`
    query GetCarComments($carId: Int!){
        car(id: $carId){
            comments{
                id 
                message
                user {
                    username
                }
            }
        }
    }
`

type GetCarCommentsT = {
    car: {
        comments: CommentT[]
    }
}

type CommentComponentProps = {
    carId: number;
}

const CommentList: FunctionComponent<CommentComponentProps> = props => {

    const [getComments, {data,loading,error}] = useLazyQuery<GetCarCommentsT>(GET_CAR_COMMENTS,{
        variables: {
            carId: Number(props.carId)
        }
    })

    if ( loading ) {
        return <div>Loading...</div>
    }
    if (error){
        return <div>{JSON.stringify(error, null, 2)}</div>
    }

    if (!data) {
        return <button onClick={() => getComments()}> Click here to reveal comments.</button>
    }

    if ( data.car.comments.length === 0) {
        return <div>No comments yet.</div>
    }

    return (
        <div>
            {data.car.comments.map(comment => <CommentComponent key={comment.id} comment={comment} />)}
        </div>
    )
}

export default CommentList