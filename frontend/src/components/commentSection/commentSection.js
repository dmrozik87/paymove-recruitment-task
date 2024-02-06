import {Button, Container, Form} from "react-bootstrap";
import {useEffect, useState} from "react";
import Comment from "../comment/comment";

const CommentSection = ({ipId, ipStatus}) => {

    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("")

    useEffect(() => {
        fetch(`http://localhost:8080/comments/${ipId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            }
        })
            .then(response => response.json())
            .then(commentsData => setComments(commentsData))
    }, []);

    function createCommentBody() {
        return {
            text: commentText,
            improvementProposal: {
                ipId: ipId
            },
            createdBy: {
                userId: localStorage.getItem("userId")
            }
        }
    }

    function submitComment() {
        const commentBody = createCommentBody();

        fetch("http://localhost:8080/comments", {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            method: "POST",
            body: JSON.stringify(commentBody)
        }).then(response => response.json())
            .then(comment => {
                const newComments = [...comments]
                newComments.push(comment);
                setComments(newComments);
                setCommentText("");
            })
    }

    function isPostingAvailable() {
        const role = localStorage.getItem("role")

        if (role === "SUBMITTER") {
            return ipStatus === "Needs Update";
        } else if (role === "REVIEWER") {
            return ipStatus === "In Review"
        }
    }

    function isDeleteCommentButtonVisible(commentId, authorId) {
        const currentUserId = localStorage.getItem("userId");
        if (!isCommentLast(commentId)) return false;
        else return isPostingAvailable() && authorId === currentUserId;
    }

    function isCommentLast(id) {
        return comments[comments.length - 1].commentId === id;
    }

    function handleDelete(id) {
        fetch(`http://localhost:8080/comments/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
            method: "DELETE",
        }).then(response => {
            if (response.status === 200) {
                deleteCommentFromState(id);
            }
        })
    }

    function deleteCommentFromState(id) {
        const newComments = [...comments]
            .filter(comment => comment.commentId !== id)
        setComments(newComments);
    }

    return (
        <Container className="d-flex justify-content-center align-items-center viewport-height">
            <Form className="w-75">
                <Form.Group className="mb-1">
                    <Form.Label>Comments</Form.Label>
                    {comments.length > 0 ?
                        <>
                            {comments.map(comment => {
                                    return (
                                        <Comment
                                            key={comment.commentId}
                                            comment={comment}
                                            isDeleteCommentButtonVisible={isDeleteCommentButtonVisible(comment.commentId, comment.createdBy.userId)}
                                            handleDelete={handleDelete}
                                        />)
                                }
                            )}
                        </>
                        :
                        <p>No comments yet</p>
                    }
                </Form.Group>
                {isPostingAvailable() ?
                    <>
                        <Form.Group className="mt-2 mb-1">
                            <Form.Control
                                as="textarea"
                                rows={5}
                                placeholder="Enter comment"
                                onChange={(event) => setCommentText(event.target.value)}
                                value={commentText}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Button
                                size="sm"
                                onClick={() => submitComment()}
                            >
                                Post Comment
                            </Button>
                        </Form.Group>
                    </>
                    :
                    <></>
                }

            </Form>
        </Container>
    )
}

export default CommentSection;