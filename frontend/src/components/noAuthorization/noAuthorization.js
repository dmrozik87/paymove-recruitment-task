import {Container} from "react-bootstrap";

const NoAuthorization = () => {

    return (
        <Container className="d-flex viewport-height justify-content-center align-items-center">
            <h1>You are not authorized to visit this page</h1>
        </Container>
    )
}

export default NoAuthorization;