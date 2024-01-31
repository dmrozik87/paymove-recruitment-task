import {Container, Form, Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const Register = () => {

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();

    function sendRegisterRequest() {

        const requestBody = {
            "username": username,
            "email": email,
            "password": password
        }

        fetch("http://localhost:8080/auth/register", {
            "headers": {
                "Content-Type": "application/json"
            },
            "method": "POST",
            "body": JSON.stringify(requestBody)
        })
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            localStorage.setItem("jwt", "Bearer " + data.token);
                            localStorage.setItem("userId", data.userId);
                            localStorage.setItem("role", data.role);
                            localStorage.setItem("name", data.name);
                            console.log("Registration successful");
                            navigate("/dashboard")
                        })
                } else {
                    setShowModal(true);
                    console.log("Username or email already exists")
                }
            })
    }

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center viewport-height">
                <Form className="w-25">
                    <Form.Group className="mb-3">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="name"
                            placeholder="Enter name"
                            value={username}
                            onChange={(event) => setUserName(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Button className="w-100" onClick={sendRegisterRequest}>Create account</Button>
                </Form>
            </Container>

            <Modal
                show={showModal}
                onHide={() => setShowModal(false)}
                backdrop="static"
                centered
                size="sm"
            >
                <Modal.Body className="text-center">
                    <h5>Provided name or email already exists</h5>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setShowModal(false)}>Close</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Register;