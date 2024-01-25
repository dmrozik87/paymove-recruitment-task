import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {Col, Container, Row} from "react-bootstrap";

const Homepage = () => {

    const navigate = useNavigate();

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center viewport-height">
            <Row className="mb-3">
                <Col><h1>Welcome to Improvement Proposal App</h1></Col>
            </Row>
            <Row className="mb-3">
                <Col><h4>Application created for Paymove recruitment process</h4></Col>
            </Row>
            <Button
                variant="primary"
                onClick={() => navigate('/login')}
            >
                Enter
            </Button>
        </Container>
    )
}

export default Homepage;