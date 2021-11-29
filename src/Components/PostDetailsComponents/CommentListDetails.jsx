import React from 'react'
import CommentDetails from './CommentDetails'

const CommentListDetails = ({comments}) => {
    return (
        <div>
            {comments.map(({_id, description, user:{username}}) => (
                <CommentDetails key={_id} description={description} username={username}/>
            ))}
        </div>
    )
}

export default CommentListDetails
