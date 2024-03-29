import {Card, Container} from "react-bootstrap";

const Comment = ({comment, isDeleteCommentButtonVisible, handleDelete}) => {

    const currentUser = localStorage.getItem("userId");
    const commentAuthor = comment.createdBy.userId;

    const styling = commentAuthor === currentUser ? "bg-dark-subtle" : "bg-light text-end";
    const position = commentAuthor === currentUser ? "start" : "end";

    const dateTimeToDisplay = new Date(comment.createdAt).toLocaleString();

    return (

        <Container className="w-100 d-grid">
            <Card
                className={styling + " w-75 mb-1"}
                style={{justifySelf: position}}
            >
                <Card.Subtitle className="mt-1 ms-1">{comment.createdBy.username}</Card.Subtitle>
                <Card.Subtitle className="ms-1 text-muted"
                               style={{fontSize: "0.7em"}}>{dateTimeToDisplay}</Card.Subtitle>
                <Card.Body>{comment.text}</Card.Body>
                {isDeleteCommentButtonVisible ?
                    <Card.Link
                        style={{fontSize: "0.8em"}}
                        role="button"
                        className="text-end me-1 link-danger text-decoration-none coursor-pointer"
                        onClick={() => handleDelete(comment.commentId)}>
                        Delete
                    </Card.Link>
                    :
                    <></>
                }
            </Card>
        </Container>

    )
}

export default Comment;