// import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import Button from "react-bootstrap/Button"
import {Col, Container, Row} from "react-bootstrap";

const Homepage = () => {

    const navigate = useNavigate();

    return (
        <Container>
            <Row>
                <Col><h1>Welcome to Improvement Proposal App</h1></Col>
            </Row>
            <Row>
                <Col><h3>Application created for Paymove recruitment process</h3></Col>
            </Row>
            <Button
                variant="primary"
                onClick={() => navigate('/login')}
            >
                Login
            </Button>
        </Container>
    )
}

export default Homepage;